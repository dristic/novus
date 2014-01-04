//= require ../../src/novus

// Do any preliminary setup before everything else loads

this.scenes = {};
this.entities = {};

this.tileMap = {};

// Configure global engine settings
nv.configure({
  debug: true
});

function Application() {
  nv.Game.call(this, {
    scenes: [ scenes.Main ]
  });

  var self = this;
  setTimeout(function () {
    self.openScene('Main');
  }, 0);
};

Application.prototype = nv.Game.prototype;

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

nv.factory.register('Player', function (scene, options) {
  var entity = new nv.Entity(scene, options);

  entity.model.set('width', 101);
  entity.model.set('height', 171);

  entity.addComponent(nv.SpriteRenderingComponent, {
    src: 'assets/images/Character Boy.png',
    width: 101,
    height: 171
  });

  scene.on("engine:gamepad:down:right", function () {
    entity.model.set('x', entity.model.get('x') + 1);
  });

  scene.on("engine:gamepad:down:left", function () {
    entity.model.set('x', entity.model.get('x') - 1);
  });

  return entity;
});

tileMap.config = {
  debug: false,

  graphics: {
    id: '#game-canvas',
    width: 320,
    height: 410,
    scaled: true,
    mouseMove: true,
    css: {
      backgrund: '#000',
      margin: '0 auto',
      display: 'block',
    }
  },

  gamepad: {
    keys: {
      left: nv.Key.A,
      right: nv.Key.D,
      activate: [nv.Key.Spacebar, nv.Key.Mouse1]
    }
  }
};

tileMap.maps = {};
tileMap.maps.main = {
  layers: [{
    name: "Game",
    objects: [{
      type: "Player",
      x: 40,
      y: 40
    }]
  }]
};

nv.ready(function () {
  this.app = new Application();
});

