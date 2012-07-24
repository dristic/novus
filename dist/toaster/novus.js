(function() {

  window.onload = function() {
    var down, glcanvas, left, right, speed, square, up, update;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    square = new gl.square({
      color: '#0F0',
      y: 30,
      width: 12,
      height: 18,
      rotation: 0,
      strokeWidth: 2
    });
    square.draw = function(context) {
      var _this = this;
      context.strokeColor('#FFF');
      context.strokeWidth(this.strokeWidth);
      return context.rotateAround(this.x + (this.width / 2), this.y + (this.height / 2), this.rotation, function() {
        return context.line(_this.x, _this.y + _this.height, _this.x + (_this.width / 2), _this.y, _this.x + _this.width, _this.y + _this.height, _this.x, _this.y + _this.height);
      });
    };
    glcanvas.draw(square);
    up = down = left = right = false;
    speed = 5;
    update = function() {
      var dimensions;
      if (left) {
        square.rotation -= 0.1;
      }
      if (right) {
        square.rotation += 0.1;
      }
      if (up) {
        square.y -= speed * Math.cos(square.rotation);
        square.x += speed * Math.sin(square.rotation);
      }
      if (down) {
        square.y += speed / 2 * Math.cos(square.rotation);
        square.x -= speed / 2 * Math.sin(square.rotation);
      }
      dimensions = glcanvas.size();
      if (square.x < 0) {
        square.x = dimensions.height;
      } else if (square.x > dimensions.height) {
        square.x = 0;
      }
      if (square.y < 0) {
        square.y = dimensions.height;
      } else if (square.y > dimensions.height) {
        square.y = 0;
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
