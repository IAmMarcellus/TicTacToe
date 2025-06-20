import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { GameBoard } from "../components/GameBoard";
import { useGameState } from "../hooks/useGameState";
import { memo } from "react";
import { NavigationProps } from "../types/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#666666",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    color: "#666666",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  gameBoard: {
    aspectRatio: 1,
    width: "100%",
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});

export const GameScreen = memo(({ navigation }: NavigationProps) => {
  const { boardState, handleSquarePress, resetGame } = useGameState();

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.gameBoard}>
          <GameBoard
            boardState={boardState}
            handleSquarePress={handleSquarePress}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset Game" onPress={resetGame} color="#FF3B30" />
          </View>
        </View>
      </View>
    </View>
  );
});
