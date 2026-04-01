import { memo, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { useTheme, ThemeMode } from "../hooks/useTheme";
import {
  Header,
  Card,
  SelectionCard,
} from "../components/ui";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

export const SettingsScreen = memo(({ navigation }: NavigationProps) => {
  const { themeMode, setThemeMode } = useTheme();
  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleLightTheme = useCallback(
    () => setThemeMode(ThemeMode.LIGHT),
    [setThemeMode]
  );

  const handleDarkTheme = useCallback(
    () => setThemeMode(ThemeMode.DARK),
    [setThemeMode]
  );

  const handleSystemTheme = useCallback(
    () => setThemeMode(ThemeMode.SYSTEM),
    [setThemeMode]
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Settings" leftIcon="←" onLeftPress={handleBackToHome} />

        <Box flex={1} paddingHorizontal="l" paddingTop="xl">
          <Box marginBottom="xxl">
            <Text variant="title" marginBottom="l">
              Appearance
            </Text>

            <Card>
              <Text variant="body" marginBottom="m" color="secondaryText">
                Choose your preferred theme
              </Text>

              <Box>
                <SelectionCard
                  icon="☀️"
                  title="Light"
                  isSelected={themeMode === ThemeMode.LIGHT}
                  onPress={handleLightTheme}
                />

                <SelectionCard
                  icon="🌙"
                  title="Dark"
                  isSelected={themeMode === ThemeMode.DARK}
                  onPress={handleDarkTheme}
                />

                <SelectionCard
                  icon="⚙️"
                  title="System"
                  isSelected={themeMode === ThemeMode.SYSTEM}
                  onPress={handleSystemTheme}
                  marginBottom="s"
                />
              </Box>
            </Card>
          </Box>

        </Box>
      </ScrollView>
    </Box>
  );
});
