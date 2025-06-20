import { useCallback, useEffect, useState } from "react";
import { Marker, Position, useBoardState } from "./useBoardState";
import { useCpuPlayer } from "./useCpuPlayer";
import { useGameStats } from "./useGameStats";

export type HandleSquarePress = (row: number, col: number) => void;

export const useGameState = () => {
  const { boardState, updateBoard, resetBoard, checkForWin, checkForDraw } =
    useBoardState();
  const { updateStats } = useGameStats();

  // X goes first
  const [currentPlayer, setCurrentPlayer] = useState<Marker>(Marker.X);
  const [gameEnded, setGameEnded] = useState(false);

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      // If the square is already filled or game ended, do nothing
      if (boardState[row][col] !== null || gameEnded) {
        return;
      }

      updateBoard(row, col, currentPlayer);
      const didWin = checkForWin([row, col] as Position);

      if (didWin) {
        setGameEnded(true);
        // Player X is human, Player O is CPU
        const result = currentPlayer === Marker.X ? "win" : "loss";
        updateStats(result);
        return;
      }

      // Check for draw
      if (checkForDraw()) {
        setGameEnded(true);
        updateStats("draw");
        return;
      }

      setCurrentPlayer(currentPlayer === Marker.X ? Marker.O : Marker.X);
    },
    [boardState, currentPlayer, gameEnded, updateStats, checkForDraw]
  );

  const resetGame = useCallback(() => {
    resetBoard();
    setCurrentPlayer(Marker.X);
    setGameEnded(false);
  }, [resetBoard]);

  const { makeMove } = useCpuPlayer(boardState, handleSquarePress);

  useEffect(() => {
    if (currentPlayer === Marker.O && !gameEnded) {
      makeMove();
    }
  }, [currentPlayer, makeMove, gameEnded]);

  return {
    boardState,
    currentPlayer,
    gameEnded,
    handleSquarePress,
    resetGame,
  };
};
