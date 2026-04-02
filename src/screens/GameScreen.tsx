import { GameBoard } from "../components/GameBoard";
import { GameStats } from "../components/GameStats";
import { GameResultModal } from "../components/GameResultModal";
import { useGameState } from "../hooks/useGameState";
import { memo, useCallback, useMemo } from "react";
import { GameScreenProps } from "../types/navigation";
import { Box, Text } from "../theme/ThemeProvider";
import { Marker } from "../hooks/useBoardState";
import { IconButton, Card } from "../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENT_COLORS } from "../components/ThemedButton";
import { VARIANT_CONFIGS, GameOptions } from "../types/variant";

const CARD_STYLE = { marginBottom: 20 } as const;
const styles = StyleSheet.create({ flex: { flex: 1 } });
const HEADER_GRADIENT_STYLE = { borderRadius: 16, paddingVertical: 12, paddingHorizontal: 24 } as const;
const GRADIENT_START = { x: 0, y: 0 } as const;
const GRADIENT_END = { x: 1, y: 1 } as const;

export const GameScreen = memo(({ navigation, route }: GameScreenProps) => {
  const { variant, difficulty } = route.params;
  const config = VARIANT_CONFIGS[variant];
  const options = useMemo<GameOptions>(
    () => ({ config, variant, difficulty }),
    [config, variant, difficulty]
  );
  const {
    boardState,
    currentPlayer,
    winningState,
    stats,
    isLoadingStats,
    handleSquarePress,
    resetGame,
  } = useGameState(options);

  const userSquarePress = useCallback(
    (row: number, col: number) => {
      if (currentPlayer === Marker.X) {
        handleSquarePress(row, col);
      }
    },
    [handleSquarePress, currentPlayer]
  );

  const handleBackToHome = useCallback(() => {
    navigation.goBack();
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

  const headerText = useMemo(() => {
    if (winningState) {
      return "Game Over";
    }
    return currentPlayer === Marker.X ? "Your turn" : "CPU thinking...";
  }, [winningState, currentPlayer]);

  const cardStyle = CARD_STYLE;

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.flex}>
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="l"
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
        >
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={HEADER_GRADIENT_STYLE}
        >
          <Text
            variant="title"
            fontSize={18}
            color="white"
            textAlign="center"
          >
            {headerText}
          </Text>
        </LinearGradient>

        {/* Game Board */}
        <Box aspectRatio={1} width="100%" marginBottom="xxxl" marginTop="xxxl">
          <Card variant="elevated" flex={1} style={cardStyle}>
            <GameBoard
              boardState={boardState}
              handleSquarePress={userSquarePress}
              boardSize={config.boardSize}
            />
          </Card>
        </Box>

        <GameStats stats={stats} isLoading={isLoadingStats} />
      </Box>
      </SafeAreaView>

      {/* Game Result Modal */}
      <GameResultModal
        visible={!!winningState}
        message={gameResultMessage}
        onPlayAgain={resetGame}
      />
    </Box>
  );
});
