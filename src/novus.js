(function() {
  var _ref;

  this.nv = (_ref = this.nv) != null ? _ref : {};

}).call(this);

(function() {
  var _ref;

  window.nv = (_ref = window.nv) != null ? _ref : {};

  window.nv.Key = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Control: 17,
    PauseBreak: 19,
    CapsLock: 20,
    Esc: 27,
    Spacebar: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Insert: 45,
    Delete: 46,
    Keyb0: 48,
    Keyb1: 49,
    Keyb2: 50,
    Keyb3: 51,
    Keyb4: 52,
    Keyb5: 53,
    Keyb6: 54,
    Keyb7: 55,
    Keyb8: 56,
    Keyb9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    Numpad0: 96,
    Numpad1: 97,
    Numpad2: 98,
    Numpad3: 99,
    Numpad4: 100,
    Numpad5: 101,
    Numpad6: 102,
    Numpad7: 103,
    Numpad8: 104,
    Numpad9: 105,
    NumpadStar: 106,
    NumpadPlus: 107,
    NumpadMinus: 109,
    NumpadPeriod: 110,
    NumpadSlash: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    NumLck: 144,
    ScrLck: 145,
    SemiColon: 186,
    Equal: 187,
    Comma: 188,
    Minus: 189,
    Period: 190,
    Question: 191,
    BackQuote: 192,
    LeftBrace: 219,
    Pipe: 220,
    RightBrace: 221,
    SingleQuote: 222
  };

}).call(this);

(function() {
  var Camera, Gamepad,
    __slice = [].slice;

  nv.extend = function(other) {
    var key, _results;
    _results = [];
    for (key in other) {
      _results.push(this[key] = other[key]);
    }
    return _results;
  };

  nv.extend({
    log: function() {
      var message, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log(message));
      }
      return _results;
    },
    bind: function(context, func) {
      var f;
      f = function() {
        return func.call.apply(func, [context].concat(__slice.call(arguments)));
      };
      return f;
    },
    keydown: function(key, callback) {
      return $(document).on('keydown', function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      });
    },
    keyup: function(key, callback) {
      return $(document).on('keyup', function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      });
    },
    mousedown: function(callback) {
      $(document).on('mousedown', callback);
      return $(document).on('touchstart', callback);
    },
    mouseup: function(callback) {
      $(document).on('mouseup', callback);
      return $(document).on('touchend', callback);
    },
    mousemove: function(callback) {
      $(document).on('mousemove', callback);
      return $(document).on('touchmove', callback);
    }
  });

  Gamepad = (function() {

    function Gamepad() {
      this.gamepad = navigator.webkitGamepad;
      this.state = {};
      this.listeners = {};
    }

    Gamepad.prototype.trackMouse = function() {
      var _this = this;
      this.state.mouse = {
        x: -1,
        y: -1,
        down: false
      };
      nv.mousedown(function(event) {
        _this.state.mouse.x = event.clientX;
        _this.state.mouse.y = event.clientY;
        return _this.state.mouse.down = true;
      });
      nv.mouseup(function(event) {
        _this.state.mouse.x = event.clientX;
        _this.state.mouse.y = event.clientY;
        return _this.state.mouse.down = false;
      });
      return nv.mousemove(function(event) {
        _this.state.mouse.x = event.clientX;
        return _this.state.mouse.y = event.clientY;
      });
    };

    Gamepad.prototype.aliasKey = function(button, key) {
      var _this = this;
      nv.keydown(key, function() {
        return _this.fireButton(button);
      });
      return nv.keyup(key, function() {
        return _this.state[button] = false;
      });
    };

    Gamepad.prototype.fireButton = function(button) {
      var listener, listeners, _i, _len, _results;
      this.state[button] = true;
      listeners = this.listeners[button];
      if (listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          _results.push(listener(button));
        }
        return _results;
      }
    };

    Gamepad.prototype.onButtonPress = function(button, func) {
      var listeners;
      listeners = this.listeners[button];
      if (!listeners) {
        listeners = [];
      }
      listeners.push(func);
      this.listeners[button] = listeners;
      return func;
    };

    Gamepad.prototype.offButtonPress = function(button, func) {
      var listeners;
      listeners = this.listeners[button];
      if (listeners.indexOf(func(!0))) {
        listeners.splice(listeners.indexOf(func), 1);
      }
      this.listeners[button] = listeners;
      return func;
    };

    Gamepad.prototype.getState = function() {
      return this.state;
    };

    return Gamepad;

  })();

  nv.gamepad = function() {
    return new Gamepad;
  };

  Camera = (function() {

    function Camera() {
      this.following = null;
      this.x = 0;
      this.y = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.zoomValue = 1;
    }

    Camera.prototype.follow = function(object, offsetX, offsetY) {
      this.following = object;
      this.offsetX = offsetX;
      return this.offsetY = offsetY;
    };

    Camera.prototype.zoom = function(distance, duration) {
      var initial, startTime,
        _this = this;
      if (duration) {
        startTime = Date.now();
        initial = this.zoomValue;
        return this.onUpdate = function(dt) {
          var diff, now;
          now = Date.now();
          diff = now - startTime;
          _this.zoomValue = (distance - initial) * (diff / duration) + initial;
          if (diff > duration) {
            _this.onUpdate = null;
            return _this.zoomValue = distance;
          }
        };
      } else {
        return this.zoomValue = distance;
      }
    };

    Camera.prototype.update = function(dt, context, canvas) {
      var size;
      if (this.following) {
        size = canvas.size();
        this.offsetX = size.width / 2;
        this.offsetY = size.height / 2;
        this.x = -this.following.x * this.zoomValue + this.offsetX;
        this.y = -this.following.y * this.zoomValue + this.offsetY;
      }
      if (this.onUpdate) {
        this.onUpdate(dt);
      }
      context.translate(this.x, this.y);
      return context.scale(this.zoomValue, this.zoomValue);
    };

    return Camera;

  })();

  nv.camera = function() {
    return new Camera;
  };

}).call(this);

(function() {

  nv.Plugin = (function() {

    function Plugin(scene, entity) {
      this.scene = scene;
      this.entity = entity;
    }

    return Plugin;

  })();

}).call(this);

(function() {

  nv.Controller = (function() {

    function Controller(asset) {
      this.asset = asset;
    }

    Controller.prototype.update = function(dt) {};

    return Controller;

  })();

}).call(this);

