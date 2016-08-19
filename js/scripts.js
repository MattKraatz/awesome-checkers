"use strict";
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

module.exports = createCheckerboard;
