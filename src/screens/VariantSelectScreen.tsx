import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { Header, Card, SelectionCard } from "../components/ui";
import { GameVariant, VARIANT_META } from "../types/variant";

const VARIANTS: GameVariant[] = ["classic", "4x4", "misere", "fogOfWar"];

export const VariantSelectScreen = memo(({ navigation }: NavigationProps) => {
  const handleBack = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleSelect = useCallback(
    (variant: GameVariant) => {
      navigation.navigate("Game", { variant });
    },
    [navigation]
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header title="Select Mode" leftIcon="←" onLeftPress={handleBack} />

      <Box flex={1} paddingHorizontal="l" paddingTop="xl">
        <Text variant="title" marginBottom="l">
          Game Modes
        </Text>

        <Card>
          {VARIANTS.map((variant) => {
            const meta = VARIANT_META[variant];
            return (
              <SelectionCard
                key={variant}
                icon={meta.icon}
                title={meta.label}
                onPress={() => handleSelect(variant)}
              />
            );
          })}
        </Card>
      </Box>
    </Box>
  );
});
