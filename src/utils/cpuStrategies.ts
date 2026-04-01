import { BoardState, Marker } from "../hooks/useBoardState";
import { GameVariant, Difficulty, VariantConfig } from "../types/variant";
import {
  checkWin,
  isDraw,
  getEmptyCells,
  findEmptyPosition,
  findEmptyThirdPosition,
} from "./boardHelpers";

export type CpuStrategy = (
  boardState: BoardState,
  config: VariantConfig
) => [number, number] | null;

// --- Minimax with alpha-beta pruning ---

const minimax = (
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  config: VariantConfig,
  lastMove: [number, number],
  alpha: number,
  beta: number
): number => {
  const won = checkWin(board, lastMove, config.winLength);

  if (won) {
    const isOWin = board[lastMove[0]][lastMove[1]] === Marker.O;
    if (config.misere) {
      return isOWin ? -10 + depth : 10 - depth;
    }
    return isOWin ? 10 - depth : -10 + depth;
  }

  if (isDraw(board)) return 0;

  const emptyCells = getEmptyCells(board);
  const marker = isMaximizing ? Marker.O : Marker.X;

  if (isMaximizing) {
    let best = -Infinity;
    for (const [r, c] of emptyCells) {
      board[r][c] = marker;
      const score = minimax(board, depth + 1, false, config, [r, c], alpha, beta);
      board[r][c] = null;
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const [r, c] of emptyCells) {
      board[r][c] = marker;
      const score = minimax(board, depth + 1, true, config, [r, c], alpha, beta);
      board[r][c] = null;
      best = Math.min(best, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return best;
  }
};

// --- Strategies ---

const randomStrategy: CpuStrategy = (boardState) => {
  const cells = getEmptyCells(boardState);
  if (cells.length === 0) return null;
  return cells[Math.floor(Math.random() * cells.length)];
};

const basicStrategy: CpuStrategy = (boardState, config) => {
  const center = Math.floor(config.boardSize / 2);

  const winningPosition = findEmptyThirdPosition(boardState, Marker.O);
  if (winningPosition) return winningPosition;

  const blockingPosition = findEmptyThirdPosition(boardState, Marker.X);
  if (blockingPosition) return blockingPosition;

  if (boardState[center][center] === null) return [center, center];

  return findEmptyPosition(boardState);
};

const minimaxStrategy: CpuStrategy = (boardState, config) => {
  const emptyCells = getEmptyCells(boardState);
  if (emptyCells.length === 0) return null;

  // Clone board so minimax can mutate it safely
  const board: BoardState = boardState.map((row) => [...row]);

  let bestScore = -Infinity;
  let bestMove: [number, number] = emptyCells[0];

  for (const [r, c] of emptyCells) {
    board[r][c] = Marker.O;
    const score = minimax(board, 0, false, config, [r, c], -Infinity, Infinity);
    board[r][c] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = [r, c];
    }
  }

  return bestMove;
};

const placeholderStrategy: CpuStrategy = (boardState) => {
  return findEmptyPosition(boardState);
};

// --- Strategy Map ---

export const STRATEGY_MAP: Record<GameVariant, Record<Difficulty, CpuStrategy>> = {
  classic: {
    easy: randomStrategy,
    hard: basicStrategy,
    impossible: minimaxStrategy,
  },
  "4x4": {
    easy: basicStrategy,
    hard: placeholderStrategy,
    impossible: placeholderStrategy,
  },
  misere: {
    easy: placeholderStrategy,
    hard: placeholderStrategy,
    impossible: placeholderStrategy,
  },
  fogOfWar: {
    easy: placeholderStrategy,
    hard: placeholderStrategy,
    impossible: placeholderStrategy,
  },
};
