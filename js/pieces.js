"use strict";

var Piece = function(){
  this.canJump = false;
  this.canBeJumped = false;
  this.color = null;
}
Piece.prototype.jump = function(){

}
Piece.prototype.remove = function(){

}

var RedPiece = function (){
  this.color = "red"
}
RedPiece.prototype = new Piece()

var BlackPiece = function (){
  this.color = "black"
}
BlackPiece.prototype = new Piece()

module.exports = {Piece, RedPiece, BlackPiece}

