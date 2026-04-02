import { memo, useMemo, useCallback } from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Box, Text } from "../theme/ThemeProvider";
import { HandleSquarePress } from "../hooks/useGameState";
import { Marker } from "../hooks/useBoardState";
import { useTheme } from "../hooks/useTheme";

interface SquareProps {
  row: number;
  col: number;
  onPress: HandleSquarePress;
  resident: Marker | null;
  boardSize: number;
}

const CORNER_RADIUS = 16;
const BORDER_WIDTH = 2;
const markerEntering = ZoomIn.springify().damping(30).stiffness(300);

export const Square: React.FC<SquareProps> = memo(
  ({ row, col, onPress, resident, boardSize }) => {
    const { colors } = useTheme();
    const last = boardSize - 1;

    const buttonStyle = useMemo((): ViewStyle => {
      const corner = () => {
        if (row === 0 && col === 0) {
          return { borderTopLeftRadius: CORNER_RADIUS };
        } else if (row === 0 && col === last) {
          return { borderTopRightRadius: CORNER_RADIUS };
        } else if (row === last && col === 0) {
          return { borderBottomLeftRadius: CORNER_RADIUS };
        } else if (row === last && col === last) {
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
        ...(row > 0 && row < last && {
          borderBottomWidth: BORDER_WIDTH,
          borderTopWidth: BORDER_WIDTH,
        }),
        ...(col > 0 && col < last && {
          borderLeftWidth: BORDER_WIDTH,
          borderRightWidth: BORDER_WIDTH,
        }),
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      };
    }, [row, col, colors, last]);

    const markerColor = useMemo(() => {
      return resident === Marker.O ? "oMarker" : "xMarker";
    }, [resident]);

    const textStyle = useMemo(
      () => ({
        fontSize: boardSize > 3 ? 28 : 36,
        fontFamily: "Chalkduster",
        fontWeight: "700" as const,
        textShadowColor: colors.shadow,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }),
      [colors.shadow, boardSize]
    );

    const onSquarePress = useCallback(() => {
      onPress(row, col);
    }, [onPress, row, col]);

    return (
      <Pressable style={buttonStyle} onPress={onSquarePress} disabled={resident !== null}>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="gameBoardBackground"
        >
          {resident ? (
            <Animated.View entering={markerEntering}>
              <Text variant="gameMarker" color={markerColor} style={textStyle}>
                {resident}
              </Text>
            </Animated.View>
          ) : null}
        </Box>
      </Pressable>
    );
  }
);
