import { useCallback, useState } from "react";

export enum Marker {
  X = "X",
  O = "O",
}

export type PositionNumber = 0 | 1 | 2;
export type Position = [PositionNumber, PositionNumber];

export type SquareState = Marker | null;
export type BoardState = SquareState[][];

export type UpdateBoard = (
  row: number,
  col: number,
  player: Marker
) => BoardState;

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
      // Calculate the new board state
      const newBoard = boardState.map((boardRow, rowIndex) =>
        rowIndex === row
          ? boardRow.map((cell, colIndex) => (colIndex === col ? player : cell))
          : [...boardRow]
      );

      // Update the state
      setBoardState(newBoard);

      // Return the new board for immediate use
      return newBoard;
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
    (position: Position, board: BoardState = boardState) => {
      const [row, col] = position;
      //Check row
      if (
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2] &&
        board[row][0] !== null
      ) {
        return true;
      }

      // Check column
      if (
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col] &&
        board[0][col] !== null
      ) {
        return true;
      }

      // Check both diagonals if corner or middle position
      const isMiddle = row === 1 && col === 1;
      if ((row === 0 && col === 0) || (row === 2 && col === 2) || isMiddle) {
        if (
          board[0][0] === board[1][1] &&
          board[1][1] === board[2][2] &&
          board[0][0] !== null
        ) {
          return true;
        }
      }
      if ((row === 0 && col === 2) || (row === 2 && col === 0) || isMiddle) {
        if (
          board[0][2] === board[1][1] &&
          board[1][1] === board[2][0] &&
          board[0][2] !== null
        ) {
          return true;
        }
      }

      return false;
    },
    [boardState]
  );

  const checkForDraw = useCallback(
    (board: BoardState = boardState) => {
      return board.every((row) => row.every((cell) => cell !== null));
    },
    [boardState]
  );

  return {
    boardState,
    updateBoard,
    resetBoard,
    checkForWin,
    checkForDraw,
  };
};
