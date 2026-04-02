import { useCallback, useRef, useState } from "react";
import { VariantConfig } from "../types/variant";
import { checkWin, isDraw } from "../utils/boardHelpers";

export enum Marker {
  X = "X",
  O = "O",
}

export type Position = [number, number];

export type SquareState = Marker | null;
export type BoardState = SquareState[][];

export type UpdateBoard = (
  row: number,
  col: number,
  player: Marker
) => BoardState;

const createEmptyBoard = (size: number): BoardState =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

export const useBoardState = (config: VariantConfig) => {
  const [boardState, setBoardState] = useState<BoardState>(() =>
    createEmptyBoard(config.boardSize)
  );
  const boardRef = useRef(boardState);
  boardRef.current = boardState;

  const updateBoard: UpdateBoard = useCallback((row, col, player) => {
    const current = boardRef.current;
    if (current[row][col] !== null) {
      return current;
    }
    const newBoard: BoardState = current.map((boardRow, rowIndex) =>
      rowIndex === row
        ? boardRow.map((cell, colIndex) => (colIndex === col ? player : cell))
        : boardRow
    );
    setBoardState(newBoard);
    return newBoard;
  }, []);

  const resetBoard = useCallback(() => {
    setBoardState(createEmptyBoard(config.boardSize));
  }, [config.boardSize]);

  const checkForWin = useCallback(
    (position: Position, board: BoardState) =>
      checkWin(board, position, config.winLength),
    [config.winLength]
  );

  const checkForDraw = isDraw;

  return {
    boardState,
    updateBoard,
    resetBoard,
    checkForWin,
    checkForDraw,
  };
};
