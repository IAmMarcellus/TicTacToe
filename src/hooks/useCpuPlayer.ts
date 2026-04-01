import { useCallback, useRef } from "react";
import { BoardState } from "./useBoardState";
import { HandleSquarePress } from "./useGameState";
import { GameOptions } from "../types/variant";
import { STRATEGY_MAP } from "../utils/cpuStrategies";

const MIN_TURN_MS = 1000;

export const useCpuPlayer = (
  boardState: BoardState,
  pressSquare: HandleSquarePress,
  options: GameOptions
) => {
  const pressSquareRef = useRef(pressSquare);
  pressSquareRef.current = pressSquare;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextPosition = useCallback(() => {
    const strategy = STRATEGY_MAP[options.variant][options.difficulty];
    return strategy(boardState, options.config);
  }, [boardState, options]);

  const cancelMove = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const makeMove = useCallback(() => {
    // Yield so the bridge flushes the player's move to the UI thread before computing
    timerRef.current = setTimeout(() => {
      const start = Date.now();
      const position = nextPosition();
      if (!position) return;

      const press = () => pressSquareRef.current(position[0], position[1]);
      const remaining = Math.max(0, MIN_TURN_MS - (Date.now() - start));

      if (remaining === 0) {
        press();
      } else {
        timerRef.current = setTimeout(press, remaining);
      }
    }, 0);
  }, [nextPosition]);

  return { makeMove, cancelMove };
};
