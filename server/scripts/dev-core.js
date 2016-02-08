// This is a new fresh object oriented version of my game.

// Game object.
function gameCore() {
  // Root for reference.
  var root = this;

  // Information storage
  this.sets = {
    game : {
      mode : 0,
      turn : 1,
      justwon : 0,
      settings : {
        monotonemode : false,
        colourblindmode : false,
        winnergoesfirst : false,
        firsttothree : false
      }
    },
    players : {
      one : {
        name : "Player 1",
        score : 0
      },
      two : {
        name : "Player 2",
        score : 0
      },
      three : {
        name : "Player 3",
        score : 0
      }
    },
    patterns : {

    }
  };

  // Initialisation function
  this.init = function() {

  };

  // General functions.
  this.func = {

  };

  // Functions that control turns.
  this.turn = {

  };

  // Functions that controls the scores.
  this.scores = {

  };

  // Functions that control cookies.
  this.cookies = {

  };

  // Functions that control interaction with the board.
  this.manip = {

  };

}

var game = new gameCore;
console.log(gameCore.sets);
