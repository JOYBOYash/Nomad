import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MissionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? COLORS.text.dark.body : COLORS.text.light.body;
  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;
  const subheadingColor = isDark ? COLORS.text.dark.subheading : COLORS.text.light.subheading;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: COLORS.header.missions.light, 
        dark: COLORS.header.missions.dark 
      }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="target"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: headingColor }}>
          Missions
        </ThemedText>
      </ThemedView>
      
      <ThemedText style={[styles.description, { color: textColor }]}>
        Complete travel challenges and earn rewards on your journey.
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Active Missions
        </ThemedText>
        <ThemedText style={{ color: textColor }}>
          • Visit 3 new countries{'\n'}
          • Try 5 local cuisines{'\n'}
          • Take 10 photos at landmarks{'\n'}
          • Meet 2 fellow travelers
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Completed
        </ThemedText>
        <ThemedText style={{ color: textColor }}>
          • Create your Nomad profile ✓{'\n'}
          • Set your first destination ✓
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
