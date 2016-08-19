(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _movePhase = false;

function setEvents () {
	$('.emptySpace').on('click', checkSpace);

	function checkSpace (e) {
		if(!_movePhase && e.currentTarget.children([0])) {
			var spacex = parseInt(e.currentTarget.attributes.x.value);
			var spacey = parseInt(e.currentTarget.attributes.y.value);
      _movePhase = true;
		};
	};
};

module.exports = setEvents;


},{}],2:[function(require,module,exports){
"use strict";

var Piece = function(){
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

module.exports = {createCheckerboard, createPieces, getArrayOfPieces, populatePieces};

},{"./pieces.js":2}]},{},[3]);
