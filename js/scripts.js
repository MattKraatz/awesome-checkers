"use strict";
var pieces = require('./pieces.js');
let arrayOfPieces = [];

function getArrayOfPieces (){
  return arrayOfPieces;
}

function createCheckerboard () {
  var checkerboard = ""
  for (let i=7; i>=0; i--) {
    checkerboard += `<div class='checkerRow'>`
    for (let j=0; j<8; j++){
      checkerboard += `<div class='emptySpace' x=${j} y=${i}><div></div></div>`
    }
    checkerboard += `</div>`
  }
  $(".checkerBoard").append(checkerboard)
}

//Rows where y= 0, 1, 2
function createRedPieces (){
  for(let x=0; x<8; x++){
    for (let y=0; y<3; y++){
      //If the row is 0 or 2 AND the x-value is even, create a red piece with correct coordinates
      if ((y === 0 || y === 2) && x%2 === 0){
          var red = new pieces.RedPiece(x,y)
          arrayOfPieces.push(red)
        }
      //If the row is 1 AND the x-value is odd, create a red piece with correct coordinates
      if (y === 1 && (x+1)%2===0){
          var red = new pieces.RedPiece(x,y)
          arrayOfPieces.push(red)
      }
    }
  }
}

//Rows where y= 5, 6, 7
function createBlackPieces (){
  for(let x=0; x<8; x++){
    for (let y=5; y<8; y++){
      //If the row is 5 or 7 AND the x-value is odd, create a black piece with correct coordinates
      if ((y === 5 || y === 7) && (x+1)%2 === 0){
          var black = new pieces.BlackPiece(x,y)
          arrayOfPieces.push(black)
        }
      //If the row is 6 AND the x-value is even, create a black piece with correct coordinates
      if (y === 6 && x%2===0){
          var black = new pieces.BlackPiece(x,y)
          arrayOfPieces.push(black)
      }
    }
  }
}

// Loop through checkerboard, remove classes from every DIV
function populatePieces() {
    for(let x=0; x<8; x++){
      for (let y=0; y<8; y++){
        $(`[x=${x}][y=${y}] > div`).removeClass("redPiece blackPiece");
        // Loop through pieces array, add classes to board according to piece coords
        arrayOfPieces.forEach(function(piece){
          if (piece.x === x && piece.y === y) {
            $(`[x=${x}][y=${y}] > div`).addClass(`${piece.color}Piece`);
          }
        })
      }
    }
}

module.exports = {createCheckerboard, createRedPieces, createBlackPieces, getArrayOfPieces, populatePieces};
