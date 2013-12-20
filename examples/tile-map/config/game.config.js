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
    name: "Map",
    objects: [{
      type: "Map",
      x: 0,
      y:0
    }]
  }]
};

