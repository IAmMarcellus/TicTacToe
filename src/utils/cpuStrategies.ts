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
  beta: number,
  maxDepth: number,
  winScore: number
): number => {
  const won = checkWin(board, lastMove, config.winLength);

  if (won) {
    const isOWin = board[lastMove[0]][lastMove[1]] === Marker.O;
    if (config.misere) {
      return isOWin ? -winScore + depth : winScore - depth;
    }
    return isOWin ? winScore - depth : -winScore + depth;
  }

  if (isDraw(board)) return 0;

  if (depth >= maxDepth) return heuristicEval(board, config);

  const emptyCells = orderMoves(getEmptyCells(board), config);
  const marker = isMaximizing ? Marker.O : Marker.X;

  if (isMaximizing) {
    let best = -Infinity;
    for (const [r, c] of emptyCells) {
      board[r][c] = marker;
      const score = minimax(board, depth + 1, false, config, [r, c], alpha, beta, maxDepth, winScore);
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
      const score = minimax(board, depth + 1, true, config, [r, c], alpha, beta, maxDepth, winScore);
      board[r][c] = null;
      best = Math.min(best, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return best;
  }
};

// --- 4x4 impossible: opening book + depth-limited minimax ---

const boardHash = (board: BoardState): string =>
  board.flat().map((c) => c ?? ".").join("");

const make4x4BookEntry = (xr: number, xc: number): [string, [number, number]] => {
  const b: BoardState = Array.from({ length: 4 }, () => Array(4).fill(null));
  b[xr][xc] = Marker.X;
  // Respond near the opposite quadrant's center
  const or = xr < 2 ? 2 : 1;
  const oc = xc < 2 ? 2 : 1;
  return [boardHash(b), [or, oc]];
};

const OPENING_BOOK_4X4: Record<string, [number, number]> = Object.fromEntries([
  // Corners
  make4x4BookEntry(0, 0), make4x4BookEntry(0, 3),
  make4x4BookEntry(3, 0), make4x4BookEntry(3, 3),
  // Centers
  make4x4BookEntry(1, 1), make4x4BookEntry(1, 2),
  make4x4BookEntry(2, 1), make4x4BookEntry(2, 2),
  // Edges
  make4x4BookEntry(0, 1), make4x4BookEntry(0, 2),
  make4x4BookEntry(1, 0), make4x4BookEntry(1, 3),
  make4x4BookEntry(2, 0), make4x4BookEntry(2, 3),
  make4x4BookEntry(3, 1), make4x4BookEntry(3, 2),
]);

const computeAllLines = (boardSize: number, winLength: number): [number, number][][] => {
  const lines: [number, number][][] = [];
  for (let r = 0; r < boardSize; r++)
    for (let c = 0; c <= boardSize - winLength; c++)
      lines.push(Array.from({ length: winLength }, (_, i) => [r, c + i]));
  for (let c = 0; c < boardSize; c++)
    for (let r = 0; r <= boardSize - winLength; r++)
      lines.push(Array.from({ length: winLength }, (_, i) => [r + i, c]));
  for (let r = 0; r <= boardSize - winLength; r++)
    for (let c = 0; c <= boardSize - winLength; c++) {
      lines.push(Array.from({ length: winLength }, (_, i) => [r + i, c + i]));
      lines.push(Array.from({ length: winLength }, (_, i) => [r + i, c + winLength - 1 - i]));
    }
  return lines;
};

const linesCache = new Map<string, [number, number][][]>();
const getAllLines = (boardSize: number, winLength: number): [number, number][][] => {
  const key = `${boardSize},${winLength}`;
  let lines = linesCache.get(key);
  if (!lines) {
    lines = computeAllLines(boardSize, winLength);
    linesCache.set(key, lines);
  }
  return lines;
};

const heuristicEval = (board: BoardState, config: VariantConfig): number => {
  const lines = getAllLines(config.boardSize, config.winLength);
  const weights = [0, 1, 10, 100, 1000];
  let score = 0;

  for (const line of lines) {
    let oCount = 0;
    let xCount = 0;
    for (const [r, c] of line) {
      if (board[r][c] === Marker.O) oCount++;
      else if (board[r][c] === Marker.X) xCount++;
    }
    if (oCount > 0 && xCount === 0) score += weights[oCount] ?? 1000;
    else if (xCount > 0 && oCount === 0) score -= weights[xCount] ?? 1000;
  }

  return score;
};

const orderMoves = (
  cells: [number, number][],
  config: VariantConfig
): [number, number][] => {
  const center = (config.boardSize - 1) / 2;
  return [...cells].sort((a, b) => {
    const distA = Math.abs(a[0] - center) + Math.abs(a[1] - center);
    const distB = Math.abs(b[0] - center) + Math.abs(b[1] - center);
    return distA - distB;
  });
};

const getMaxDepth = (emptyCount: number): number => {
  if (emptyCount > 12) return 4;
  if (emptyCount > 10) return 5;
  if (emptyCount > 7) return 6;
  return 16; // full search for late game
};

const impossible4x4Strategy: CpuStrategy = (boardState, config) => {
  const hash = boardHash(boardState);
  const bookMove = OPENING_BOOK_4X4[hash];
  if (bookMove) return bookMove;

  const emptyCells = orderMoves(getEmptyCells(boardState), config);
  if (emptyCells.length === 0) return null;

  const maxDepth = getMaxDepth(emptyCells.length);
  const board: BoardState = boardState.map((row) => [...row]);

  let bestScore = -Infinity;
  let bestMove: [number, number] = emptyCells[0];

  for (const [r, c] of emptyCells) {
    board[r][c] = Marker.O;
    const score = minimax(board, 0, false, config, [r, c], -Infinity, Infinity, maxDepth, 1000);
    board[r][c] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = [r, c];
    }
  }

  return bestMove;
};

// --- Strategy building blocks ---

type StrategyStep = (board: BoardState, config: VariantConfig) => [number, number] | null;

const pipeline = (...steps: StrategyStep[]): CpuStrategy =>
  (boardState, config) => {
    for (const step of steps) {
      const move = step(boardState, config);
      if (move) return move;
    }
    return null;
  };

const tryWin: StrategyStep = (board) => findEmptyThirdPosition(board, Marker.O);
const tryBlock: StrategyStep = (board) => findEmptyThirdPosition(board, Marker.X);
const takeCenter: StrategyStep = (board, config) => {
  const c = Math.floor(config.boardSize / 2);
  return board[c][c] === null ? [c, c] : null;
};
const takeAny: StrategyStep = (board) => findEmptyPosition(board);

const randomStrategy: CpuStrategy = (boardState) => {
  const cells = getEmptyCells(boardState);
  if (cells.length === 0) return null;
  return cells[Math.floor(Math.random() * cells.length)];
};

// --- Composed strategies ---

const basicStrategy = pipeline(tryWin, tryBlock, takeCenter, takeAny);

const minimaxStrategy: CpuStrategy = (boardState, config) => {
  const emptyCells = getEmptyCells(boardState);
  if (emptyCells.length === 0) return null;

  // Clone board so minimax can mutate it safely
  const board: BoardState = boardState.map((row) => [...row]);

  let bestScore = -Infinity;
  let bestMove: [number, number] = emptyCells[0];

  for (const [r, c] of emptyCells) {
    board[r][c] = Marker.O;
    const score = minimax(board, 0, false, config, [r, c], -Infinity, Infinity, Infinity, 10);
    board[r][c] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = [r, c];
    }
  }

  return bestMove;
};

const findBestBuildMove: StrategyStep = (board, config) => {
  const lines = getAllLines(config.boardSize, config.winLength);

  let bestScore = 0;
  let bestCell: [number, number] | null = null;

  for (const line of lines) {
    let oCount = 0;
    let xCount = 0;
    let emptyCell: [number, number] | null = null;

    for (const [r, c] of line) {
      const cell = board[r][c];
      if (cell === Marker.O) oCount++;
      else if (cell === Marker.X) xCount++;
      else if (!emptyCell) emptyCell = [r, c];
    }

    if (xCount > 0 || oCount === 0) continue;
    if (oCount > bestScore && emptyCell) {
      bestScore = oCount;
      bestCell = emptyCell;
    }
  }

  return bestCell;
};

const hard4x4Strategy = pipeline(tryWin, tryBlock, findBestBuildMove, takeCenter, takeAny);

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
    hard: hard4x4Strategy,
    impossible: impossible4x4Strategy,
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
