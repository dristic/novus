scenes.Main = (function (__super) {
  function Main(game, options) {
    options = options || {};
    __super.call(this, game, options);

    this.loadEngine(nv.TimingEngine);
    this.loadEngine(nv.GamepadEngine, tileMap.config.gamepad);
    this.loadEngine(nv.RenderingEngine, tileMap.config.graphics);
    this.loadEngine(nv.DebugEngine);

    this.loadMap(tileMap.maps.main);

    this.send("engine:timing:start");
  };

  Main.prototype = __super.prototype;

  return Main;
})(nv.Scene);
