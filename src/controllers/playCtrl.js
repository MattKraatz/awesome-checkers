"use strict";

app.controller('playCtrl', function($scope,newBoardFact) {

  // BOARD OBJECT KEY
    // $scope.board = {row#: {column#: {state: bool}}}
    // black starts on top with row 1
    // red starts on bottom with row 8

  $scope.board = {};
  $scope.movePhase = false;
  $scope.playerTurn = "black";
  $scope.selectedSpace = [];
  $scope.availableMoves = [];
  $scope.availableCaptures = [];

// Initialize a new game
  $scope.initGame = () => {
    $scope.board = newBoardFact.initBoard();
    console.log($scope.board);
  };

  // Handle Move Phase and Player Turn on click
  $scope.checkClick = (evt) => {
    let coords = returnCoords(evt);
    if (!$scope.movePhase && $scope.board[coords[0]][coords[1]][$scope.playerTurn]) {
      $scope.movePhase = true;
      $scope.selectedSpace = coords;
      checkAvailableMoves(coords);
      if (!$scope.availableMoves.length && !$scope.availableCaptures.length) {
        $scope.selectedSpace = [];
        $scope.movePhase = false;
      }
    } else {
      checkSelectedMove(coords);
    }
  };

  // Initialize Move Phase by Identifying Available Moves and Captures, if available
  function checkAvailableMoves(coords) {
    let row = coords[0],
     column = coords[1];
    if ($scope.playerTurn === "black") {
      let moveOptA = $scope.board[row + 1][column - 1];
      let captureOptA = $scope.board[row + 2][column - 2];
      if (moveOptA && moveOptA.blank) {
        moveOptA.movable = true;
        $scope.availableMoves.push([row + 1, column - 1]);
      } else if (moveOptA && moveOptA.red) {
        if (captureOptA && captureOptA.blank) {
          captureOptA.movable = true;
          $scope.availableCaptures.push([row + 2, column - 2,[row + 1, column - 1]]);
        }
      }
      let moveOptB = $scope.board[row + 1][column + 1];
      let captureOptB = $scope.board[row + 2][column + 2];
      if (moveOptB && moveOptB.blank) {
        moveOptB.movable = true;
        $scope.availableMoves.push([row + 1, column + 1]);
      } else if (moveOptB && moveOptB.red) {
        if (captureOptB && captureOptB.blank) {
          captureOptB.movable = true;
          $scope.availableCaptures.push([row + 2, column + 2,[row + 1, column + 1]]);
        }
      }
    } else if ($scope.playerTurn === "red") {
      let moveOptA = $scope.board[row - 1][column - 1];
      let captureOptA = $scope.board[row - 2][column - 2];
      if (moveOptA && moveOptA.blank) {
        moveOptA.movable = true;
        $scope.availableMoves.push([row - 1, column - 1]);
      } else if (moveOptA && moveOptA.red) {
        if (captureOptA && captureOptA.blank) {
          captureOptA.movable = true;
          $scope.availableCaptures.push([row - 2, column - 2,[row - 1,column - 1]]);
        }
      }
      let moveOptB = $scope.board[row - 1][column + 1];
      let captureOptB = $scope.board[row - 2][column + 2];
      if (moveOptB && moveOptB.blank) {
        moveOptB.movable = true;
        $scope.availableMoves.push([row - 1, column + 1]);
      } else if (moveOptB && moveOptB.red) {
        if (captureOptB && captureOptB.blank) {
          captureOptB.movable = true;
          $scope.availableCaptures.push([row - 2, column + 2,[row - 1, column + 1]]);
        }
      }
    }
  }

  function checkSelectedMove(coords) {
    if (coords.toString() === $scope.selectedSpace.toString()) {
      closeMovePhase();
    } else {
      if ($scope.availableCaptures.length) {
        $scope.availableCaptures.forEach((capture) => {
          let move = [capture[0],capture[1]];
          if (move.toString() === coords.toString()) {
            console.log("valid capture");
            executeMove(coords,capture);
          }
        });
      } else if ($scope.availableMoves.length) {
        $scope.availableMoves.forEach((move) => {
          if (move.toString() === coords.toString()) {
            console.log("valid move")
            executeMove(coords);
          }
        })
      }
    }
  }

  function executeMove(coords,captureCoords) {
    $scope.board[$scope.selectedSpace[0]][$scope.selectedSpace[1]].blank = true;
    $scope.board[$scope.selectedSpace[0]][$scope.selectedSpace[1]][$scope.playerTurn] = false;
    $scope.board[coords[0]][coords[1]].blank = false;
    $scope.board[coords[0]][coords[1]][$scope.playerTurn] = true;
    if (captureCoords && captureCoords.length) {
      let capturedPlayer = "";
      if ($scope.playerTurn === "black") { capturedPlayer = "red"; } else { capturedPlayer = "black"; }
      $scope.board[captureCoords[2][0]][captureCoords[2][1]][capturedPlayer] = false;
      $scope.board[captureCoords[2][0]][captureCoords[2][1]].king = false;
      $scope.board[captureCoords[2][0]][captureCoords[2][1]].blank = true;
    }
    closeMovePhase();
    changePlayerTurn();
  }

  function closeMovePhase() {
    $scope.availableMoves.forEach((move) => {
      let row = move[0],
       column = move[1];
      $scope.board[row][column].movable = false;
    })
    $scope.availableMoves = [];
    $scope.availableCaptures.forEach((move) => {
      let row = move[0],
       column = move[1];
      $scope.board[row][column].movable = false;
    })
    $scope.availableCaptures = [];
    $scope.board[$scope.selectedSpace[0]][$scope.selectedSpace[1]].selected = false;
    $scope.selectedSpace = [];
    $scope.movePhase = false;
  }

  function changePlayerTurn() {
    if ($scope.playerTurn === "black") {
      $scope.playerTurn = "red";
    } else {
      $scope.playerTurn = "black";
    }
  }

  // Evalutes click event and returns array of coordinates: [column,row]
  function returnCoords(evt) {
    let coords = [parseInt(evt.currentTarget.attributes.getNamedItem("row").value),parseInt(evt.currentTarget.attributes.getNamedItem("column").value)];
    console.log("row:",coords[0],"column:",coords[1]);
    return coords;
  }

});
