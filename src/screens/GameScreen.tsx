import { Button, StyleSheet, View } from "react-native";
import GameBoard from "../components/GameBoard";
import useGameState from "../hooks/useGameState";
import { memo } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  gameBoard: {
    aspectRatio: 1,
    width: "100%",
    overflow: "hidden",
  },
});

export const GameScreen = memo(() => {
  const { boardState, handleSquarePress, resetGame } = useGameState();

  return (
    <View style={styles.container}>
      <View style={styles.gameBoard}>
        <GameBoard
          boardState={boardState}
          handleSquarePress={handleSquarePress}
        />
      </View>
      <Button title="Reset Game" onPress={resetGame} />
    </View>
  );
});
