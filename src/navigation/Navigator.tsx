import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { GameScreen } from "../screens/GameScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useTheme } from "../hooks/useTheme";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold" as const,
  },
  safeAreaView: {
    flex: 1,
  },
});

const HEADER_TINT_COLOR = "#fff";

const HOME_OPTIONS = {
  title: "Tic Tac Toe",
  headerShown: false,
  animation: "slide_from_left" as const,
};

const GAME_OPTIONS = {
  title: "Game",
  headerShown: false,
  animation: "slide_from_right" as const,
};

const SETTINGS_OPTIONS = {
  title: "Settings",
  headerShown: false,
};

export function Navigator() {
  const { isDark } = useTheme();

  const headerStyle = useMemo(() => {
    return {
      backgroundColor: isDark ? "#1E1E1E" : "#007AFF",
    };
  }, [isDark]);

  const screenOptions = useMemo(() => {
    return {
      headerStyle,
      headerTintColor: HEADER_TINT_COLOR,
      headerTitleStyle: styles.headerTitleStyle,
    };
  }, [headerStyle]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={HOME_OPTIONS}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={GAME_OPTIONS}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={SETTINGS_OPTIONS}
        />
      </Stack.Navigator>
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationContainer>
  );
}
