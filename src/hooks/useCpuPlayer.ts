import { useCallback, useRef } from "react";
import { BoardState, Marker } from "./useBoardState";
import {
  findEmptyPosition,
  findEmptyThirdPosition,
} from "../utils/boardHelpers";
import { HandleSquarePress } from "./useGameState";
import { VariantConfig } from "../types/variant";

export const useCpuPlayer = (
  boardState: BoardState,
  pressSquare: HandleSquarePress,
  config: VariantConfig
) => {
  const pressSquareRef = useRef(pressSquare);
  pressSquareRef.current = pressSquare;

  const nextPosition = useCallback(() => {
    const center = Math.floor(config.boardSize / 2);

    const winningPosition = findEmptyThirdPosition(boardState, Marker.O);
    if (winningPosition) {
      return winningPosition;
    }
    const blockingPosition = findEmptyThirdPosition(boardState, Marker.X);
    if (blockingPosition) {
      return blockingPosition;
    }
    if (boardState[center][center] === null) {
      return [center, center];
    }
    const emptyPosition = findEmptyPosition(boardState);
    if (emptyPosition) {
      return emptyPosition;
    }
  }, [boardState, config.boardSize]);

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
