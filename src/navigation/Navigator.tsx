import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { GameScreen } from "../screens/GameScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useTheme } from "../hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold" as const,
  },
  safeAreaView: {
    flex: 1,
  },
});

const HEADER_TINT_COLOR = "#fff";

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
      <SafeAreaView
        style={styles.safeAreaView}
        edges={["left", "right", "bottom"]}
      >
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Tic Tac Toe",
              headerShown: false,
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: "Game",
              headerShown: false,
              animation: "slide_from_right",
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
      </SafeAreaView>
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationContainer>
  );
}
