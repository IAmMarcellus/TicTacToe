import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { DifficultySelectScreenProps } from "../types/navigation";
import { IconButton } from "../components/ui";
import { ThemedButton } from "../components/ThemedButton";
import { Difficulty, DIFFICULTIES, DIFFICULTY_META } from "../types/variant";

export const DifficultySelectScreen = memo(
  ({ navigation, route }: DifficultySelectScreenProps) => {
    const { variant } = route.params;

    const handleBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const handleSelect = useCallback(
      (difficulty: Difficulty) => {
        navigation.navigate("Game", { variant, difficulty });
      },
      [navigation, variant]
    );

    return (
      <Box flex={1} backgroundColor="mainBackground">
        <Box
          position="absolute"
          top={0}
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="l"
          paddingTop="xxxl"
          paddingBottom="l"
        >
          <IconButton
            icon="←"
            onPress={handleBack}
            size="medium"
            variant="filled"
          />
        </Box>

        <Box flex={1} paddingHorizontal="l" paddingTop="xxxl">
          <Box height={40} />
          <Text variant="title" marginBottom="l" textAlign="center">
            Select Difficulty
          </Text>

          <Box gap="m">
            {DIFFICULTIES.map((difficulty) => {
              const meta = DIFFICULTY_META[difficulty];
              return (
                <ThemedButton
                  key={difficulty}
                  title={meta.label}
                  onPress={() => handleSelect(difficulty)}
                  size="large"
                  variant="gradient-outline"
                  textColor={meta.color}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }
);
