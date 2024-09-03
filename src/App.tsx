import React, { useEffect, useState } from "react";

import "./App.scss";
import Box from "./components/Box";

const m = 3;
const n = 3;

const initialBoard = Array(m).fill(Array(n).fill(null));

const App: React.FC = () => {
  const [items, setItems] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState(false);

  const resetBoard = () => {
    setItems(initialBoard);
    setCurrentTurn(false);
  }

  const showMsgAndResetBoard = (xCount: number, oCount: number) => {
    if(xCount == 3) {
      alert("X Won");
      resetBoard();
    } else if(oCount == 3) {
      alert("O Won");
      resetBoard();
    }
  }

  const checkRowWin = (row: number) => {
    let xCount = 0;
    let oCount = 0;
  
    for(let i=0; i<m; i++) {
      if(items[row][i] == "X") xCount++;
      else if(items[row][i] == "O") oCount++;
    }
  
    showMsgAndResetBoard(xCount, oCount);
  };

  const checkColumnWin = (column: number) => {
    let xCount = 0;
    let oCount = 0;
  
    for(let i=0; i<n; i++) {
      if(items[i][column] == "X") xCount++;
      else if(items[i][column] == "O") oCount++;
    }
  
    showMsgAndResetBoard(xCount, oCount);
  };

  const checkMainDiagonalWin = () => { 
    let xCount = 0;
    let oCount = 0;

    for(let i=0; i<m; i++) {
      for(let j=0; j<n; j++) {
        if(i == j) {
          if(items[i][j] == "X") xCount++;
          else if(items[i][j] == "O") oCount++;
        }
      }
    }

    showMsgAndResetBoard(xCount, oCount);
  };

  const checkReverseDiagonalWin = () => { 
    let xCount = 0;
    let oCount = 0;

    for(let i=0; i<m; i++) {
      for(let j=0; j<n; j++) {
        if(i == n - j - 1) {
          if(items[i][j] == "X") xCount++;
          else if(items[i][j] == "O") oCount++;
        }
      }
    }

    showMsgAndResetBoard(xCount, oCount);
  };

  useEffect(() => {
    for(let i=0; i<m; i++) {
      checkRowWin(i);
    }

    for(let i=0; i<n; i++) {
      checkColumnWin(i);
    }

    checkMainDiagonalWin();
    checkReverseDiagonalWin();
  }, [items]);

  const handleBoxClick = (x: number, y: number) => {
    if(items[x][y] !== null) return;

    let copyItems = items.map((item) => item.slice());
    copyItems[x][y] = currentTurn ? "X" : "O";
    setCurrentTurn(!currentTurn);
    setItems(copyItems);
  }

  return (
    <div className="main">
      <div className="mb-10">Welcome to Tic-Tac-Toe</div>
      <div className="board mb-10">
        <div className="row">
          {
            items[0].map((n: any, index: number) => {
              return (
                <Box key={index} value={items[0][index]} handleBoxClick={() => handleBoxClick(0, index)} />
              )
            })
          }
        </div>
        <div className="row">
          {
            items[1].map((n: any, index: number) => {
              return (
                <Box key={index} value={items[1][index]} handleBoxClick={() => handleBoxClick(1, index)} />
              )
            })
          }
        </div>
        <div className="row">
          {
            items[2].map((n: any, index: number) => {
              return (
                <Box key={index} value={items[2][index]} handleBoxClick={() => handleBoxClick(2, index)} />
              )
            })
          }
        </div>
      </div>
      <div className="reset-btn">
        <button onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;