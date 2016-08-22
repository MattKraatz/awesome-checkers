 "use strict";

let pieces = require('./scripts');

let _movePhase = false;
let x;
let y;
let currentPiece;

function setEvents () {
	$('.emptySpace').on('click', checkSpace);

	function checkSpace (e) {
    if (currentPiece){
    var selectedPiece = currentPiece;
    }
    currentPiece = pieces.getPieceFromArray($(e.currentTarget));
      if (_movePhase){
        makeMove(selectedPiece, e)
      }
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
    }
    if (move1){
      if (move1.color === opponent && !jump1){
        console.log("can jump")
        currentPiece.canJump = true;
      }
    }
    if (move2){
      if (move2.color === opponent && !jump2){
        console.log("can jump")
        currentPiece.canJump = true;
      }
    }
    _movePhase = currentPiece.canMove || currentPiece.canJump
  };

  function makeMove(currentPiece, e){
    console.log("current piece", currentPiece);
    let selectedSpace = pieces.getCoordinates($(e.currentTarget));
    console.log("New Location x", selectedSpace.x);
    console.log("New Location y", selectedSpace.y);
    currentPiece.changeCoords(parseInt(selectedSpace.x), parseInt(selectedSpace.y));
    console.log(currentPiece);
    _movePhase = false;
    pieces.populatePieces();
  }

};

module.exports = setEvents;

