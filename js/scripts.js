
function createCheckerboard () {
  var checkerboard = ""
  for (i=7; i>=0; i--) {
    checkerboard += `<div class='checkerRow'>`
    for (j=0; j<8; j++){
      checkerboard += `<div class='emptySpace' x=${j} y=${i}><div></div></div>`
    }
    checkerboard += `</div>`
  }
  $(".checkerBoard").append(checkerboard)
}

createCheckerboard()