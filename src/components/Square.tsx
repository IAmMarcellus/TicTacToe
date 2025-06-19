import { memo, FC, useMemo } from "react";
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
    flex: 1,
    borderColor: "#fff000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  horizontalBorder: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  verticalBorder: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  residentText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
});

export const Square: FC<SquareProps> = memo(
  ({ position, onPress, resident }) => {
    const style = useMemo(() => {
      return {
        ...styles.square,
        ...(position[0] === 1 && styles.horizontalBorder),
        ...(position[1] === 1 && styles.verticalBorder),
      };
    }, [position]);

    return (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.7}>
        {resident && <Text style={styles.residentText}>{resident}</Text>}
      </TouchableOpacity>
    );
  }
);
