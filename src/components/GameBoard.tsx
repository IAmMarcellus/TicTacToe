import { memo, useMemo } from "react";
import { Box } from "../theme/ThemeProvider";
import { Square } from "./Square";
import { HandleSquarePress } from "../hooks/useGameState";
import { BoardState, Marker } from "../hooks/useBoardState";

export const GameBoard = memo(
  ({
    boardState,
    handleSquarePress,
    boardSize,
    fogActive,
  }: {
    boardState: BoardState;
    handleSquarePress: HandleSquarePress;
    boardSize: number;
    fogActive?: boolean;
  }) => {
    const places = useMemo(
      () => Array.from({ length: boardSize }, (_, i) => i),
      [boardSize]
    );

    const squares = useMemo(
      () =>
        places.map((row) => {
          return places.map((column) => {
            const resident = boardState[row][column];
            return (
              <Square
                key={`${row}-${column}`}
                position={[row, column]}
                onPress={handleSquarePress}
                resident={resident}
                boardSize={boardSize}
                hidden={fogActive && resident === Marker.O}
              />
            );
          });
        }),
      [boardState, handleSquarePress, places, boardSize, fogActive]
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
