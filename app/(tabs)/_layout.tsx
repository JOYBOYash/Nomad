import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="explore" color={color} />,
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="track-changes" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
