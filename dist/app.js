(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let pieces = require('./scripts');

var _movePhase = false;
var x;
var y;

function setEvents () {
	$('.emptySpace').on('click', checkSpace);

	function checkSpace (e) {
    let currentPiece = pieces.getPieceFromArray($(e.currentTarget));
    if(!_movePhase && currentPiece) {
		  console.dir(currentPiece);
			x = parseInt(e.currentTarget.attributes.x.value);
			y = parseInt(e.currentTarget.attributes.y.value);
      getPieceColor(currentPiece);
      console.log("move phase is: ", _movePhase)
		}
	};

  function getPieceColor (currentPiece){
    if(currentPiece.color === "red"){
      checkMoves(currentPiece, 1, "black")
    }
    if (currentPiece.color === "black"){
      checkMoves(currentPiece, -1, "red")
    }
  };

  function checkMoves (currentPiece, number, opponent) {
    let move1 = pieces.getPieceFromArray($(`[x=${x+1}][y=${y+number}]`));
    let move2 = pieces.getPieceFromArray($(`[x=${x-1}][y=${y+number}]`));
    let jump1 = pieces.getPieceFromArray($(`[x=${x+2}][y=${y+(2*number)}]`));
    let jump2 = pieces.getPieceFromArray($(`[x=${x-2}][y=${y+(2*number)}]`));

    if (move1 === null || move2 === null){
      console.log("can move")
      currentPiece.canMove = true;
      makeMove(currentPiece)
    }
    if (move1){
      if (move1.color === opponent && !jump1){
        console.log("can jump")
        currentPiece.canJump = true;
        makeMove(currentPiece)
      }
<<<<<<< HEAD
    }
    if (move2){
      if (move2.color === opponent && !jump2){
        console.log("can jump")
        currentPiece.canJump = true;
        makeMove(currentPiece)
=======
      if (topRight){
        if (topRight.color === "black" && !topJumpRight){
          console.log("can jump right")
          currentPiece.canJump = true;
        }
      }
      if (topLeft){
        if (topLeft.color === "black" && !topJumpLeft){
          console.log("can jump left")
          currentPiece.canJump = true;
        }
>>>>>>> 69aeb015530721a3d5a33108910adb09e4b6ef6a
      }
    }
    _movePhase = currentPiece.canMove || currentPiece.canJump
  };

  function makeMove(currentPiece){
    if (_movePhase) {
      $('.emptySpace').on('click', getLocation);

      function getLocation(e){
        var newLocation = getPieceFromArray(e.currentTarget)
        console.log("New Location", newLocation)
      }
    }
  }

};

module.exports = setEvents;


},{"./scripts":4}],2:[function(require,module,exports){
"use strict";

var Piece = function(){
  this.canMove = false;
  this.canJump = false;
  this.canBeJumped = false;
  this.color = null;
  this.node = null;
}
Piece.prototype.jump = function(){

}
Piece.prototype.remove = function(){

}
Piece.prototype.setNode = function() {
  this.node = $(`[x=${this.x}][y=${this.y}]`);
}

/**
 * Changes the coordinates of this piece
 * @param  {Integer} x X coordinate of piece
 * @param  {Integer} y Y coordinate of piece
 */
Piece.prototype.changeCoords = function(x, y) {
  this.x = x
  this.y = y
  this.setNode()
}

var RedPiece = function (x, y){
  this.color = "red";
  this.changeCoords(x, y);
}

RedPiece.prototype = new Piece();

var BlackPiece = function (x, y){
  this.color = "black";
  this.changeCoords(x, y);
}
BlackPiece.prototype = new Piece();

module.exports = {Piece, RedPiece, BlackPiece};


},{}],3:[function(require,module,exports){
"use strict";
var checkerBoard = require('./scripts.js');
var events = require('./events.js');

checkerBoard.createCheckerboard()
checkerBoard.createPieces(0, 1, 2, "RedPiece", 0)
checkerBoard.createPieces(5, 6, 7, "BlackPiece", 1)
checkerBoard.populatePieces()
events();
console.log(checkerBoard.getArrayOfPieces())

},{"./events.js":1,"./scripts.js":4}],4:[function(require,module,exports){
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

module.exports = {createCheckerboard, createPieces, getArrayOfPieces, populatePieces, getPieceFromArray};

},{"./pieces.js":2}]},{},[3]);