(function() {

  nv.Entity = (function() {

    function Entity(scene, pluginClasses, model) {
      var klass, _i, _len, _ref;
      this.scene = scene;
      this.model = model;
      this.plugins = [];
      this.model = (_ref = this.model) != null ? _ref : new nv.Model;
      for (_i = 0, _len = pluginClasses.length; _i < _len; _i++) {
        klass = pluginClasses[_i];
        this.plugins.push(new klass(this.scene, this));
      }
      this.scene.fire("entity:create:" + this.constructor.name);
    }

    Entity.prototype.update = function(dt) {};

    return Entity;

  })();

}).call(this);

(function() {

  nv.EventDispatcher = (function() {

    function EventDispatcher() {
      this.listeners = [];
    }

    EventDispatcher.prototype.on = function(event, func) {
      var listeners;
      listeners = this.listeners[event];
      if (!(listeners instanceof Array)) {
        listeners = [];
      }
      listeners.push(func);
      this.listeners[event] = listeners;
      return this;
    };

    EventDispatcher.prototype.fire = function(event, data) {
      var listener, listeners, _i, _len, _results;
      data = data != null ? data : {};
      listeners = this.listeners[event];
      if (listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          _results.push(listener(data));
        }
        return _results;
      }
    };

    EventDispatcher.prototype.off = function(event, func) {
      if (!this.listeners[event] instanceof Array) {

      } else {
        if (this.listeners[event].indexOf(func(!0))) {
          this.listeners[event].splice(this.listeners[event].indexOf(func), 1);
        }
      }
      return this;
    };

    return EventDispatcher;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Model = (function() {

    function Model(data) {
      this.setMany(data);
    }

    Model.prototype.setMany = function(object) {
      var key, _results;
      _results = [];
      for (key in object) {
        _results.push(this[key] = object[key]);
      }
      return _results;
    };

    Model.prototype.persist = function() {
      return window.localStorage[this.name] = this;
    };

    Model.prototype.load = function() {
      return this.setMany(window.localStorage[this.name]);
    };

    return Model;

  })();

  nv.Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection(arr) {
      this.items = arr != null ? arr : [];
    }

    return Collection;

  })(nv.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  nv.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene(game, options) {
      var klass, _i, _len, _ref, _ref1;
      this.game = game;
      this.options = options;
      Scene.__super__.constructor.apply(this, arguments);
      this.gamepad = nv.gamepad();
      this.controllers = [];
      this.models = {};
      this.renderers = [];
      this.entities = [];
      this.options = (_ref = this.options) != null ? _ref : {};
      this.engines = [];
      _ref1 = this.game.engines;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        klass = _ref1[_i];
        this.engines.push(new klass(this));
      }
    }

    Scene.prototype.get = function(key) {
      return this.options[key];
    };

    Scene.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    Scene.prototype.addEntities = function() {
      var entities, entity, _i, _len, _results;
      entities = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        _results.push(this.addEntity(entity));
      }
      return _results;
    };

    Scene.prototype.addEntity = function() {
      var args, entity;
      entity = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      entity = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(entity, [this].concat(__slice.call(args)), function(){});
      this.entities.push(entity);
      return entity;
    };

    Scene.prototype.removeEntity = function(entity) {
      return this.entities.splice(this.entities.indexOf(entity), 1);
    };

    Scene.prototype.addController = function(controller) {
      return this.controllers.push(controller);
    };

    Scene.prototype.removeController = function(controller) {
      return this.controllers.splice(this.controllers.indexOf(controller), 1);
    };

    Scene.prototype.addModel = function(name, model) {
      return this.models[name] = model;
    };

    Scene.prototype.getModel = function(name) {
      return this.models[name];
    };

    Scene.prototype.removeModel = function(name) {
      return delete this.models[name];
    };

    Scene.prototype.addRenderer = function(renderer) {
      return this.renderers.push(renderer);
    };

    Scene.prototype.removeRenderer = function(renderer) {
      return this.renderers.splice(this.renderers.indexOf(renderer), 1);
    };

    Scene.prototype.update = function(dt) {
      var controller, engine, entity, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      _ref = this.controllers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controller = _ref[_i];
        controller.update(dt);
      }
      _ref1 = this.engines;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        engine.update(dt);
      }
      _ref2 = this.entities;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        entity = _ref2[_k];
        _results.push(entity.update(dt));
      }
      return _results;
    };

    return Scene;

  })(nv.EventDispatcher);

}).call(this);

(function() {

  nv.Point = (function() {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.clone = function() {
      return new nv.Point(this.x, this.y);
    };

    Point.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    };

    return Point;

  })();

  nv.Rect = (function() {

    function Rect(x, y, x2, y2) {
      this.x = x;
      this.y = y;
      this.x2 = x2;
      this.y2 = y2;
    }

    Rect.prototype.clone = function() {
      return new nv.Rect(this.x, this.y, this.x2, this.y2);
    };

    Rect.prototype.reset = function(x, y, x2, y2) {
      this.x = x;
      this.y = y;
      this.x2 = x2;
      this.y2 = y2;
    };

    Rect.prototype._checkPt = function(tx, ty) {
      return (tx >= this.x && tx <= this.x2) && (ty >= this.y && ty <= this.y2);
    };

    Rect.prototype.contains = function(pt) {
      return this._checkPt(pt.x, pt.y);
    };

    Rect.prototype.intersects = function(rect) {
      return this._checkPt(rect.x, rect.y) || this._checkPt(rect.x, rect.y2) || this._checkPt(rect.x2, rect.y2) || this._checkPt(rect.x2, rect.y);
    };

    Rect.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Rect;

  })();

}).call(this);

(function() {
  var Debug;

  Debug = (function() {

    Debug.prototype.html = "<div id=\"debug\"></div>";

    function Debug() {}

    Debug.prototype.log = function() {
      var messages;
      messages = arguments;
      return console.log(arguments);
    };

    return Debug;

  })();

  $(function() {
    nv.Debug = new Debug;
    return nv.log = nv.Debug.log;
  });

}).call(this);

