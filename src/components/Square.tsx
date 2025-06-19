import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

interface SquareProps {
  position: [0 | 1 | 2, 0 | 1 | 2];
  onPress: () => void;
  resident?: string;
}
// If the first number is a 1, then add borders on the sides
// If the second number is a 1, then add borders on the top and bottom

const styles = StyleSheet.create({
  square: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  residentText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
});

const Square: React.FC<SquareProps> = ({ position, onPress, resident }) => {
  return (
    <TouchableOpacity
      style={styles.square}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {resident && <Text style={styles.residentText}>{resident}</Text>}
    </TouchableOpacity>
  );
};

export default Square;
