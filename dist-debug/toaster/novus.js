(function() {

  $(function() {
    var asteroid, asteroidController, bg, bg2, controllers, gamepad, glcanvas, ship, shootDelay, speed, update;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    glcanvas.fullscreen();
    ship = new nv.assets.Ship;
    bg = new nv.assets.Bg;
    bg2 = new nv.assets.Bg;
    asteroid = new nv.assets.Asteroid;
    asteroidController = new nv.controllers.AsteroidController(asteroid);
    controllers = [asteroidController];
    glcanvas.addDrawable(ship);
    glcanvas.addDrawable(bg);
    glcanvas.addDrawable(bg2);
    glcanvas.addDrawable(asteroid);
    gamepad = nv.gamepad();
    gamepad.aliasKey('left', nv.Key.A);
    gamepad.aliasKey('right', nv.Key.D);
    gamepad.aliasKey('up', nv.Key.W);
    gamepad.aliasKey('down', nv.Key.S);
    gamepad.aliasKey('shoot', nv.Key.Spacebar);
    speed = 5;
    shootDelay = 10;
    update = function(dt) {
      var controller, dimensions, object, state, _i, _j, _len, _len1, _ref;
      for (_i = 0, _len = controllers.length; _i < _len; _i++) {
        controller = controllers[_i];
        controller.update(dt);
      }
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
        glcanvas.addDrawable(new nv.assets.Bullet(ship.x, ship.y, ship.rotation));
        shootDelay = 10;
      }
      if (shootDelay) {
        shootDelay--;
      }
      _ref = glcanvas.objects;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        object = _ref[_j];
        if (object instanceof nv.assets.Bullet) {
          object.update(dt);
          if (object["delete"]) {
            glcanvas.removeDrawable(object);
          }
        }
      }
      dimensions = glcanvas.size();
      bg.x = -ship.x * 0.05;
      bg.y = -ship.y * 0.05;
      bg2.x = -ship.x * 0.01;
      return bg2.y = -ship.y * 0.01;
    };
    glcanvas.camera = nv.camera();
    glcanvas.camera.follow(ship, 250, 250);
    glcanvas.camera.zoom(0.5);
    glcanvas.camera.zoom(1, 2000);
    return glcanvas.startDrawUpdate(60, update);
  });

}).call(this);
