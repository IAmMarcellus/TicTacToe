import { useMemo } from "react";
import { View } from "react-native";
import { Square } from "./Square";

const GameBoard = ({ width, height }: { width: number }) => {
  const places = [0, 1, 2] as const;
  const squares = useMemo(
    () =>
      places.map((row) => {
        return places.map((column) => {
          return (
            <Square
              key={`${row}-${column}`}
              position={[row, column]}
              onPress={() => {}}
            />
          );
        });
      }),
    []
  );
  const rows = useMemo(() => {
    return squares.map((row, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: "red",
          }}
        >
          {row}
        </View>
      );
    });
  }, [squares]);

  return <View>{rows}</View>;
};

export default GameBoard;
