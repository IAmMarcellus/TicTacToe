import { useCallback, useEffect, useRef, useState } from "react";
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

  // Use refs to stabilize handleSquarePress dependencies
  const currentPlayerRef = useRef(currentPlayer);
  currentPlayerRef.current = currentPlayer;
  const winningStateRef = useRef(winningState);
  winningStateRef.current = winningState;

  const handleSquarePress: HandleSquarePress = useCallback(
    (row, col) => {
      if (winningStateRef.current) {
        return;
      }

      const newBoard = updateBoard(row, col, currentPlayerRef.current);
      const didWin = checkForWin([row, col] as Position, newBoard);

      if (didWin) {
        const result = currentPlayerRef.current === Marker.X ? "win" : "loss";
        setWinningState(result);
        updateStats(result);
        return;
      }

      if (checkForDraw(newBoard)) {
        setWinningState("draw");
        updateStats("draw");
        return;
      }

      setCurrentPlayer((prev) => (prev === Marker.X ? Marker.O : Marker.X));
    },
    [updateBoard, checkForWin, checkForDraw, updateStats]
  );

  const resetGame = useCallback(() => {
    resetBoard();
    setCurrentPlayer(Marker.X);
    setWinningState(null);
  }, [resetBoard]);

  const { makeMove } = useCpuPlayer(boardState, handleSquarePress);

  useEffect(() => {
    if (currentPlayer === Marker.O && !winningState) {
      const timeoutId = makeMove();
      return () => {
        if (timeoutId != null) {
          clearTimeout(timeoutId);
        }
      };
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
