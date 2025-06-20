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

const CORNER_RADIUS = 16;
const BORDER_WIDTH = 2;

export const Square: React.FC<SquareProps> = memo(
  ({ position, onPress, resident }) => {
    const { colors, spacing } = useTheme();

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
        borderColor: colors.border,
        backgroundColor: colors.gameBoardBackground,
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
        // Add subtle shadow for depth
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      };
    }, [position, colors, spacing]);

    const markerColor = useMemo(() => {
      return resident === Marker.O ? "oMarker" : "xMarker";
    }, [resident]);

    const textStyle = useMemo(
      () => ({
        fontSize: 36,
        fontWeight: "700" as const,
        textShadowColor: colors.shadow,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }),
      [colors.shadow]
    );

    const onSquarePress = useCallback(() => {
      onPress(position[0], position[1]);
    }, [onPress, position]);

    return (
      <TouchableHighlight
        style={buttonStyle}
        onPress={onSquarePress}
        activeOpacity={0.3}
        underlayColor={colors.border}
      >
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="gameBoardBackground"
        >
          {!!resident && (
            <Text variant="gameMarker" color={markerColor} style={textStyle}>
              {resident}
            </Text>
          )}
        </Box>
      </TouchableHighlight>
    );
  }
);
