import { memo, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { useTheme, ThemeMode } from "../hooks/useTheme";
import { useGameStats } from "../hooks/useGameStats";
import {
  Header,
  Card,
  SelectionCard,
  StatCard,
  SummaryCard,
  SummaryRow,
} from "../components/ui";
import { ThemedButton } from "../components/ThemedButton";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export const SettingsScreen = memo(({ navigation }: NavigationProps) => {
  const { themeMode, setThemeMode, isDark } = useTheme();
  const { stats, resetStats, totalGames, winPercentage } = useGameStats();

  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleThemeChange = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
    },
    [setThemeMode]
  );

  const handleResetStats = useCallback(async () => {
    await resetStats();
  }, [resetStats]);

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: 40,
      backgroundColor: isDark ? "#121212" : "#FFFFFF",
    }),
    [isDark]
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={contentContainerStyle}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Box flex={1} backgroundColor="mainBackground">
        {/* Header */}
        <Header title="Settings" leftIcon="←" onLeftPress={handleBackToHome} />

        {/* Content */}
        <Box flex={1} paddingHorizontal="l" paddingTop="xl">
          {/* Theme Section */}
          <Box marginBottom="xxl">
            <Text variant="title" marginBottom="l">
              Appearance
            </Text>

            <Card>
              <Text variant="body" marginBottom="m" color="secondaryText">
                Choose your preferred theme
              </Text>

              {/* Theme Options */}
              <Box>
                <SelectionCard
                  icon="☀️"
                  title="Light"
                  isSelected={themeMode === ThemeMode.LIGHT}
                  onPress={() => handleThemeChange(ThemeMode.LIGHT)}
                />

                <SelectionCard
                  icon="🌙"
                  title="Dark"
                  isSelected={themeMode === ThemeMode.DARK}
                  onPress={() => handleThemeChange(ThemeMode.DARK)}
                />

                <SelectionCard
                  icon="⚙️"
                  title="System"
                  isSelected={themeMode === ThemeMode.SYSTEM}
                  onPress={() => handleThemeChange(ThemeMode.SYSTEM)}
                  marginBottom="s"
                />
              </Box>
            </Card>
          </Box>

          {/* Game Statistics Section */}
          <Box marginBottom="xxl">
            <Text variant="title" marginBottom="l">
              Game Statistics
            </Text>

            <Card gap="l">
              <Box flexDirection="row" justifyContent="space-around">
                <StatCard value={stats.wins} label="Wins" color="success" />
                <StatCard
                  value={stats.losses}
                  label="Losses"
                  color="secondary"
                />
                <StatCard value={stats.draws} label="Draws" color="primary" />
              </Box>

              {/* Summary */}
              <SummaryCard marginBottom="l">
                <SummaryRow label="Total Games" value={totalGames} />
                <SummaryRow
                  label="Win Rate"
                  value={`${winPercentage.toFixed(1)}%`}
                  valueColor="success"
                />
              </SummaryCard>

              {/* Reset Stats Button */}
              <ThemedButton
                title="Reset Statistics"
                onPress={handleResetStats}
                variant="outline"
              />
            </Card>
          </Box>

          {/* About Section */}
          <Box>
            <Text variant="title" marginBottom="l">
              About
            </Text>
            <Card>
              <Text variant="bodySecondary" lineHeight={24}>
                TicTacToe is a classic strategy game with modern theming
                support. Choose your preferred appearance and enjoy the game!
              </Text>
            </Card>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
});
