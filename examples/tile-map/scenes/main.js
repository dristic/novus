scenes.Main = (function (__super) {
  function Main(game, options) {
    options = options || {};
    __super.call(this, game, options);

    this.loadEngine(nv.TimingEngine);
  };

  Main.prototype = __super.prototype;

  return Main;
})(nv.Scene);
