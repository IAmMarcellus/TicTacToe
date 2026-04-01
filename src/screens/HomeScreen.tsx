import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { NavigationProps } from "../types/navigation";
import { IconButton } from "../components/ui";

export const HomeScreen = memo(({ navigation }: NavigationProps) => {
  const handleStartGame = useCallback(() => {
    navigation.navigate("Game");
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate("Settings");
  }, [navigation]);

  const handleOpenStats = useCallback(() => {
    navigation.navigate("Stats");
  }, [navigation]);

  return (
    <Box flex={1} backgroundColor="mainBackground">
      {/* Title + Buttons - full screen space-evenly */}
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        justifyContent="space-evenly"
        alignItems="center"
        paddingHorizontal="xxl"
      >
        <Text variant="headerLarge" textAlign="center">
          Tic Tac Toe
        </Text>

        <Box alignItems="stretch" width="100%" paddingHorizontal="l" gap="m">
          <ThemedButton
            title="Play"
            onPress={handleStartGame}
            size="large"
            variant="gradient"
          />
          <ThemedButton
            title="Stats"
            onPress={handleOpenStats}
            size="large"
            variant="outline"
          />
        </Box>
      </Box>

      {/* Header with Settings */}
      <Box
        width="100%"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        paddingHorizontal="xxl"
        paddingTop="xxxl"
      >
        <IconButton
          icon="⚙️"
          text="Settings"
          onPress={handleOpenSettings}
          size="medium"
        />
      </Box>

      {/* Footer */}
      <Box flex={1} />
      <Box width="100%" alignItems="center" paddingBottom="xxl">
        <Text variant="caption" textAlign="center" color="secondaryText">
          Challenge the AI in this classic game
        </Text>
      </Box>
    </Box>
  );
});
