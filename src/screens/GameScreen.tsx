import { TouchableOpacity } from "react-native";
import { GameBoard } from "../components/GameBoard";
import { useGameState } from "../hooks/useGameState";
import { memo, useCallback } from "react";
import { NavigationProps } from "../types/navigation";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { useTheme } from "../hooks/useTheme";

export const GameScreen = memo(({ navigation }: NavigationProps) => {
  const { boardState, handleSquarePress, resetGame } = useGameState();
  const { colors } = useTheme();

  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

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
        <TouchableOpacity onPress={handleBackToHome} activeOpacity={0.7}>
          <Box
            width={40}
            height={40}
            borderRadius="round"
            backgroundColor="cardSecondaryBackground"
            borderWidth={2}
            borderColor="border"
            justifyContent="center"
            alignItems="center"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <Text color="secondaryText" fontSize={18} fontWeight="bold">
              ←
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="center"
        paddingHorizontal="xxl"
        paddingVertical="l"
      >
        <Box aspectRatio={1} width="100%" overflow="hidden">
          <GameBoard
            boardState={boardState}
            handleSquarePress={handleSquarePress}
          />
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-around"
          width="100%"
          marginTop="l"
        >
          <ThemedButton
            title="Reset Game"
            onPress={resetGame}
            variant="secondary"
          />
        </Box>
      </Box>
    </Box>
  );
});
