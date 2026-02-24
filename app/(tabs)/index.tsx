import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Nomad!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle">Hello, {user?.email || 'Traveler'}!</ThemedText>
        <ThemedText>
          This is your home screen. Start exploring the world of live-events with Nomad.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  contentContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: '#808080',
    bottom: -50,
    left: 35,
    position: 'absolute',
  },
});
