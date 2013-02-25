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
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      $(document).on('keydown', func);
      return func;
    },
    keyup: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      $(document).on('keyup', func);
      return func;
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
      this.trackers = {};
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
      if (!this.trackers[button]) {
        this.trackers[button] = [];
      }
      this.trackers[button].push(nv.keydown(key, function() {
        return _this.fireButton(button);
      }));
      return this.trackers[button].push(nv.keyup(key, function() {
        return _this.state[button] = false;
      }));
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
      if (listeners.indexOf(func !== 0)) {
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

    Plugin.prototype.destroy = function() {
      delete this.scene;
      return delete this.entity;
    };

    return Plugin;

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

    Entity.prototype.getPlugin = function(type) {
      var plugin, _i, _len, _ref;
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        if (plugin instanceof type) {
          return plugin;
        }
      }
      return null;
    };

    Entity.prototype.update = function(dt) {};

    Entity.prototype.destroy = function() {
      var plugin, _i, _len, _ref;
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        plugin.destroy();
      }
      delete this.model;
      delete this.plugins;
      return delete this.scene;
    };

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
      listeners = this.listeners[event];
      if (listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          _results.push(listener(data != null ? data : {}));
        }
        return _results;
      }
    };

    EventDispatcher.prototype.send = function(event, targets, data) {
      var target, _i, _len, _results;
      console.log(event, targets, data);
      _results = [];
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        if (!(target.events === void 0 || target.events[event] === void 0)) {
          _results.push(target.events[event](data));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
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

    Model.prototype.get = function(key) {
      return this[key];
    };

    Model.prototype.set = function(key, value) {
      return this[key] = value;
    };

    Model.prototype.persist = function() {
      var data, key;
      data = {};
      for (key in this) {
        data[key] = this[key];
      }
      return window.localStorage[this.constructor.name] = data;
    };

    Model.prototype.load = function() {
      return this.setMany(window.localStorage[this.constructor.name]);
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
      var klass, _i, _len, _ref, _ref1,
        _this = this;
      this.game = game;
      this.options = options;
      Scene.__super__.constructor.apply(this, arguments);
      this.gamepad = nv.gamepad();
      this.controllers = [];
      this.models = {};
      this.renderers = [];
      this.entities = [];
      this.deletedEntities = [];
      this.options = (_ref = this.options) != null ? _ref : {};
      this.engines = [];
      _ref1 = this.game.engines;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        klass = _ref1[_i];
        this.engines.push(new klass(this));
      }
      this.on("entity:remove", function() {
        var _ref2;
        return (_ref2 = _this.onRemoveEntity).call.apply(_ref2, [_this].concat(__slice.call(arguments)));
      });
      this.on("entity:add", function(options) {
        return _this.addEntity(options.entity, options);
      });
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
      if (this.entities.indexOf(entity) !== -1) {
        if (!!entity.destroy) {
          entity.destroy();
        }
        return this.entities.splice(this.entities.indexOf(entity), 1);
      }
    };

    Scene.prototype.onRemoveEntity = function(entity) {
      return this.deletedEntities.push(entity);
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
      var engine, entity, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        engine = _ref[_i];
        engine.update(dt);
      }
      _ref1 = this.entities;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        entity = _ref1[_j];
        entity.update(dt);
      }
      _ref2 = this.deletedEntities;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        entity = _ref2[_k];
        this.removeEntity(entity);
      }
      return this.deletedEntities = [];
    };

    Scene.prototype.destroy = function() {
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        this.removeEntity(entity);
      }
      _ref1 = this.engines;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        _results.push(engine.destroy());
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

    Engine.prototype.destroy = function() {
      return delete this.scene;
    };

    return Engine;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
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

    RenderingEngine.prototype.destroy = function() {
      var i, _results;
      i = this.drawables.length;
      _results = [];
      while (i--) {
        _results.push(this.drawables[i].destroy());
      }
      return _results;
    };

    return RenderingEngine;

  })(nv.Engine);

  nv.RenderingPlugin = (function(_super) {

    __extends(RenderingPlugin, _super);

    function RenderingPlugin(scene, entity) {
      RenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.scene.fire("engine:rendering:create", this);
    }

    RenderingPlugin.prototype.cache = function(width, height) {
      var oldX, oldY;
      oldX = this.entity.model.x;
      oldY = this.entity.model.y;
      this.entity.model.x = 0;
      this.entity.model.y = 0;
      this.cached = gl().size(width, height);
      this.draw(this.cached.context, this.cached);
      this._draw = this.draw;
      this.entity.model.x = oldX;
      this.entity.model.y = oldY;
      return this.draw = function(context, canvas) {
        return context.drawImage(this.cached, this.entity.model.x, this.entity.model.y);
      };
    };

    RenderingPlugin.prototype.draw = function(context, canvas) {};

    RenderingPlugin.prototype.destroy = function() {
      this.scene.fire("engine:rendering:delete", this);
      return RenderingPlugin.__super__.destroy.apply(this, arguments);
    };

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
      var shape, _i, _len, _ref, _results;
      _ref = this.entity.model.shapes();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        shape = _ref[_i];
        if (shape.strokeColor) {
          context.strokeColor(shape.strokeColor);
        }
        if (shape.strokeWidth) {
          context.strokeWidth(shape.strokeWidth);
        }
        if (shape.fillStyle) {
          context.color(shape.fillStyle);
        }
        context.beginPath();
        context.moveTo(shape.points[0].x, shape.points[0].y);
        $.each(shape.points.slice(1), function() {
          return context.lineTo(this.x, this.y);
        });
        context.lineTo(shape.points[0].x, shape.points[0].y);
        if (shape.fillStyle) {
          context.fill();
        }
        context.stroke();
        _results.push(context.closePath());
      }
      return _results;
    };

    return PathRenderingPlugin;

  })(nv.RenderingPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.GamepadEngine = (function(_super) {

    __extends(GamepadEngine, _super);

    function GamepadEngine(scene) {
      var key;
      GamepadEngine.__super__.constructor.call(this, scene);
      this.gamepad = scene.gamepad;
      this.options = scene.options;
      if (!!this.options.trackMouse) {
        this.gamepad.trackMouse();
      }
      for (key in this.options.keys) {
        this.gamepad.aliasKey(key, this.options.keys[key]);
        this.updateFunction = nv.bind(this, this.onButtonPress);
        this.gamepad.onButtonPress(key, this.updateFunction);
      }
    }

    GamepadEngine.prototype.onButtonPress = function(button) {
      return this.scene.fire("engine:gamepad:" + button);
    };

    GamepadEngine.prototype.destroy = function() {
      var key;
      for (key in this.options.keys) {
        this.gamepad.offButtonPress(key, this.updateFunction);
      }
      delete this.gamepad;
      delete this.options;
      return GamepadEngine.__super__.destroy.apply(this, arguments);
    };

    return GamepadEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __objectId,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PhysicsEngine = (function(_super) {

    __extends(PhysicsEngine, _super);

    function PhysicsEngine(scene) {
      var _this = this;
      PhysicsEngine.__super__.constructor.call(this, scene);
      this.passiveObjects = {};
      this.activeObjects = {};
      this.physicsObjects = [];
      this.scene.on("engine:physics:create", function(collidable) {
        return _this.trackObject(collidable);
      });
      this.scene.on("engine:physics:delete", function(collidable) {
        return _this.removeObject(collidable);
      });
      this.scene.on("engine:physics:register", function(obj) {
        return _this.physicsObjects.push(obj);
      });
    }

    PhysicsEngine.prototype.trackObjects = function(array) {
      var self;
      self = this;
      return $.each(array, function() {
        return self.trackObject(this);
      });
    };

    PhysicsEngine.prototype.trackObject = function(obj) {
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

    PhysicsEngine.prototype.removeObject = function(obj) {
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

    PhysicsEngine.prototype.update = function(dt) {
      var ida, idp, obj, obja, objaBounds, objp, _i, _len, _ref, _ref1, _ref2, _results;
      _ref = this.activeObjects;
      for (ida in _ref) {
        obja = _ref[ida];
        objaBounds = obja.bounds();
        _ref1 = this.passiveObjects;
        for (idp in _ref1) {
          objp = _ref1[idp];
          if (ida === idp) {
            continue;
          }
          if (objp.bounds().intersects(objaBounds)) {
            this.scene.fire("engine:collision:" + obja.entity.constructor.name + ":" + objp.entity.constructor.name, {
              actor: obja.entity,
              target: objp.entity
            });
            break;
          }
        }
      }
      _ref2 = this.physicsObjects;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        obj = _ref2[_i];
        _results.push(obj.update(dt));
      }
      return _results;
    };

    return PhysicsEngine;

  })(nv.Engine);

  nv.PhysicsPlugin = (function(_super) {

    __extends(PhysicsPlugin, _super);

    function PhysicsPlugin(scene, entity) {
      PhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.scene.fire("engine:physics:create", this);
    }

    PhysicsPlugin.prototype.destroy = function() {
      this.scene.fire("engine:physics:delete", this);
      return PhysicsPlugin.__super__.destroy.apply(this, arguments);
    };

    return PhysicsPlugin;

  })(nv.Plugin);

  __objectId = 0;

  nv.PathPhysicsPlugin = (function(_super) {

    __extends(PathPhysicsPlugin, _super);

    function PathPhysicsPlugin(scene, entity) {
      this.id = __objectId++;
      this.type = entity.model.type;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      PathPhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.updateBounds();
    }

    PathPhysicsPlugin.prototype.bounds = function() {
      this.updateBounds();
      return this.boundingRect;
    };

    PathPhysicsPlugin.prototype.updateBounds = function() {
      var x1, x2, y1, y2;
      x1 = x2 = y1 = y2 = null;
      $.each(this.entity.model.path(), function() {
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
      return this.boundingRect.reset(x1, y1, x2, y2);
    };

    return PathPhysicsPlugin;

  })(nv.PhysicsPlugin);

  nv.GravityPhysicsPlugin = (function(_super) {

    __extends(GravityPhysicsPlugin, _super);

    function GravityPhysicsPlugin(scene, entity) {
      this.gravity = 0.003;
      GravityPhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.scene.fire("engine:physics:register", this);
    }

    GravityPhysicsPlugin.prototype.update = function(dt) {
      var model, tx, ty;
      model = this.entity.model;
      if (!model.thrusters) {
        tx = this.gravity * (model.thrustVector.x < 0 ? 1 : -1);
        ty = this.gravity * (model.thrustVector.y < 0 ? 1 : -1);
        return model.thrustVector.translate(tx, ty);
      }
    };

    return GravityPhysicsPlugin;

  })(nv.PhysicsPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SoundEngine = (function(_super) {

    __extends(SoundEngine, _super);

    function SoundEngine(scene) {
      var _this = this;
      SoundEngine.__super__.constructor.call(this, scene);
      this.plugins = [];
      this.scene.on("sound:plugin:create", function(plugin) {
        return _this.plugins.push(plugin);
      });
      this.scene.on("sound:plugin:delete", function(plugin) {
        return _this.plugins = _this.plugins.filter(function(p) {
          return p.id !== plugin.id;
        });
      });
    }

    SoundEngine.prototype.update = function(dt) {
      var plugin, _i, _len, _ref, _results;
      _ref = this.plugins;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        _results.push(plugin.update(dt));
      }
      return _results;
    };

    return SoundEngine;

  })(nv.Engine);

  nv.SoundPlugin = (function(_super) {

    __extends(SoundPlugin, _super);

    function SoundPlugin(scene, entity, options) {
      var dispatch, obj, self, _i, _len, _ref;
      this.options = options;
      SoundPlugin.__super__.constructor.call(this, scene, entity);
      this.state = "stopped";
      this.sound = new Audio(this.options.path);
      this.sound.onended = function() {
        this.sound.currentTime = 0;
        this.state = "stopped";
        if (this.options.repeat) {
          return this.play();
        }
      };
      self = this;
      dispatch = function() {
        switch (this.action) {
          case "play":
            return self.play();
          case "stop":
            return self.stop();
          case "pause":
            return self.pause();
        }
      };
      _ref = this.options.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        this.scene.on(obj.event, dispatch.bind(obj));
      }
      if (this.options.autoplay) {
        this.play();
      }
    }

    SoundPlugin.prototype.update = function(dt) {
      if (!this.options.maxPlayTime) {
        return;
      }
      if (new Date().getTime() - this.playTime > this.options.maxPlayTime) {
        return this.stop();
      }
    };

    SoundPlugin.prototype.play = function() {
      if (this.state === "playing") {
        this.rewind();
      }
      this.playTime = new Date().getTime();
      if (this.options.startTime) {
        this.sound.currentTime = this.options.startTime;
      }
      this.sound.play();
      return this.state = "playing";
    };

    SoundPlugin.prototype.pause = function() {
      this.sound.pause();
      return this.state = "paused";
    };

    SoundPlugin.prototype.rewind = function() {
      this.pause();
      this.sound.currentTime = 0;
      return this.state = "stopped";
    };

    SoundPlugin.prototype.stop = function() {
      return this.rewind();
    };

    return SoundPlugin;

  })(nv.Plugin);

  nv.SoundFactory = (function() {

    function SoundFactory(scene) {
      this.scene = scene;
    }

    SoundFactory.prototype.wire = function(sounds) {
      var sound, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = sounds.length; _i < _len; _i++) {
        sound = sounds[_i];
        _results.push(this._add(sound));
      }
      return _results;
    };

    SoundFactory.prototype._add = function(sound) {
      return this.scene.fire('sound:plugin:create', new nv.SoundPlugin(this.scene, null, sound));
    };

    return SoundFactory;

  })();

}).call(this);

(function() {



}).call(this);

(function() {



}).call(this);

(function() {
  var cancelFrame, gl, requestFrame, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _updateId;

  requestFrame = (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
    return setTimeout(callback, 17);
  };

  cancelFrame = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout;

  gl = function(canvas) {
    return new gl.prototype.init(canvas);
  };

  gl.zOrderProperty = 'zIndex';

  _updateId = 0;

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
      canvas.fullscreened = false;
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
      this.fullscreened = true;
      this.size(document.width, document.height);
      document.body.style.overflow = "hidden";
      return window.addEventListener('resize', function(event) {
        return _this.size(document.width, document.height);
      });
    },
    background: function(color) {
      return this.style.background = color;
    },
    draw: function(object, context) {
      if (context == null) {
        context = this.context;
      }
      return object.draw(context, this);
    },
    addDrawable: function(object) {
      return this.objects.push(object);
    },
    removeDrawable: function(object) {
      return this.objects.splice(this.objects.indexOf(object), 1);
    },
    drawObjects: function(context) {
      var object, _i, _len, _ref11, _results;
      if (context == null) {
        context = this.context;
      }
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
        _results.push(this.draw(object, context));
      }
      return _results;
    },
    startDrawUpdate: function(fps, func) {
      var dimensions, lastTime, update, updateId,
        _this = this;
      this.updating = true;
      lastTime = Date.now();
      updateId = _updateId++;
      dimensions = this.size();
      this.buffer = gl().size(dimensions.width, dimensions.height);
      if (!!this.fullscreened) {
        this.buffer.fullscreen();
      }
      update = function() {
        var bufferContext, delta, now, stop;
        now = Date.now();
        delta = now - lastTime;
        delta /= 1000;
        stop = func(delta);
        bufferContext = _this.buffer.context;
        bufferContext.save();
        bufferContext.clear();
        if (_this.camera) {
          _this.camera.update(delta, bufferContext, _this);
        }
        _this.drawObjects(bufferContext);
        bufferContext.restore();
        _this.context.clear();
        _this.context.drawImage(_this.buffer, 0, 0);
        lastTime = now;
        if (_this.cancel !== void 0 && _this.cancel.indexOf(updateId) !== -1) {
          _this.cancel.splice(_this.cancel.indexOf(updateId), 1);
          if (_this.cancel.length === 0) {
            return delete _this.cancel;
          }
        } else {
          if (!!_this.updating) {
            return _this.requestFrameKey = requestFrame(update);
          }
        }
      };
      this.requestFrameKey = requestFrame(update);
      return updateId;
    },
    stopDrawUpdate: function(updateId) {
      this.updating = false;
      if (!this.cancel) {
        this.cancel = [];
      }
      this.cancel.push(updateId);
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

    function Background(scene, follow, variance) {
      this.follow = follow;
      this.variance = variance;
      Background.__super__.constructor.call(this, scene, [renderers.Background], new models.Background);
    }

    Background.prototype.update = function(dt) {
      if (!!this.follow) {
        this.model.x = this.follow.model.x * this.variance;
        return this.model.y = this.follow.model.y * this.variance;
      }
    };

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
      Ship.__super__.constructor.call(this, scene, [renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin], new models.Ship);
      this.scene.on('engine:collision:Ship:Asteroid', function(data) {});
      this.scene.on('engine:gamepad:shoot', function() {
        return _this.fireBullet.call(_this);
      });
      this.maxVelocity = 3;
    }

    Ship.prototype.fireBullet = function() {
      return this.scene.addEntity(entities.Bullet, this.model.path()[0], this.model.rotation);
    };

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
        this.model.velocity = Math.min(this.model.velocity * 1.01 || 1, this.maxVelocity);
        if (!(this.model.velocity >= this.maxVelocity)) {
          this.model.thrustVector.translate(this.model.velocity * Math.sin(this.model.rotation) * dt * 4, -this.model.velocity * Math.cos(this.model.rotation) * dt * 4);
        }
      }
      this.model.thrusters = state.up;
      if (!this.model.thrusters) {
        this.model.velocity = 0;
      }
      this.model.translate(this.model.thrustVector.x, this.model.thrustVector.y);
      if (this.model.thrusters) {
        this.scene.fire("entity:thrust:Ship");
      }
      return this.wrap();
    };

    return Ship;

  })(WrappingEntity);

  entities.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(scene, options) {
      var scale, _ref,
        _this = this;
      if (options == null) {
        options = {};
      }
      scale = (_ref = options.scale) != null ? _ref : Math.ceil(Math.random() * 4);
      Asteroid.__super__.constructor.call(this, scene, [nv.PathRenderingPlugin, nv.PathPhysicsPlugin], new models.Asteroid(options.x || 500 * Math.random(), options.y || 500 * Math.random(), scale, options.direction));
      this.scene.on('engine:collision:Ship:Asteroid', function(data) {
        if (data.target === _this) {
          return _this.handleCollision(data);
        }
      });
      this.scene.on('engine:collision:Bullet:Asteroid', function(data) {
        if (data.target === _this) {
          return _this.handleCollision(data);
        }
      });
    }

    Asteroid.prototype.handleCollision = function(data) {
      var options, size;
      this.scene.fire("entity:destroyed:Asteroid", data.target);
      this.scene.fire("entity:remove", data.target);
      size = data.target.model.get('size') - 1;
      if (size !== 0) {
        options = {
          entity: entities.Asteroid,
          x: data.target.model.get('x'),
          y: data.target.model.get('y'),
          scale: size,
          direction: data.target.model.get('direction') - 0.3
        };
        this.scene.fire('entity:add', options);
        options.direction += 0.6;
        return this.scene.fire('entity:add', options);
      }
    };

    Asteroid.prototype.update = function(dt) {
      this.model.rotation += this.model.rotationSpeed;
      this.model.translate(Math.sin(this.model.direction) * this.model.speed, Math.cos(this.model.direction) * this.model.speed);
      return this.wrap();
    };

    return Asteroid;

  })(WrappingEntity);

  entities.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(scene, point, rotation) {
      var _this = this;
      Bullet.__super__.constructor.call(this, scene, [renderers.Bullet, nv.PathPhysicsPlugin], new models.Bullet(point, rotation));
      this.scene.on('engine:collision:Bullet:Asteroid', function(data) {
        if (data.actor === _this) {
          return _this.scene.fire("entity:remove", data.actor);
        }
      });
    }

    Bullet.prototype.update = function(dt) {
      this.model.translate(this.model.speed * Math.sin(this.model.angle) * dt, -1 * this.model.speed * Math.cos(this.model.angle) * dt);
      if (this.model.x < -100 || this.model.x > 900) {
        if (this.model.y < -100 || this.model.y > 900) {
          this.model.alive = false;
        }
      }
      this.model.life--;
      if (this.model.life === 0) {
        this.model.alive = false;
        return this.scene.fire("entity:remove", this);
      } else {
        return this.wrap();
      }
    };

    return Bullet;

  })(WrappingEntity);

  entities.Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(scene) {
      var canvas,
        _this = this;
      canvas = scene.get('canvas');
      Hud.__super__.constructor.call(this, scene, [renderers.Hud], {
        color: '#FFF',
        font: "40px sans-serif",
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
        ships: 3,
        score: 0
      });
      this.scene.on("entity:destroyed:Asteroid", function(data) {
        _this.model.score += [500, 300, 200, 100][data.model.size - 1];
        return console.log("score", _this.model.score);
      });
      this.scene.on("entity:destroyed:Ship", function(data) {
        _this.model.ships--;
        return console.log("ships", _this.model.ships);
      });
    }

    return Hud;

  })(nv.Entity);

}).call(this);

