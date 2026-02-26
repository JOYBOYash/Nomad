import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? COLORS.text.dark.body : COLORS.text.light.body;
  const headingColor = isDark ? COLORS.text.dark.heading : COLORS.text.light.heading;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: COLORS.header.home.light, 
        dark: COLORS.header.home.dark 
      }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="house.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ color: headingColor }}>
          Home
        </ThemedText>
        <ThemedText style={[styles.welcomeText, { color: textColor }]}>
          Welcome, {user?.email?.split('@')[0] || 'Nomad'}!
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
  welcomeText: {
    fontSize: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
