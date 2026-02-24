import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? COLORS.text.dark.body : COLORS.text.light.body;
  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;
  const subheadingColor = isDark ? COLORS.text.dark.subheading : COLORS.text.light.subheading;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: COLORS.header.explore.light, 
        dark: COLORS.header.explore.dark 
      }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="paperplane.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: headingColor }}>
          Explore
        </ThemedText>
      </ThemedView>
      
      <ThemedText style={[styles.description, { color: textColor }]}>
        Discover new places and plan your next adventure with Nomad.
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Features
        </ThemedText>
        <ThemedText style={{ color: textColor }}>
          • Browse destinations{'\n'}
          • Save favorite locations{'\n'}
          • Get travel recommendations{'\n'}
          • Plan your itinerary
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
