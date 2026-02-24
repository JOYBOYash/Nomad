import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="person.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle">Account Information</ThemedText>
        
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold">Email:</ThemedText>
          <ThemedText>{user?.email || 'Not available'}</ThemedText>
        </ThemedView>

      </ThemedView>

      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: Colors[colorScheme ?? 'light'].tint },
        ]}
        onPress={handleLogout}>
        <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -50,
    left: 35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  contentContainer: {
    gap: 8,
    marginBottom: 24,
  },
  infoContainer: {
    gap: 4,
    marginBottom: 12,
  },
  logoutButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
