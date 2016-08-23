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

    if (move1 === null){
      console.log("can move")
      currentPiece.canMove = true;
      currentPiece.validMoves.push({x: x + 1, y: y+number})
      console.log(currentPiece)
    }
    if (move2 === null){
      console.log("can move")
      currentPiece.canMove = true;
      currentPiece.validMoves.push({x: x - 1, y: y+number})
      console.log(currentPiece)
    }
    if (move1){
      if (move1.color === opponent && !jump1){
        console.log("can jump")
        currentPiece.canJump = true;
        currentPiece.canMove = false;
        currentPiece.validJumps.push({x: x + 2, y: y+(2 * number)})
        console.log(currentPiece)
      }
    }
    if (move2){
      if (move2.color === opponent && !jump2){
        console.log("can jump")
        currentPiece.canJump = true;
        currentPiece.canMove = false;
        currentPiece.validJumps.push({x: x - 2, y: y+(2 * number)})
        console.log(currentPiece)
      }
    }
    _movePhase = currentPiece.canMove || currentPiece.canJump
  };

//Okay for some reason currentPiece.validMoves grows out of control sometimes.
//Not totally sure why, honestly
//Each piece's moves keep getting added to the arrays

  function makeMove(currentPiece, e){
    console.log("current piece", currentPiece);
    let selectedSpace = pieces.getCoordinates($(e.currentTarget));

    currentPiece.validMoves.forEach( function (coords) {
      if (parseInt(selectedSpace.x) === coords.x && parseInt(selectedSpace.y) === coords.y) {
        currentPiece.changeCoords(parseInt(selectedSpace.x), parseInt(selectedSpace.y));
      }
    })

    _movePhase = false;
    pieces.populatePieces();
  }

};

//Future fixes: Make .canMove = false if .canJump = true

module.exports = setEvents;

