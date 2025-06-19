import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import GameBoard from "./src/components/GameBoard";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gameBoard}>
        <GameBoard />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameBoard: {
    width: 300,
    height: 300,
    overflow: "hidden",
  },
});