(function() {
  var models,
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
        thrustVector: new nv.Point(0, 0),
        velocity: 0,
        health: 100,
        shootDelay: 10,
        x: 30,
        y: 30,
        width: 16,
        height: 24,
        rotation: 0,
        thrusters: false,
        type: 'both',
        color: '#FFF',
        strokeColor: '#FFF',
        strokeWidth: 2,
        thrustersColor: 'orange',
        thrustersWidth: 2,
        thrustersFill: 'yellow'
      });
      this.buildWireframes();
    }

    Ship.prototype.buildWireframes = function() {
      this.shipWF = {
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth,
        points: [new nv.Point(0, -this.height / 2), new nv.Point(this.width / 2, this.height / 2), new nv.Point(0, this.height * 0.4), new nv.Point(-this.width / 2, this.height / 2)]
      };
      return this.thrustersWF = {
        strokeColor: this.thrustersColor,
        strokeWidth: this.thrustersWidth,
        fillStyle: this.thrustersFill,
        points: [new nv.Point(0, this.height * 0.4 + 4), new nv.Point((this.width / 2) - 4, (this.height / 2) + 4), new nv.Point(0, this.height * 1.3), new nv.Point((-this.width / 2) + 4, (this.height / 2) + 4)]
      };
    };

    Ship.prototype.shapes = function() {
      var shapes;
      shapes = [];
      shapes.push(this.prepareShape(this.shipWF));
      if (this.thrusters) {
        shapes.push(this.prepareShape(this.thrustersWF));
      }
      return shapes;
    };

    Ship.prototype.path = function() {
      var ship;
      ship = this.prepareShape(this.shipWF);
      return ship.points;
    };

    Ship.prototype.prepareShape = function(wf) {
      var cosine, model, path, shape, sine;
      shape = $.extend({}, wf);
      model = this;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      $.each(shape.points, function() {
        return path.push(new nv.Point(this.x * cosine - this.y * sine + model.x, this.x * sine + this.y * cosine + model.y));
      });
      shape.points = path;
      return shape;
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

  models.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(x, y, scale, direction) {
      if (scale == null) {
        scale = 1;
      }
      if (direction == null) {
        direction = null;
      }
      Asteroid.__super__.constructor.call(this, {
        x: x,
        y: y,
        width: 12 * scale,
        height: 12 * scale,
        speed: Math.random() + 0.3,
        rotation: 0,
        rotationSpeed: ((Math.random() / 10) - 0.05) / 8,
        direction: direction || (Math.random() * Math.PI) - (Math.PI / 2),
        type: 'passive',
        strokeColor: '#FFF',
        strokeWidth: 2,
        size: scale
      });
      this.points = this.buildWireframe(scale * .5);
    }

    Asteroid.prototype.buildWireframe = function(scalar) {
      var points, pt;
      pt = new nv.Point(0, -this.height);
      points = [];
      points.push(pt.clone());
      points.push(pt.translate(30 * scalar, 20 * scalar).clone());
      points.push(pt.translate(5 * scalar, 30 * scalar).clone());
      points.push(pt.translate(-12 * scalar, 10 * scalar).clone());
      points.push(pt.translate(-33 * scalar, -10 * scalar).clone());
      points.push(pt.translate(-10 * scalar, -35 * scalar).clone());
      return points;
    };

    Asteroid.prototype.shapes = function() {
      return [
        {
          points: this.path(),
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth
        }
      ];
    };

    Asteroid.prototype.path = function() {
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

    Asteroid.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    Asteroid.prototype.rotate = function(dr) {
      return this.rotation += dr;
    };

    return Asteroid;

  })(nv.Model);

  models.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(pt, angle) {
      Bullet.__super__.constructor.call(this, {
        x: pt.x,
        y: pt.y,
        color: "#ff7600",
        speed: 400,
        radius: 3,
        alive: true,
        life: 100,
        angle: angle,
        type: 'active'
      });
      this.points = this.buildWireframe();
    }

    Bullet.prototype.path = function() {
      var model, path;
      path = [];
      model = this;
      $.each(this.points, function() {
        return path.push(new nv.Point(model.x, model.y));
      });
      return path;
    };

    Bullet.prototype.buildWireframe = function() {
      return [new nv.Point(0, 0)];
    };

    Bullet.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Bullet;

  })(nv.Model);

}).call(this);

