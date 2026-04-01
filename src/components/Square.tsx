import { memo, useMemo, useCallback } from "react";
import { Pressable, ViewStyle } from "react-native";
import { Box, Text } from "../theme/ThemeProvider";
import { HandleSquarePress } from "../hooks/useGameState";
import { Marker, Position } from "../hooks/useBoardState";
import { useTheme } from "../hooks/useTheme";

interface SquareProps {
  position: Position;
  onPress: HandleSquarePress;
  resident: Marker | null;
  boardSize: number;
}

const CORNER_RADIUS = 16;
const BORDER_WIDTH = 2;

export const Square: React.FC<SquareProps> = memo(
  ({ position, onPress, resident, boardSize }) => {
    const { colors } = useTheme();
    const last = boardSize - 1;

    const buttonStyle = useMemo((): ViewStyle => {
      const corner = () => {
        if (position[0] === 0 && position[1] === 0) {
          return { borderTopLeftRadius: CORNER_RADIUS };
        } else if (position[0] === 0 && position[1] === last) {
          return { borderTopRightRadius: CORNER_RADIUS };
        } else if (position[0] === last && position[1] === 0) {
          return { borderBottomLeftRadius: CORNER_RADIUS };
        } else if (position[0] === last && position[1] === last) {
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
        ...(position[0] > 0 && position[0] < last && {
          borderBottomWidth: BORDER_WIDTH,
          borderTopWidth: BORDER_WIDTH,
        }),
        ...(position[1] > 0 && position[1] < last && {
          borderLeftWidth: BORDER_WIDTH,
          borderRightWidth: BORDER_WIDTH,
        }),
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      };
    }, [position, colors, last]);

    const markerColor = useMemo(() => {
      return resident === Marker.O ? "oMarker" : "xMarker";
    }, [resident]);

    const textStyle = useMemo(
      () => ({
        fontSize: boardSize > 3 ? 28 : 36,
        fontWeight: "700" as const,
        textShadowColor: colors.shadow,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }),
      [colors.shadow, boardSize]
    );

    const onSquarePress = useCallback(() => {
      onPress(position[0], position[1]);
    }, [onPress, position]);

    return (
      <Pressable style={buttonStyle} onPress={onSquarePress} disabled={resident !== null}>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="gameBoardBackground"
        >
          {resident ? (
            <Text variant="gameMarker" color={markerColor} style={textStyle}>
              {resident}
            </Text>
          ) : null}
        </Box>
      </Pressable>
    );
  }
);
