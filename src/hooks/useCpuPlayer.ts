import { useCallback, useRef } from "react";
import { BoardState, Marker } from "./useBoardState";
import {
  findEmptyPosition,
  findEmptyThirdPosition,
} from "../utils/boardHelpers";
import { HandleSquarePress } from "./useGameState";

export const useCpuPlayer = (
  boardState: BoardState,
  pressSquare: HandleSquarePress
) => {
  // Use ref for pressSquare to avoid recreating makeMove when it changes
  const pressSquareRef = useRef(pressSquare);
  pressSquareRef.current = pressSquare;

  const nextPosition = useCallback(() => {
    const winningPosition = findEmptyThirdPosition(boardState, Marker.O);
    if (winningPosition) {
      return winningPosition;
    }
    const blockingPosition = findEmptyThirdPosition(boardState, Marker.X);
    if (blockingPosition) {
      return blockingPosition;
    }
    const centerPostion = boardState[1][1];
    if (centerPostion === null) {
      return [1, 1];
    }
    // If no winning or blocking position, take the first empty position
    const emptyPosition = findEmptyPosition(boardState);
    if (emptyPosition) {
      return emptyPosition;
    }
  }, [boardState]);

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
