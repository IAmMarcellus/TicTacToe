# TicTacToe Theme System

This app uses [Restyle](https://github.com/Shopify/restyle) for a comprehensive theming system with light and dark mode support.

## Theme Structure

### Base Theme (`src/theme/theme.ts`)

- **Shared Properties**: Spacing, border radius, text variants, and breakpoints
- **Light Theme**: Complete light theme with appropriate colors
- **Dark Theme**: Complete dark theme with appropriate colors

### Theme Provider (`src/theme/ThemeProvider.tsx`)

- Manages theme switching between light, dark, and system modes
- Uses `ThemeMode` enum for type safety
- Persists theme preference using AsyncStorage
- Provides theme context to the entire app

## Screens

### HomeScreen

- Main game entry point
- Settings button (⚙️) for theme customization
- Quick theme toggle
- Start game button

### SettingsScreen

- Comprehensive theme customization
- Individual theme mode selection (Light/Dark/System)
- Current theme status display
- Quick theme toggle
- About section

### GameScreen

- Game board with themed styling
- Back navigation
- Reset game functionality

## Components

### Themed Components

- **Box**: Replaces `View` with theme-aware styling
- **Text**: Replaces `Text` with theme-aware typography
- **ThemedButton**: Custom button component with theme variants
- **ThemeToggle**: Component to switch between themes
- **GameBoard**: Themed game board container
- **Square**: Individual game squares with theme-aware styling

### Theme Hook (`src/hooks/useTheme.ts`)

Provides easy access to:

- Current theme colors, spacing, and other tokens
- Theme mode (light/dark/system) via `ThemeMode` enum
- Theme switching functions

## Performance Optimizations

### useCallback for Props

All functions passed as props are wrapped in `useCallback` for optimal performance:

- **Navigation handlers**: `handleStartGame`, `handleOpenSettings`, `handleBackToHome`
- **Theme handlers**: `handleThemeChange`, `cycleTheme`
- **Game handlers**: `handleSquarePress`, `resetGame`, `onSquarePress`
- **Utility functions**: `getThemeIcon`, `getThemeLabel`

### useMemo for Computed Values

Complex computations are memoized:

- **Game board squares**: Memoized to prevent unnecessary re-renders
- **Theme styles**: Computed styles are memoized
- **Board state calculations**: Win/draw checks are optimized

## Usage

### Using Themed Components

```tsx
import { Box, Text } from "../theme/ThemeProvider";

<Box flex={1} backgroundColor="mainBackground" padding="m">
  <Text variant="header" color="primaryText">
    Hello World
  </Text>
</Box>;
```

### Using Theme Hook

```tsx
import { useTheme, ThemeMode } from "../hooks/useTheme";

const { colors, spacing, isDark, setThemeMode } = useTheme();

// Switch to dark theme
setThemeMode(ThemeMode.DARK);
```

### Theme Modes

- **ThemeMode.LIGHT**: Always uses light theme
- **ThemeMode.DARK**: Always uses dark theme
- **ThemeMode.SYSTEM**: Follows device system preference

## Design Principles

### No Inline Styles

The app follows a strict no-inline-styles policy:

- All styling uses Restyle's `Box` and `Text` components
- Theme tokens are used for colors, spacing, and typography
- Only necessary inline styles (like TouchableHighlight) are allowed
- Consistent design system across all components

### Performance First

- **useCallback**: All prop functions are memoized
- **useMemo**: Complex computations are cached
- **memo**: Components are wrapped for shallow comparison
- **Optimized re-renders**: Minimal unnecessary updates

### Theme Tokens

- **Colors**: All colors are defined in the theme
- **Spacing**: Consistent spacing scale (xs, s, m, l, xl, xxl, xxxl)
- **Typography**: Predefined text variants with proper theming
- **Border Radius**: Consistent border radius scale

## Theme Tokens

### Colors

- `mainBackground`: Main app background
- `cardPrimaryBackground`: Primary card background
- `cardSecondaryBackground`: Secondary card background
- `primaryText`: Primary text color
- `secondaryText`: Secondary text color
- `primary`: Primary brand color
- `secondary`: Secondary brand color
- `success`: Success color
- `border`: Border color
- `shadow`: Shadow color
- `xMarker`: X player marker color
- `oMarker`: O player marker color
- `gameBoardBackground`: Game board background
- `gameBoardBorder`: Game board border

### Spacing

- `xs`: 4px
- `s`: 8px
- `m`: 16px
- `l`: 24px
- `xl`: 32px
- `xxl`: 40px
- `xxxl`: 48px

### Text Variants

- `header`: Large header text
- `title`: Title text
- `body`: Body text
- `bodySecondary`: Secondary body text
- `caption`: Caption text
- `button`: Button text
- `gameMarker`: Game marker text

## Migration from StyleSheet

The app has been migrated from React Native's StyleSheet to Restyle:

### Before

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
});

<View style={styles.container}>
```

### After

```tsx
<Box
  flex={1}
  backgroundColor="mainBackground"
  padding="l"
>
```

## Benefits

1. **Type Safety**: Full TypeScript support for theme tokens and ThemeMode enum
2. **Consistency**: Centralized design tokens
3. **Dark Mode**: Automatic dark mode support
4. **Responsive**: Built-in responsive design support
5. **Performance**: Optimized theme switching and re-renders
6. **Maintainability**: Easy to update and extend themes
7. **No Inline Styles**: Clean, maintainable code structure
8. **Settings Integration**: Dedicated settings screen for theme customization
9. **Optimized Performance**: useCallback and useMemo for optimal rendering
10. **Memory Efficient**: Proper memoization prevents unnecessary re-renders
