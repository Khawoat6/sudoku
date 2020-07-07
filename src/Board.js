import React, { Component } from "react";
import Cell from "./Cell";

const validate = (board) => {
  let isValid = true;
  for (let i = 0; i < 4; i++) {
    const horizontal = new Set();
    const vertical = new Set();
    const square = new Set();
    for (let j = 0; j < 4; j++) {
      horizontal.add(board[i][j]);
      vertical.add(board[j][i]);
      square.add(
        board[2 * (i % 2) + (j % 2)][2 * Math.floor(i / 2) + Math.floor(j / 2)]
      );
    }
    horizontal.delete(0);
    vertical.delete(0);
    square.delete(0);
    if (horizontal.size !== 4 || vertical.size !== 4 || square.size !== 4) {
      isValid = false;
    }
  }
  return isValid;
};

class Board extends Component {
  state = {
    board: [
      [1, 2, 3, 4],
      [3, 4, 0, 0],
      [2, 0, 4, 0],
      [4, 0, 0, 2],
    ],
    initial: [
      [true, true, true, true],
      [true, true, false, false],
      [true, false, true, false],
      [true, false, false, true],
    ],
    statusText: "",
  };

  summit = () => {
    const inValid = validate(this.state.board);
    this.setState({
      statusText: inValid ? "Board is completed!!" : "Board is invilid :(",
    });
  };

  render() {
    return (
      <div>
        <div className="board">
          {this.state.board.map((row, i) =>
            row.map((number, j) => (
              <Cell
                key={`cell-${i}-${j}`}
                isInitial={this.state.initial[i][j]}
                number={number}
                onChange={(newNumber) => {
                  const { board } = this.state;
                  board[i][j] = newNumber;
                  this.setState({
                    board,
                  });
                }}
              />
            ))
          )}
        </div>
        <button onClick={this.summit}>Summit</button>
        <p>{this.state.statusText}</p>
      </div>
    );
  }
}

export default Board;
