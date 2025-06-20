import { useCallback, useEffect, useState } from "react";
import { Marker, Position, useBoardState } from "./useBoardState";
import { useCpuPlayer } from "./useCpuPlayer";

export type HandleSquarePress = (row: number, col: number) => void;

export const useGameState = () => {
  const { boardState, updateBoard, resetBoard, checkForWin } = useBoardState();

  // X goes first
  const [currentPlayer, setCurrentPlayer] = useState<Marker>(Marker.X);

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      // If the square is already filled, do nothing
      if (boardState[row][col] !== null) {
        return;
      }

      updateBoard(row, col, currentPlayer);
      const didWin = checkForWin([row, col] as Position);
      if (didWin) {
        // TODO: handle winning state for the current player
        return;
      }
      setCurrentPlayer(currentPlayer === Marker.X ? Marker.O : Marker.X);
    },
    [boardState, currentPlayer]
  );

  const resetGame = useCallback(() => {
    resetBoard();
    setCurrentPlayer(Marker.X);
  }, []);

  const { makeMove } = useCpuPlayer(boardState, handleSquarePress);

  useEffect(() => {
    if (currentPlayer === Marker.O) {
      makeMove();
    }
  }, [currentPlayer, makeMove]);

  return {
    boardState,
    currentPlayer,
    handleSquarePress,
    resetGame,
  };
};
