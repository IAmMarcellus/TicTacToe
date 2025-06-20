import { createTheme } from "@shopify/restyle";

const palette = {
  // Modern color palette
  white: "#FFFFFF",
  offWhite: "#FAFAFA",
  lightGray: "#F8F9FA",
  gray: "#E9ECEF",
  darkGray: "#6C757D",
  black: "#212529",

  // Modern gradients and colors
  primaryGradient: ["#667eea", "#764ba2"],
  secondaryGradient: ["#f093fb", "#f5576c"],
  accentGradient: ["#4facfe", "#00f2fe"],

  // Modern blues
  modernBlue: "#4F46E5",
  lightBlue: "#818CF8",
  darkBlue: "#3730A3",

  // Modern grays
  modernGray: "#6B7280",
  lightModernGray: "#F3F4F6",
  darkModernGray: "#374151",

  // Accent colors
  purple: "#8B5CF6",
  pink: "#EC4899",
  teal: "#14B8A6",

  // Dark theme colors
  darkBackground: "#0F172A",
  darkSurface: "#1E293B",
  darkBorder: "#334155",
  darkText: "#F8FAFC",
  darkTextSecondary: "#CBD5E1",
  darkThemeBlue: "#3B82F6",
  darkThemeRed: "#EF4444",
  darkThemeGreen: "#10B981",
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
      fontSize: 36,
      fontWeight: "700",
      color: "primaryText",
    },
    headerLarge: {
      fontSize: 42,
      fontWeight: "800",
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
    mainBackground: palette.offWhite,
    cardPrimaryBackground: palette.lightGray,
    cardSecondaryBackground: palette.white,
    primaryText: palette.black,
    secondaryText: palette.modernGray,
    primary: palette.modernBlue,
    secondary: palette.pink,
    success: palette.teal,
    border: palette.gray,
    shadow: "rgba(0, 0, 0, 0.08)",

    // Game specific colors
    xMarker: palette.modernBlue,
    oMarker: palette.pink,
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
    primary: palette.darkThemeBlue,
    secondary: palette.darkThemeRed,
    success: palette.darkThemeGreen,
    border: palette.darkBorder,
    shadow: "rgba(0, 0, 0, 0.3)",

    // Game specific colors
    xMarker: palette.darkThemeBlue,
    oMarker: palette.darkThemeRed,
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
