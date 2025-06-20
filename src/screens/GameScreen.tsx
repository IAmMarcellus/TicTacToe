import { GameBoard } from "../components/GameBoard";
import { GameStats } from "../components/GameStats";
import { GameResultModal } from "../components/GameResultModal";
import { useGameState } from "../hooks/useGameState";
import { memo, useCallback } from "react";
import { NavigationProps } from "../types/navigation";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { useTheme } from "../hooks/useTheme";
import { Marker } from "../hooks/useBoardState";
import { IconButton, Card } from "../components/ui";

export const GameScreen = memo(({ navigation }: NavigationProps) => {
  const { boardState, currentPlayer, gameEnded, handleSquarePress, resetGame } =
    useGameState();
  const { colors } = useTheme();

  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const getGameResultMessage = useCallback(() => {
    if (!gameEnded) return "";

    const winner = boardState.flat().find((marker) => marker !== null);
    if (winner === Marker.X) {
      return "You Win! 🎉";
    } else if (winner === Marker.O) {
      return "CPU Wins! 🤖";
    } else {
      return "It's a Draw! 🤝";
    }
  }, [gameEnded, boardState]);

  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

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
          onPress={handleBackToHome}
          size="medium"
          variant="filled"
        />
      </Box>

      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="center"
        paddingHorizontal="xxl"
        paddingVertical="l"
        paddingTop="xxxl"
      >
        {/* Game Status (only show during active game) */}
        {!gameEnded && (
          <Card>
            <Text
              variant="title"
              fontSize={18}
              color="primaryText"
              textAlign="center"
            >
              {currentPlayer === Marker.X ? "Your turn" : "CPU thinking..."}
            </Text>
          </Card>
        )}

        {/* Game Board */}
        <Box aspectRatio={1} width="100%" overflow="hidden" marginBottom="l">
          <GameBoard
            boardState={boardState}
            handleSquarePress={handleSquarePress}
          />
        </Box>

        {/* Game Statistics */}
        <GameStats />

        {/* Reset Button */}
        <Box
          flexDirection="row"
          justifyContent="space-around"
          width="100%"
          marginTop="l"
        >
          <ThemedButton
            title="New Game"
            onPress={resetGame}
            variant="secondary"
          />
        </Box>
      </Box>

      {/* Game Result Modal */}
      <GameResultModal
        visible={gameEnded}
        message={getGameResultMessage()}
        onPlayAgain={handlePlayAgain}
      />
    </Box>
  );
});
