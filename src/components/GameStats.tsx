import { memo } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { GameStats as TGameStats } from "../hooks/useGameStats";
import { Card, StatCard } from "./ui";

export const GameStats = memo(
  ({ stats, isLoading }: { stats: TGameStats; isLoading: boolean }) => {
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
  }
);
