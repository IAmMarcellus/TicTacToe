import { memo, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Square } from "./Square";
import { BoardState, HandleSquarePress } from "../hooks/useGameState";

const GameBoard = memo(
  ({
    boardState,
    handleSquarePress,
  }: {
    boardState: BoardState;
    handleSquarePress: HandleSquarePress;
  }) => {
    const places = [0, 1, 2] as const;
    useEffect(() => {
      console.log("boardState", boardState);
    }, [boardState]);
    const squares = useMemo(
      () =>
        places.map((row) => {
          return places.map((column) => {
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
          <View
            key={index}
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            {row}
          </View>
        );
      });
    }, [squares]);

    return <View style={{ flex: 1 }}>{rows}</View>;
  }
);

export default GameBoard;
