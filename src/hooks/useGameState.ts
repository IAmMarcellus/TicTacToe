import { useCallback, useEffect, useState } from "react";
import { Marker, Position, useBoardState } from "./useBoardState";
import { useCpuPlayer } from "./useCpuPlayer";
import { useGameStats } from "./useGameStats";

export type HandleSquarePress = (row: number, col: number) => void;

export const useGameState = () => {
  const { boardState, updateBoard, resetBoard, checkForWin, checkForDraw } =
    useBoardState();
  const { updateStats, stats, isLoading: isLoadingStats } = useGameStats();

  // X goes first
  const [currentPlayer, setCurrentPlayer] = useState<Marker>(Marker.X);
  const [winningState, setWinningState] = useState<
    "win" | "loss" | "draw" | null
  >(null);

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      // If the square is already filled or game ended, do nothing
      if (boardState[row][col] !== null || winningState) {
        return;
      }

      const newBoard = updateBoard(row, col, currentPlayer);
      const didWin = checkForWin([row, col] as Position, newBoard);

      if (didWin) {
        // Player X is human, Player O is CPU
        const result = currentPlayer === Marker.X ? "win" : "loss";
        setWinningState(result);
        updateStats(result);
        return;
      }

      // Check for draw
      if (checkForDraw(newBoard)) {
        setWinningState("draw");
        updateStats("draw");
        return;
      }

      setCurrentPlayer(currentPlayer === Marker.X ? Marker.O : Marker.X);
    },
    [
      boardState,
      currentPlayer,
      winningState,
      updateBoard,
      checkForWin,
      checkForDraw,
      updateStats,
    ]
  );

  const resetGame = useCallback(() => {
    resetBoard();
    setCurrentPlayer(Marker.X);
    setWinningState(null);
  }, [resetBoard]);

  const { makeMove } = useCpuPlayer(boardState, handleSquarePress);

  useEffect(() => {
    if (currentPlayer === Marker.O && !winningState) {
      makeMove();
    }
  }, [currentPlayer, makeMove, winningState]);

  return {
    boardState,
    currentPlayer,
    winningState,
    stats,
    isLoadingStats,
    handleSquarePress,
    resetGame,
  };
};
