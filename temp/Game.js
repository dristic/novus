var Game;

Game = (function() {

  function Game() {
    console.log('game created');
  }

  Game.prototype.start = function(id) {
    return console.log(id);
  };

  return Game;

})();
