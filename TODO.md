# Firebase Authentication Setup for Nomad App

## ✅ Completed Tasks:
- [x] Install Firebase dependencies
- [x] Create app/firebase.ts - Firebase configuration
- [x] Create context/AuthContext.tsx - Authentication context
- [x] Create app/login.tsx - Login screen
- [x] Update app/_layout.tsx - Add auth provider and conditional navigation
- [x] Create app/(tabs)/missions.tsx - Missions screen
- [x] Create app/(tabs)/profile.tsx - Profile screen with sign out
- [x] Update app/(tabs)/_layout.tsx - 4 tabs with icons only
- [x] Update app/(tabs)/index.tsx - Cleaned Home screen
- [x] Update app/(tabs)/explore.tsx - Cleaned Explore screen
- [x] Create constants/colors.ts - Comprehensive color definitions
- [x] Update all screens to use new color system
- [x] Fix tab icons using MaterialIcons from @expo/vector-icons
- [x] Sign out button with red background color

## Color System:
All colors are now defined in `constants/colors.ts`:
- **BUTTON_COLORS**: Primary, secondary, danger (red for sign out), disabled
- **TAB_COLORS**: Background, active/inactive icon colors
- **TEXT_COLORS**: Heading, subheading, body, caption for light/dark modes
- **BACKGROUND_COLORS**: Light/dark backgrounds
- **INPUT_COLORS**: Input field styling
- **HEADER_COLORS**: Per-screen header colors
- **BRAND_COLORS**: Primary brand colors

## Notes:
- Firebase project is already set up by user
- User will add Firebase config keys to environment variables
- Using expo-secure-store for token persistence
- All buttons now have proper text colors (black on light buttons, white on dark buttons)
- Sign out button uses red background with white text