(function() {
  var __slice = [].slice;

  nv.Game = (function() {

    function Game() {
      this.currentScene = null;
      this.sceneClasses = {};
      this.engines = [];
    }

    Game.prototype.registerEngine = function(klass) {
      return this.engines.push(klass);
    };

    Game.prototype.registerScene = function(name, klass) {
      return this.sceneClasses[name] = klass;
    };

    Game.prototype.openScene = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.closeScene();
      return this.currentScene = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this.sceneClasses[name], [this].concat(__slice.call(args)), function(){});
    };

    Game.prototype.closeScene = function() {
      if (!!this.currentScene) {
        return this.currentScene.destroy();
      }
    };

    return Game;

  })();

}).call(this);

(function() {

  nv.Engine = (function() {

    function Engine(scene) {
      this.scene = scene;
    }

    Engine.prototype.update = function(dt) {};

    return Engine;

  })();

}).call(this);

(function() {
  var zIndex,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.RenderingEngine = (function(_super) {

    __extends(RenderingEngine, _super);

    function RenderingEngine(scene) {
      var _this = this;
      RenderingEngine.__super__.constructor.call(this, scene);
      this.canvas = scene.options.canvas;
      this.context = this.canvas.context;
      this.drawables = [];
      scene.on("engine:rendering:create", function(drawable) {
        _this.drawables.push(drawable);
        return _this.canvas.addDrawable(drawable);
      });
      scene.on("engine:rendering:delete", function(drawable) {
        _this.drawables.splice(_this.drawables.indexOf(drawable), 1);
        return _this.canvas.removeDrawable(drawable);
      });
    }

    return RenderingEngine;

  })(nv.Engine);

  nv.RenderingPlugin = (function(_super) {

    __extends(RenderingPlugin, _super);

    function RenderingPlugin(scene, entity) {
      RenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.scene.fire("engine:rendering:create", this);
    }

    RenderingPlugin.prototype.draw = function(context, canvas) {};

    return RenderingPlugin;

  })(nv.Plugin);

  nv.DrawableRenderingPlugin = (function(_super) {

    __extends(DrawableRenderingPlugin, _super);

    function DrawableRenderingPlugin(scene, entity) {
      DrawableRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.drawable = entity.model.drawable;
    }

    DrawableRenderingPlugin.prototype.draw = function(context, canvas) {
      return this.drawable.draw(context, canvas);
    };

    return DrawableRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.TextRenderingPlugin = (function(_super) {

    __extends(TextRenderingPlugin, _super);

    function TextRenderingPlugin(scene, entity) {
      TextRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.text = new gl.text(entity.model);
    }

    TextRenderingPlugin.prototype.draw = function(context, canvas) {
      return this.text.draw(context, canvas);
    };

    return TextRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.PathRenderingPlugin = (function(_super) {

    __extends(PathRenderingPlugin, _super);

    function PathRenderingPlugin(scene, entity) {
      PathRenderingPlugin.__super__.constructor.call(this, scene, entity);
    }

    PathRenderingPlugin.prototype.draw = function(context, canvas) {
      var points;
      context.strokeColor(this.entity.model.strokeColor);
      context.strokeWidth(this.entity.model.strokeWidth);
      points = this.entity.model.path();
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      $.each(points.slice(1), function() {
        return context.lineTo(this.x, this.y);
      });
      context.lineTo(points[0].x, points[0].y);
      context.stroke();
      return context.closePath();
    };

    return PathRenderingPlugin;

  })(nv.RenderingPlugin);

  zIndex = 0;

  nv.ObjectRenderer = (function() {

    function ObjectRenderer(glcanvas, asset) {
      this.glcanvas = glcanvas;
      this.asset = asset;
      this.glcanvas.addDrawable(this);
    }

    ObjectRenderer.prototype.draw = function(dt) {};

    ObjectRenderer.prototype.destroy = function() {
      return this.glcanvas.removeDrawable(this);
    };

    ObjectRenderer.prototype.nextZIndex = function() {
      return zIndex++;
    };

    return ObjectRenderer;

  })();

  nv.ObjectListRenderer = (function() {

    function ObjectListRenderer(glcanvas, assets) {
      var _this = this;
      this.assets = assets;
      this.classname = this.constructor.toString();
      this.assetCounter = 0;
      glcanvas.addDrawable(this);
      $.each(this.assets, function(asset) {
        return _this.acquireAsset(asset);
      });
    }

    ObjectListRenderer.prototype.acquireAsset = function(asset) {
      asset.id = this.classname + this.assetCounter++;
      return asset;
    };

    ObjectListRenderer.prototype.add = function(asset) {
      this.assets.push(this.acquireAsset(asset));
      return asset;
    };

    ObjectListRenderer.prototype.remove = function(target) {
      return this.assets = this.assets.filter(function(asset) {
        return asset.id !== target.id;
      });
    };

    ObjectListRenderer.prototype.draw = function(dt) {};

    ObjectListRenderer.prototype.nextZIndex = function() {
      return zIndex++;
    };

    return ObjectListRenderer;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.GamepadEngine = (function(_super) {

    __extends(GamepadEngine, _super);

    function GamepadEngine(scene) {
      var key,
        _this = this;
      GamepadEngine.__super__.constructor.call(this, scene);
      this.gamepad = scene.gamepad;
      this.options = scene.options;
      if (!!this.options.trackMouse) {
        this.gamepad.trackMouse();
      }
      for (key in this.options.keys) {
        this.gamepad.aliasKey(key, this.options.keys[key]);
        this.gamepad.onButtonPress(key, function(button) {
          return _this.scene.fire("engine:gamepad:" + button);
        });
      }
    }

    return GamepadEngine;

  })(nv.Engine);

}).call(this);

(function() {



}).call(this);

(function() {
  var cancelFrame, gl, requestFrame, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

  requestFrame = (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
    return setTimeout(callback, 17);
  };

  cancelFrame = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout;

  gl = function(canvas) {
    return new gl.prototype.init(canvas);
  };

  gl.zOrderProperty = 'zIndex';

  gl.prototype = {
    init: function(canvas) {
      if (typeof canvas === 'string') {
        canvas = document.querySelector(canvas);
      }
      canvas = canvas != null ? canvas : document.createElement('canvas');
      gl.prototype.extend.call(canvas, gl.prototype);
      canvas.context = gl.context(canvas.getContext('2d'));
      canvas.objects = [];
      canvas.requestFrameKey = null;
      canvas.updating = false;
      return canvas;
    },
    size: function(width, height) {
      var dimensions;
      if ((width != null) && (height != null)) {
        this.width = width;
        this.height = height;
        return this;
      } else {
        return dimensions = {
          width: this.width,
          height: this.height
        };
      }
    },
    fullscreen: function() {
      var _this = this;
      this.size(window.innerWidth, window.innerHeight);
      return window.addEventListener('resize', function(event) {
        return _this.size(window.innerWidth, window.innerHeight);
      });
    },
    background: function(color) {
      return this.style.background = color;
    },
    draw: function(object) {
      return object.draw(this.context, this);
    },
    addDrawable: function(object) {
      return this.objects.push(object);
    },
    removeDrawable: function(object) {
      return this.objects.splice(this.objects.indexOf(object), 1);
    },
    drawObjects: function() {
      var object, _i, _len, _ref11, _results;
      this.objects.sort(function(a, b) {
        a = a[gl.zOrderProperty];
        b = b[gl.zOrderProperty];
        if (a && !b) {
          return 1;
        } else if (b && !a) {
          return -1;
        } else if (a < b) {
          return -1;
        } else if (a === b) {
          return 0;
        } else if (a > b) {
          return 1;
        }
      });
      _ref11 = this.objects;
      _results = [];
      for (_i = 0, _len = _ref11.length; _i < _len; _i++) {
        object = _ref11[_i];
        _results.push(this.draw(object));
      }
      return _results;
    },
    startDrawUpdate: function(fps, func) {
      var lastTime, update,
        _this = this;
      this.updating = true;
      lastTime = Date.now();
      update = function() {
        var delta, now, stop;
        now = Date.now();
        delta = now - lastTime;
        delta /= 1000;
        stop = func(delta);
        _this.context.save();
        _this.context.clear();
        if (_this.camera) {
          _this.camera.update(delta, _this.context, _this);
        }
        _this.drawObjects();
        _this.context.restore();
        lastTime = now;
        if (_this.cancel) {
          return _this.cancel = false;
        } else {
          if (!!_this.updating) {
            return _this.requestFrameKey = requestFrame(update);
          }
        }
      };
      return this.requestFrameKey = requestFrame(update);
    },
    stopDrawUpdate: function() {
      this.updating = false;
      this.cancel = true;
      return cancelFrame(this.requestFrameKey);
    },
    extend: function(object) {
      var key;
      for (key in object) {
        this[key] = object[key];
      }
      return this;
    }
  };

  gl.prototype.init.prototype = gl.prototype;

  window.gl = gl;

  gl.prototype.extend.call(gl, {
    implement: function(methods) {
      return gl.prototype.extend.call(gl, methods);
    },
    context: function(context) {
      gl.prototype.extend.call(context, gl.context.prototype);
      return context;
    }
  });

  gl.prototype.extend.call(gl.context.prototype, {
    color: function(color) {
      return this.fillStyle = color;
    },
    strokeColor: function(color) {
      return this.strokeStyle = color;
    },
    strokeWidth: function(width) {
      return this.lineWidth = width;
    },
    setFont: function(font) {
      return this.font = font;
    },
    fillPath: function(func) {
      this.beginPath();
      func(this);
      this.fill();
      return this.closePath();
    },
    line: function() {
      this.beginPath();
      this.moveTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      while (arguments.length > 0) {
        this.lineTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      }
      this.stroke();
      return this.closePath();
    },
    rotateAround: function(x, y, angle, func) {
      this.save();
      this.translate(x, y);
      this.rotate(angle);
      this.translate(-x, -y);
      func();
      return this.restore();
    },
    clear: function() {
      return this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  });

  gl.implement({
    drawable: function(options) {
      gl.prototype.extend.call(this, options);
      gl.prototype.extend.call(this.prototype, options);
      return this;
    }
  });

  gl.prototype.extend.call(gl.drawable.prototype, {
    draw: function(context) {}
  });

  gl.implement({
    square: function(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        width: 10,
        height: 10,
        x: 10,
        y: 10
      };
      gl.prototype.extend.call(defaults, options);
      gl.drawable.call(this, defaults);
      return this;
    }
  });

  gl.prototype.extend.call(gl.square.prototype, {
    draw: function(context) {
      context.color(this.color);
      return context.fillRect(this.x, this.y, this.width, this.height);
    }
  });

  gl.implement({
    text: function(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        x: 10,
        y: 10,
        font: 'bold 20px sans-serif',
        textBaseline: 'bottom',
        text: 'Lorem Ipsum'
      };
      gl.prototype.extend.call(defaults, options);
      gl.drawable.call(this, defaults);
      return this;
    }
  });

  gl.prototype.extend.call(gl.text.prototype, {
    draw: function(context) {
      context.color(this.color);
      context.setFont(this.font);
      context.textBaseline = this.textBaseline;
      return context.fillText(this.text, this.x, this.y);
    }
  });

  gl.implement({
    sprite: function(options) {
      var defaults,
        _this = this;
      defaults = {
        src: '',
        x: 10,
        y: 10,
        width: null,
        height: null
      };
      gl.prototype.extend.call(defaults, options);
      gl.drawable.call(this, defaults);
      this.loaded = false;
      this.image = new Image;
      this.image.onload = function() {
        if (!_this.width) {
          _this.width = _this.image.width;
        }
        if (!_this.height) {
          _this.height = _this.image.height;
        }
        return _this.loaded = true;
      };
      this.image.src = this.src;
      return this;
    }
  });

  gl.prototype.extend.call(gl.sprite.prototype, {
    draw: function(context) {
      return context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  });

}).call(this);

(function() {
  var WrappingEntity, entities,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.entities = entities = {};

  entities.Background = (function(_super) {

    __extends(Background, _super);

    function Background(scene) {
      Background.__super__.constructor.call(this, scene, [renderers.Background], new models.Background);
    }

    return Background;

  })(nv.Entity);

  entities.Title = (function(_super) {

    __extends(Title, _super);

    function Title(scene) {
      Title.__super__.constructor.call(this, scene, [nv.TextRenderingPlugin], {
        color: "#0F0",
        x: 200,
        y: 200,
        font: "bold 20px sans-serif",
        text: "Asteroids"
      });
    }

    return Title;

  })(nv.Entity);

  entities.ActionText = (function(_super) {

    __extends(ActionText, _super);

    function ActionText(scene) {
      ActionText.__super__.constructor.call(this, scene, [nv.TextRenderingPlugin], {
        color: "#0F0",
        x: 200,
        y: 400,
        font: "bold 20px sans-serif",
        text: "Press <Space> to Start"
      });
    }

    return ActionText;

  })(nv.Entity);

  entities.Cursor = (function(_super) {

    __extends(Cursor, _super);

    function Cursor(scene) {
      Cursor.__super__.constructor.call(this, scene, [nv.DrawableRenderingPlugin], {
        drawable: new gl.square
      });
      this.gamepad = this.scene.gamepad;
    }

    Cursor.prototype.update = function(dt) {
      var state;
      state = this.gamepad.getState();
      this.model.drawable.x = state.mouse.x;
      return this.model.drawable.y = state.mouse.y;
    };

    return Cursor;

  })(nv.Entity);

  WrappingEntity = (function(_super) {

    __extends(WrappingEntity, _super);

    function WrappingEntity() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      WrappingEntity.__super__.constructor.apply(this, args);
    }

    WrappingEntity.prototype.wrap = function() {
      var dimensions;
      dimensions = this.scene.get('canvas').size();
      if (this.model.x < 0) {
        this.model.x = dimensions.width;
      } else if (this.model.x > dimensions.width) {
        this.model.x = 0;
      }
      if (this.model.y < 0) {
        return this.model.y = dimensions.height;
      } else if (this.model.y > dimensions.height) {
        return this.model.y = 0;
      }
    };

    return WrappingEntity;

  })(nv.Entity);

  entities.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship(scene) {
      var _this = this;
      Ship.__super__.constructor.call(this, scene, [nv.PathRenderingPlugin], new models.Ship);
      this.scene.on('collision:Ship:Asteroid', function(data) {
        console.log("ship hit asteroid");
        return _this.scene.dispatcher.fire('delete:Ship', {
          asset: data.actor
        });
      });
      this.scene.on('physics:collision:Ship:Asteroid', function(data) {
        return console.log('ship hit asteroid');
      });
      this.scene.on('gamepad:left', function() {
        return console.log('gamepad left');
      });
    }

    Ship.prototype.update = function(dt) {
      var state;
      state = this.scene.gamepad.getState();
      if (state.left) {
        this.model.rotate(-0.1);
      }
      if (state.right) {
        this.model.rotate(0.1);
      }
      if (state.up) {
        this.model.translate(this.speed * Math.sin(this.model.rotation), -this.speed * Math.cos(this.model.rotation));
      }
      if (state.down) {
        this.model.translate(-this.speed / 2 * Math.sin(this.model.rotation), this.speed / 2 * Math.cos(this.model.rotation));
      }
      this.model.thrusters = state.up;
      return this.wrap();
    };

    return Ship;

  })(WrappingEntity);

}).call(this);

(function() {
  var Asteroid, Asteroids, Bullet, GameObject, Hud, models, __gameObjectCounter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.models = models = {};

  models.Background = (function(_super) {

    __extends(Background, _super);

    function Background() {
      Background.__super__.constructor.call(this, {
        x: 0,
        y: 0,
        width: 500,
        height: 500
      });
    }

    return Background;

  })(nv.Model);

  models.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship() {
      Ship.__super__.constructor.call(this, {
        speed: 5,
        health: 100,
        shootDelay: 10,
        x: 0,
        y: 30,
        width: 16,
        height: 24,
        rotation: 0,
        thrusters: false,
        type: 'both',
        color: '#FFF',
        strokeColor: '#FFF',
        strokeWidth: 2
      });
      this.points = this.buildWireframe();
    }

    Ship.prototype.buildWireframe = function() {
      return [new nv.Point(0, -this.height / 2), new nv.Point(this.width / 2, this.height / 2), new nv.Point(0, this.height * 0.4), new nv.Point(-this.width / 2, this.height / 2)];
    };

    Ship.prototype.path = function() {
      var cosine, model, path, sine;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      model = this;
      $.each(this.points, function() {
        return path.push(new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y));
      });
      return path;
    };

    Ship.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    Ship.prototype.rotate = function(r) {
      return this.rotation += r;
    };

    return Ship;

  })(nv.Model);

  __gameObjectCounter = 0;

  GameObject = (function() {

    function GameObject(options) {
      var key, value;
      this.id = "" + this.constructor.name + (__gameObjectCounter++);
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.rotation = 0;
      this.type = 'passive';
      for (key in options) {
        value = options[key];
        this[key] = value;
      }
      this._path = [];
      this._wireframe = [];
      this._bounds = new nv.Rect(0, 0, 0, 0);
      this.initPath();
    }

    GameObject.prototype.initPath = function() {
      this._wireframe = this.buildWireframe();
      return this._updatePath();
    };

    GameObject.prototype._updatePath = function() {
      var cosine, gameObject, newPath, sine;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      newPath = [];
      gameObject = this;
      $.each(this._wireframe, function() {
        return newPath.push(new nv.Point(this.x * cosine - this.y * sine + gameObject.x, this.x * sine + this.y * cosine + gameObject.y));
      });
      this._path = newPath;
      return this._updateBounds();
    };

    GameObject.prototype._updateBounds = function() {
      var x1, x2, y1, y2;
      x1 = x2 = y1 = y2 = null;
      $.each(this._path, function() {
        if (x1 === null || this.x < x1) {
          x1 = this.x;
        }
        if (x2 === null || this.x > x2) {
          x2 = this.x;
        }
        if (y1 === null || this.y < y1) {
          y1 = this.y;
        }
        if (y2 === null || this.y > y2) {
          return y2 = this.y;
        }
      });
      return this._bounds.reset(x1, y1, x2, y2);
    };

    GameObject.prototype.path = function() {
      return this._path;
    };

    GameObject.prototype.bounds = function() {
      return this._bounds;
    };

    GameObject.prototype.rotate = function(r) {
      this.rotation += r;
      return this._updatePath();
    };

    GameObject.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this._updatePath();
    };

    return GameObject;

  })();

  Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(pt, angle) {
      Bullet.__super__.constructor.call(this, {
        x: pt.x,
        y: pt.y,
        speed: 400,
        radius: 3,
        alive: true,
        life: 100,
        angle: angle,
        type: 'active'
      });
    }

    Bullet.prototype.buildWireframe = function() {
      return [new nv.Point(0, 0)];
    };

    Bullet.prototype._updateBounds = function() {
      return this._bounds.reset(this._path[0].x - this.radius, this._path[0].y - this.radius, this._path[0].x + this.radius, this._path[0].y + this.radius);
    };

    return Bullet;

  })(GameObject);

  Asteroids = (function(_super) {

    __extends(Asteroids, _super);

    function Asteroids(initialSpawnCount) {
      var i, _i, _ref;
      this.initialSpawnCount = initialSpawnCount;
      Asteroids.__super__.constructor.apply(this, arguments);
      for (i = _i = 1, _ref = this.initialSpawnCount; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        this.items.push(new nv.models.Asteroid(500, 500));
      }
    }

    return Asteroids;

  })(nv.Collection);

  Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(cw, ch, scale) {
      if (scale == null) {
        scale = 1;
      }
      Asteroid.__super__.constructor.call(this, {
        x: cw * Math.random(),
        y: ch * Math.random(),
        width: 24 * scale,
        height: 24 * scale,
        speed: Math.random() + 0.3,
        rotation: 0,
        rotationSpeed: 0.01,
        direction: (Math.random() * Math.PI) - (Math.PI / 2),
        type: 'passive'
      });
    }

    Asteroid.prototype.buildWireframe = function() {
      var points, pt;
      pt = new nv.Point(0, -this.height);
      points = [];
      points.push(pt.clone());
      points.push(pt.translate(30, 20).clone());
      points.push(pt.translate(5, 30).clone());
      points.push(pt.translate(-12, 10).clone());
      points.push(pt.translate(-33, -10).clone());
      points.push(pt.translate(-10, -35).clone());
      return points;
    };

    return Asteroid;

  })(GameObject);

  Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(glcanvas) {
      this.glcanvas = glcanvas;
      this.x = 0;
      this.y = 0;
      this.width = this.glcanvas.size().width;
      this.height = this.glcanvas.size().height;
      this.color = "#FFF";
      this.lives = 3;
      this.score = 100000;
    }

    return Hud;

  })(nv.Model);

}).call(this);

