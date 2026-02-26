import { auth } from '@/app/firebase';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Google OAuth Client IDs from environment variables
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '';

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine the correct client ID based on platform
  const getClientId = () => {
    if (Platform.OS === 'ios' && GOOGLE_IOS_CLIENT_ID) {
      return GOOGLE_IOS_CLIENT_ID;
    }
    if (Platform.OS === 'android' && GOOGLE_ANDROID_CLIENT_ID) {
      return GOOGLE_ANDROID_CLIENT_ID;
    }
    return GOOGLE_CLIENT_ID;
  };

  // Get the redirect URI
  const redirectUri = AuthSession.makeRedirectUri({
    native: 'com.yourcompany.nomad://',
  });

  // Google Auth Request with proper configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: getClientId(),
    scopes: ['openid', 'email', 'profile'],
    redirectUri,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.params;
      
      const signInWithGoogleToken = async () => {
        try {
          if (!id_token) {
            throw new Error('No ID token received from Google');
          }
          
          // Create Google credential with the ID token
          const credential = GoogleAuthProvider.credential(id_token, access_token);
          
          // Sign in with the credential
          await signInWithCredential(auth, credential);
        } catch (error: any) {
          console.error('Google Sign-In Error:', error);
          throw new Error(error.message || 'Google Sign-In failed');
        }
      };
      
      signInWithGoogleToken();
    } else if (response?.type === 'error') {
      console.error('Google Sign-In Error Response:', response);
    }
  }, [response]);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const clientId = getClientId();
    
    if (!clientId) {
      throw new Error(
        'Google Client ID is not configured. Please add EXPO_PUBLIC_GOOGLE_CLIENT_ID to your .env file'
      );
    }
    
    if (!request) {
      throw new Error('Google Sign-In is not ready yet. Please try again in a moment.');
    }
    
    try {
      const result = await promptAsync();
      
      if (result.type === 'error') {
        console.error('Google Sign-In Error:', result);
        throw new Error(result.error?.message || 'Google Sign-In failed');
      }
      
      // The actual sign-in is handled in the useEffect above
    } catch (error: any) {
      console.error('Google Sign-In Prompt Error:', error);
      throw new Error(error.message || 'Failed to start Google Sign-In');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
