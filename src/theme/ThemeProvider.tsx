import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ThemeProvider as RestyleThemeProvider,
  createBox,
  createText,
} from "@shopify/restyle";
import { lightTheme, darkTheme, Theme } from "./theme";

enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@tictactoe_theme_mode";

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.SYSTEM);
  const [isLoaded, setIsLoaded] = useState(false);

  const isDark =
    themeMode === ThemeMode.DARK ||
    (themeMode === ThemeMode.SYSTEM && systemColorScheme === "dark");

  // Select the appropriate theme based on current mode
  const currentTheme = isDark ? darkTheme : lightTheme;

  // Load saved theme mode from storage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (
          savedThemeMode &&
          Object.values(ThemeMode).includes(savedThemeMode as ThemeMode)
        ) {
          setThemeMode(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.warn("Failed to load theme mode:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemeMode();
  }, []);

  // Save theme mode to storage
  const handleSetThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeMode(mode);
    } catch (error) {
      console.warn("Failed to save theme mode:", error);
    }
  };

  if (!isLoaded) {
    // You could show a loading screen here
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode: handleSetThemeMode,
        isDark,
      }}
    >
      <RestyleThemeProvider theme={currentTheme}>
        {children}
      </RestyleThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeMode };
