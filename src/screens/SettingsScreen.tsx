import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { ThemeToggle } from "../components/ThemeToggle";
import { NavigationProps } from "../types/navigation";
import { useTheme, ThemeMode } from "../hooks/useTheme";

export const SettingsScreen = memo(({ navigation }: NavigationProps) => {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleThemeChange = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
    },
    [setThemeMode]
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      {/* Header */}
      <Box
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="l"
        paddingTop="xxxl"
        paddingBottom="l"
        borderBottomWidth={1}
        borderBottomColor="border"
      >
        <TouchableOpacity onPress={handleBackToHome} activeOpacity={0.7}>
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
        <Text variant="title" marginLeft="m">
          Settings
        </Text>
      </Box>

      {/* Content */}
      <Box flex={1} paddingHorizontal="l" paddingTop="xl">
        {/* Theme Section */}
        <Box marginBottom="xxl">
          <Text variant="title" marginBottom="l">
            Appearance
          </Text>

          <Box
            backgroundColor="cardPrimaryBackground"
            borderRadius="l"
            padding="l"
            marginBottom="m"
          >
            <Text variant="body" marginBottom="m" color="secondaryText">
              Choose your preferred theme
            </Text>

            {/* Theme Options */}
            <Box>
              {/* Light Theme Option */}
              <TouchableOpacity
                onPress={() => handleThemeChange(ThemeMode.LIGHT)}
                activeOpacity={0.7}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  paddingVertical="m"
                  paddingHorizontal="l"
                  borderRadius="m"
                  backgroundColor={
                    themeMode === ThemeMode.LIGHT
                      ? "primary"
                      : "cardPrimaryBackground"
                  }
                  opacity={themeMode === ThemeMode.LIGHT ? 0.1 : 1}
                  marginBottom="s"
                >
                  <Text fontSize={20} marginRight="m">
                    ☀️
                  </Text>
                  <Text variant="body" flex={1}>
                    Light
                  </Text>
                  {themeMode === ThemeMode.LIGHT && (
                    <Text fontSize={16} color="primary">
                      ✓
                    </Text>
                  )}
                </Box>
              </TouchableOpacity>

              {/* Dark Theme Option */}
              <TouchableOpacity
                onPress={() => handleThemeChange(ThemeMode.DARK)}
                activeOpacity={0.7}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  paddingVertical="m"
                  paddingHorizontal="l"
                  borderRadius="m"
                  backgroundColor={
                    themeMode === ThemeMode.DARK
                      ? "primary"
                      : "cardPrimaryBackground"
                  }
                  opacity={themeMode === ThemeMode.DARK ? 0.1 : 1}
                  marginBottom="s"
                >
                  <Text fontSize={20} marginRight="m">
                    🌙
                  </Text>
                  <Text variant="body" flex={1}>
                    Dark
                  </Text>
                  {themeMode === ThemeMode.DARK && (
                    <Text fontSize={16} color="primary">
                      ✓
                    </Text>
                  )}
                </Box>
              </TouchableOpacity>

              {/* System Theme Option */}
              <TouchableOpacity
                onPress={() => handleThemeChange(ThemeMode.SYSTEM)}
                activeOpacity={0.7}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  paddingVertical="m"
                  paddingHorizontal="l"
                  borderRadius="m"
                  backgroundColor={
                    themeMode === ThemeMode.SYSTEM
                      ? "primary"
                      : "cardPrimaryBackground"
                  }
                  opacity={themeMode === ThemeMode.SYSTEM ? 0.1 : 1}
                >
                  <Text fontSize={20} marginRight="m">
                    ⚙️
                  </Text>
                  <Text variant="body" flex={1}>
                    System
                  </Text>
                  {themeMode === ThemeMode.SYSTEM && (
                    <Text fontSize={16} color="primary">
                      ✓
                    </Text>
                  )}
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>

          {/* Current Theme Info */}
          <Box
            backgroundColor="cardSecondaryBackground"
            borderRadius="m"
            padding="m"
            borderWidth={1}
            borderColor="border"
          >
            <Text variant="caption" color="secondaryText" marginBottom="s">
              Current Theme
            </Text>
            <Text variant="body">
              {themeMode === ThemeMode.LIGHT && "Light Mode"}
              {themeMode === ThemeMode.DARK && "Dark Mode"}
              {themeMode === ThemeMode.SYSTEM &&
                `System Mode (${isDark ? "Dark" : "Light"})`}
            </Text>
          </Box>
        </Box>

        {/* Quick Theme Toggle */}
        <Box marginBottom="xxl">
          <Text variant="title" marginBottom="l">
            Quick Toggle
          </Text>
          <Box alignItems="center">
            <ThemeToggle />
          </Box>
        </Box>

        {/* About Section */}
        <Box>
          <Text variant="title" marginBottom="l">
            About
          </Text>
          <Box
            backgroundColor="cardPrimaryBackground"
            borderRadius="l"
            padding="l"
          >
            <Text variant="bodySecondary" lineHeight={24}>
              TicTacToe is a classic strategy game with modern theming support.
              Choose your preferred appearance and enjoy the game!
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
