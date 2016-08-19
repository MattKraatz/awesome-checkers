
function createCheckerboard () {
  for (i=7; i>=0; i--) {
    $(".checkerBoard").append("<div class='row'><div class='col-xs-2'></div>");
    for (j=0; j<8; j++){
      $(".checkerBoard").append("<div class='col-xs-1 hasRed hasBlack empty' x=j y=i><div class='piece'></div></div>")
    }
    $(".checkerBoard").append("<div class='col-xs-2'></div></div>")
  }
}
