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
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );
  // X goes first
  const [currentPlayer, setCurrentPlayer] = useState<Marker>(Marker.X);

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      // Immutably update the board with the current player's marker
      const newBoard = boardState.slice();
      newBoard[row][col] = currentPlayer;
      setBoardState(newBoard);
      setCurrentPlayer(currentPlayer === Marker.X ? Marker.O : Marker.X);
    },
    [boardState, currentPlayer]
  );

  const resetGame = useCallback(() => {
    setBoardState(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );
    setCurrentPlayer(Marker.X);
  }, []);

  return {
    boardState,
    currentPlayer,
    handleSquarePress,
    resetGame,
  };
};

export default useGameState;
