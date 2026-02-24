import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';

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
  const subheadingColor = isDark ? COLORS.text.dark.subheading : COLORS.text.light.subheading;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: COLORS.header.home.light, 
        dark: COLORS.header.home.dark 
      }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: headingColor }}>
          Welcome to Nomad!
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Hello, {user?.email?.split('@')[0] || 'Traveler'}! 👋
        </ThemedText>
        <ThemedText style={[styles.welcomeText, { color: textColor }]}>
          Ready to explore the world? Your next adventure awaits.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Quick Actions
        </ThemedText>
        
        <ThemedView style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: isDark ? COLORS.background.cardDark : COLORS.background.cardLight }]}>
            <IconSymbol name="paperplane.fill" size={32} color={COLORS.brand.primary} />
            <ThemedText style={[styles.actionText, { color: textColor }]}>Explore</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: isDark ? COLORS.background.cardDark : COLORS.background.cardLight }]}>
            <IconSymbol name="target" size={32} color={COLORS.brand.secondary} />
            <ThemedText style={[styles.actionText, { color: textColor }]}>Missions</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Your Progress
        </ThemedText>
        <ThemedView style={[styles.progressCard, { backgroundColor: isDark ? COLORS.background.cardDark : COLORS.background.cardLight }]}>
          <ThemedText style={{ color: textColor }}>
            🎯 2 Missions Completed{'\n'}
            🌍 0 Countries Visited{'\n'}
            ⭐ Level 1 Nomad
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={{ color: subheadingColor }}>
          Recent Activity
        </ThemedText>
        <ThemedView style={[styles.activityCard, { backgroundColor: isDark ? COLORS.background.cardDark : COLORS.background.cardLight }]}>
          <ThemedText style={{ color: textColor }}>
            🎉 Welcome to Nomad! Start your journey by exploring destinations.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  welcomeContainer: {
    gap: 8,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressCard: {
    padding: 16,
    borderRadius: 12,
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
