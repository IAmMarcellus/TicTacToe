import { memo, useMemo } from "react";
import { Box } from "../theme/ThemeProvider";
import { Square } from "./Square";
import { HandleSquarePress } from "../hooks/useGameState";
import { BoardState } from "../hooks/useBoardState";

export const GameBoard = memo(
  ({
    boardState,
    handleSquarePress,
    boardSize,
  }: {
    boardState: BoardState;
    handleSquarePress: HandleSquarePress;
    boardSize: number;
  }) => {
    const places = useMemo(
      () => Array.from({ length: boardSize }, (_, i) => i),
      [boardSize]
    );

    const squares = useMemo(
      () =>
        places.map((row) => {
          return places.map((column) => {
            return (
              <Square
                key={`${row}-${column}`}
                row={row}
                col={column}
                onPress={handleSquarePress}
                resident={boardState[row][column]}
                boardSize={boardSize}
              />
            );
          });
        }),
      [boardState, handleSquarePress, places, boardSize]
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
