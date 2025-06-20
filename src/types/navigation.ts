import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Settings: undefined;
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};
