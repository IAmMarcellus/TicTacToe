import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { NavigationProps } from "../types/navigation";
import { IconButton } from "../components/ui";
import { ThemedButton } from "../components/ThemedButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameVariant, VARIANTS, VARIANT_META } from "../types/variant";

export const VariantSelectScreen = memo(({ navigation }: NavigationProps) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelect = useCallback(
    (variant: GameVariant) => {
      navigation.navigate("DifficultySelect", { variant });
    },
    [navigation]
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="l"
          paddingBottom="l"
        >
          <IconButton
            icon="←"
            onPress={handleBack}
            size="medium"
            variant="filled"
          />
        </Box>

        <Box flex={1} paddingHorizontal="l">
          <Text variant="title" marginBottom="l" textAlign="center">
            Game Modes
          </Text>

          <Box gap="m">
            {VARIANTS.map((variant) => {
              const meta = VARIANT_META[variant];
              return (
                <ThemedButton
                  key={variant}
                  title={meta.label}
                  onPress={() => handleSelect(variant)}
                  size="large"
                  variant="gradient-outline"
                />
              );
            })}
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  );
});
