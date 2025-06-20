import { useCallback } from "react";
import { BoardState, Marker, Position, useBoardState } from "./useBoardState";
import {
  findEmptyPosition,
  findEmptyThirdPosition,
} from "../utils/boardHelpers";
import { HandleSquarePress } from "./useGameState";

export const useCpuPlayer = (
  boardState: BoardState,
  pressSquare: HandleSquarePress
) => {
  console.log("boardState", boardState);
  const nextPosition = useCallback(() => {
    const winningPosition = findEmptyThirdPosition(boardState, Marker.O);
    if (winningPosition) {
      console.log("winningPosition", winningPosition);
      return winningPosition;
    }
    const blockingPosition = findEmptyThirdPosition(boardState, Marker.X);
    if (blockingPosition) {
      console.log("blockingPosition", blockingPosition);
      return blockingPosition;
    }
    const centerPostion = boardState[1][1];
    if (centerPostion === null) {
      return [1, 1];
    }
    // If no winning or blocking position, take the first empty position
    const emptyPosition = findEmptyPosition(boardState);
    if (emptyPosition) {
      console.log("emptyPosition", emptyPosition);
      return emptyPosition;
    }
  }, [boardState]);

  const makeMove = useCallback(() => {
    console.log("makeMove");
    const position = nextPosition();
    console.log("position", position);
    if (position) {
      pressSquare(position[0], position[1]);
    }
  }, [nextPosition, pressSquare]);

  return { makeMove };
};
