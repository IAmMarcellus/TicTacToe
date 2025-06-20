import { ThemeProvider } from "./src/theme/ThemeProvider";
import { Navigator } from "./src/navigation/Navigator";

export default function App() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
