import { useCallback, useEffect, useRef, useState } from "react";
import { Marker, Position, useBoardState } from "./useBoardState";
import { useCpuPlayer } from "./useCpuPlayer";
import { useGameStats } from "./useGameStats";
import { GameOptions } from "../types/variant";

export type HandleSquarePress = (row: number, col: number) => void;

export const useGameState = (options: GameOptions) => {
  const { config } = options;
  const { boardState, updateBoard, resetBoard, checkForWin, checkForDraw } =
    useBoardState(config);
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
        let result: "win" | "loss" =
          currentPlayerRef.current === Marker.X ? "win" : "loss";
        if (config.misere) result = result === "win" ? "loss" : "win";
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
    [updateBoard, checkForWin, checkForDraw, updateStats, config.misere]
  );

  const resetGame = useCallback(() => {
    resetBoard();
    setCurrentPlayer(Marker.X);
    setWinningState(null);
  }, [resetBoard]);

  const { makeMove, cancelMove } = useCpuPlayer(boardState, handleSquarePress, options);

  useEffect(() => {
    if (currentPlayer === Marker.O && !winningState) {
      makeMove();
      return cancelMove;
    }
  }, [currentPlayer, makeMove, cancelMove, winningState]);

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
