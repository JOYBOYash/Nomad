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

  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;

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
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ color: headingColor }}>
          Missions
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
