(function() {
  var _ref;

  this.nv = (_ref = this.nv) != null ? _ref : {};

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

    function Entity(plugins) {
      this.plugins = plugins;
    }

    return Entity;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Model = (function() {

    function Model(name, options, data) {}

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

    function Collection(name, options, arr) {
      this.items = arr != null ? arr : [];
    }

    return Collection;

  })(nv.Model);

}).call(this);

(function() {
  var zIndex;

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

  nv.Scene = (function() {

    function Scene() {
      this.controllers = [];
      this.models = {};
      this.renderers = [];
    }

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
      var controller, _i, _len, _ref, _results;
      _ref = this.controllers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controller = _ref[_i];
        _results.push(controller.update(dt));
      }
      return _results;
    };

    return Scene;

  })();

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

    function Rect(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    Rect.prototype.clone = function() {
      return new nv.Rect(this.x, this.y, this.width, this.height);
    };

    Rect.prototype.contains = function(pt) {
      return (pt.x >= this.x && pt.x <= this.x + this.width) && (pt.y >= this.y && pt.y <= this.y + this.height);
    };

    Rect.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Rect;

  })();

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
  var EventDispatcher;

  EventDispatcher = (function() {

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
      data.data = data;
      data.type = event;
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

  window.EventDispatcher = EventDispatcher;

}).call(this);

