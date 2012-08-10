(function() {
  var Bg, Bullet, Ship;

  Bg = (function() {

    function Bg() {
      var i, radius, x, y;
      this.canvas = gl().size(700, 700);
      this.x = 0;
      this.y = 0;
      i = 0;
      while (!(i > 100)) {
        i++;
        x = Math.random() * 700;
        y = Math.random() * 700;
        radius = (Math.random() * 2) + 0.5;
        this.canvas.context.fillPath(function(context) {
          context.color('#FFFFFF');
          return context.arc(x, y, radius, 0, Math.PI * 2, true);
        });
      }
    }

    Bg.prototype.draw = function(context, canvas) {
      return context.drawImage(this.canvas, this.x, this.y);
    };

    return Bg;

  })();

  Bullet = (function() {

    function Bullet(x, y, angle) {
      this.drawable = new gl.drawable;
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 2;
      this.radius = 3;
    }

    Bullet.prototype.update = function(dt) {
      this.x += this.speed * Math.sin(this.angle) * dt;
      this.y -= this.speed * Math.cos(this.angle) * dt;
      if (this.x < -100 || this.x > 900) {
        if (this.y < -100 || this.y > 900) {
          return this["delete"] = true;
        }
      }
    };

    Bullet.prototype.draw = function(context) {
      var _this = this;
      return context.fillPath(function(context) {
        context.color('#ff7600');
        return context.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, true);
      });
    };

    return Bullet;

  })();

  Ship = (function() {

    function Ship() {
      this.drawable = new gl.square;
      this.color = '#0F0';
      this.x = 0;
      this.y = 30;
      this.width = 12;
      this.height = 18;
      this.rotation = 0;
      this.strokeWidth = 2;
    }

    Ship.prototype.draw = function(context) {
      var _this = this;
      context.strokeColor('#FFF');
      context.strokeWidth(this.strokeWidth);
      return context.rotateAround(this.x + (this.width / 2), this.y + (this.height / 2), this.rotation, function() {
        return context.line(_this.x, _this.y + _this.height, _this.x + (_this.width / 2), _this.y, _this.x + _this.width, _this.y + _this.height, _this.x, _this.y + _this.height);
      });
    };

    return Ship;

  })();

  window.onload = function() {
    var bg, bg2, gamepad, glcanvas, ship, shootDelay, speed, update;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    ship = new Ship;
    bg = new Bg;
    bg2 = new Bg;
    glcanvas.addDrawable(ship);
    glcanvas.addDrawable(bg);
    glcanvas.addDrawable(bg2);
    gamepad = nv.gamepad();
    gamepad.aliasKey('left', nv.Key.A);
    gamepad.aliasKey('right', nv.Key.D);
    gamepad.aliasKey('up', nv.Key.W);
    gamepad.aliasKey('down', nv.Key.S);
    gamepad.aliasKey('shoot', nv.Key.Spacebar);
    speed = 5;
    shootDelay = 10;
    update = function(dt) {
      var dimensions, object, state, _i, _len, _ref;
      state = gamepad.getState();
      if (state.left) {
        ship.rotation -= 0.1;
      }
      if (state.right) {
        ship.rotation += 0.1;
      }
      if (state.up) {
        ship.y -= speed * Math.cos(ship.rotation);
        ship.x += speed * Math.sin(ship.rotation);
      }
      if (state.down) {
        ship.y += speed / 2 * Math.cos(ship.rotation);
        ship.x -= speed / 2 * Math.sin(ship.rotation);
      }
      if (state.shoot && shootDelay === 0) {
        glcanvas.addDrawable(new Bullet(ship.x, ship.y, ship.rotation));
        shootDelay = 10;
      }
      if (shootDelay) {
        shootDelay--;
      }
      _ref = glcanvas.objects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        if (object instanceof Bullet) {
          object.update(dt);
          if (object["delete"]) {
            glcanvas.removeDrawable(object);
          }
        }
      }
      dimensions = glcanvas.size();
      if (ship.x < 0) {
        ship.x = dimensions.height;
      } else if (ship.x > dimensions.height) {
        ship.x = 0;
      }
      if (ship.y < 0) {
        ship.y = dimensions.height;
      } else if (ship.y > dimensions.height) {
        ship.y = 0;
      }
      bg.x = -ship.x * 0.05;
      bg.y = -ship.y * 0.05;
      bg2.x = -ship.x * 0.01;
      return bg2.y = -ship.y * 0.01;
    };
    return glcanvas.startDrawUpdate(60, update);
  };

}).call(this);
