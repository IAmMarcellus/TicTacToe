import { GameBoard } from "../components/GameBoard";
import { GameStats } from "../components/GameStats";
import { GameResultModal } from "../components/GameResultModal";
import { useGameState } from "../hooks/useGameState";
import { memo, useCallback, useMemo } from "react";
import { NavigationProps } from "../types/navigation";
import { Box, Text } from "../theme/ThemeProvider";
import { Marker } from "../hooks/useBoardState";
import { IconButton, Card } from "../components/ui";

export const GameScreen = memo(({ navigation }: NavigationProps) => {
  const {
    boardState,
    currentPlayer,
    winningState,
    stats,
    isLoadingStats,
    handleSquarePress,
    resetGame,
  } = useGameState();

  const userSquarePress = useCallback(
    (row: number, col: number) => {
      if (currentPlayer === Marker.X) {
        handleSquarePress(row, col);
      }
    },
    [handleSquarePress, currentPlayer]
  );

  const handleBackToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const gameResultMessage = useMemo(() => {
    if (!winningState) return "";

    if (winningState === "win") {
      return "You Win! 🎉";
    } else if (winningState === "loss") {
      return "CPU Wins! 🤖";
    } else {
      return "It's a Draw! 🤝";
    }
  }, [winningState]);

  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const headerText = useMemo(() => {
    if (winningState) {
      return "Game Over";
    }
    return currentPlayer === Marker.X ? "Your turn" : "CPU thinking...";
  }, [winningState, currentPlayer]);

  const cardStyle = useMemo(() => ({ marginBottom: 20 }), []);

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
        justifyContent="space-around"
        alignItems="center"
        paddingHorizontal="l"
        paddingVertical="l"
        paddingTop="xxxl"
      >
        <Card>
          <Text
            variant="title"
            fontSize={18}
            color="primaryText"
            textAlign="center"
          >
            {headerText}
          </Text>
        </Card>

        {/* Game Board */}
        <Box aspectRatio={1} width="100%" marginBottom="xxxl" marginTop="xxxl">
          <Card variant="elevated" flex={1} style={cardStyle}>
            <GameBoard
              boardState={boardState}
              handleSquarePress={userSquarePress}
            />
          </Card>
        </Box>

        {/* Game Statistics */}
        <GameStats stats={stats} isLoading={isLoadingStats} />
      </Box>

      {/* Game Result Modal */}
      <GameResultModal
        visible={!!winningState}
        message={gameResultMessage}
        onPlayAgain={handlePlayAgain}
      />
    </Box>
  );
});
