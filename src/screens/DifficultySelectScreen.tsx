import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { DifficultySelectScreenProps } from "../types/navigation";
import { Header, Card, SelectionCard } from "../components/ui";
import { Difficulty, DIFFICULTIES, DIFFICULTY_META, VARIANT_META } from "../types/variant";

export const DifficultySelectScreen = memo(
  ({ navigation, route }: DifficultySelectScreenProps) => {
    const { variant } = route.params;
    const variantMeta = VARIANT_META[variant];

    const handleBack = useCallback(() => {
      navigation.navigate("VariantSelect");
    }, [navigation]);

    const handleSelect = useCallback(
      (difficulty: Difficulty) => {
        navigation.navigate("Game", { variant, difficulty });
      },
      [navigation, variant]
    );

    return (
      <Box flex={1} backgroundColor="mainBackground">
        <Header
          title={variantMeta.label}
          leftIcon="←"
          onLeftPress={handleBack}
        />

        <Box flex={1} paddingHorizontal="l" paddingTop="xl">
          <Text variant="title" marginBottom="l">
            Select Difficulty
          </Text>

          <Card>
            {DIFFICULTIES.map((difficulty) => {
              const meta = DIFFICULTY_META[difficulty];
              return (
                <SelectionCard
                  key={difficulty}
                  icon={meta.icon}
                  title={meta.label}
                  onPress={() => handleSelect(difficulty)}
                />
              );
            })}
          </Card>
        </Box>
      </Box>
    );
  }
);
