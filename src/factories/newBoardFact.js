"use strict";

app.factory('newBoardFact', function(){
  let initBoard = () => {
    let board = {};
    startingBoard();
    startingPieces(1,2,3,"black",0);
    startingPieces(6,7,8,"red",1);
    return board;

  // Generate the Board Object with all Blank values.
    function startingBoard() {
      for (let i = 1; i < 9; i++) {
        board[i] = {};
        for (let j = 1; j < 9; j++) {
          board[i][j] = {
            blank: true,
            red: false,
            black: false,
            selected: false,
            movable: false,
            king: false
          }
        }
      }
    }

  // Populate the Board Object with Pieces at their starting position
    function startingPieces (row1, row2, row3, color, number){
      for (let y=row1; y<(row3+1); y++){
        for(let x=1; x<9; x++){
          if ((y === row1 || y === row3) && (x+number)%2 === 0){
            board[y][x].blank = false;
            board[y][x][color] = true;
          }
          if (y === row2 && (x+1-number)%2===0){
            board[y][x].blank = false;
            board[y][x][color] = true;
          }
        }
      }
    };
  }

  return {initBoard};
})