(function() {
  var renderers,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.renderers = renderers = {};

  renderers.Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(scene, entity) {
      Hud.__super__.constructor.call(this, scene, entity);
    }

    Hud.prototype.draw = function(context, canvas) {
<<<<<<< HEAD
      context.save();
      context.shadowColor = this.entity.model.color;
      context.shadowBlur = 5;
      context.strokeColor(this.entity.model.color);
      context.strokeRect(this.entity.model.x, this.entity.model.y, this.entity.model.width, this.entity.model.height);
      return context.restore();
=======
      var score, textWidth;
      context.strokeColor(this.entity.model.color);
      context.strokeRect(this.entity.model.x, this.entity.model.y, this.entity.model.width, this.entity.model.height);
      context.font = this.entity.model.font;
      score = this.entity.model.score.toString();
      textWidth = context.measureText(score).width;
      console.log("width", textWidth);
      return context.strokeText(score, this.entity.model.width - textWidth - 20, this.entity.model.y + 50);
>>>>>>> origin/develop
    };

    return Hud;

  })(nv.RenderingPlugin);

  renderers.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(scene, entity) {
      Bullet.__super__.constructor.call(this, scene, entity);
    }

    Bullet.prototype.draw = function(context, canvas) {
      var _this = this;
      return context.fillPath(function(context) {
        context.color(_this.entity.model.color);
        return context.arc(_this.entity.model.x, _this.entity.model.y, _this.entity.model.radius, 0, Math.PI * 2, true);
      });
    };

    return Bullet;

  })(nv.RenderingPlugin);

  renderers.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship() {
      return Ship.__super__.constructor.apply(this, arguments);
    }

    Ship.prototype.constuctor = function(scene, entity) {
      return Ship.__super__.constuctor.call(this, scene, entity);
    };

    Ship.prototype.draw = function(context, canvas) {
      Ship.__super__.draw.call(this, context, canvas);
      if (this.entity.model.thrusters) {
        return this.entity.model.path("thrusters");
      }
    };

    return Ship;

  })(nv.PathRenderingPlugin);

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
      this.registerEngine(nv.PhysicsEngine);
      this.registerEngine(nv.SoundEngine);
      this.registerScene('Main', Main);
      this.registerScene('Game', Game);
      this.openScene('Main', glcanvas);
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
      this.updateId = this.glcanvas.startDrawUpdate(10, nv.bind(this, this.update));
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
      Main.__super__.destroy.apply(this, arguments);
      return this.glcanvas.stopDrawUpdate(this.updateId);
    };

    return Main;

  })(nv.Scene);

  Game = (function(_super) {

    __extends(Game, _super);

    function Game(game, glcanvas) {
      var sdoc, ship;
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
      ship = this.addEntity(entities.Ship);
      this.addEntity(entities.Background, ship, 0.05);
      this.addEntity(entities.Background, ship, 0.01);
      this.addEntities(entities.Hud, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid, entities.Asteroid);
      sdoc = [];
      sdoc.push({
        path: "/src/assets/sounds/pew_pew.wav",
        events: [
          {
            event: "engine:gamepad:shoot",
            action: "play"
          }
        ]
      });
      sdoc.push({
        path: "/src/assets/sounds/depth_charge.wav",
        events: [
          {
            event: "engine:collision:Bullet:Asteroid",
            action: "play"
          }
        ]
      });
      sdoc.push({
        path: "/src/assets/sounds/bullet_whizzing.wav",
        events: [
          {
            event: "entity:thrust:Ship",
            action: "play"
          }
        ],
        maxPlayTime: 350,
        startTime: 0.15
      });
      new nv.SoundFactory(this).wire(sdoc);
      this.glcanvas.camera = nv.camera();
      this.glcanvas.camera.follow(ship.model, 250, 250);
      this.glcanvas.camera.zoom(0.5);
      this.glcanvas.camera.zoom(1, 2000);
      this.updateId = this.glcanvas.startDrawUpdate(60, nv.bind(this, this.update));
    }

    Game.prototype.fire = function(event, data) {
      console.log("[EVENT] - " + event);
      return Game.__super__.fire.call(this, event, data);
    };

    Game.prototype.update = function(dt) {
      return Game.__super__.update.call(this, dt);
    };

    Game.prototype.destroy = function() {
      Game.__super__.destroy.apply(this, arguments);
      return this.glcanvas.stopDrawUpdate(this.updateId);
    };

    return Game;

  })(nv.Scene);

  $(function() {
    return new Asteroids;
  });

}).call(this);
