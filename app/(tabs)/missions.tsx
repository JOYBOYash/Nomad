import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MissionsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8D5B7', dark: '#4A3F35' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="target"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Missions</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle">Your Event Goals</ThemedText>
        <ThemedText>
          Track your event-wise missions, complete challenges, and earn rewards as you explore the Live-Offline world.
        </ThemedText>
      </ThemedView>
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
    marginBottom: 8,
  },
});
