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

