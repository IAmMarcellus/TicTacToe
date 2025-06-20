import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { ThemedButton } from "../components/ThemedButton";
import { ThemeToggle } from "../components/ThemeToggle";
import { NavigationProps } from "../types/navigation";

export const HomeScreen = memo(({ navigation }: NavigationProps) => {
  const handleStartGame = useCallback(() => {
    navigation.navigate("Game");
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate("Settings");
  }, [navigation]);

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingHorizontal="xxl"
      backgroundColor="mainBackground"
    >
      <Box
        position="absolute"
        top={50}
        right={24}
        flexDirection="row"
        alignItems="center"
      >
        <TouchableOpacity onPress={handleOpenSettings} activeOpacity={0.7}>
          <Box
            width={40}
            height={40}
            borderRadius="round"
            justifyContent="center"
            alignItems="center"
            marginRight="m"
          >
            <Text fontSize={20} color="primaryText">
              ⚙️
            </Text>
          </Box>
        </TouchableOpacity>
        <ThemeToggle />
      </Box>

      <Text variant="header" textAlign="center" marginBottom="l">
        Tic Tac Toe
      </Text>
      <Text
        variant="bodySecondary"
        textAlign="center"
        marginBottom="xxl"
        lineHeight={24}
      >
        Challenge yourself or play against the computer in this classic game of
        strategy and skill.
      </Text>
      <ThemedButton title="Start Game" onPress={handleStartGame} size="large" />
    </Box>
  );
});
