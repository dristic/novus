(function() {

  window.onload = function() {
    var down, glcanvas, left, right, square, up, update;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    square = new gl.square({
      color: '#0F0',
      y: 30,
      width: 50,
      height: 50
    });
    square.draw = function(context) {
      context.strokeColor('#FFF');
      context.strokeWidth(4);
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + (this.width / 2), this.y - this.height);
      context.lineTo(this.x + this.width, this.y);
      context.lineTo(this.x, this.y);
      context.stroke();
      return context.closePath();
    };
    glcanvas.draw(square);
    up = down = left = right = false;
    update = function() {
      if (left) {
        square.x -= 10;
      }
      if (right) {
        square.x += 10;
      }
      if (up) {
        square.y -= 10;
      }
      if (down) {
        square.y += 10;
      }
      glcanvas.context.clear();
      return glcanvas.draw(square);
    };
    setInterval(update, (1 / 60) * 1000);
    nv.keydown(nv.Key.A, function() {
      return left = true;
    });
    nv.keyup(nv.Key.A, function() {
      return left = false;
    });
    nv.keydown(nv.Key.S, function() {
      return down = true;
    });
    nv.keyup(nv.Key.S, function() {
      return down = false;
    });
    nv.keydown(nv.Key.D, function() {
      return right = true;
    });
    nv.keyup(nv.Key.D, function() {
      return right = false;
    });
    nv.keydown(nv.Key.W, function() {
      return up = true;
    });
    return nv.keyup(nv.Key.W, function() {
      return up = false;
    });
  };

}).call(this);
