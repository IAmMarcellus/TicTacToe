import { memo, useCallback } from "react";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { NavigationProps } from "../types/navigation";
import { IconButton, Card } from "../components/ui";

export const HomeScreen = memo(({ navigation }: NavigationProps) => {
  const handleStartGame = useCallback(() => {
    navigation.navigate("Game");
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate("Settings");
  }, [navigation]);

  return (
    <Box
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="xxl"
      backgroundColor="mainBackground"
      paddingTop="xxxl"
      paddingBottom="xxl"
    >
      {/* Header with Settings */}
      <Box
        width="100%"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        marginBottom="xl"
      >
        <IconButton
          icon="⚙️"
          text="Settings"
          onPress={handleOpenSettings}
          size="medium"
        />
      </Box>

      {/* Main Content */}
      <Box flex={1} justifyContent="center" alignItems="center" width="100%">
        <Card variant="elevated" padding="xxxl" margin="none">
          <Box alignItems="center" width="100%">
            <Text variant="headerLarge" textAlign="center" marginBottom="xxxl">
              Tic Tac Toe
            </Text>

            <Box alignItems="center" width="100%" paddingHorizontal="l">
              <ThemedButton
                title="Play"
                onPress={handleStartGame}
                size="large"
                variant="gradient"
              />
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Footer */}
      <Box width="100%" alignItems="center" marginTop="xl">
        <Text variant="caption" textAlign="center" color="secondaryText">
          Challenge the AI in this classic game
        </Text>
      </Box>
    </Box>
  );
});
