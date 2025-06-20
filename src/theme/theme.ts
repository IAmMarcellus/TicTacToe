import { createTheme } from "@shopify/restyle";

const palette = {
  // Light theme colors
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  gray: "#E0E0E0",
  darkGray: "#666666",
  black: "#000000",
  blue: "#007AFF",
  red: "#FF3B30",
  green: "#34C759",

  // Dark theme colors
  darkBackground: "#121212",
  darkSurface: "#1E1E1E",
  darkBorder: "#333333",
  darkText: "#FFFFFF",
  darkTextSecondary: "#B0B0B0",
  darkBlue: "#0A84FF",
  darkRed: "#FF453A",
  darkGreen: "#30D158",
};

// Shared theme properties
const baseTheme = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 20,
    xxxl: 25,
    round: 50,
  },
  textVariants: {
    header: {
      fontSize: 32,
      fontWeight: "bold",
      color: "primaryText",
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: "primaryText",
    },
    body: {
      fontSize: 16,
      color: "primaryText",
    },
    bodySecondary: {
      fontSize: 16,
      color: "secondaryText",
    },
    caption: {
      fontSize: 14,
      color: "secondaryText",
    },
    button: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
    },
    gameMarker: {
      fontSize: 32,
      fontWeight: "bold",
    },
    defaults: {
      fontSize: 16,
      color: "primaryText",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

// Light theme
const lightTheme = createTheme({
  ...baseTheme,
  colors: {
    white: palette.white,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.lightGray,
    cardSecondaryBackground: palette.white,
    primaryText: palette.black,
    secondaryText: palette.darkGray,
    primary: palette.blue,
    secondary: palette.red,
    success: palette.green,
    border: palette.gray,
    shadow: "rgba(0, 0, 0, 0.1)",

    // Game specific colors
    xMarker: palette.blue,
    oMarker: palette.red,
    gameBoardBackground: palette.white,
    gameBoardBorder: palette.black,
  },
});

// Dark theme
const darkTheme = createTheme({
  ...baseTheme,
  colors: {
    white: palette.white,
    mainBackground: palette.darkBackground,
    cardPrimaryBackground: palette.darkSurface,
    cardSecondaryBackground: palette.darkBackground,
    primaryText: palette.darkText,
    secondaryText: palette.darkTextSecondary,
    primary: palette.darkBlue,
    secondary: palette.darkRed,
    success: palette.darkGreen,
    border: palette.darkBorder,
    shadow: "rgba(0, 0, 0, 0.3)",

    // Game specific colors
    xMarker: palette.darkBlue,
    oMarker: palette.darkRed,
    gameBoardBackground: palette.darkSurface,
    gameBoardBorder: palette.darkText,
  },
});

export type Theme = typeof lightTheme;
export type ThemeColors = keyof Theme["colors"];
export type ThemeSpacing = keyof Theme["spacing"];
export type ThemeBorderRadii = keyof Theme["borderRadii"];
export type ThemeTextVariants = keyof Theme["textVariants"];

export { lightTheme, darkTheme };
export default lightTheme;
