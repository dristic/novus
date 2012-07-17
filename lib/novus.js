
window.onload = function() {
  var game, glcanvas;
  console.log('working');
  game = new Game();
  game.start(20);
  glcanvas = gl(document.querySelector('canvas'));
  console.log(glcanvas);
  glcanvas.size(200, 200);
  return glcanvas.background('#000');
};