(function() {
  var Connection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Connection = (function(_super) {

    __extends(Connection, _super);

    function Connection() {
      var _this = this;
      this.listeners = {};
      this.connection = this.connectToChannel('novus');
      this.connection.on('connect', function() {
        return console.log('Connected!');
      });
      this.connection.on('join', function(user) {
        return console.log(user);
      });
      this.connection.on('message', function(message) {
        return _this.handleMessage(message);
      });
    }

    Connection.prototype.handleMessage = function(message) {
      console.log(message);
      if (message.id) {
        return this.fire(message.id, message);
      }
    };

    Connection.prototype.send = function(id, data) {
      data.id = id;
      return this.connection.emit('message', data);
    };

    Connection.prototype.connectToChannel = function(channel) {
      return io.connect('http://pubsub.pubnub.com', {
        channel: channel,
        publish_key: 'pub-c54880a5-ba99-4836-a084-08f57b4b5333',
        subscribe_key: 'sub-3129de73-8f26-11e1-94c8-1543525cae6d',
        ssl: false
      });
    };

    Connection.prototype.auth = function(user) {
      var _this = this;
      return $.post('http://localhost:3000', {
        user: user
      }, function(response) {
        var token;
        token = JSON.parse(response).token;
        _this.connection = _this.connectToChannel(token);
        return _this.connection.send('Hello server!');
      });
    };

    return Connection;

  })(EventDispatcher);

  window.nub = function() {
    return new Connection();
  };

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
  var Asteroid, Asteroids, Background, Bullet, GameObject, Global, Hud, Ship,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Background = (function() {

    function Background() {
      this.x = 0;
      this.y = 0;
    }

    return Background;

  })();

  GameObject = (function() {

    function GameObject(options) {
      var key, value;
      this.id = null;
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.rotation = 0;
      for (key in options) {
        value = options[key];
        this[key] = value;
      }
      this._path = [];
      this._wireframe = [];
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
      return this._path = newPath;
    };

    GameObject.prototype.path = function() {
      return this._path;
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

  Bullet = (function() {

    function Bullet(pt, angle) {
      this.angle = angle;
      this.x = pt.x;
      this.y = pt.y;
      this.id = null;
      this.speed = 400;
      this.radius = 3;
      this.alive = true;
      this.life = 100;
    }

    return Bullet;

  })();

  Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship() {
      Ship.__super__.constructor.call(this, {
        x: 0,
        y: 30,
        width: 16,
        height: 24,
        speed: 5,
        rotation: 0,
        thrusters: false
      });
    }

    Ship.prototype.buildWireframe = function() {
      return [new nv.Point(0, -this.height / 2), new nv.Point(this.width / 2, this.height / 2), new nv.Point(0, this.height * 0.4), new nv.Point(-this.width / 2, this.height / 2)];
    };

    Ship.prototype.nose = function() {
      return this._path[0];
    };

    return Ship;

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
        direction: (Math.random() * Math.PI) - (Math.PI / 2)
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

  Global = (function(_super) {

    __extends(Global, _super);

    function Global() {
      this.title = "Asteroids";
      this.actionText = "Press <Space> to Start.";
      this.options = {
        difficulty: "easy"
      };
    }

    return Global;

  })(nv.Model);

  $(function() {
    return nv.models = {
      Background: Background,
      Ship: Ship,
      Bullet: Bullet,
      Asteroid: Asteroid,
      Asteroids: Asteroids,
      Hud: Hud,
      Global: Global
    };
  });

}).call(this);

(function() {
  var AsteroidController, BulletController, ShipController, wrap,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BulletController = (function(_super) {

    __extends(BulletController, _super);

    function BulletController(ship, glcanvas, gamepad) {
      this.ship = ship;
      this.glcanvas = glcanvas;
      this.gamepad = gamepad;
      BulletController.__super__.constructor.apply(this, arguments);
      this.assets = [];
      this.shotDelay = 10;
    }

    BulletController.prototype.update = function(dt) {
      var bullet, state,
        _this = this;
      state = this.gamepad.getState();
      if (state.shoot && this.shotDelay === 0) {
        console.log(this.ship.nose(), this.ship.rotation);
        bullet = new nv.models.Bullet(this.ship.nose(), this.ship.rotation);
        this.assets.push(bullet);
        $(document).trigger('new:bullet', {
          asset: bullet
        });
        this.shotDelay = 10;
      }
      if (this.shotDelay) {
        this.shotDelay--;
      }
      $.each(this.assets, function(index, asset) {
        asset.x += asset.speed * Math.sin(asset.angle) * dt;
        asset.y -= asset.speed * Math.cos(asset.angle) * dt;
        if (asset.x < -100 || asset.x > 900) {
          if (asset.y < -100 || asset.y > 900) {
            asset.alive = false;
          }
        }
        asset.life--;
        if (!(asset.life > 0)) {
          asset.alive = false;
        }
        return wrap(asset, _this.glcanvas);
      });
      return this.assets = this.assets.filter(function(asset) {
        return asset.alive;
      });
    };

    return BulletController;

  })(nv.Controller);

  wrap = function(asset, glcanvas) {
    var dimensions;
    dimensions = glcanvas.size();
    if (asset.x < 0) {
      asset.x = dimensions.width;
    } else if (asset.x > dimensions.width) {
      asset.x = 0;
    }
    if (asset.y < 0) {
      return asset.y = dimensions.height;
    } else if (asset.y > dimensions.height) {
      return asset.y = 0;
    }
  };

  AsteroidController = (function(_super) {

    __extends(AsteroidController, _super);

    function AsteroidController(assets, glcanvas) {
      this.assets = assets;
      this.glcanvas = glcanvas;
      AsteroidController.__super__.constructor.apply(this, arguments);
    }

    AsteroidController.prototype.update = function(dt) {
      var _this = this;
      return $.each(this.assets, function(index, asset) {
        asset.rotation += asset.rotationSpeed;
        asset.translate(Math.sin(asset.direction) * asset.speed, Math.cos(asset.direction) * asset.speed);
        return wrap(asset, _this.glcanvas);
      });
    };

    return AsteroidController;

  })(nv.Controller);

  ShipController = (function(_super) {

    __extends(ShipController, _super);

    function ShipController(asset, glcanvas, gamepad) {
      this.glcanvas = glcanvas;
      this.gamepad = gamepad;
      ShipController.__super__.constructor.apply(this, arguments);
      this.speed = 5;
      this.shootDelay = 10;
    }

    ShipController.prototype.update = function(dt) {
      var state;
      state = this.gamepad.getState();
      if (state.left) {
        this.asset.rotate(-0.1);
      }
      if (state.right) {
        this.asset.rotate(0.1);
      }
      if (state.up) {
        this.asset.translate(this.speed * Math.sin(this.asset.rotation), -this.speed * Math.cos(this.asset.rotation));
      }
      if (state.down) {
        this.asset.translate(-this.speed / 2 * Math.sin(this.asset.rotation), this.speed / 2 * Math.cos(this.asset.rotation));
      }
      this.asset.thrusters = state.up;
      return wrap(this.asset, this.glcanvas);
    };

    return ShipController;

  })(nv.Controller);

  $(function() {
    return nv.controllers = {
      ShipController: ShipController,
      BulletController: BulletController,
      AsteroidController: AsteroidController
    };
  });

}).call(this);

(function() {
  var AsteroidRenderer, BackgroundRenderer, BulletRenderer, HudRenderer, MainRenderer, ShipRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BackgroundRenderer = (function(_super) {

    __extends(BackgroundRenderer, _super);

    function BackgroundRenderer(glcanvas, asset) {
      var i, radius, x, y;
      this.glcanvas = glcanvas;
      BackgroundRenderer.__super__.constructor.apply(this, arguments);
      this.zIndex = this.nextZIndex();
      this.canvas = gl().size(700, 700);
      this.asset.width = this.canvas.width;
      this.asset.height = this.canvas.height;
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

    BackgroundRenderer.prototype.draw = function(context, canvas) {
      var camX, camY, curX, curY, startX, startY;
      context.globalCompositeOperation = "lighter";
      camX = -this.glcanvas.camera.x;
      camY = -this.glcanvas.camera.y;
      startX = camX + ((this.asset.x - camX) % this.asset.width);
      startY = camY + ((this.asset.y - camY) % this.asset.height);
      if (startX > camX) {
        startX -= this.asset.width;
      }
      if (startY > camY) {
        startY -= this.asset.height;
      }
      curX = startX;
      curY = startY;
      while (curX < camX + this.glcanvas.width) {
        while (curY < camY + this.glcanvas.height) {
          context.drawImage(this.canvas, curX, curY);
          curY += this.asset.height;
        }
        curY = startY;
        curX += this.asset.width;
      }
      return context.globalCompositeOperation = "source-over";
    };

    return BackgroundRenderer;

  })(nv.ObjectRenderer);

  BulletRenderer = (function(_super) {

    __extends(BulletRenderer, _super);

    function BulletRenderer(glcanvas, bullets) {
      var _this = this;
      BulletRenderer.__super__.constructor.apply(this, arguments);
      $(document).on('new:bullet', function(event) {
        return _this.add(event.data.asset);
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

    function AsteroidRenderer(glcanvas, assets) {
      AsteroidRenderer.__super__.constructor.apply(this, arguments);
      this.color = '#FFF';
      this.strokeWidth = 2;
    }

    AsteroidRenderer.prototype.draw = function(context) {
      var _this = this;
      return $.each(this.assets, function(index, asset) {
        var points;
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
        return context.strokeRect(asset.x, asset.y, 2, 2);
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

  $(function() {
    return nv.renderers = {
      ShipRenderer: ShipRenderer,
      BulletRenderer: BulletRenderer,
      BackgroundRenderer: BackgroundRenderer,
      AsteroidRenderer: AsteroidRenderer,
      HudRenderer: HudRenderer,
      MainRenderer: MainRenderer
    };
  });

}).call(this);

(function() {
  var Game, Main,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Main = (function(_super) {

    __extends(Main, _super);

    function Main(glcanvas, gamepad, callback) {
      var _ref;
      this.glcanvas = glcanvas;
      this.gamepad = gamepad;
      this.callback = callback;
      Main.__super__.constructor.apply(this, arguments);
      this.addModel('Global', (_ref = window.global) != null ? _ref : new nv.models.Global);
      this.addModel('Bg', new nv.models.Background);
      this.addModel('Bg2', new nv.models.Background);
      this.addRenderer(new nv.renderers.MainRenderer(this.glcanvas, this.getModel('Global')));
      this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas, this.getModel('Bg')));
      this.addRenderer(new nv.renderers.BackgroundRenderer(this.glcanvas, this.getModel('Bg2')));
      this.square = new gl.square;
      this.glcanvas.addDrawable(this.square);
      this.glcanvas.camera = nv.camera();
      this.glcanvas.startDrawUpdate(10, nv.bind(this, this.update));
    }

    Main.prototype.update = function(dt) {
      var state;
      state = this.gamepad.getState();
      this.square.x = state.mouse.x;
      this.square.y = state.mouse.y;
      if (state.shoot) {
        return this.destroy();
      }
    };

    Main.prototype.destroy = function() {
      var renderer, _i, _len, _ref;
      _ref = this.renderers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderer = _ref[_i];
        renderer.destroy();
      }
      this.glcanvas.stopDrawUpdate();
      if (!!this.callback) {
        return this.callback();
      }
    };

    return Main;

  })(nv.Scene);

  Game = (function(_super) {

    __extends(Game, _super);

    function Game(glcanvas, gamepad) {
      var _this = this;
      this.gamepad = gamepad;
      Game.__super__.constructor.apply(this, arguments);
      this.addModel('bg', new nv.models.Background);
      this.addModel('bg2', new nv.models.Background);
      this.addModel('ship', new nv.models.Ship);
      this.addModel('asteroids', new nv.models.Asteroids(3));
      this.addModel('hud', new nv.models.Hud(glcanvas));
      this.addController(new nv.controllers.AsteroidController(this.getModel('asteroids').items, glcanvas));
      this.addController(new nv.controllers.ShipController(this.getModel('ship'), glcanvas, this.gamepad));
      this.addController(new nv.controllers.BulletController(this.getModel('ship'), glcanvas, this.gamepad));
      this.addRenderer(new nv.renderers.BackgroundRenderer(glcanvas, this.getModel('bg'), this.getModel('ship')));
      this.addRenderer(new nv.renderers.BackgroundRenderer(glcanvas, this.getModel('bg2'), this.getModel('ship')));
      this.addRenderer(new nv.renderers.ShipRenderer(glcanvas, this.getModel('ship')));
      this.addRenderer(new nv.renderers.AsteroidRenderer(glcanvas, this.getModel('asteroids').items));
      this.addRenderer(new nv.renderers.HudRenderer(glcanvas, this.getModel('hud')));
      this.addRenderer(new nv.renderers.BulletRenderer(glcanvas, []));
      glcanvas.camera = nv.camera();
      glcanvas.camera.follow(this.getModel('ship'), 250, 250);
      glcanvas.camera.zoom(0.5);
      glcanvas.camera.zoom(1, 2000);
      glcanvas.startDrawUpdate(60, function(dt) {
        return _this.update.call(_this, dt);
      });
    }

    Game.prototype.update = function(dt) {
      var bg, bg2, ship;
      Game.__super__.update.call(this, dt);
      bg = this.getModel('bg');
      bg2 = this.getModel('bg2');
      ship = this.getModel('ship');
      bg.x = -ship.x * 0.05;
      bg.y = -ship.y * 0.05;
      bg2.x = -ship.x * 0.01;
      return bg2.y = -ship.y * 0.01;
    };

    return Game;

  })(nv.Scene);

  $(function() {
    var canvasEl, gamepad, glcanvas;
    canvasEl = document.querySelector('canvas');
    glcanvas = gl(canvasEl);
    if (canvasEl === void 0) {
      document.body.appendChild(glcanvas.canvas);
    }
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    glcanvas.fullscreen();
    gamepad = nv.gamepad();
    gamepad.aliasKey('left', nv.Key.A);
    gamepad.aliasKey('right', nv.Key.D);
    gamepad.aliasKey('up', nv.Key.W);
    gamepad.aliasKey('down', nv.Key.S);
    gamepad.aliasKey('shoot', nv.Key.Spacebar);
    gamepad.trackMouse();
    return new Main(glcanvas, gamepad, function() {
      return new Game(glcanvas, gamepad);
    });
  });

}).call(this);
