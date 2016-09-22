// TODO: Improve AI and spruce up board

var a1, a2, a3, b1, b2, b3, c1, c2, c3;
var won = [1, 2, 3, 4, 5, 6, 7, 8, 9, ""];
var pcMoves = [];
var pMoves = [];
var player;
var AI;
var choice = [];
var turn = 0;

function compare(a, b) {
  return a - b;
}

function update() {
  a1 = $("#1").text();
  a2 = $("#2").text();
  a3 = $("#3").text();
  b1 = $("#4").text();
  b2 = $("#5").text();
  b3 = $("#6").text();
  c1 = $("#7").text();
  c2 = $("#8").text();
  c3 = $("#9").text();
}

function win(pl) {
  update();
  var check = pMoves;

  if ((a1 == pl && a2 == pl && a3 == pl) ||
    (b1 == pl && b2 == pl && b3 == pl) ||
    (c1 == pl && c2 == pl && c3 == pl) ||
    (a1 == pl && b2 == pl && c3 == pl) ||
    (a3 == pl && b2 == pl && c1 == pl) ||
    (a1 == pl && b1 == pl && c1 == pl) ||
    (a2 == pl && b2 == pl && c2 == pl) ||
    (a3 == pl && b3 == pl && c3 == pl)
  ) {
    $(".over").text(pl.toUpperCase() + " Wins");

    $(".box").attr("disabled", true);
    $(".moved").show();
  } else if (check.length == 10) {
    $(".over").text("Draw");
    $(".moved").show();
    $(".box").attr("disabled", true);
  }

}

function moves(id, a) {

  var ele = document.getElementById(id);

  $(ele).text(a);

  ele.disabled = true;

};

function check(AI) {
  var move;

  update();

  if (a1 == "" && ((a3 == player && a2 == player) || (c3 == player && b2 == player) || (c1 == player && b1 == player))) {
    moves("1", AI);
    move = 1;
  } else {
    if (a2 == "" && ((a1 == player && a3 == player) || (c2 == player && b2 == player))) {
      moves("2", AI);
      move = 2;
    } else {
      if (a3 == "" && ((a1 == player && a2 == player) || (c1 == player && b2 == player) || (c3 == player && b3 == player))) {
        moves("3", AI);
        move = 3;
      } else {
        if (c3 == "" && ((c1 == player && c2 == player) || (a1 == player && b2 == player) || (a3 == player && b3 == player))) {
          moves("9", AI);
          move = 9;
        } else {
          if (c1 == "" && ((c3 == player && c2 == player) || (a3 == player && b2 == player) || (a1 == player && b1 == player))) {
            moves("7", AI);
            move = 7;
          } else {
            if (c2 == "" && ((c3 == player && c1 == player) || (a2 == player && b2 == player))) {
              moves("8", AI);
              move = 8;
            } else {
              if (b1 == "" && ((b3 == player && b2 == player) || (a1 == player && c1 == player))) {
                moves("4", AI);
                move = 4;
              } else {
                if (b3 == "" && ((a3 == player && c3 == player) || (b2 == player && b1 == player))) {
                  moves("6", AI);
                  move = 6;
                } else {
                  if (b2 == "" && ((a3 == player && c1 == player) || (c3 == player && a1 == player) || (b3 == player && b1 == player) || (c2 == player && a2 == player))) {
                    moves("5", AI);
                    move = 5;
                  } else {
                    if (b2 == "" && ((a1 == AI && c3 == AI) || (a3 == AI && c1 == AI) || (b1 == AI && b3 == AI) || (a2 == AI && c2 == AI))) {
                      moves("5", AI);
                      move = 5;
                    } else {
                      if (c2 == "" && ((c1 == AI && c3 == AI) || (b2 == AI && a2 == AI))) {
                        moves("8", AI);
                        move = 8;
                      } else {
                        if (b2 == "") {
                          moves("5", AI);
                          move = 5;

                        } else {
                          if (a1 == "") {
                            moves("1", AI);
                            move = 1;

                          } else {
                            if (c3 == "") {
                              moves("9", AI);
                              move = 9;

                            } else {
                              if (c2 == "") {
                                moves("8", AI);
                                move = 8;

                              } else {
                                if (b1 == "") {
                                  moves("4", AI);
                                  move = 4;
                                } else {
                                  if (a3 == "") {
                                    moves("3", AI)
                                    move = 3;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  pMoves.push(move);

  pMoves.sort(compare);
  win(AI);
};

$(".box").click(function() {
  var move = $(this).attr("id");
  var id = document.getElementById(this);

  $(this).text(player);

  pMoves.push(move);
  pMoves.sort(compare);

  
  onClick = this.disabled = true;
  onClick = this.hover = $(this).css("opacity", 1);
  
  check(AI);
  update();
  win(player);
  turn++;
});

$(".moved").click(function() {
  location.reload(true);
});

$(document).ready(function() {
  $(".box").attr("disabled", true);
  $(".moved").hide();
  var modal = document.getElementById('mod');
  var cX = document.getElementById('isX');
  var cO = document.getElementById('isO');

  modal.style.display = "block";
  cX.onclick = function() {
    player = "x";
    $(".player").text("Player is " + player.toUpperCase());
    AI = "o";
    modal.style.display = 'none';
    $(".box").attr("disabled", false);
  };
  cO.onclick = function() {
    player = "o";
    $(".player").text("Player is " + player.toUpperCase());
    AI = "x";
    modal.style.display = 'none';
    check(AI);
    $(".box").attr("disabled", false);
    $(".b2").attr("disabled", true);
    $(".b2").text("x");
    pMoves.push("5");
  };

});
