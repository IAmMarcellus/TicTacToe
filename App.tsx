import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GameScreen } from "./src/screens/GameScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <GameScreen />
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
