# UI Component Library

This directory contains reusable UI components that provide consistent styling and behavior across the TicTacToe app.

## Components

### IconButton

A customizable icon button with different sizes and variants.

```tsx
import { IconButton } from "../components/ui";

<IconButton
  icon="←"
  onPress={handleBack}
  size="medium" // "small" | "medium" | "large"
  variant="filled" // "default" | "outlined" | "filled"
/>;
```

### Card

A consistent card container with different variants and padding options.

```tsx
import { Card } from "../components/ui";

<Card variant="primary" padding="l" margin="m">
  <Text>Card content</Text>
</Card>;
```

### SelectionCard

A selectable card component with icon, title, and selection state.

```tsx
import { SelectionCard } from "../components/ui";

<SelectionCard
  icon="☀️"
  title="Light Theme"
  isSelected={themeMode === ThemeMode.LIGHT}
  onPress={() => setThemeMode(ThemeMode.LIGHT)}
/>;
```

### StatCard

A component for displaying statistics with consistent styling.

```tsx
import { StatCard } from "../components/ui";

<StatCard
  value={42}
  label="Wins"
  color="success" // "primary" | "secondary" | "success" | "default"
/>;
```

### Header

A consistent header component with optional left and right icons.

```tsx
import { Header } from "../components/ui";

<Header
  title="Settings"
  leftIcon="←"
  rightIcon="⚙️"
  onLeftPress={handleBack}
  onRightPress={handleSettings}
  showBorder={true}
/>;
```

### ModalOverlay

A reusable modal background overlay.

```tsx
import { ModalOverlay } from "../components/ui";

<ModalOverlay>
  <Box>Modal content</Box>
</ModalOverlay>;
```

### SummaryCard & SummaryRow

Components for displaying summary information with key-value pairs.

```tsx
import { SummaryCard, SummaryRow } from "../components/ui";

<SummaryCard>
  <SummaryRow label="Total Games" value={100} />
  <SummaryRow label="Win Rate" value="65.5%" valueColor="success" />
</SummaryCard>;
```

## Benefits

1. **Consistency**: All UI elements follow the same design patterns
2. **Reusability**: Components can be used across different screens
3. **Maintainability**: Changes to styling are centralized
4. **Type Safety**: Full TypeScript support for all props
5. **Theme Integration**: All components work with the app's theming system
6. **Performance**: Optimized with proper memoization

## Usage Guidelines

1. **Import from index**: Always import components from the index file

   ```tsx
   import { Card, IconButton } from "../components/ui";
   ```

2. **Use semantic props**: Use descriptive prop names that match the component's purpose

   ```tsx
   // Good
   <StatCard value={wins} label="Wins" color="success" />

   // Avoid
   <StatCard value={wins} text="Wins" style={{ color: 'green' }} />
   ```

3. **Leverage variants**: Use built-in variants instead of custom styling

   ```tsx
   // Good
   <Card variant="secondary" padding="m" />

   // Avoid
   <Box backgroundColor="cardSecondaryBackground" padding="m" />
   ```

4. **Consistent spacing**: Use the spacing tokens from the theme

   ```tsx
   // Good
   <Card margin="l" padding="xl" />

   // Avoid
   <Card style={{ margin: 24, padding: 32 }} />
   ```

## Migration from Individual Styling

Before:

```tsx
<TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
  <Box
    width={40}
    height={40}
    borderRadius="round"
    justifyContent="center"
    alignItems="center"
  >
    <Text fontSize={24} color="primaryText">
      ←
    </Text>
  </Box>
</TouchableOpacity>
```

After:

```tsx
<IconButton icon="←" onPress={handleBack} size="medium" />
```

This approach reduces code duplication, improves consistency, and makes the codebase more maintainable.
