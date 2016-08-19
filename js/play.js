"use strict";
var checkerBoard = require('./scripts.js');

checkerBoard.createCheckerboard()
checkerBoard.createPieces(0, 1, 2, "RedPiece", 0)
checkerBoard.createPieces(5, 6, 7, "BlackPiece", 1)
checkerBoard.populatePieces()
console.log(checkerBoard.getArrayOfPieces())
