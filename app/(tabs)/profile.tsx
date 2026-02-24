import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      headerBackgroundColor={{ 
        light: COLORS.header.profile.light, 
        dark: COLORS.header.profile.dark 
      }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="person.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: isDark ? COLORS.text.dark.heading : COLORS.text.light.heading }}>
          Profile
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle" style={{ color: isDark ? COLORS.text.dark.subheading : COLORS.text.light.subheading }}>
          Account Information
        </ThemedText>
        
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: isDark ? COLORS.text.dark.body : COLORS.text.light.body }}>
            Email:
          </ThemedText>
          <ThemedText style={{ color: isDark ? COLORS.text.dark.body : COLORS.text.light.body }}>
            {user?.email || 'Not available'}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: isDark ? COLORS.text.dark.body : COLORS.text.light.body }}>
            User ID:
          </ThemedText>
          <ThemedText style={{ color: isDark ? COLORS.text.dark.body : COLORS.text.light.body }}>
            {user?.uid || 'Not available'}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: COLORS.button.dangerBackground },
        ]}
        onPress={handleLogout}>
        <ThemedText style={[styles.logoutButtonText, { color: COLORS.button.dangerText }]}>
          Sign Out
        </ThemedText>
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
    fontSize: 16,
    fontWeight: '600',
  },
});
