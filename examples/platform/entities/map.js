entities.Map = (function (__super) {
  function Map(scene, options) {
    options = options || {};
    __super.call(this, scene, options);

    this.addComponent(nv.SpriteMapRenderingComponent, {
      src: '/assets/land-iso.png',
      tileHeight: 16,
      tileWidth: 32,
      width: 15 * 32,
      height: 15 * 16,
      data: options.data,
      isometric: true
    });

    this.gamepadEngine = scene.getEngineByType(nv.GamepadEngine);
    this.moving = false;
  }

  Map.prototype = __super.prototype;

  Map.prototype.update = function (dt) {
    if (this.moving === true) {
      var state = this.gamepadEngine.getState(),
          x = this.lastX - state.mouse.x + this.model.x,
          y = this.lastY - state.mouse.y + this.model.y;

      this.lastX = state.mouse.x;
      this.lastY = state.mouse.y;

      this.model.set('x', x);
      this.model.set('y', y);
    }
  };

  Map.prototype['event(engine:gamepad:down:activate)'] = function (data) {
    var state = this.gamepadEngine.getState();
    this.lastX = state.mouse.x;
    this.lastY = state.mouse.y;
    this.moving = true;
  };

  Map.prototype['event(engine:gamepad:up:activate)'] = function (data) {
    this.moving = false;
  };

  return Map
})(nv.Entity);

nv.factory.register('Map', function (scene, options) {
  options = options || {};
  options.data = [9, 9, 9, 9, 9, 9, 9, 48, 48, 48, 48, 48, 9, 9, 9, 9, 9, 9, 9, 9, 9, 26, 105, 105, 105, 105, 105, 25, 9, 9, 9, 9, 9, 9, 9, 9, 94, 90, 90, 90, 90, 90, 108, 61, 9, 9, 9, 9, 9, 26, 9, 26, 75, 63, 63, 63, 96, 108, 61, 9, 9, 9, 9, 9, 94, 90, 90, 77, 78, 78, 78, 80, 108, 61, 9, 9, 9, 9, 9, 94, 90, 90, 77, 78, 92, 92, 80, 108, 61, 9, 9, 9, 9, 9, 94, 90, 90, 77, 78, 92, 92, 80, 108, 61, 9, 9, 9, 9, 9, 94, 90, 90, 77, 78, 78, 78, 80, 108, 61, 9, 9, 9, 9, 9, 105, 16, 90, 77, 78, 45, 78, 80, 108, 61, 9, 9, 9, 9, 9, 9, 9, 90, 93, 91, 91, 91, 74, 108, 61, 9, 9, 9, 9, 9, 9, 27, 105, 105, 105, 105, 105, 105, 122, 32, 9, 9, 9, 9, 9, 9, 57, 58, 58, 58, 58, 58, 58, 57, 12, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
  var map = new entities.Map(scene, options);
  return map;
});

