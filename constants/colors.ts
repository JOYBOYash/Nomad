/**
 * Comprehensive color definitions for the Nomad app
 * All colors are defined here for easy customization
 */

// Primary brand colors
export const BRAND_COLORS = {
  primary: '#0a7ea4',
  primaryDark: '#085c7a',
  secondary: '#FF9500',
  danger: '#FF3B30',
  success: '#34C759',
  warning: '#FFCC00',
};

// Button colors
export const BUTTON_COLORS = {
  primaryBackground: '#0a7ea4',
  primaryText: '#FFFFFF',
  secondaryBackground: '#E5E5EA',
  secondaryText: '#000000',
  dangerBackground: '#FF3B30',
  dangerText: '#FFFFFF',
  disabledBackground: '#C7C7CC',
  disabledText: '#8E8E93',
};

// Tab navigation colors
export const TAB_COLORS = {
  background: '#FFFFFF',
  iconInactive: '#8E8E93',
  iconActive: '#0a7ea4',
  borderTop: '#E5E5EA',
};

// Text colors
export const TEXT_COLORS = {
  light: {
    heading: '#000000',
    subheading: '#3C3C43',
    body: '#3C3C43',
    caption: '#8E8E93',
    link: '#0a7ea4',
  },
  dark: {
    heading: '#FFFFFF',
    subheading: '#EBEBF5',
    body: '#EBEBF5',
    caption: '#8E8E93',
    link: '#0a7ea4',
  },
};

// Background colors
export const BACKGROUND_COLORS = {
  light: '#FFFFFF',
  dark: '#1C1C1E',
  cardLight: '#F2F2F7',
  cardDark: '#2C2C2E',
};

// Input field colors
export const INPUT_COLORS = {
  background: '#F2F2F7',
  border: '#E5E5EA',
  borderFocused: '#0a7ea4',
  placeholder: '#8E8E93',
  text: '#000000',
};

// Header colors
export const HEADER_COLORS = {
  home: {
    light: '#A1CEDC',
    dark: '#1D3D47',
  },
  explore: {
    light: '#D0D0D0',
    dark: '#353636',
  },
  missions: {
    light: '#E8D5B7',
    dark: '#4A3F35',
  },
  profile: {
    light: '#D0D0D0',
    dark: '#353636',
  },
};

// Export all colors
export const COLORS = {
  brand: BRAND_COLORS,
  button: BUTTON_COLORS,
  tab: TAB_COLORS,
  text: TEXT_COLORS,
  background: BACKGROUND_COLORS,
  input: INPUT_COLORS,
  header: HEADER_COLORS,
};

export default COLORS;
