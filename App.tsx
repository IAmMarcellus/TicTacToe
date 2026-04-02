import { Box, ThemeProvider } from "./src/theme/ThemeProvider";
import { Navigator } from "./src/navigation/Navigator";
import { FallingBackground } from "./src/components/FallingBackground";

export default function App() {
  return (
    <ThemeProvider>
      <Box flex={1} backgroundColor="mainBackground">
        <FallingBackground />
        <Navigator />
      </Box>
    </ThemeProvider>
  );
}
