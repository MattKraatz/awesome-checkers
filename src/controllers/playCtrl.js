"use strict";

app.controller('playCtrl', function($scope) {

  $scope.board = {};
  startingBoard();
  startingPieces(1,2,3,"black",0);
  startingPieces(6,7,8,"red",1);

// Generate the Board Object with all Blank values.
  function startingBoard() {
    for (let i = 1; i < 9; i++) {
      $scope.board["row" + i] = {};
      for (let j = 1; j < 9; j++) {
        $scope.board["row" + i]["column" + j] = {
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

  function startingPieces (row1, row2, row3, color, number){
    for (let y=row1; y<(row3+1); y++){
      for(let x=1; x<9; x++){
        if ((y === row1 || y === row3) && (x+number)%2 === 0){
          $scope.board["row" +y]["column" + x].blank = false;
          $scope.board["row" +y]["column" + x][color] = true;
        }
        if (y === row2 && (x+1-number)%2===0){
          $scope.board["row" +y]["column" + x].blank = false;
          $scope.board["row" +y]["column" + x][color] = true;
        }
      }
    }
  }

  console.log($scope.board);

});
