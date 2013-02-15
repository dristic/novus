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

  nv.ObjectRenderer = (function() {

    function ObjectRenderer(glcanvas, asset) {
      this.asset = asset;
      glcanvas.addDrawable(this);
    }

    ObjectRenderer.prototype.draw = function(dt) {};

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

    return ObjectListRenderer;

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
  var Camera, Gamepad;

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
    }
  });

  Gamepad = (function() {

    function Gamepad() {
      this.gamepad = navigator.webkitGamepad;
      this.state = {};
      this.listeners = {};
    }

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

  gl.prototype = {
    init: function(canvas) {
      if (typeof canvas === 'string') {
        canvas = document.querySelector(canvas);
      } else {
        canvas = document.createElement('canvas');
      }
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
      return this.objects.slice(this.objects.indexOf(object), 1);
    },
    drawObjects: function() {
      var object, _i, _len, _ref11, _results;
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
        var coords, delta, now;
        now = Date.now();
        delta = now - lastTime;
        delta /= 1000;
        coords = func(delta);
        _this.context.save();
        _this.context.clear();
        if (_this.camera) {
          _this.camera.update(delta, _this.context, _this);
        }
        _this.drawObjects();
        _this.context.restore();
        lastTime = now;
        return _this.requestFrameKey = requestFrame(update);
      };
      return this.requestFrameKey = requestFrame(update);
    },
    stopDrawUpdate: function() {
      this.updating = false;
      cancelFrame(this.requestFrameKey);
      return this.requestFrameKey = null;
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
  var Asteroid, Background, Bullet, GameObject, Hud, Ship, __gameObjectCounter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Background = (function() {

    function Background() {
      var i, radius, x, y;
      this.canvas = gl().size(700, 700);
      this.x = 0;
      this.y = 0;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      i = 0;
      while (!(i > 100)) {
        i++;
        x = Math.random() * 700;
        y = Math.random() * 700;
        radius = (Math.random() * 2) + 0.5;
        this.canvas.context.fillPath(function(context) {
          context.color('#FFFFFF');
          return context.arc(x, y, radius, 0, Math.PI * 2, true);
        });
      }
    }

    return Background;

  })();

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
        thrusters: false,
        type: 'both'
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

  Hud = (function() {

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

  })();

  $(function() {
    return nv.models = {
      Background: Background,
      Ship: Ship,
      Bullet: Bullet,
      Asteroid: Asteroid,
      Hud: Hud
    };
  });

}).call(this);

(function() {
  var AsteroidController, BulletController, GamePhysicsController, ShipController, wrap,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BulletController = (function(_super) {

    __extends(BulletController, _super);

    function BulletController(ship, glcanvas) {
      this.ship = ship;
      this.glcanvas = glcanvas;
      BulletController.__super__.constructor.apply(this, arguments);
      this.assets = [];
      this.shotDelay = 10;
    }

    BulletController.prototype.update = function(dt, gamepad) {
      var bullet, state,
        _this = this;
      state = gamepad.getState();
      if (state.shoot && this.shotDelay === 0) {
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

    function ShipController(asset, glcanvas) {
      this.glcanvas = glcanvas;
      ShipController.__super__.constructor.apply(this, arguments);
      this.speed = 5;
      this.shootDelay = 10;
    }

    ShipController.prototype.update = function(dt, gamepad) {
      var state;
      state = gamepad.getState();
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

  GamePhysicsController = (function(_super) {

    __extends(GamePhysicsController, _super);

    function GamePhysicsController(glcanvas) {
      this.glcanvas = glcanvas;
      GamePhysicsController.__super__.constructor.apply(this, arguments);
      this.passiveObjects = {};
      this.activeObjects = {};
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
              _results1.push(console.log("hit"));
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

  $(function() {
    return nv.controllers = {
      ShipController: ShipController,
      BulletController: BulletController,
      AsteroidController: AsteroidController,
      GamePhysicsController: GamePhysicsController
    };
  });

}).call(this);

(function() {
  var AsteroidRenderer, BackgroundRenderer, BulletRenderer, HudRenderer, ShipRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BackgroundRenderer = (function(_super) {

    __extends(BackgroundRenderer, _super);

    function BackgroundRenderer(glcanvas, asset) {
      this.glcanvas = glcanvas;
      BackgroundRenderer.__super__.constructor.apply(this, arguments);
    }

    BackgroundRenderer.prototype.draw = function(context, canvas) {
      var camX, camY, curX, curY, startX, startY, _results;
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
      _results = [];
      while (curX < camX + this.glcanvas.width) {
        while (curY < camY + this.glcanvas.height) {
          context.drawImage(this.asset.canvas, curX, curY);
          curY += this.asset.height;
        }
        curY = startY;
        _results.push(curX += this.asset.width);
      }
      return _results;
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

  $(function() {
    return nv.renderers = {
      ShipRenderer: ShipRenderer,
      BulletRenderer: BulletRenderer,
      BackgroundRenderer: BackgroundRenderer,
      AsteroidRenderer: AsteroidRenderer,
      HudRenderer: HudRenderer
    };
  });

}).call(this);

(function() {

  $(function() {
    var asteroid, asteroid2, asteroid3, asteroidController, asteroidRenderer, bg, bg2, bg2Renderer, bgRenderer, bulletController, bulletRenderer, controllers, gamepad, glcanvas, hud, hudRenderer, physicsController, renderers, ship, shipController, shipRenderer, shootDelay, speed, update;
    glcanvas = gl('canvas');
    glcanvas.size(500, 500);
    glcanvas.background('#000');
    glcanvas.fullscreen();
    bg = new nv.models.Background;
    bg2 = new nv.models.Background;
    ship = new nv.models.Ship;
    asteroid = new nv.models.Asteroid(500, 500);
    asteroid2 = new nv.models.Asteroid(500, 500);
    asteroid3 = new nv.models.Asteroid(500, 500);
    hud = new nv.models.Hud(glcanvas);
    asteroidController = new nv.controllers.AsteroidController([asteroid, asteroid2, asteroid3], glcanvas);
    shipController = new nv.controllers.ShipController(ship, glcanvas);
    bulletController = new nv.controllers.BulletController(ship, glcanvas);
    physicsController = new nv.controllers.GamePhysicsController(glcanvas);
    physicsController.trackObjects([ship, asteroid, asteroid2, asteroid3]);
    controllers = [physicsController, bulletController, asteroidController, shipController];
    bgRenderer = new nv.renderers.BackgroundRenderer(glcanvas, bg, ship);
    bg2Renderer = new nv.renderers.BackgroundRenderer(glcanvas, bg2, ship);
    shipRenderer = new nv.renderers.ShipRenderer(glcanvas, ship);
    asteroidRenderer = new nv.renderers.AsteroidRenderer(glcanvas, [asteroid, asteroid2, asteroid3]);
    hudRenderer = new nv.renderers.HudRenderer(glcanvas, hud);
    bulletRenderer = new nv.renderers.BulletRenderer(glcanvas, []);
    renderers = [bgRenderer, bg2Renderer, shipRenderer, asteroidRenderer, hudRenderer, bulletRenderer];
    gamepad = nv.gamepad();
    gamepad.aliasKey('left', nv.Key.A);
    gamepad.aliasKey('right', nv.Key.D);
    gamepad.aliasKey('up', nv.Key.W);
    gamepad.aliasKey('down', nv.Key.S);
    gamepad.aliasKey('shoot', nv.Key.Spacebar);
    speed = 5;
    shootDelay = 10;
    update = function(dt) {
      var controller, _i, _len;
      for (_i = 0, _len = controllers.length; _i < _len; _i++) {
        controller = controllers[_i];
        controller.update(dt, gamepad);
      }
      bg.x = -ship.x * 0.05;
      bg.y = -ship.y * 0.05;
      bg2.x = -ship.x * 0.01;
      return bg2.y = -ship.y * 0.01;
    };
    glcanvas.camera = nv.camera();
    glcanvas.camera.follow(ship, 250, 250);
    glcanvas.camera.zoom(0.5);
    glcanvas.camera.zoom(1, 2000);
    return glcanvas.startDrawUpdate(60, update);
  });

}).call(this);
