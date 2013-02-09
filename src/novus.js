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

}).call(this);

(function() {

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
  var Asteroid, Background, Bullet, Global, Hud, Ship,
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

  Ship = (function() {

    function Ship() {
      this.id = null;
      this.x = 0;
      this.y = 30;
      this.width = 12;
      this.height = 18;
      this.rotation = 0;
      this.speed = 5;
      this._path = [];
      this._wireframe = [];
      this.initPath();
    }

    Ship.prototype.initPath = function() {
      this._wireframe = [new nv.Point(0, -this.height / 2), new nv.Point(this.width / 2, this.height / 2), new nv.Point(-this.width / 2, this.height / 2)];
      return this._updatePath();
    };

    Ship.prototype._updatePath = function() {
      var cosine, newPath, ship, sine;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      newPath = [];
      ship = this;
      $.each(this._wireframe, function() {
        return newPath.push(new nv.Point(this.x * cosine - this.y * sine + ship.x, this.x * sine + this.y * cosine + ship.y));
      });
      console.log(newPath[0].x, newPath[0].y, newPath[1].x, newPath[1].y, newPath[2].x, newPath[2].y);
      return this._path = newPath;
    };

    Ship.prototype.nose = function() {
      return this._path[0];
    };

    Ship.prototype.path = function() {
      return this._path;
    };

    Ship.prototype.rotate = function(r) {
      this.rotation += r;
      return this._updatePath();
    };

    Ship.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this._updatePath();
    };

    return Ship;

  })();

  Asteroid = (function() {

    function Asteroid(cw, ch) {
      this.id = null;
      this.x = cw * Math.random();
      this.y = ch * Math.random();
      this.width = 12;
      this.height = 12;
      this.rotation = 0;
      this.speed = Math.random() + 0.3;
      this.direction = (Math.random() * Math.PI) - (Math.PI / 2);
    }

    return Asteroid;

  })();

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
        asset.x += Math.sin(asset.direction) * asset.speed;
        asset.y += Math.cos(asset.direction) * asset.speed;
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
      var points,
        _this = this;
      context.strokeColor(this.color);
      context.strokeWidth(this.strokeWidth);
      context.rotateAround(this.asset.x + (this.asset.width / 2), this.asset.y + (this.asset.height / 2), this.asset.rotation, function() {
        return context.line(_this.asset.x, _this.asset.y + _this.asset.height, _this.asset.x + (_this.asset.width / 2), _this.asset.y, _this.asset.x + _this.asset.width, _this.asset.y + _this.asset.height, _this.asset.x, _this.asset.y + _this.asset.height);
      });
      points = this.asset.path();
      context.beginPath();
      context.strokeColor("#929");
      context.strokeWidth(10);
      context.moveTo(points[0].x, points[0].y);
      $.each(points, function() {
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
        return context.fillPath(function(context) {
          context.color('rgba(0, 0, 0, 0)');
          context.strokeColor(_this.color);
          context.strokeWidth(2);
          return context.line(asset.x, asset.y, asset.x + 30, asset.y + 20, asset.x + 35, asset.y + 50, asset.x + 23, asset.y + 60, asset.x - 10, asset.y + 50, asset.x - 20, asset.y + 15, asset.x, asset.y);
        });
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
  var Game, Main;

  Main = (function() {

    function Main(glcanvas, gamepad, callback) {
      var global, mainRenderer, _ref,
        _this = this;
      this.glcanvas = glcanvas;
      this.gamepad = gamepad;
      this.callback = callback;
      global = (_ref = window.global) != null ? _ref : new nv.models.Global;
      mainRenderer = new nv.renderers.MainRenderer(this.glcanvas, global);
      this.renderers = [mainRenderer];
      this.glcanvas.camera = nv.camera();
      this.glcanvas.startDrawUpdate(10, function(dt) {
        console.log("Working");
        return _this.update.call(_this, dt);
      });
    }

    Main.prototype.update = function(dt) {
      var state;
      state = this.gamepad.getState();
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

  })();

  Game = (function() {

    function Game(glcanvas, gamepad) {
      var asteroid, asteroid2, asteroid3, asteroidController, asteroidRenderer, bg2Renderer, bgRenderer, bulletController, bulletRenderer, hud, hudRenderer, shipController, shipRenderer,
        _this = this;
      this.gamepad = gamepad;
      this.bg = new nv.models.Background;
      this.bg2 = new nv.models.Background;
      this.ship = new nv.models.Ship;
      asteroid = new nv.models.Asteroid(500, 500);
      asteroid2 = new nv.models.Asteroid(500, 500);
      asteroid3 = new nv.models.Asteroid(500, 500);
      hud = new nv.models.Hud(glcanvas);
      asteroidController = new nv.controllers.AsteroidController([asteroid, asteroid2, asteroid3], glcanvas);
      shipController = new nv.controllers.ShipController(this.ship, glcanvas);
      bulletController = new nv.controllers.BulletController(this.ship, glcanvas);
      this.controllers = [bulletController, asteroidController, shipController];
      bgRenderer = new nv.renderers.BackgroundRenderer(glcanvas, this.bg, this.ship);
      bg2Renderer = new nv.renderers.BackgroundRenderer(glcanvas, this.bg2, this.ship);
      shipRenderer = new nv.renderers.ShipRenderer(glcanvas, this.ship);
      asteroidRenderer = new nv.renderers.AsteroidRenderer(glcanvas, [asteroid, asteroid2, asteroid3]);
      hudRenderer = new nv.renderers.HudRenderer(glcanvas, hud);
      bulletRenderer = new nv.renderers.BulletRenderer(glcanvas, []);
      this.renderers = [bgRenderer, bg2Renderer, shipRenderer, asteroidRenderer, hudRenderer, bulletRenderer];
      glcanvas.camera = nv.camera();
      glcanvas.camera.follow(this.ship, 250, 250);
      glcanvas.camera.zoom(0.5);
      glcanvas.camera.zoom(1, 2000);
      glcanvas.startDrawUpdate(60, function(dt) {
        return _this.update.call(_this, dt);
      });
    }

    Game.prototype.update = function(dt) {
      var controller, _i, _len, _ref;
      _ref = this.controllers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controller = _ref[_i];
        controller.update(dt, this.gamepad);
      }
      this.bg.x = -this.ship.x * 0.05;
      this.bg.y = -this.ship.y * 0.05;
      this.bg2.x = -this.ship.x * 0.01;
      return this.bg2.y = -this.ship.y * 0.01;
    };

    return Game;

  })();

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
    return new Main(glcanvas, gamepad, function() {
      return new Game(glcanvas, gamepad);
    });
  });

}).call(this);
