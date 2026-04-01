import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GameVariant, Difficulty } from "./variant";

export type RootStackParamList = {
  Home: undefined;
  VariantSelect: undefined;
  DifficultySelect: { variant: GameVariant };
  Game: { variant: GameVariant; difficulty: Difficulty };
  Settings: undefined;
  Stats: undefined;
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export type DifficultySelectScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "DifficultySelect">;
  route: RouteProp<RootStackParamList, "DifficultySelect">;
};

export type GameScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Game">;
  route: RouteProp<RootStackParamList, "Game">;
};
