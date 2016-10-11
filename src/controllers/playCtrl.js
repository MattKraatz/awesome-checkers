"use strict";

app.controller('playCtrl', function($scope,newBoardFact) {

  // BOARD OBJECT KEY
    // $scope.board = {row#: {column#: {state: bool}}}
    // black starts on top with row 1
    // red starts on bottom with row 8

  $scope.board = {};
  $scope.movePhase = false;
  $scope.playerTurn = "black";
  $scope.selectedSpace = {};
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
    if (!$scope.movePhase) {
      if ($scope.board[coords.x][coords.y][$scope.playerTurn]) {
        $scope.movePhase = true;
        $scope.selectedSpace = coords;
        checkAvailableMoves(coords);
      }
      if (!$scope.availableMoves.length && !$scope.availableCaptures.length) {
        $scope.selectedSpace = {};
        $scope.movePhase = false;
      }
    } else {
      checkSelectedMove(coords);
    }
  };

  // Initialize Move Phase by Identifying Available Moves and Captures, if available
  function checkAvailableMoves(coords) {
    let row = coords.x,
     column = coords.y,
     selectedPiece = $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y],
     moveOptA,
     moveOptB,
     captureOptA,
     captureOptB;
     console.log(selectedPiece);
     // Black player logic
    if ($scope.playerTurn === "black" || ($scope.playerTurn === "red" && selectedPiece.king)) {
      if ($scope.board[row + 1]) {
        moveOptA = $scope.board[row + 1][column - 1];
      }
      if ($scope.board[row + 2]) {
        captureOptA = $scope.board[row + 2][column - 2];
      }
      if (moveOptA && moveOptA.blank) {
        moveOptA.movable = true;
        $scope.availableMoves.push(customCoords(row + 1, column - 1));
      } else if (moveOptA && moveOptA.red || (selectedPiece.king && moveOptA.black)) {
        if (captureOptA && captureOptA.blank) {
          captureOptA.movable = true;
          $scope.availableCaptures.push(customCoords(row + 2, column - 2,customCoords(row + 1, column - 1)));
        }
      }
      if ($scope.board[row + 1]) {
        moveOptB = $scope.board[row + 1][column + 1];
      }
      if ($scope.board[row + 2]) {
        captureOptB = $scope.board[row + 2][column + 2];
      }
      if (moveOptB && moveOptB.blank) {
        moveOptB.movable = true;
        $scope.availableMoves.push(customCoords(row + 1, column + 1));
      } else if (moveOptB && moveOptB.red || (selectedPiece.king && moveOptB.black)) {
        if (captureOptB && captureOptB.blank) {
          captureOptB.movable = true;
          $scope.availableCaptures.push(customCoords(row + 2, column + 2,customCoords(row + 1, column + 1)));
        }
      }
    }
    // Red player logic
    if ($scope.playerTurn === "red" || ($scope.playerTurn === "black" && selectedPiece.king)) {
      moveOptA = $scope.board[row - 1][column - 1];
      if ($scope.board[row - 2]) {
        captureOptA = $scope.board[row - 2][column - 2];
      }
      if (moveOptA && moveOptA.blank) {
        moveOptA.movable = true;
        $scope.availableMoves.push(customCoords(row - 1, column - 1));
      } else if (moveOptA && moveOptA.black || (selectedPiece.king && moveOptA.red)) {
        if (captureOptA && captureOptA.blank) {
          captureOptA.movable = true;
          $scope.availableCaptures.push(customCoords(row - 2, column - 2,customCoords(row - 1,column - 1)));
        }
      }
      moveOptB = $scope.board[row - 1][column + 1];
      if ($scope.board[row - 2]) {
        captureOptB = $scope.board[row - 2][column + 2];
      }
      if (moveOptB && moveOptB.blank) {
        moveOptB.movable = true;
        $scope.availableMoves.push(customCoords(row - 1, column + 1));
      } else if (moveOptB && moveOptB.black || (selectedPiece.king && moveOptB.red)) {
        if (captureOptB && captureOptB.blank) {
          captureOptB.movable = true;
          $scope.availableCaptures.push(customCoords(row - 2, column + 2,customCoords(row - 1, column + 1)));
        }
      }
    }
    if ($scope.availableCaptures.length > 0 && $scope.availableMoves.length > 0) {
      clearAvailableMoves();
    }
  }

  function checkSelectedMove(coords) {
    if (stringifyCoords(coords) === stringifyCoords($scope.selectedSpace)) {
      closeMovePhase();
    } else {
      if ($scope.availableCaptures.length) {
        $scope.availableCaptures.forEach((capture) => {
          if (stringifyCoords(capture) === stringifyCoords(coords)) {
            console.log("valid capture");
            executeMove(coords,capture);
          }
        });
      } else if ($scope.availableMoves.length) {
        $scope.availableMoves.forEach((move) => {
          if (stringifyCoords(move) === stringifyCoords(coords)) {
            console.log("valid move")
            executeMove(coords);
          }
        })
      }
    }
  }

  function executeMove(coords,captureCoords) {
    // Move handling
    $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y].blank = true;
    $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y][$scope.playerTurn] = false;
    $scope.board[coords.x][coords.y].blank = false;
    $scope.board[coords.x][coords.y][$scope.playerTurn] = true;
    // Capture handling
    if (captureCoords && captureCoords.capture) {
      let capturedPlayer = "";
      if ($scope.playerTurn === "black") { capturedPlayer = "red"; } else { capturedPlayer = "black"; }
      $scope.board[captureCoords.capture.x][captureCoords.capture.y][capturedPlayer] = false;
      $scope.board[captureCoords.capture.x][captureCoords.capture.y].king = false;
      $scope.board[captureCoords.capture.x][captureCoords.capture.y].blank = true;
    };
    // King Promotion handling
    if ($scope.playerTurn === "black" && coords.x === 8) {
      $scope.board[coords.x][coords.y].king = true;
      console.log("king me!");
    } else if ($scope.playerTurn === "red" && coords.x === 1) {
      $scope.board[coords.x][coords.y].king = true;
      console.log("king me!");
    };
    // King Move handling
    if ($scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y].king) {
      $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y].king = false;
      $scope.board[coords.x][coords.y].king = true;
    }
    closeMovePhase();
    changePlayerTurn();
  }

  function closeMovePhase() {
    clearAvailableMoves();
    $scope.availableCaptures.forEach((move) => {
      $scope.board[move.x][move.y].movable = false;
    })
    $scope.availableCaptures = [];
    $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y].selected = false;
    $scope.selectedSpace = {};
    $scope.movePhase = false;
  }

  function changePlayerTurn() {
    if ($scope.playerTurn === "black") {
      $scope.playerTurn = "red";
    } else {
      $scope.playerTurn = "black";
    }
  }

  function clearAvailableMoves() {
    $scope.availableMoves.forEach((move) => {
      $scope.board[move.x][move.y].movable = false;
    })
    $scope.availableMoves = [];
  }

  // Evalutes click event and returns array of coordinates: [column,row]
  function returnCoords(evt) {
    let coords = {
      x: parseInt(evt.currentTarget.attributes.getNamedItem("row").value),
      y: parseInt(evt.currentTarget.attributes.getNamedItem("column").value)
    };
    console.log("row:",coords.x,"column:",coords.y);
    return coords;
  }

  function customCoords(a,b,c) {
    let coords = {
      x: a,
      y: b
    }
    if (c) {
      coords.capture = c;
    }
    return coords;
  }

  function stringifyCoords(coords) {
    return coords.x.toString() + coords.y.toString();
  }

});