(function() {
  var AsteroidController, BulletController, GamePhysicsController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BulletController = (function(_super) {

    __extends(BulletController, _super);

    function BulletController(scene) {
      var _this = this;
      this.scene = scene;
      BulletController.__super__.constructor.call(this, null);
      this.ship = this.scene.getModel('ship');
      this.assets = [];
      this.depletedAssets = [];
      this.shotDelay = 10;
      this.scene.dispatcher.on('collision:Bullet:Asteroid', function(data) {
        console.log("bullet hit asteroid");
        return _this.scene.dispatcher.fire('delete:Bullet', {
          asset: data.actor
        });
      });
    }

    BulletController.prototype.update = function(dt) {
      var bullet, state,
        _this = this;
      state = this.scene.gamepad.getState();
      if (state.shoot && this.shotDelay === 0) {
        bullet = new nv.models.Bullet(this.ship.nose(), this.ship.rotation);
        this.assets.push(bullet);
        this.scene.dispatcher.fire('new:Bullet', {
          asset: bullet
        });
        this.shotDelay = 10;
      }
      if (this.shotDelay) {
        this.shotDelay--;
      }
      $.each(this.assets, function(index, asset) {
        asset.translate(asset.speed * Math.sin(asset.angle) * dt, -1 * asset.speed * Math.cos(asset.angle) * dt);
        if (asset.x < -100 || asset.x > 900) {
          if (asset.y < -100 || asset.y > 900) {
            asset.alive = false;
          }
        }
        asset.life--;
        if (asset.life === 0) {
          asset.alive = false;
          if (!asset.alive) {
            return _this.depletedAssets.push(asset);
          }
        } else {
          return wrap(asset, _this.scene.glcanvas);
        }
      });
      this.assets = this.assets.filter(function(asset) {
        return asset.alive;
      });
      $.each(this.depletedAssets, function(index, asset) {
        return _this.scene.dispatcher.fire('delete:Bullet', {
          asset: asset
        });
      });
      return this.depletedAssets = [];
    };

    return BulletController;

  })(nv.Controller);

  AsteroidController = (function(_super) {

    __extends(AsteroidController, _super);

    function AsteroidController(scene) {
      var _this = this;
      this.scene = scene;
      AsteroidController.__super__.constructor.call(this, null);
      this.assets = this.scene.getModel('asteroids').items;
      this.scene.dispatcher.on('collision:Ship:Asteroid', function(data) {
        console.log("asteroid hit by ship");
        return _this.destoryAsteroid(data.target);
      });
      this.scene.dispatcher.on('collision:Bullet:Asteroid', function(data) {
        console.log("asteroid hit by bullet");
        return _this.destoryAsteroid(data.target);
      });
    }

    AsteroidController.prototype.destoryAsteroid = function(obj) {
      this.scene.dispatcher.fire('delete:Asteroid', {
        asset: obj
      });
      return this.assets = this.assets.filter(function(asset) {
        return asset.id !== obj.id;
      });
    };

    AsteroidController.prototype.update = function(dt) {
      var _this = this;
      return $.each(this.assets, function(index, asset) {
        asset.rotation += asset.rotationSpeed;
        asset.translate(Math.sin(asset.direction) * asset.speed, Math.cos(asset.direction) * asset.speed);
        return wrap(asset, _this.scene.glcanvas);
      });
    };

    return AsteroidController;

  })(nv.Controller);

  GamePhysicsController = (function(_super) {

    __extends(GamePhysicsController, _super);

    function GamePhysicsController(scene) {
      var _this = this;
      this.scene = scene;
      GamePhysicsController.__super__.constructor.call(this, null);
      this.passiveObjects = {};
      this.activeObjects = {};
      this.scene.dispatcher.on('delete:Bullet', function(data) {
        console.log("[GPC] delete bullet");
        return _this.removeObject(data.asset);
      });
      this.scene.dispatcher.on('delete:Ship', function(data) {
        return console.log("[GPC] delete ship");
      });
      this.scene.dispatcher.on('delete:Asteroid', function(data) {
        console.log("[GPC] delete Asteroid");
        return _this.removeObject(data.asset);
      });
      this.scene.dispatcher.on('new:Bullet', function(data) {
        console.log('[GPC] track new bullet');
        return _this.trackObject(data.asset);
      });
    }

    GamePhysicsController.prototype.trackObjects = function(array) {
      var self;
      self = this;
      return $.each(array, function() {
        return self.trackObject(this);
      });
    };

    GamePhysicsController.prototype.trackObject = function(obj) {
      switch (obj.type) {
        case 'passive':
          return this.passiveObjects[obj.id] = obj;
        case 'active':
          return this.activeObjects[obj.id] = obj;
        case 'both':
          this.passiveObjects[obj.id] = obj;
          return this.activeObjects[obj.id] = obj;
      }
    };

    GamePhysicsController.prototype.removeObject = function(obj) {
      switch (obj.type) {
        case 'passive':
          return delete this.passiveObjects[obj.id];
        case 'active':
          return delete this.activeObjects[obj.id];
        case 'both':
          delete this.passiveObjects[obj.id];
          return delete this.activeObjects[obj.id];
      }
    };

    GamePhysicsController.prototype.update = function(dt) {
      var ida, idp, obja, objaBounds, objp, _ref, _results;
      _ref = this.activeObjects;
      _results = [];
      for (ida in _ref) {
        obja = _ref[ida];
        objaBounds = obja.bounds();
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = this.passiveObjects;
          _results1 = [];
          for (idp in _ref1) {
            objp = _ref1[idp];
            if (ida === idp) {
              continue;
            }
            if (objp.bounds().intersects(objaBounds)) {
              _results1.push(this.scene.dispatcher.fire("collision:" + obja.constructor.name + ":" + objp.constructor.name, {
                actor: obja,
                target: objp
              }));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return GamePhysicsController;

  })(nv.Controller);

}).call(this);

(function() {
  var AsteroidRenderer, BulletRenderer, HudRenderer, MainRenderer, ShipRenderer, renderers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.renderers = renderers = {};

  renderers.Background = (function(_super) {

    __extends(Background, _super);

    function Background(scene, entity) {
      var i, radius, x, y;
      Background.__super__.constructor.call(this, scene, entity);
      this.canvas = gl().size(700, 700);
      this.canvas.width = entity.model.width;
      this.canvas.height = entity.model.height;
      this.glcanvas = scene.get('canvas');
      i = 0;
      while (!(i > 100)) {
        i++;
        x = Math.random() * 700;
        y = Math.random() * 700;
        radius = (Math.random() * 2) + 1;
        this.canvas.context.fillPath(function(context) {
          var gradient;
          gradient = context.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, "white");
          gradient.addColorStop(0.4, "white");
          gradient.addColorStop(0.4, "white");
          gradient.addColorStop(1, "black");
          context.color(gradient);
          return context.arc(x, y, radius, 0, Math.PI * 2, true);
        });
      }
    }

    Background.prototype.draw = function(context, canvas) {
      var camX, camY, curX, curY, startX, startY;
      context.globalCompositeOperation = "lighter";
      camX = -this.glcanvas.camera.x;
      camY = -this.glcanvas.camera.y;
      startX = camX + ((this.entity.model.x - camX) % this.entity.model.width);
      startY = camY + ((this.entity.model.y - camY) % this.entity.model.height);
      if (startX > camX) {
        startX -= this.entity.model.width;
      }
      if (startY > camY) {
        startY -= this.entity.model.height;
      }
      curX = startX;
      curY = startY;
      while (curX < camX + this.glcanvas.width) {
        while (curY < camY + this.glcanvas.height) {
          context.drawImage(this.canvas, curX, curY);
          curY += this.entity.model.height;
        }
        curY = startY;
        curX += this.entity.model.width;
      }
      return context.globalCompositeOperation = "source-over";
    };

    return Background;

  })(nv.RenderingPlugin);

  BulletRenderer = (function(_super) {

    __extends(BulletRenderer, _super);

    function BulletRenderer(scene, glcanvas) {
      var _this = this;
      this.scene = scene;
      this.glcanvas = glcanvas;
      BulletRenderer.__super__.constructor.call(this, this.glcanvas, []);
      this.scene.dispatcher.on('new:Bullet', function(event) {
        return _this.add(event.asset);
      });
      this.scene.dispatcher.on('delete:Bullet', function(event) {
        return _this.remove(event.asset);
      });
    }

    BulletRenderer.prototype.draw = function(context) {
      $.each(this.assets, function(index, asset) {
        var _this = this;
        return context.fillPath(function(context) {
          context.color('#ff7600');
          return context.arc(asset.x, asset.y, asset.radius, 0, Math.PI * 2, true);
        });
      });
      return this.assets = this.assets.filter(function(asset) {
        return asset.alive;
      });
    };

    return BulletRenderer;

  })(nv.ObjectListRenderer);

  ShipRenderer = (function(_super) {

    __extends(ShipRenderer, _super);

    function ShipRenderer(glcanvas, ship) {
      ShipRenderer.__super__.constructor.apply(this, arguments);
      this.color = '#FFF';
      this.strokeWidth = 2;
    }

    ShipRenderer.prototype.draw = function(context) {
      var points;
      context.strokeColor(this.color);
      context.strokeWidth(this.strokeWidth);
      points = this.asset.path();
      context.beginPath();
      context.strokeColor(this.color);
      context.strokeWidth(2);
      context.moveTo(points[0].x, points[0].y);
      $.each(points.slice(1), function() {
        return context.lineTo(this.x, this.y);
      });
      context.lineTo(points[0].x, points[0].y);
      context.stroke();
      return context.closePath();
    };

    return ShipRenderer;

  })(nv.ObjectRenderer);

  AsteroidRenderer = (function(_super) {

    __extends(AsteroidRenderer, _super);

    function AsteroidRenderer(scene, glcanvas) {
      var _this = this;
      this.scene = scene;
      this.glcanvas = glcanvas;
      AsteroidRenderer.__super__.constructor.call(this, this.glcanvas, this.scene.getModel('asteroids').items);
      this.color = '#FFF';
      this.strokeWidth = 2;
      this.scene.dispatcher.on('delete:Asteroid', function(data) {
        return _this.remove(data.asset);
      });
    }

    AsteroidRenderer.prototype.draw = function(context) {
      var _this = this;
      return $.each(this.assets, function(index, asset) {
        var bounds, points;
        context.strokeColor(_this.color);
        context.strokeWidth(_this.strokeWidth);
        points = asset.path();
        context.beginPath();
        context.strokeColor(_this.color);
        context.strokeWidth(2);
        context.moveTo(points[0].x, points[0].y);
        $.each(points.slice(1), function() {
          return context.lineTo(this.x, this.y);
        });
        context.lineTo(points[0].x, points[0].y);
        context.stroke();
        context.closePath();
        context.strokeRect(asset.x, asset.y, 2, 2);
        bounds = asset.bounds();
        context.beginPath();
        context.strokeColor("yellow");
        context.strokeWidth(1);
        context.moveTo(bounds.x, bounds.y);
        context.lineTo(bounds.x, bounds.y2);
        context.lineTo(bounds.x2, bounds.y2);
        context.lineTo(bounds.x2, bounds.y);
        context.lineTo(bounds.x, bounds.y);
        context.stroke();
        return context.closePath();
      });
    };

    return AsteroidRenderer;

  })(nv.ObjectListRenderer);

  HudRenderer = (function(_super) {

    __extends(HudRenderer, _super);

    function HudRenderer(glcanvas, hud) {
      this.glcanvas = glcanvas;
      HudRenderer.__super__.constructor.apply(this, arguments);
      this.ship = new nv.models.Ship;
      this.shipRenderer = new nv.renderers.ShipRenderer(this.glcanvas, this.ship);
    }

    HudRenderer.prototype.draw = function(context) {
      var dimensions, num;
      context.strokeColor(this.color);
      context.strokeRect(this.asset.x, this.asset.y, this.asset.width, this.asset.height);
      context.fillStyle = '#F00';
      context.font = 'italic bold 30px sans-serif';
      context.textBaseline = 'bottom';
      context.fillText("Asteroids", -this.glcanvas.camera.x + 20, -this.glcanvas.camera.y + 50);
      context.fillStyle = '#FFF';
      context.font = 'bold 30px sans-serif';
      context.textBaseline = 'bottom';
      dimensions = this.glcanvas.size();
      context.fillText(this.asset.score, -this.glcanvas.camera.x + dimensions.width - 120, -this.glcanvas.camera.y + dimensions.height - 10);
      num = this.asset.lives;
      while (num--) {
        this.ship.x = -this.glcanvas.camera.x + 180 + (num * 30);
        this.ship.y = -this.glcanvas.camera.y + 25;
        this.shipRenderer.draw(context);
      }
      return this;
    };

    return HudRenderer;

  })(nv.ObjectRenderer);

  MainRenderer = (function(_super) {

    __extends(MainRenderer, _super);

    function MainRenderer(glcanvas, model) {
      this.glcanvas = glcanvas;
      this.model = model;
      MainRenderer.__super__.constructor.apply(this, arguments);
      this.title = new gl.text({
        color: "#F00",
        x: 200,
        y: 200,
        font: "bold 20px sans-serif",
        text: this.model.title
      });
      this.actionText = new gl.text({
        color: "#F00",
        x: 200,
        y: 300,
        font: "bold 20px sans-serif",
        text: this.model.actionText
      });
    }

    MainRenderer.prototype.draw = function(context) {
      this.title.draw(context);
      return this.actionText.draw(context);
    };

    return MainRenderer;

  })(nv.ObjectRenderer);

}).call(this);

(function() {
  var Asteroids, Game, Main,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Asteroids = (function(_super) {

    __extends(Asteroids, _super);

    function Asteroids() {
      var canvasEl, glcanvas;
      Asteroids.__super__.constructor.apply(this, arguments);
      canvasEl = document.querySelector('canvas');
      glcanvas = gl(canvasEl);
      glcanvas.size(500, 500);
      glcanvas.background('#000');
      glcanvas.fullscreen();
      if (canvasEl === void 0) {
        document.body.appendChild(glcanvas.canvas);
      }
      this.registerEngine(nv.RenderingEngine);
      this.registerEngine(nv.GamepadEngine);
      this.registerScene('Main', Main);
      this.registerScene('Game', Game);
      this.openScene('Game', glcanvas);
    }

    return Asteroids;

  })(nv.Game);

  Main = (function(_super) {

    __extends(Main, _super);

    function Main(game, glcanvas) {
      var _this = this;
      this.glcanvas = glcanvas;
      Main.__super__.constructor.call(this, game, {
        canvas: glcanvas,
        keys: {
          start: nv.Key.Spacebar,
          left: nv.Key.A,
          right: nv.Key.D
        },
        trackMouse: true
      });
      this.addEntities(entities.Background, entities.Background, entities.Title, entities.ActionText, entities.Cursor);
      this.glcanvas.camera = nv.camera();
      this.glcanvas.startDrawUpdate(10, nv.bind(this, this.update));
      this.on("engine:gamepad:start", function() {
        return _this.game.openScene('Game', _this.glcanvas);
      });
    }

    Main.prototype.fire = function(event, data) {
      console.log("[EVENT] - " + event);
      return Main.__super__.fire.call(this, event, data);
    };

    Main.prototype.update = function(dt) {
      return Main.__super__.update.call(this, dt);
    };

    Main.prototype.destroy = function() {
      return this.glcanvas.stopDrawUpdate();
    };

    return Main;

  })(nv.Scene);

  Game = (function(_super) {

    __extends(Game, _super);

    function Game(game, glcanvas) {
      var ship,
        _this = this;
      this.glcanvas = glcanvas;
      Game.__super__.constructor.call(this, game, {
        canvas: this.glcanvas,
        keys: {
          left: nv.Key.A,
          right: nv.Key.D,
          up: nv.Key.W,
          down: nv.Key.S,
          shoot: nv.Key.Spacebar
        }
      });
      this.addEntities(entities.Background, entities.Background);
      ship = this.addEntity(entities.Ship);
      this.glcanvas.camera = nv.camera();
      this.glcanvas.camera.follow(ship.model, 250, 250);
      this.glcanvas.camera.zoom(0.5);
      this.glcanvas.camera.zoom(1, 2000);
      this.glcanvas.startDrawUpdate(60, function(dt) {
        return _this.update.call(_this, dt);
      });
    }

    Game.prototype.update = function(dt) {
      return Game.__super__.update.call(this, dt);
    };

    return Game;

  })(nv.Scene);

  $(function() {
    return new Asteroids;
  });

}).call(this);
