import { useCallback } from "react";
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

  const makeMove = useCallback(() => {
    const position = nextPosition();
    if (position) {
      setTimeout(() => {
        pressSquare(position[0], position[1]);
      }, 1000);
    }
  }, [nextPosition, pressSquare]);

  return { makeMove };
};
