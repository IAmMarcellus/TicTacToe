import { useCallback, useEffect, useState } from "react";

export enum Marker {
  X = "X",
  O = "O",
}

export type SquareState = Marker | null;
export type BoardState = SquareState[][];

export type HandleSquarePress = (row: number, col: number) => void;

const useGameState = () => {
  // Create a 3x3 board with null values
  const [boardState, setBoardState] = useState<BoardState>(
    Array(3).fill(Array(3).fill(null))
  );
  // X goes first
  const [currentPlayer, setCurrentPlayer] = useState<Marker>(Marker.X);

  useEffect(() => {
    console.log(boardState);
  }, [boardState]);

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      // Immutably update the board with the current player's marker
      const newBoard = boardState.slice();
      newBoard[row][col] = currentPlayer;
      setBoardState(newBoard);
    },
    [boardState, currentPlayer]
  );

  return {
    boardState,
    currentPlayer,
    handleSquarePress,
  };
};

export default useGameState;
