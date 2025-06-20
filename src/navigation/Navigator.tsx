import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useMemo } from "react";
import { HomeScreen } from "../screens/HomeScreen";
import { GameScreen } from "../screens/GameScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useTheme } from "../hooks/useTheme";

const Stack = createStackNavigator();

export function Navigator() {
  const { isDark } = useTheme();

  const headerStyle = useMemo(() => {
    return {
      backgroundColor: isDark ? "#1E1E1E" : "#007AFF",
    };
  }, [isDark]);

  const headerTintColor = useMemo(() => {
    return "#fff";
  }, []);

  const headerTitleStyle = useMemo(() => {
    return {
      fontWeight: "bold" as const,
    };
  }, []);

  const screenOptions = useMemo(() => {
    return {
      headerStyle,
      headerTintColor,
      headerTitleStyle,
    };
  }, [headerStyle, headerTintColor, headerTitleStyle]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Tic Tac Toe",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Game",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationContainer>
  );
}
