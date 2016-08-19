
function createCheckerboard () {
  var checkerboard = ""
  for (i=7; i>=0; i--) {
      checkerboard += `<div class='row row-eq-height'><div class='col-xs-2'></div>`
    for (j=0; j<8; j++){
      checkerboard += `<div class='col-xs-1 emptySpace' x=${j} y=${i}><div class='piece'></div></div>`
    }
      checkerboard += `<div class='col-xs-2'></div></div>`
  }
  $(".checkerBoard").append(checkerboard)
}

createCheckerboard()