import { memo, useMemo } from "react";
import { Box } from "../theme/ThemeProvider";
import { Square } from "./Square";
import { HandleSquarePress } from "../hooks/useGameState";
import { BoardState } from "../hooks/useBoardState";

const PLACES = [0, 1, 2] as const;

export const GameBoard = memo(
  ({
    boardState,
    handleSquarePress,
  }: {
    boardState: BoardState;
    handleSquarePress: HandleSquarePress;
  }) => {
    const squares = useMemo(
      () =>
        PLACES.map((row) => {
          return PLACES.map((column) => {
            return (
              <Square
                key={`${row}-${column}`}
                position={[row, column]}
                onPress={handleSquarePress}
                resident={boardState[row][column]}
              />
            );
          });
        }),
      [boardState, handleSquarePress]
    );

    const rows = useMemo(() => {
      return squares.map((row, index) => {
        return (
          <Box key={index} flexDirection="row" flex={1}>
            {row}
          </Box>
        );
      });
    }, [squares]);

    return <Box flex={1}>{rows}</Box>;
  }
);
