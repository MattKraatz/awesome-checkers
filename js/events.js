"use strict";

let pieces = require('./scripts');

var _movePhase = false;

function setEvents () {
	$('.emptySpace').on('click', checkSpace);

	function checkSpace (e) {
    let currentPiece = pieces.getPieceFromArray($(e.currentTarget));
    if(!_movePhase && currentPiece) {
		  console.dir(currentPiece);
			var spacex = parseInt(e.currentTarget.attributes.x.value);
			var spacey = parseInt(e.currentTarget.attributes.y.value);
      _movePhase = checkMoves(spacex, spacey, currentPiece);
      console.log("move phase is: ", _movePhase)
		}
	};

  function checkMoves (x, y, currentPiece){
    if(currentPiece.color === "red"){
      let topRight = pieces.getPieceFromArray($(`[x=${x+1}][y=${y+1}]`));
      let topLeft = pieces.getPieceFromArray($(`[x=${x-1}][y=${y+1}]`));
      let topJumpRight = pieces.getPieceFromArray($(`[x=${x+2}][y=${y+2}]`));
      let topJumpLeft = pieces.getPieceFromArray($(`[x=${x-2}][y=${y+2}]`));
      if (!topRight || !topLeft){
        console.log("can move")
        currentPiece.canMove = true;
      }
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
      }
      return currentPiece.canMove || currentPiece.canJump
    }
  };

};

module.exports = setEvents;

