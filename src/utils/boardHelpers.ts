import { BoardState, Marker } from "../hooks/useBoardState";

// Find a position that is empty and has two of the same markers in a row, column, or diagonal
export const findEmptyThirdPosition = (board: BoardState, marker: Marker): [number, number] | null => {
  // Check rows
  for (let row = 0; row < board.length; row++) {
    let nullPosition = null;
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        // If we have already found a null, go to the next row
        if (nullPosition) {
          nullPosition = null;
          break;
        }
        // Allow for one null in the row
        nullPosition = [row, col] as [number, number];
      } else if (board[row][col] !== marker) {
        nullPosition = null;
        break;
      }

      if (col === board[row].length - 1) {
        // If we are at the last column, return the position
        return nullPosition;
      }
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    let nullPosition = null;
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === null) {
        if (nullPosition) {
          nullPosition = null;
          break;
        }
        nullPosition = [row, col] as [number, number];
      } else if (board[row][col] !== marker) {
        nullPosition = null;
        break;
      }

      if (row === board.length - 1) {
        return nullPosition;
      }
    }
  }

  // Check diagonal from top left to bottom right
  let nullPosition = null;
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === null) {
      if (nullPosition) {
        nullPosition = null;
        break;
      }
      nullPosition = [i, i] as [number, number];
    } else if (board[i][i] !== marker) {
      nullPosition = null;
      break;
    }

    if (i === board.length - 1) {
      return nullPosition;
    }
  }
  nullPosition = null;
  // Check diagonal from top right to bottom left
  for (let i = 0; i < board.length; i++) {
    if (board[i][board.length - i - 1] === null) {
      if (nullPosition) {
        nullPosition = null;
        break;
      }
      nullPosition = [i, board.length - i - 1] as [number, number];
    } else if (board[i][board.length - i - 1] !== marker) {
      nullPosition = null;
      break;
    }

    if (i === board.length - 1) {
      return nullPosition;
    }
  }
  return null;
};

const AXES: [number, number][] = [[0, 1], [1, 0], [1, 1], [1, -1]];

export const checkWin = (
  board: BoardState,
  position: [number, number],
  winLength: number
): boolean => {
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

  for (const [dr, dc] of AXES) {
    if (1 + count(dr, dc) + count(-dr, -dc) >= winLength) {
      return true;
    }
  }
  return false;
};

export const isDraw = (board: BoardState): boolean =>
  board.every((row) => row.every((cell) => cell !== null));

export const getEmptyCells = (board: BoardState): [number, number][] => {
  const cells: [number, number][] = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === null) cells.push([r, c]);
    }
  }
  return cells;
};

export const findEmptyPosition = (board: BoardState): [number, number] | null => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
};
