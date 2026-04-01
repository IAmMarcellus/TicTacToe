import { memo, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { useGameStats } from "../hooks/useGameStats";
import {
  Header,
  Card,
  StatCard,
  SummaryCard,
  SummaryRow,
} from "../components/ui";
import { ThemedButton } from "../components/ThemedButton";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

export const StatsScreen = memo(({ navigation }: NavigationProps) => {
  const { stats, resetStats, totalGames, winPercentage } = useGameStats();

  const handleBack = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleResetStats = useCallback(async () => {
    await resetStats();
  }, [resetStats]);

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Statistics" leftIcon="←" onLeftPress={handleBack} />

        <Box flex={1} paddingHorizontal="l" paddingTop="xl">
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

              <SummaryCard marginBottom="l">
                <SummaryRow label="Total Games" value={totalGames} />
                <SummaryRow
                  label="Win Rate"
                  value={`${winPercentage.toFixed(1)}%`}
                  valueColor="success"
                />
              </SummaryCard>

              <ThemedButton
                title="Reset Statistics"
                onPress={handleResetStats}
                variant="outline"
              />
            </Card>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
});
