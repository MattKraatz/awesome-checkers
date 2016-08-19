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

