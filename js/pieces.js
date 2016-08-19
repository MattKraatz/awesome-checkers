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
Piece.prototype.getCoordinates = function(){
  
}

var RedPiece = function (x, y){
  this.color = "red";
  this.x = x;
  this.y = y;
}
RedPiece.prototype = new Piece();

var BlackPiece = function (x, y){
  this.color = "black";
  this.x = x;
  this.y = y;
}
BlackPiece.prototype = new Piece();

module.exports = {Piece, RedPiece, BlackPiece};

