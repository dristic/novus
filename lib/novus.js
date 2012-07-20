(function() {

  window.onload = function() {
    var glcanvas, square;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    square = new gl.square({
      color: '#0F0',
      y: 30
    });
    glcanvas.draw(square);
    nv.keydown(nv.Key.A, function() {
      glcanvas.context.clear();
      square.x -= 10;
      return glcanvas.draw(square);
    });
    nv.keydown(nv.Key.S, function() {
      glcanvas.context.clear();
      square.y += 10;
      return glcanvas.draw(square);
    });
    nv.keydown(nv.Key.D, function() {
      glcanvas.context.clear();
      square.x += 10;
      return glcanvas.draw(square);
    });
    return nv.keydown(nv.Key.W, function() {
      glcanvas.context.clear();
      square.y -= 10;
      return glcanvas.draw(square);
    });
  };

}).call(this);
