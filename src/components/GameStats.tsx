import { memo } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { useTheme } from "../hooks/useTheme";
import { useGameStats } from "../hooks/useGameStats";
import { Card, StatCard, SummaryCard, SummaryRow } from "./ui";

export const GameStats = memo(() => {
  const { stats, isLoading, totalGames, winPercentage } = useGameStats();

  if (isLoading) {
    return (
      <Card>
        <Text variant="body" color="secondaryText">
          Loading stats...
        </Text>
      </Card>
    );
  }

  return (
    <Card justifyContent="space-between" flex={1}>
      <Box flexDirection="row" justifyContent="center">
        <Text variant="title" fontSize={18}>
          Game Statistics
        </Text>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="space-around"
        marginBottom="m"
        marginTop="m"
      >
        <StatCard value={stats.wins} label="Wins" color="success" />
        <StatCard value={stats.losses} label="Losses" color="secondary" />
        <StatCard value={stats.draws} label="Draws" color="primary" />
      </Box>

      {/* Summary */}
      <SummaryCard>
        <SummaryRow label="Total Games" value={totalGames} />
        <SummaryRow
          label="Win Rate"
          value={`${winPercentage.toFixed(1)}%`}
          valueColor="success"
        />
      </SummaryCard>
    </Card>
  );
});
