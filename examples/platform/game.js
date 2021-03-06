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
    this.loadEngine(nv.PhysicsEngine, {});
    this.loadEngine(nv.DebugEngine);

    this.loadMap(tileMap.maps.main);

    this.send("engine:timing:start");
  };

  Main.prototype = __super.prototype;

  return Main;
})(nv.Scene);

nv.factory.register('Map', function (scene, options) {
  var entity = new nv.Entity(scene, options);

  entity.addComponent(nv.SpriteMapRenderingComponent, {
    src: 'assets/tiles.png',
    tileHeight: 61,
    tileWidth: 51,
    width: 15 * 51,
    height: 7 * 61,
    data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
          ],
    isometric: false
  });

  return entity;
});

nv.factory.register('Player', function (scene, options) {
  var entity = new nv.Entity(scene, options),
      camera = scene.getEngineByType(nv.RenderingEngine).camera,
      right = false,
      left = false;

  entity.model.set('width', 101);
  entity.model.set('height', 171);
  entity.model.set('gravity', 1);

  camera.follow(entity.model);

  entity.addComponent(nv.SpriteRenderingComponent, {
    src: 'assets/images/Character Boy.png',
    width: 101,
    height: 171
  });

  entity.addComponent(nv.RectanglePhysicsComponent, {
    type: "both"
  });

  scene.on("engine:gamepad:down:right", function () {
    right = true;
  });
  scene.on("engine:gamepad:up:right", function () {
    right = false;
  });

  scene.on("engine:gamepad:down:left", function () {
    left = true;
  });
  scene.on("engine:gamepad:up:left", function () {
    left = false;
  });

  entity.update = function (dt) {
    if (right === true) {
      entity.model.set('x', entity.model.get('x') + 3);
    }
    if (left === true) {
      entity.model.set('x', entity.model.get('x') - 3);
    }

    entity.model.set('gravity', entity.model.get('gravity') + 0.1);
    entity.model.set('y', entity.model.get('y') + entity.model.get('gravity'));

    if (entity.model.get('y') > (7 * 61) - 171) {
      entity.model.set('y', (7 * 61) - 171);
      entity.model.set('gravity', 0);
    }

    if (entity.model.get('x') < 51) {
      entity.model.set('x', 51);
    } else if (entity.model.get('x') > (14 * 51) - 101) {
      entity.model.set('x', (14 * 51) - 101);
    }
  };

  return entity;
});

tileMap.config = {
  debug: false,

  graphics: {
    id: '#game-canvas',
    width: 500,
    height: 410,
    scaled: true,
    mouseMove: true,
    css: {
      background: 'rgb(31, 139, 211)',
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
      type: "Map",
      x: 0,
      y: 0
    }, {
      type: "Player",
      x: 40,
      y: 40
    }]
  }]
};

nv.ready(function () {
  this.app = new Application();
});

