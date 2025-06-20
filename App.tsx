import { Box, ThemeProvider } from "./src/theme/ThemeProvider";
import { Navigator } from "./src/navigation/Navigator";

export default function App() {
  return (
    <ThemeProvider>
      <Box flex={1} backgroundColor="mainBackground">
        <Navigator />
      </Box>
    </ThemeProvider>
  );
}
