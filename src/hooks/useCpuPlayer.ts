import { useCallback, useRef } from "react";
import { BoardState } from "./useBoardState";
import { HandleSquarePress } from "./useGameState";
import { GameOptions } from "../types/variant";
import { STRATEGY_MAP } from "../utils/cpuStrategies";

export const useCpuPlayer = (
  boardState: BoardState,
  pressSquare: HandleSquarePress,
  options: GameOptions
) => {
  const pressSquareRef = useRef(pressSquare);
  pressSquareRef.current = pressSquare;

  const nextPosition = useCallback(() => {
    const strategy = STRATEGY_MAP[options.variant][options.difficulty];
    return strategy(boardState, options.config);
  }, [boardState, options]);

  const makeMove = useCallback((): ReturnType<typeof setTimeout> | undefined => {
    const position = nextPosition();
    if (position) {
      return setTimeout(() => {
        pressSquareRef.current(position[0], position[1]);
      }, 1000);
    }
    return undefined;
  }, [nextPosition]);

  return { makeMove };
};
