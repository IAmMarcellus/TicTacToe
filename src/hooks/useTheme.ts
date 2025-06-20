import { useTheme as useRestyleTheme } from "@shopify/restyle";
import { useTheme as useAppTheme, ThemeMode } from "../theme/ThemeProvider";
import { Theme } from "../theme/theme";

export const useTheme = () => {
  const restyleTheme = useRestyleTheme<Theme>();
  const appTheme = useAppTheme();

  return {
    ...restyleTheme,
    ...appTheme,
  };
};

export { ThemeMode };
