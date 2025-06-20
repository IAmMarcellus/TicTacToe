import { memo } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { useTheme } from "../hooks/useTheme";
import { useGameStats } from "../hooks/useGameStats";
import { Card, StatCard, SummaryCard, SummaryRow } from "./ui";

export const GameStats = memo(() => {
  const { stats, isLoading, totalGames, winPercentage } = useGameStats();

  if (isLoading) {
    return (
      <Card variant="elevated" padding="l">
        <Text variant="body" color="secondaryText" textAlign="center">
          Loading stats...
        </Text>
      </Card>
    );
  }

  return (
    <Box flex={1} marginBottom="l" width="100%">
      <Box alignItems="center" marginBottom="s">
        <Text
          variant="title"
          fontSize={20}
          fontWeight="600"
          color="primaryText"
        >
          Game Statistics
        </Text>
      </Box>

      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginBottom="l"
        width="100%"
      >
        <StatCard value={stats.wins} label="Wins" color="success" />
        <StatCard value={stats.losses} label="Losses" color="secondary" />
        <StatCard value={stats.draws} label="Ties" color="primary" />
      </Box>
    </Box>
  );
});
