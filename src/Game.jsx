import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquare) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = "Start the game";
    }
    return (
      <li key={move} className="bg-gray-800 text-white rounded-lg m-1 p-1">
        <button onClick={() => jumpTo(move)} className="px-2">
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex justify-center p-4 sm:flex-col">
      <div className="mr-12">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol className="border border-gray-100 rounded-lg mt-4 p-3 text-lg">
          {moves}
        </ol>
      </div>
    </div>
  );
}
