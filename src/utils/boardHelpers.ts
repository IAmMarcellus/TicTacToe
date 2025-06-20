import { BoardState, Marker } from "../hooks/useBoardState";

// Find a position that is empty and has two of the same markers in a row, column, or diagonal
export const findEmptyThirdPosition = (board: BoardState, marker: Marker) => {
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
        nullPosition = [row, col];
        // If the marker doesn't match, go to the next row
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
        nullPosition = [row, col];
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
      nullPosition = [i, i];
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
      nullPosition = [i, board.length - i - 1];
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

export const findEmptyPosition = (board: BoardState) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
};
