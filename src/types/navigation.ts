import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export type DifficultySelectScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "DifficultySelect">;
  route: RouteProp<RootStackParamList, "DifficultySelect">;
};

export type GameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Game">;
  route: RouteProp<RootStackParamList, "Game">;
};
