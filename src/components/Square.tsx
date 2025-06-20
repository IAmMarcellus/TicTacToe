import { memo, FC, useMemo, useCallback } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { StyleSheet } from "react-native";
import { HandleSquarePress } from "../hooks/useGameState";
import { Marker, Position } from "../hooks/useBoardState";

interface SquareProps {
  position: Position;
  onPress: HandleSquarePress;
  resident: Marker | null;
}
// If the first number is a 1, then add borders on the sides
// If the second number is a 1, then add borders on the top and bottom

const CORNER_RADIUS = 20;
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  square: {
    flex: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalBorder: {
    borderBottomWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },
  verticalBorder: {
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
  },
  topLeftCorner: {
    borderTopLeftRadius: CORNER_RADIUS,
  },
  topRightCorner: {
    borderTopRightRadius: CORNER_RADIUS,
  },
  bottomLeftCorner: {
    borderBottomLeftRadius: CORNER_RADIUS,
  },
  bottomRightCorner: {
    borderBottomRightRadius: CORNER_RADIUS,
  },
  residentText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
});

export const Square: FC<SquareProps> = memo(
  ({ position, onPress, resident }) => {
    const buttonStyle = useMemo(() => {
      // Determine corner radius based on position
      const corner = () => {
        if (position[0] === 0 && position[1] === 0) {
          return styles.topLeftCorner;
        } else if (position[0] === 0 && position[1] === 2) {
          return styles.topRightCorner;
        } else if (position[0] === 2 && position[1] === 0) {
          return styles.bottomLeftCorner;
        } else if (position[0] === 2 && position[1] === 2) {
          return styles.bottomRightCorner;
        }
      };

      return {
        ...styles.square,
        ...corner(),
        // Add grid lines for the tic tac toe board based on position
        ...(position[0] === 1 && styles.horizontalBorder),
        ...(position[1] === 1 && styles.verticalBorder),
      };
    }, [position]);

    const markerStyle = useMemo(() => {
      return {
        ...styles.residentText,
        color: resident === Marker.O ? "red" : "blue",
      };
    }, [resident]);

    const onSquarePress = useCallback(() => {
      onPress(position[0], position[1]);
    }, [onPress, position]);

    return (
      <TouchableHighlight
        style={buttonStyle}
        onPress={onSquarePress}
        activeOpacity={0.2}
        underlayColor="#DDDDDD"
      >
        <View>{!!resident && <Text style={markerStyle}>{resident}</Text>}</View>
      </TouchableHighlight>
    );
  }
);
