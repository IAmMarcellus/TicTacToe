import { Button, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { NavigationProps } from "../types/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export const HomeScreen = memo(({ navigation }: NavigationProps) => {
  const handleStartGame = () => {
    navigation.navigate("Game");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.subtitle}>
        Challenge yourself or play against the computer in this classic game of
        strategy and skill.
      </Text>
      <Button title="Start Game" onPress={handleStartGame} color="#007AFF" />
    </View>
  );
});
