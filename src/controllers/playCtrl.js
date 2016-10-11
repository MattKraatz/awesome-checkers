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
    checkAvailableMoves();
  };

  // Handle Move Phase and Player Turn on click
  $scope.checkClick = (evt) => {
    let coords = returnCoords(evt);
    if (!$scope.movePhase) {
      if ($scope.board[coords.x][coords.y][$scope.playerTurn]) {
        if ($scope.availableCaptures.length) {
          $scope.availableCaptures.forEach((capture) => {
            console.log("capture",capture)
            if (stringifyCoords(capture.start) === stringifyCoords(coords)) {
              $scope.board[capture.end.x][capture.end.y].moveable = true;
              $scope.board[coords.x][coords.y].selected = true;
              $scope.selectedSpace = coords;
              $scope.movePhase = true;
            }
          })
        } else if ($scope.availableMoves.length) {
          $scope.availableMoves.forEach((move) => {
            console.log("move",move)
            if (stringifyCoords(move.start) === stringifyCoords(coords)) {
              $scope.board[move.end.x][move.end.y].moveable = true;
              $scope.board[coords.x][coords.y].selected = true;
              $scope.selectedSpace = coords;
              $scope.movePhase = true;
            }
          })
        }
      }
    } else if ($scope.board[coords.x][coords.y].blank) {
      checkSelectedMove(coords);
    } else if (stringifyCoords(coords) === stringifyCoords($scope.selectedSpace)) {
      $scope.selectedSpace = {};
      $scope.movePhase = false;
    }
  };

  function checkAvailableMoves() {
    for (let x = 1; x < 9; x++) {
      for (let y = 1; y < 9; y++) {
        let row = x,
         column = y,
         currentPiece = $scope.board[x][y],
         moveOptA,
         moveOptB,
         captureOptA,
         captureOptB;
        if ($scope.board[x][y][$scope.playerTurn]) {
       // Black player logic
          if ($scope.playerTurn === "black" || ($scope.playerTurn === "red" && currentPiece.king)) {
            if ($scope.board[row + 1]) {
              moveOptA = $scope.board[row + 1][column - 1];
            }
            if ($scope.board[row + 2]) {
              captureOptA = $scope.board[row + 2][column - 2];
            }
            if (moveOptA && moveOptA.blank) {
              $scope.availableMoves.push(moveCoords(customCoords(row,column),customCoords(row + 1, column - 1)));
            } else if (moveOptA && moveOptA.red || (currentPiece.king && moveOptA.black)) {
              if (captureOptA && captureOptA.blank) {
                $scope.availableCaptures.push(captureCoords(customCoords(row,column),customCoords(row + 2, column - 2),customCoords(row + 1, column - 1)));
              }
            }
            if ($scope.board[row + 1]) {
              moveOptB = $scope.board[row + 1][column + 1];
            }
            if ($scope.board[row + 2]) {
              captureOptB = $scope.board[row + 2][column + 2];
            }
            if (moveOptB && moveOptB.blank) {
              $scope.availableMoves.push(moveCoords(customCoords(row,column),customCoords(row + 1, column + 1)));
            } else if (moveOptB && moveOptB.red || (currentPiece.king && moveOptB.black)) {
              if (captureOptB && captureOptB.blank) {
                $scope.availableCaptures.push(captureCoords(customCoords(row,column),customCoords(row + 2, column + 2),customCoords(row + 1, column + 1)));
              }
            }
          }
          // Red player logic
          if ($scope.playerTurn === "red" || ($scope.playerTurn === "black" && currentPiece.king)) {
            moveOptA = $scope.board[row - 1][column - 1];
            if ($scope.board[row - 2]) {
              captureOptA = $scope.board[row - 2][column - 2];
            }
            if (moveOptA && moveOptA.blank) {
              moveOptA.movable = true;
              $scope.availableMoves.push(moveCoords(customCoords(row,column),customCoords(row - 1, column - 1)));
            } else if (moveOptA && moveOptA.black || (currentPiece.king && moveOptA.red)) {
              if (captureOptA && captureOptA.blank) {
                captureOptA.movable = true;
                $scope.availableCaptures.push(captureCoords(customCoords(row,column),customCoords(row - 2, column - 2),customCoords(row - 1,column - 1)));
              }
            }
            moveOptB = $scope.board[row - 1][column + 1];
            if ($scope.board[row - 2]) {
              captureOptB = $scope.board[row - 2][column + 2];
            }
            if (moveOptB && moveOptB.blank) {
              moveOptB.movable = true;
              $scope.availableMoves.push(moveCoords(customCoords(row,column),customCoords(row - 1, column + 1)));
            } else if (moveOptB && moveOptB.black || (currentPiece.king && moveOptB.red)) {
              if (captureOptB && captureOptB.blank) {
                captureOptB.movable = true;
                $scope.availableCaptures.push(captureCoords(customCoords(row,column),customCoords(row - 2, column + 2),customCoords(row - 1, column + 1)));
              }
            }
          }
        }
      }
    }
  }

  // Initialize Move Phase by Identifying Available Moves and Captures, if available
  // function checkAvailableMoves(coords) {
  //   let row = coords.x,
  //    column = coords.y,
  //    selectedPiece = $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y],
  //    moveOptA,
  //    moveOptB,
  //    captureOptA,
  //    captureOptB;
  //    // Black player logic
  //   if ($scope.playerTurn === "black" || ($scope.playerTurn === "red" && selectedPiece.king)) {
  //     if ($scope.board[row + 1]) {
  //       moveOptA = $scope.board[row + 1][column - 1];
  //     }
  //     if ($scope.board[row + 2]) {
  //       captureOptA = $scope.board[row + 2][column - 2];
  //     }
  //     if (moveOptA && moveOptA.blank) {
  //       moveOptA.movable = true;
  //       $scope.availableMoves.push(customCoords(row + 1, column - 1));
  //     } else if (moveOptA && moveOptA.red || (selectedPiece.king && moveOptA.black)) {
  //       if (captureOptA && captureOptA.blank) {
  //         captureOptA.movable = true;
  //         $scope.availableCaptures.push(customCoords(row + 2, column - 2,customCoords(row + 1, column - 1)));
  //       }
  //     }
  //     if ($scope.board[row + 1]) {
  //       moveOptB = $scope.board[row + 1][column + 1];
  //     }
  //     if ($scope.board[row + 2]) {
  //       captureOptB = $scope.board[row + 2][column + 2];
  //     }
  //     if (moveOptB && moveOptB.blank) {
  //       moveOptB.movable = true;
  //       $scope.availableMoves.push(customCoords(row + 1, column + 1));
  //     } else if (moveOptB && moveOptB.red || (selectedPiece.king && moveOptB.black)) {
  //       if (captureOptB && captureOptB.blank) {
  //         captureOptB.movable = true;
  //         $scope.availableCaptures.push(customCoords(row + 2, column + 2,customCoords(row + 1, column + 1)));
  //       }
  //     }
  //   }
  //   // Red player logic
  //   if ($scope.playerTurn === "red" || ($scope.playerTurn === "black" && selectedPiece.king)) {
  //     moveOptA = $scope.board[row - 1][column - 1];
  //     if ($scope.board[row - 2]) {
  //       captureOptA = $scope.board[row - 2][column - 2];
  //     }
  //     if (moveOptA && moveOptA.blank) {
  //       moveOptA.movable = true;
  //       $scope.availableMoves.push(customCoords(row - 1, column - 1));
  //     } else if (moveOptA && moveOptA.black || (selectedPiece.king && moveOptA.red)) {
  //       if (captureOptA && captureOptA.blank) {
  //         captureOptA.movable = true;
  //         $scope.availableCaptures.push(customCoords(row - 2, column - 2,customCoords(row - 1,column - 1)));
  //       }
  //     }
  //     moveOptB = $scope.board[row - 1][column + 1];
  //     if ($scope.board[row - 2]) {
  //       captureOptB = $scope.board[row - 2][column + 2];
  //     }
  //     if (moveOptB && moveOptB.blank) {
  //       moveOptB.movable = true;
  //       $scope.availableMoves.push(customCoords(row - 1, column + 1));
  //     } else if (moveOptB && moveOptB.black || (selectedPiece.king && moveOptB.red)) {
  //       if (captureOptB && captureOptB.blank) {
  //         captureOptB.movable = true;
  //         $scope.availableCaptures.push(customCoords(row - 2, column + 2,customCoords(row - 1, column + 1)));
  //       }
  //     }
  //   }
  //   if ($scope.availableCaptures.length > 0 && $scope.availableMoves.length > 0) {
  //     clearAvailableMoves();
  //   }
  // }

  function checkSelectedMove(coords) {
    console.log("CSM coords", coords)
    if (stringifyCoords(coords) === stringifyCoords($scope.selectedSpace)) {
      closeMovePhase();
    } else {
      if ($scope.availableCaptures.length) {
        $scope.availableCaptures.forEach((capture) => {
          if (stringifyCoords(capture.end) === stringifyCoords(coords)) {
            console.log("valid capture");
            executeMove(capture);
          }
        });
      } else if ($scope.availableMoves.length) {
        $scope.availableMoves.forEach((move) => {
          if (stringifyCoords(move.end) === stringifyCoords(coords)) {
            console.log("valid move");
            executeMove(move);
          }
        })
      }
    }
  }

  function executeMove(coords) {
    console.log(coords)
    // Move handling
    $scope.board[coords.start.x][coords.start.y].blank = true;
    $scope.board[coords.start.x][coords.start.y][$scope.playerTurn] = false;
    $scope.board[coords.end.x][coords.end.y].blank = false;
    $scope.board[coords.end.x][coords.end.y][$scope.playerTurn] = true;
    // Capture handling
    if (coords.capture) {
      console.log("capturing")
      let capturedPlayer = "";
      if ($scope.playerTurn === "black") { capturedPlayer = "red"; } else { capturedPlayer = "black"; }
      $scope.board[coords.capture.x][coords.capture.y][capturedPlayer] = false;
      $scope.board[coords.capture.x][coords.capture.y].king = false;
      $scope.board[coords.capture.x][coords.capture.y].blank = true;
    }
    // King Promotion handling
    if ($scope.playerTurn === "black" && coords.end.x === 8) {
      $scope.board[coords.end.x][coords.end.y].king = true;
      console.log("king me!");
    } else if ($scope.playerTurn === "red" && coords.end.x === 1) {
      $scope.board[coords.end.x][coords.end.y].king = true;
      console.log("king me!");
    }
    // King Move handling
    if ($scope.board[coords.start.x][coords.start.y].king) {
      $scope.board[coords.start.x][coords.start.y].king = false;
      $scope.board[coords.end.x][coords.end.y].king = true;
    }
    changePlayerTurn();
    checkAvailableMoves();
    closeMovePhase();
  }

  function closeMovePhase() {
    clearAvailableMoves();
    if ($scope.availableCaptures) {
      $scope.availableCaptures.forEach((move) => {
        console.log(move)
        $scope.board[move.end.x][move.end.y].movable = false;
      })
    }
    $scope.availableCaptures = [];
    $scope.board[$scope.selectedSpace.x][$scope.selectedSpace.y].selected = false;
    $scope.selectedSpace = {};
    $scope.captureAvailable = false;
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
      $scope.board[move.end.x][move.end.y].movable = false;
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

  function moveCoords(a,b) {
    let coords = {
      start: a,
      end: b
    }
    return coords;
  }

  function captureCoords(a,b,c) {
    let coords = {
      start: a,
      end: b,
      capture: c
    }
  }

  function customCoords(a,b) {
    let coords = {
      x: a,
      y: b
    }
    return coords;
  }

  function stringifyCoords(coords) {
    console.log("coords", coords)
    return coords.x.toString() + coords.y.toString();
  }

});
