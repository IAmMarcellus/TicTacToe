import { useCallback, useRef, useState } from "react";
import { VariantConfig } from "../types/variant";

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

  const checkForWin = useCallback((position: Position, board: BoardState) => {
    const [row, col] = position;
    const size = board.length;
    const marker = board[row][col];
    if (!marker) return false;

    const count = (dr: number, dc: number): number => {
      let r = row + dr;
      let c = col + dc;
      let n = 0;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === marker) {
        n++;
        r += dr;
        c += dc;
      }
      return n;
    };

    const axes: [number, number][] = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (const [dr, dc] of axes) {
      if (1 + count(dr, dc) + count(-dr, -dc) >= config.winLength) {
        return true;
      }
    }

    return false;
  }, [config.winLength]);

  const checkForDraw = useCallback((board: BoardState) => {
    return board.every((row) => row.every((cell) => cell !== null));
  }, []);

  return {
    boardState,
    updateBoard,
    resetBoard,
    checkForWin,
    checkForDraw,
  };
};
