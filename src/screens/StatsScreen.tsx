import { memo, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { useAllStats, GameStats, EMPTY_STATS, statsKey } from "../hooks/useGameStats";
import {
  Header,
  Card,
  SummaryCard,
  SummaryRow,
} from "../components/ui";
import { ThemedButton } from "../components/ThemedButton";
import {
  VARIANTS,
  VARIANT_META,
  DIFFICULTIES,
  DIFFICULTY_META,
} from "../types/variant";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

const formatRecord = (s: GameStats): string =>
  `${s.wins}W  ${s.losses}L  ${s.draws}D`;

export const StatsScreen = memo(({ navigation }: NavigationProps) => {
  const { allStats, resetStats } = useAllStats();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Box flex={1}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Statistics" leftIcon="←" onLeftPress={handleBack} />

        <Box flex={1} paddingHorizontal="l" paddingTop="xl">
          <Text variant="title" marginBottom="l">
            Game Statistics
          </Text>

          {VARIANTS.map((variant) => {
            const variantMeta = VARIANT_META[variant];
            let totalWins = 0;
            let totalLosses = 0;
            let totalDraws = 0;

            const difficultyStats = DIFFICULTIES.map((difficulty) => {
              const key = statsKey(variant, difficulty);
              const s = allStats[key] ?? EMPTY_STATS;
              totalWins += s.wins;
              totalLosses += s.losses;
              totalDraws += s.draws;
              return { difficulty, stats: s };
            });

            const totalGames = totalWins + totalLosses + totalDraws;
            const winRate =
              totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : "0.0";

            return (
              <Card key={variant} gap="s" marginBottom="l">
                <Text variant="title" fontSize={18} marginBottom="s">
                  {variantMeta.label}
                </Text>

                {difficultyStats.map(({ difficulty, stats }) => (
                  <SummaryRow
                    key={difficulty}
                    label={DIFFICULTY_META[difficulty].label}
                    value={formatRecord(stats)}
                  />
                ))}

                <SummaryCard marginTop="s">
                  <SummaryRow label="Total Games" value={totalGames} />
                  <SummaryRow
                    label="Win Rate"
                    value={`${winRate}%`}
                    valueColor="success"
                  />
                </SummaryCard>
              </Card>
            );
          })}

          <ThemedButton
            title="Reset Statistics"
            onPress={resetStats}
            variant="outline"
          />
        </Box>
      </ScrollView>
    </Box>
  );
});
