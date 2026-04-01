import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GameVariant } from "./variant";

export type RootStackParamList = {
  Home: undefined;
  VariantSelect: undefined;
  Game: { variant: GameVariant };
  Settings: undefined;
  Stats: undefined;
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export type GameScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Game">;
  route: RouteProp<RootStackParamList, "Game">;
};
