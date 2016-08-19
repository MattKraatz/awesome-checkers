"use strict";

let pieces = require('./scripts');

var _movePhase = false;

function setEvents () {
	$('.emptySpace').on('click', checkSpace);

	function checkSpace (e) {
    let currentPiece = pieces.getPieceFromArray(e.currentTarget);
		console.dir(currentPiece);
    if(!_movePhase && currentPiece) {
			var spacex = parseInt(e.currentTarget.attributes.x.value);
			var spacey = parseInt(e.currentTarget.attributes.y.value);
      _movePhase = true;
		};
	};
};

module.exports = setEvents;

