import { useCallback, useState } from "react";

export enum Marker {
  X = "X",
  O = "O",
}

export type PositionNumber = 0 | 1 | 2;
export type Position = [PositionNumber, PositionNumber];

export type SquareState = Marker | null;
export type BoardState = SquareState[][];

export type UpdateBoard = (row: number, col: number, player: Marker) => void;

export const useBoardState = () => {
  // Create a 3x3 board with null values
  const [boardState, setBoardState] = useState<BoardState>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  /* -- Update Functions -- */

  const updateBoard: UpdateBoard = useCallback(
    (row, col, player) => {
      // Immutably update the board with the current player's marker
      const newBoard = boardState.slice();
      newBoard[row][col] = player;
      setBoardState(newBoard);
    },
    [boardState]
  );

  const resetBoard = useCallback(() => {
    setBoardState(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))
    );
  }, []);

  /* -- Read Functions -- */

  const checkForWin = useCallback(
    (position: Position) => {
      const [row, col] = position;
      //Check row
      if (
        boardState[row][0] === boardState[row][1] &&
        boardState[row][1] === boardState[row][2] &&
        boardState[row][0] !== null
      ) {
        return true;
      }

      // Check column
      if (
        boardState[0][col] === boardState[1][col] &&
        boardState[1][col] === boardState[2][col] &&
        boardState[0][col] !== null
      ) {
        return true;
      }

      // Check both diagonals if corner or middle position
      const isMiddle = row === 1 && col === 1;
      if ((row === 0 && col === 0) || (row === 2 && col === 2) || isMiddle) {
        if (
          boardState[0][0] === boardState[1][1] &&
          boardState[1][1] === boardState[2][2] &&
          boardState[0][0] !== null
        ) {
          return true;
        }
      }
      if ((row === 0 && col === 2) || (row === 2 && col === 0) || isMiddle) {
        if (
          boardState[0][2] === boardState[1][1] &&
          boardState[1][1] === boardState[2][0] &&
          boardState[0][2] !== null
        ) {
          return true;
        }
      }

      return false;
    },
    [boardState]
  );

  const checkForDraw = useCallback(() => {
    return boardState.every((row) => row.every((cell) => cell !== null));
  }, [boardState]);

  return {
    boardState,
    updateBoard,
    resetBoard,
    checkForWin,
    checkForDraw,
  };
};
