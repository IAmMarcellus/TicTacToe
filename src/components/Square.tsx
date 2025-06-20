import { memo, useMemo, useCallback } from "react";
import { TouchableHighlight, ViewStyle } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { HandleSquarePress } from "../hooks/useGameState";
import { Marker, Position } from "../hooks/useBoardState";
import { useTheme } from "../hooks/useTheme";

interface SquareProps {
  position: Position;
  onPress: HandleSquarePress;
  resident: Marker | null;
}
// If the first number is a 1, then add borders on the sides
// If the second number is a 1, then add borders on the top and bottom

const CORNER_RADIUS = 20;
const BORDER_WIDTH = 4;

export const Square: React.FC<SquareProps> = memo(
  ({ position, onPress, resident }) => {
    const { colors } = useTheme();

    const buttonStyle = useMemo((): ViewStyle => {
      // Determine corner radius based on position
      const corner = () => {
        if (position[0] === 0 && position[1] === 0) {
          return { borderTopLeftRadius: CORNER_RADIUS };
        } else if (position[0] === 0 && position[1] === 2) {
          return { borderTopRightRadius: CORNER_RADIUS };
        } else if (position[0] === 2 && position[1] === 0) {
          return { borderBottomLeftRadius: CORNER_RADIUS };
        } else if (position[0] === 2 && position[1] === 2) {
          return { borderBottomRightRadius: CORNER_RADIUS };
        }
        return {};
      };

      return {
        flex: 1,
        borderColor: colors.gameBoardBorder,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        ...corner(),
        // Add grid lines for the tic tac toe board based on position
        ...(position[0] === 1 && {
          borderBottomWidth: BORDER_WIDTH,
          borderTopWidth: BORDER_WIDTH,
        }),
        ...(position[1] === 1 && {
          borderLeftWidth: BORDER_WIDTH,
          borderRightWidth: BORDER_WIDTH,
        }),
      };
    }, [position, colors.gameBoardBorder]);

    const markerColor = useMemo(() => {
      return resident === Marker.O ? "oMarker" : "xMarker";
    }, [resident]);

    const onSquarePress = useCallback(() => {
      onPress(position[0], position[1]);
    }, [onPress, position]);

    return (
      <TouchableHighlight
        style={buttonStyle}
        onPress={onSquarePress}
        activeOpacity={0.2}
        underlayColor={colors.border}
      >
        <Box>
          {!!resident && (
            <Text variant="gameMarker" color={markerColor}>
              {resident}
            </Text>
          )}
        </Box>
      </TouchableHighlight>
    );
  }
);
