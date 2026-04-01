import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Settings: undefined;
  Stats: undefined;
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};
