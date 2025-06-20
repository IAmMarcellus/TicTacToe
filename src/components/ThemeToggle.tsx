import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { useTheme, ThemeMode } from "../hooks/useTheme";

export const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const cycleTheme = useCallback(() => {
    const themes: ThemeMode[] = [
      ThemeMode.LIGHT,
      ThemeMode.DARK,
      ThemeMode.SYSTEM,
    ];
    const currentIndex = themes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeMode(themes[nextIndex]);
  }, [themeMode, setThemeMode]);

  const getThemeIcon = useCallback(() => {
    switch (themeMode) {
      case ThemeMode.LIGHT:
        return "☀️";
      case ThemeMode.DARK:
        return "🌙";
      case ThemeMode.SYSTEM:
        return "⚙️";
      default:
        return "⚙️";
    }
  }, [themeMode]);

  const getThemeLabel = useCallback(() => {
    switch (themeMode) {
      case ThemeMode.LIGHT:
        return "Light";
      case ThemeMode.DARK:
        return "Dark";
      case ThemeMode.SYSTEM:
        return "Auto";
      default:
        return "Auto";
    }
  }, [themeMode]);

  return (
    <TouchableOpacity onPress={cycleTheme} activeOpacity={0.7}>
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="cardSecondaryBackground"
        paddingHorizontal="m"
        paddingVertical="s"
        borderRadius="m"
        borderWidth={1}
        borderColor="border"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.2}
        shadowRadius={2}
        elevation={2}
      >
        <Text fontSize={16} marginRight="s">
          {getThemeIcon()}
        </Text>
        <Text variant="caption" color="secondaryText">
          {getThemeLabel()}
        </Text>
        {isDark && (
          <Box
            width={8}
            height={8}
            borderRadius="round"
            backgroundColor="primary"
            marginLeft="s"
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};
