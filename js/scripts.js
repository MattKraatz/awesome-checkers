"use strict";
var pieces = require('./pieces.js');
let arrayOfPieces = [];

// Returns a piece from the pieces array if it exists
// Otherwise returns undefined
function getPieceFromArray(domNode) {
  // console.log("passed in DOM node", domNode)
  let x = domNode.attr('x');
  let y = domNode.attr('y');

  let locatedNode = arrayOfPieces.filter(function(piece) {
    if (piece.x == x && piece.y == y) {
      return piece;
    }
  });
  //Check to see if there is an x and y before returning anything
  if (x && y){
    if (locatedNode.length) {
      return locatedNode[0];
    } else {
      return null;
    }
  }
}

function getCoordinates(element){
  let x = element.attr('x');
  let y = element.attr('y');
  return {x, y}
}

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
function createPieces (row1, row2, row3, piece, number){
  for(let x=0; x<8; x++){
    for (let y=row1; y<(row3+1); y++){
      //If the row is 0 or 2 AND the x-value is even, create a red piece with correct coordinates
      if ((y === row1 || y === row3) && (x+number)%2 === 0){
          var newPiece = new pieces[piece](x,y)
          arrayOfPieces.push(newPiece)
        }
      //If the row is 1 AND the x-value is odd, create a red piece with correct coordinates
      if (y === row2 && (x+1-number)%2===0){
          var newPiece = new pieces[piece](x,y)
          arrayOfPieces.push(newPiece)
      }
    }
  }
}

function populatePieces() {
    for(let x=0; x<8; x++){
      for (let y=0; y<8; y++){
        $(`[x=${x}][y=${y}] > div`).removeClass("redPiece blackPiece");
        arrayOfPieces.forEach(function(piece){
          if (piece.x === x && piece.y === y) {
            $(`[x=${x}][y=${y}] > div`).addClass(`${piece.color}Piece`);
          }
        })
      }
    }
}

module.exports = {createCheckerboard, createPieces, getArrayOfPieces, populatePieces, getPieceFromArray, getCoordinates};
