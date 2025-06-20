import { Box, ThemeProvider } from "./src/theme/ThemeProvider";
import { Navigator } from "./src/navigation/Navigator";
import { SafeAreaView, View } from "react-native";

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <Navigator />
      </View>
    </ThemeProvider>
  );
}
