(function() {
  var Asteroid, Bg, Bullet, Ship;

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
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.drawable = new gl.drawable;
      this.speed = 400;
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

  Asteroid = (function() {

    function Asteroid() {
      this.drawable = new gl.drawable;
      this.color = '#FFF';
      this.x = 0;
      this.y = 0;
      this.width = 12;
      this.height = 12;
      this.rotation = 0;
      this.strokeWidth = 2;
    }

    Asteroid.prototype.draw = function(context) {
      var _this = this;
      return context.fillPath(function(context) {
        context.color('rgba(0, 0, 0, 0)');
        context.strokeColor(_this.color);
        context.strokeWidth(2);
        return context.line(_this.x, _this.y, _this.x + 30, _this.y + 20, _this.x + 35, _this.y + 50, _this.x + 23, _this.y + 60, _this.x - 10, _this.y + 50, _this.x - 20, _this.y + 15, _this.x, _this.y);
      });
    };

    return Asteroid;

  })();

  $(function() {
    return nv.assets = {
      Ship: Ship,
      Bullet: Bullet,
      Bg: Bg,
      Asteroid: Asteroid
    };
  });

}).call(this);
