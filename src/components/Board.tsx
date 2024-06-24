import { useState } from "react";

interface Props {
  value: String;
  onSquareClick: any;
}

function Square(props: Props) {
  return (
    <button onClick={props.onSquareClick} className="square">
      {props.value}
    </button>
  );
}

export const Board = () => {
  const [squares, setSqures] = useState(Array<String>(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  function calculateWinner(squares: Array<String>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function onHandleClick(i: number): void {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice(); // slice() method creates a copy of an array

    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    setSqures(nextSquares);

    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  winner
    ? (status = `Winner: ${winner}`)
    : (status = `Next player: ${xIsNext ? "X" : "O"}`);

  return (
    <div className="board">
      <p>{status}</p>
      <div className="board-row">
        <Square onSquareClick={() => onHandleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => onHandleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => onHandleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => onHandleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => onHandleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => onHandleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => onHandleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => onHandleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => onHandleClick(8)} value={squares[8]} />
      </div>
    </div>
  );
};
