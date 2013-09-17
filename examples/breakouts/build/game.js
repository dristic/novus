(function() {
  var _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

  this.gleam = typeof gleam !== "undefined" && gleam !== null ? gleam : {
    requestFrame: (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
      return setTimeout(callback, 17);
    },
    cancelFrame: (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout,
    extend: function(object, other) {
      var key;
      if (Object.keys) {
        Object.keys(other).forEach(function(property) {
          return Object.defineProperty(object, property, Object.getOwnPropertyDescriptor(other, property));
        });
      } else {
        for (key in other) {
          if (other.hasOwnProperty(key)) {
            object[key] = other[key];
          }
        }
      }
      return object;
    }
  };

}).call(this);

(function() {
  var __slice = [].slice;

  gleam.Canvas = (function() {

    function Canvas(canvas) {
      if (typeof canvas === 'string') {
        canvas = document.querySelector(canvas);
      }
      this.source = canvas != null ? canvas : document.createElement('canvas');
      this.context = new gleam.Context(this.source.getContext('2d'), this);
      this.width = this.source.width;
      this.height = this.source.height;
      this.halfWidth = this.source.width / 2;
      this.halfHeight = this.source.height / 2;
      this.fullscreened = false;
      this.responsive = false;
      this;
    }

    Canvas.prototype.setStyle = function(key, value) {
      return this.source.style[key] = value;
    };

    Canvas.prototype.setSize = function(width, height) {
      if (this.maxWidth && width > this.maxWidth) {
        width = this.maxWidth;
      }
      if (this.maxHeight && height > this.maxHeight) {
        height = this.maxHeight;
      }
      console.log(this.source);
      this.source.width = width;
      this.source.height = height;
      this.width = this.source.width;
      this.height = this.source.height;
      this.halfWidth = this.source.width / 2;
      return this.halfHeight = this.source.height / 2;
    };

    Canvas.prototype.setMaxSize = function(width, height) {
      this.maxWidth = width;
      this.maxHeight = height;
      return this.setSize(this.width, this.height);
    };

    Canvas.prototype.getSize = function() {
      return {
        width: this.width,
        height: this.height
      };
    };

    Canvas.prototype.setFullscreen = function(isOn) {
      var _this = this;
      if (isOn) {
        this.fullscreened = true;
        this.setSize(document.body.clientWidth, document.body.clientHeight);
        document.body.style.overflow = "hidden";
        this.fullscreenListener = function(event) {
          return _this.setSize(document.body.clientWidth, document.body.clientHeight);
        };
        return window.addEventListener('resize', this.fullscreenListener);
      } else {
        this.fullscreened = false;
        return window.removeEventListener('resize', this.fullscreenListener);
      }
    };

    Canvas.prototype.setResponsive = function(isOn) {
      var _this = this;
      if (isOn) {
        this.responsive = true;
        this.calculateResponsive();
        this.responsiveListener = function(event) {
          return _this.calculateResponsive();
        };
        return window.addEventListener('resize', this.responsiveListener);
      } else {
        this.responsive = false;
        return window.removeEventListener('resize', this.responsiveListener);
      }
    };

    Canvas.prototype.calculateResponsive = function() {
      var height, ratio, width;
      this.source.style.webkitTransformOrigin = "top";
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      ratio = Math.min(width / this.width, height / this.height);
      return this.source.style.webkitTransform = "scale(" + ratio + ")";
    };

    Canvas.prototype.draw = function(objects, camera) {
      var object, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        _results.push(object.draw(this.context, this));
      }
      return _results;
    };

    Canvas.prototype.toDataUrl = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.source).toDataUrl.apply(_ref, args);
    };

    Canvas.prototype.getContext = function(type) {
      if (type == null) {
        type = "2d";
      }
      return this.context = new gleam.Context(this.source.getContext(type), this);
    };

    return Canvas;

  })();

}).call(this);

(function() {
  var context, key,
    __slice = [].slice;

  gleam.Context = (function() {

    function Context(source, canvas) {
      this.source = source;
      this.canvas = canvas;
    }

    Context.prototype.set = function(key, value) {
      return this.source[key] = value;
    };

    Context.prototype.get = function(key) {
      return this.source[key];
    };

    Context.prototype.setFillStyle = function(style) {
      return this.source.fillStyle = style;
    };

    Context.prototype.setStrokeStyle = function(style) {
      return this.source.strokeStyle = style;
    };

    Context.prototype.setStrokeWidth = function(width) {
      return this.source.lineWidth = width;
    };

    Context.prototype.setFont = function(font) {
      return this.source.font = font;
    };

    Context.prototype.setTextBaseline = function(baseline) {
      return this.source.textBaseline = baseline;
    };

    Context.prototype.fillPath = function(func) {
      this.beginPath();
      func(this);
      this.fill();
      return this.closePath();
    };

    Context.prototype.path = function() {
      if (arguments.length % 2 !== 0) {
        throw new Exception("Arguments should be divisible by 2");
      }
      this.beginPath();
      this.moveTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      while (arguments.length > 0) {
        this.lineTo(Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments));
      }
      this.stroke();
      return this.closePath();
    };

    Context.prototype.rotateAround = function(x, y, angle, func) {
      this.save();
      this.translate(x, y);
      this.rotate(angle);
      this.translate(-x, -y);
      func();
      return this.restore();
    };

    Context.prototype.setClearColor = function(hex, opacity) {
      this.clearColor = hex;
      return this.clearOpacity = opacity != null ? opacity : 1;
    };

    Context.prototype.clearRect = function(x, y, width, height) {
      x = x != null ? x : 0;
      y = y != null ? y : 0;
      width = width != null ? width : this.canvas.width;
      height = height != null ? height : this.canvas.height;
      if (this.clearColor) {
        this.source.fillStyle = this.clearColor;
        this.source.globalAlpha = this.clearOpacity;
        return this.source.fillRect(x, y, width, height);
      } else {
        return this.source.clearRect(x, y, width, height);
      }
    };

    return Context;

  })();

  gleam.Context.addContextAlias = function(key) {
    if (!gleam.Context.prototype[key]) {
      return gleam.Context.prototype[key] = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this.source)[key].apply(_ref, args);
      };
    }
  };

  context = document.createElement('canvas').getContext('2d');

  for (key in context) {
    if (typeof context[key] === "function") {
      gleam.Context.addContextAlias(key);
    }
  }

}).call(this);

(function() {

  gleam.Square = (function() {

    function Square(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        width: 10,
        height: 10,
        x: 10,
        y: 10
      };
      options = options != null ? options : {};
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Square.prototype.draw = function(context, canvas) {
      context.setFillStyle(this.color);
      return context.fillRect(this.x, this.y, this.width, this.height);
    };

    return Square;

  })();

}).call(this);

(function() {

  gleam.Text = (function() {

    function Text(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        x: 10,
        y: 10,
        font: 'bold 20px sans-serif',
        textBaseline: 'bottom',
        text: 'Lorem Ipsum'
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Text.prototype.draw = function(context, canvas) {
      context.setFillStyle(this.color);
      context.setFont(this.font);
      context.setTextBaseline(this.textBaseline);
      return context.fillText(this.text, this.x, this.y);
    };

    return Text;

  })();

}).call(this);

(function() {

  gleam.Sprite = (function() {

    function Sprite(options) {
      var defaults,
        _this = this;
      defaults = {
        src: '',
        x: 10,
        y: 10,
        width: null,
        height: null,
        origin: null
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
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
    }

    Sprite.prototype.draw = function(context, canvas) {
      if (!!this.loaded) {
        if (!this.origin) {
          return context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
          return context.drawImage(this.image, this.origin.x, this.origin.y, this.origin.width, this.origin.height, this.x, this.y, this.width, this.height);
        }
      }
    };

    return Sprite;

  })();

}).call(this);

(function() {

  gleam.Camera = (function() {

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
        size = canvas.getSize();
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

}).call(this);

(function() {

  gleam.Circle = function(options) {
    var defaults;
    defaults = {
      color: '#CCC',
      width: 10,
      height: 10,
      x: 10,
      y: 10
    };
    options = options != null ? options : {};
    gleam.extend(defaults, options);
    gleam.extend(this, defaults);
    return this;
  };

  gleam.extend(gleam.Circle.prototype, {
    draw: function(context, canvas) {
      context.beginPath();
      context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      return context.closePath();
    }
  });

}).call(this);

(function() {

  gleam.Rectangle = function(options) {
    var defaults;
    defaults = {
      fillStyle: '#CCC',
      width: 10,
      height: 10,
      cornerRadius: 0,
      x: 0,
      y: 0
    };
    options = options != null ? options : {};
    gleam.extend(defaults, options);
    gleam.extend(this, defaults);
    return this;
  };

  gleam.extend(gleam.Rectangle.prototype, {
    draw: function(context, canvas) {
      if (this.strokeStyle) {
        context.setStrokeStyle(this.strokeStyle);
      }
      if (this.strokeWidth) {
        context.setStrokeWidth(this.strokeWidth);
      }
      if (this.fillStyle) {
        context.setFillStyle(this.fillStyle);
      }
      context.beginPath();
      context.moveTo(this.x + this.cornerRadius, this.y);
      context.lineTo(this.x + this.width - this.cornerRadius * 2, this.y);
      if (this.cornerRadius) {
        context.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.cornerRadius, this.cornerRadius);
      }
      context.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
      if (this.cornerRadius) {
        context.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - this.cornerRadius, this.y + this.height, this.cornerRadius);
      }
      context.lineTo(this.x + this.cornerRadius, this.y + this.height);
      if (this.cornerRadius) {
        context.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - this.cornerRadius, this.cornerRadius);
      }
      context.lineTo(this.x, this.y + this.cornerRadius);
      if (this.cornerRadius) {
        context.arcTo(this.x, this.y, this.x + this.cornerRadius, this.y, this.cornerRadius);
      }
      context.stroke();
      context.fill();
      return context.closePath();
    }
  });

}).call(this);

(function() {



}).call(this);

(function() {
  var _ref, _ref1, _ref2, _ref3;

  this.nv = (_ref = this.nv) != null ? _ref : {};

  this.renderers = (_ref1 = this.renderers) != null ? _ref1 : {};

  this.entities = (_ref2 = this.entities) != null ? _ref2 : {};

  this.scenes = (_ref3 = this.scenes) != null ? _ref3 : {};

  this.getClass = function(name) {
    var klass, part, _i, _len, _ref4;
    klass = window;
    _ref4 = name.split(".");
    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
      part = _ref4[_i];
      klass = klass[part];
    }
    return klass;
  };

  this.shallowClone = function(obj) {
    var key, newObj;
    newObj = {};
    for (key in obj) {
      if (typeof key !== "object") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

}).call(this);

(function() {

  nv.ajax = function(url, method, data, callback) {
    var onReadyStateChange, version, versions, xhr, _i, _len;
    callback = callback != null ? callback : method;
    if (typeof method === "function") {
      method = 'GET';
    }
    data = data != null ? data : "";
    if (typeof XMLHttpRequest !== 'undefined') {
      xhr = new XMLHttpRequest();
    } else {
      versions = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"];
      for (_i = 0, _len = versions.length; _i < _len; _i++) {
        version = versions[_i];
        try {
          xhr = new ActiveXObject(version);
        } catch (e) {

        }
      }
    }
    onReadyStateChange = function() {
      if (xhr.readyState < 4) {
        return;
      }
      if (xhr.status !== 200) {
        return;
      }
      if (xhr.readyState === 4) {
        return callback(xhr.responseText);
      }
    };
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open(method, url, false);
    return xhr.send(data);
  };

}).call(this);

(function() {
  var _ref;

  window.nv = (_ref = window.nv) != null ? _ref : {};

  window.nv.Controller = {
    Up: 12,
    Down: 13,
    Left: 14,
    Right: 15,
    A: 0,
    X: 1,
    Y: 3,
    B: 2,
    LB: 4,
    LT: 6,
    RB: 5,
    RT: 7,
    Select: 8,
    Start: 9,
    LeftStick: 10,
    RightStick: 11
  };

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
  var __slice = [].slice;

  nv.config = {
    debug: false
  };

  nv.implement = function(other) {
    var key, _results;
    _results = [];
    for (key in other) {
      _results.push(this[key] = other[key]);
    }
    return _results;
  };

  nv.implement({
    log: function() {
      var message, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log(message));
      }
      return _results;
    },
    configure: function(options) {
      return nv.config = nv.extend(nv.config, options);
    },
    bind: function(context, func) {
      var f;
      f = function() {
        return func.call.apply(func, [context].concat(__slice.call(arguments)));
      };
      return f;
    },
    clone: function(object) {
      var obj;
      obj = {};
      nv.extend(obj, object, true);
      return obj;
    },
    extend: function(object, other, deep) {
      var key;
      if (deep == null) {
        deep = false;
      }
      for (key in other) {
        if (other[key] instanceof Object && deep === true) {
          object[key] = {};
          nv.extend(object[key], other[key]);
        } else {
          object[key] = other[key];
        }
      }
      return object;
    },
    keydown: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      document.addEventListener('keydown', func);
      return func;
    },
    keypress: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      document.addEventListener('keypress', func);
      return func;
    },
    keyup: function(key, callback) {
      var func;
      func = function(event) {
        if (event.keyCode === key) {
          return callback();
        }
      };
      document.addEventListener('keyup', func);
      return func;
    },
    mousedown: function(callback) {
      document.addEventListener('mousedown', callback);
      return document.addEventListener('touchstart', callback);
    },
    mouseup: function(callback) {
      document.addEventListener('mouseup', callback);
      return document.addEventListener('touchend', callback);
    },
    mousemove: function(callback) {
      document.addEventListener('mousemove', callback);
      return document.addEventListener('touchmove', callback);
    },
    isMobile: function() {
      var agent;
      agent = navigator.userAgent.toLowerCase();
      return (agent.match(/android/i) || agent.match(/webos/i) || agent.match(/iphone/i) || agent.match(/ipad/i) || agent.match(/ipod/i) || agent.match(/blackberry/i) || agent.match(/windows phone/i)) !== null;
    },
    isArray: Array.isArray,
    ready: function(func) {
      var _this = this;
      if (!!this.isReady) {
        return func();
      }
      return document.addEventListener('DOMContentLoaded', function() {
        _this.isReady = true;
        return func();
      });
    }
  });

  nv.Color = (function() {

    function Color(r, b, g, a) {
      this.r = r;
      this.b = b;
      this.g = g;
      this.a = a;
    }

    Color.prototype.interpolate = function(percent, other) {
      return new Color(this.r + (other.r - this.r) * percent, this.g + (other.g - this.g) * percent, this.b + (other.b - this.b) * percent, this.a + (other.a - this.a) * percent);
    };

    Color.prototype.toCanvasColor = function() {
      return "rgb(" + (parseInt(this.r)) + ", " + (parseInt(this.g)) + ", " + (parseInt(this.b)) + ")";
    };

    return Color;

  })();

  nv.Gradient = (function() {

    function Gradient(colorStops) {
      this.colorStops = colorStops;
    }

    Gradient.prototype.getColor = function(percent) {
      var color1, color2, colorF;
      colorF = percent * (this.colorStops.length - 1);
      color1 = parseInt(colorF);
      color2 = parseInt(colorF + 1);
      return this.colorStops[color1].interpolate((colorF - color1) / (color2 - color1), this.colorStops[color2]);
    };

    return Gradient;

  })();

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
      var key, klass, _i, _len, _ref;
      this.scene = scene;
      this.model = model;
      this.plugins = [];
      this.listeners = [];
      this.model = (_ref = this.model) != null ? _ref : new nv.Model;
      for (_i = 0, _len = pluginClasses.length; _i < _len; _i++) {
        klass = pluginClasses[_i];
        this.plugins.push(new klass(this.scene, this));
      }
      this.scene.fire("entity:create:" + this.constructor.name);
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Entity.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Entity.prototype.off = function(name, callback) {
      var i, listener, _i, _len, _ref, _results;
      this.scene.off(name, callback);
      _ref = this.listeners;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        listener = _ref[i];
        if (listener.name === name && listener.callback === callback) {
          this.listeners.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

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
      var i, listener, plugin, _i, _len, _ref;
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        plugin.destroy();
      }
      i = this.listeners.length;
      while (i--) {
        listener = this.listeners[i];
        this.off(listener.name, listener.callback);
      }
      delete this.model;
      return delete this.plugins;
    };

    return Entity;

  })();

}).call(this);

(function() {

  nv.EventDispatcher = (function() {

    function EventDispatcher() {
      this.event_listeners = {};
      this.event_async_queue = [];
    }

    EventDispatcher.prototype.destroy = function() {
      return this.processQueuedEvents();
    };

    EventDispatcher.prototype.on = function(event, func) {
      var event_listeners;
      event_listeners = this.event_listeners[event];
      if (!(event_listeners instanceof Array)) {
        event_listeners = [];
      }
      event_listeners.push(func);
      this.event_listeners[event] = event_listeners;
      return this;
    };

    EventDispatcher.prototype.fire = function(event, data) {
      if (this.event_listeners[event] instanceof Array) {
        return this.event_async_queue.push({
          event: event,
          data: data != null ? data : {}
        });
      }
    };

    EventDispatcher.prototype.send = function(event, data) {
      var event_listeners, listener, _i, _len, _results;
      event_listeners = this.event_listeners[event];
      if (event_listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = event_listeners.length; _i < _len; _i++) {
          listener = event_listeners[_i];
          _results.push(listener(data != null ? data : {}));
        }
        return _results;
      }
    };

    EventDispatcher.prototype.off = function(event, func) {
      if (!this.event_listeners[event] instanceof Array) {

      } else {
        if (this.event_listeners[event].indexOf(func) !== -1) {
          this.event_listeners[event].splice(this.event_listeners[event].indexOf(func), 1);
        }
      }
      return this;
    };

    EventDispatcher.prototype.update = function(dt) {
      return this.processQueuedEvents();
    };

    EventDispatcher.prototype.processQueuedEvents = function() {
      var event, eventListeners, events, listener, _i, _j, _len, _len1;
      while (this.event_async_queue.length) {
        events = this.event_async_queue.slice(0);
        this.event_async_queue = [];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          eventListeners = this.event_listeners[event.event];
          for (_j = 0, _len1 = eventListeners.length; _j < _len1; _j++) {
            listener = eventListeners[_j];
            if (listener) {
              listener(event.data);
            }
          }
        }
      }
      return null;
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

    Model.prototype.reset = function() {};

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

    function Scene(name, game, rootModel, options) {
      var key, _ref,
        _this = this;
      this.game = game;
      this.rootModel = rootModel;
      this.options = options;
      Scene.__super__.constructor.apply(this, arguments);
      this.sceneName = name.toLowerCase();
      this.engines = [];
      this.entities = [];
      this.deletedEntities = [];
      this.options = (_ref = this.options) != null ? _ref : {};
      if (this.rootModel.config.scenes[this.sceneName].config.scene != null) {
        this.options = nv.extend(this.options, this.rootModel.config.scenes[this.sceneName].config.scene);
      }
      this.options = nv.extend(this.options, this.rootModel);
      this.on("entity:remove", function(entity) {
        return _this.removeEntity(entity);
      });
      this.on("entity:add", function(entity) {
        return _this.addEntity(entity);
      });
      this.on("entity:create", function(options) {
        var config, entityName;
        entityName = options.entity;
        config = _this.rootModel.config.scenes[_this.sceneName].entities[entityName];
        if (config.include != null) {
          config = _this.rootModel.config.entities[entityName];
        }
        if (!!config) {
          return _this.createEntity(config, options);
        }
      });
      this.on("scene:destroy", function(options) {
        return _this.destruct();
      });
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
      this.prepareEngines();
      this.createEntities(this.rootModel.config.scenes[this.sceneName].entities);
      this.createSoundFxs();
    }

    Scene.prototype.get = function(key) {
      return this.options[key];
    };

    Scene.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    Scene.prototype.prepareEngines = function() {
      var engine, klass, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.rootModel.config.scenes[this.sceneName].engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        this.useEngine(klass.name);
      }
      _ref1 = this.engines;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        _results.push(engine.prepare());
      }
      return _results;
    };

    Scene.prototype.useEngine = function(engineName, initializer) {
      var config, configKey, engineObj, _ref;
      engineObj = this.game.engines[engineName];
      configKey = engineName.replace("nv.", "").replace("Engine", "").toLowerCase();
      config = (_ref = this.rootModel.config.scenes[this.sceneName].config[configKey]) != null ? _ref : {};
      if (engineObj.klass.prototype.initializer != null) {
        engineObj.klass.prototype.initializer(config, this.game.model());
      }
      if (initializer != null) {
        initializer(config, this.game.model());
      }
      return this.engines.push(new engineObj.klass(this, config));
    };

    Scene.prototype.createEntities = function(entities) {
      var config, entity, index, _results;
      _results = [];
      for (entity in entities) {
        config = entities[entity];
        if (config.count != null) {
          index = config.count;
          _results.push((function() {
            var _results1;
            _results1 = [];
            while ((index -= 1) >= 0) {
              _results1.push(this.createEntity(config, {}, index));
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(this.createEntity(config));
        }
      }
      return _results;
    };

    Scene.prototype.createEntity = function(config, options, index) {
      if (options == null) {
        options = {};
      }
      if (index == null) {
        index = 0;
      }
      if (config.include != null) {
        config = this.rootModel.config.entities[config.include];
      }
      if (config.model != null) {
        return this.addEntity(new config.entity(this, config.plugins, this.loadModelFromConfig(config, options, index)));
      } else {
        return this.addEntity(new config.entity(this, config.plugins));
      }
    };

    Scene.prototype.loadModelFromConfig = function(config, options, index) {
      var initializer, key, model;
      if (index == null) {
        index = 0;
      }
      model = {};
      model = nv.extend(model, config.model.options);
      model = nv.extend(model, options);
      if (config.model.initializers != null) {
        for (key in config.model.initializers) {
          initializer = config.model.initializers[key];
          if (model[key] === void 0) {
            model[key] = nv.bind(model, initializer)(this, index);
          }
        }
      }
      if (config.model.klass != null) {
        model = new config.model.klass(model);
      } else {
        model = new nv.Model(model);
      }
      return model;
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

    Scene.prototype.addEntity = function(entity) {
      this.entities.push(entity);
      return entity;
    };

    Scene.prototype.createSoundFxs = function() {
      if (this.rootModel.config.scenes[this.sceneName].soundfx === void 0) {
        return;
      }
      return new nv.SoundFactory().wire(this, this.rootModel.config.scenes[this.sceneName].soundfx);
    };

    Scene.prototype.getEntity = function(type) {
      var entity, _i, _len, _ref;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if (entity instanceof type) {
          return entity;
        }
      }
      return null;
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

    Scene.prototype.getEngine = function(type) {
      var engine, _i, _len, _ref;
      _ref = this.engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        engine = _ref[_i];
        if (engine instanceof type) {
          return engine;
        }
      }
      return null;
    };

    Scene.prototype.fire = function(event, data) {
      return Scene.__super__.fire.call(this, event, data);
    };

    Scene.prototype.update = function(dt) {
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1;
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
      return Scene.__super__.update.call(this, dt);
    };

    Scene.prototype.destroy = function() {
      return this.fire("scene:destroy");
    };

    Scene.prototype.destruct = function() {
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        entity.destroy();
      }
      _ref1 = this.engines;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        engine = _ref1[_j];
        engine.destroy();
      }
      delete this.entities;
      return delete this.engines;
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

    Point.prototype.add = function(point) {
      this.x += point.x;
      this.y += point.y;
      return this;
    };

    Point.prototype.times = function(num) {
      new nv.Point(this.x * num, this.y * num);
      return this;
    };

    Point.prototype.fromPolar = function(ang, rad) {
      this.x = Math.cos(ang) * rad;
      this.y = Math.sin(ang) * rad;
      return this;
    };

    Point.prototype.constrain = function(rect) {
      if (!rect.contains(this)) {
        if (this.x < rect.x) {
          this.x = 0;
        }
        if (this.x > rect.x2) {
          this.x = rect.x2;
        }
        if (this.y < rect.y) {
          this.y = 0;
        }
        if (this.y > rect.y2) {
          this.y = rect.y2;
        }
      }
      return this;
    };

    Point.prototype.eq = function(pt) {
      return this.x === pt.x && this.y === pt.y;
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
      if (this.x2 < rect.x || this.y2 < rect.y || this.x > rect.x2 || this.y > rect.y2) {
        return false;
      }
      return true;
    };

    Rect.prototype.translate = function(dx, dy) {
      this.x += dx;
      return this.y += dy;
    };

    return Rect;

  })();

}).call(this);

(function() {
  var __slice = [].slice;

  nv.Game = (function() {

    function Game(config) {
      var engine, klass, name, scene, _i, _len, _ref;
      this.rootModel = new nv.Model;
      this.scenes = [];
      this.sceneClasses = {};
      this.engines = {};
      if (config.engines != null) {
        _ref = config.engines;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          engine = _ref[_i];
          this.registerEngine(engine);
        }
      }
      if (config.scenes != null) {
        for (name in config.scenes) {
          scene = name[0].toUpperCase() + name.toLowerCase().slice(1);
          klass = "scenes." + scene;
          this.registerScene(scene, getClass(klass));
        }
      }
      this.rootModel.setMany({
        config: config,
        gamepad: nv.gamepad()
      });
    }

    Game.prototype.model = function() {
      return this.rootModel;
    };

    Game.prototype.registerEngine = function(klass, initializer) {
      var name;
      name = klass.name;
      return this.engines[name] = {
        klass: klass,
        initializer: initializer
      };
    };

    Game.prototype.registerScenes = function(object) {
      var key, _results;
      _results = [];
      for (key in object) {
        _results.push(this.registerScene(key, object[key]));
      }
      return _results;
    };

    Game.prototype.registerScene = function(name, klass) {
      return this.sceneClasses[name] = klass;
    };

    Game.prototype.openScene = function() {
      var args, name,
        _this = this;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.scenes.push((function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this.sceneClasses[name], [name, this, this.rootModel].concat(__slice.call(args)), function(){}));
      return this.scenes[this.scenes.length - 1].on("scene:close", function() {
        return _this.closeScene(name);
      });
    };

    Game.prototype.closeScene = function(name) {
      var index, scene, _i, _len, _ref, _results;
      name = name != null ? name : this.scenes[this.scenes.length - 1].constructor.name;
      _ref = this.scenes;
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        scene = _ref[index];
        if (scene instanceof this.sceneClasses[name]) {
          scene.destroy();
          _results.push(this.scenes.splice(index, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Game.prototype.start = function(scene) {
      return this.openScene(scene);
    };

    return Game;

  })();

}).call(this);

(function() {

  nv.Engine = (function() {

    Engine.prototype.initializer = function() {};

    function Engine(scene, config) {
      var key, _ref;
      this.scene = scene;
      this.config = config;
      this.config = (_ref = this.config) != null ? _ref : {};
      this.listeners = [];
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Engine.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Engine.prototype.off = function(name, callback) {
      var i, listener, _i, _len, _ref, _results;
      this.scene.off(name, callback);
      _ref = this.listeners;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        listener = _ref[i];
        if (listener.name === name && listener.callback === callback) {
          this.listeners.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Engine.prototype.prepare = function() {};

    Engine.prototype.update = function(dt) {};

    Engine.prototype.destroy = function() {
      var i, listener;
      i = this.listeners.length;
      while (i--) {
        listener = this.listeners[i];
        this.off(listener.name, listener.callback);
      }
      delete this.listeners;
      delete this.scene;
      return delete this.config;
    };

    return Engine;

  })();

}).call(this);

(function() {
  var cancelFrame, requestFrame, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  requestFrame = (_ref = (_ref1 = (_ref2 = (_ref3 = (_ref4 = window.requestAnimationFrame) != null ? _ref4 : window.webkitRequestAnimationFrame) != null ? _ref3 : window.mozRequestAnimationFrame) != null ? _ref2 : window.oRequestAnimationFrame) != null ? _ref1 : window.msRequestAnimationFrame) != null ? _ref : function(callback) {
    return setTimeout(callback, 17);
  };

  cancelFrame = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref10 = window.cancelRequestAnimationFrame) != null ? _ref10 : window.webkitCancelAnimationFrame) != null ? _ref9 : window.webkitCancelRequestAnimationFrame) != null ? _ref8 : window.mozCancelRequestAnimationFrame) != null ? _ref7 : window.oCancelRequestAnimationFrame) != null ? _ref6 : window.msCancelRequestAnimationFrame) != null ? _ref5 : clearTimeout;

  nv.TimingEngine = (function(_super) {

    __extends(TimingEngine, _super);

    function TimingEngine(scene, config) {
      var _ref11, _ref12,
        _this = this;
      TimingEngine.__super__.constructor.call(this, scene, config);
      this.updating = false;
      this.config.afters = (_ref11 = this.config.afters) != null ? _ref11 : [];
      this.config.befores = (_ref12 = this.config.befores) != null ? _ref12 : [];
      scene.on("engine:timing:start", nv.bind(this, this.start));
      scene.on("engine:timing:stop", nv.bind(this, this.stop));
      scene.on("engine:timing:register:after", function(func) {
        return _this.config.afters.push(func);
      });
      scene.on("engine:timing:register:before", function(func) {
        return _this.config.befores.push(func);
      });
    }

    TimingEngine.prototype.start = function() {
      var lastTime, update,
        _this = this;
      lastTime = Date.now();
      this.updating = true;
      update = function() {
        var after, before, delta, now, _i, _j, _len, _len1, _ref11, _ref12;
        now = Date.now();
        delta = now - lastTime;
        delta /= 1000;
        _ref11 = _this.config.befores;
        for (_i = 0, _len = _ref11.length; _i < _len; _i++) {
          before = _ref11[_i];
          before(delta);
        }
        _this.scene.update(delta);
        if (_this.updating) {
          _ref12 = _this.config.afters;
          for (_j = 0, _len1 = _ref12.length; _j < _len1; _j++) {
            after = _ref12[_j];
            after(delta);
          }
          lastTime = now;
          return requestFrame(update);
        }
      };
      return requestFrame(update);
    };

    TimingEngine.prototype.stop = function() {
      return this.updating = false;
    };

    TimingEngine.prototype.destroy = function() {
      this.stop();
      delete this.updating;
      return TimingEngine.__super__.destroy.apply(this, arguments);
    };

    return TimingEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  nv.DebugEngine = (function(_super) {

    __extends(DebugEngine, _super);

    function DebugEngine(scene) {
      var fire, send,
        _this = this;
      DebugEngine.__super__.constructor.call(this, scene);
      this.messageLog = [];
      fire = scene.fire;
      scene.fire = function() {
        var args;
        args = Array.prototype.slice.call(arguments, 0);
        _this.log(("[EVENT] - " + args[0]) + (args[1] !== void 0 ? " - " + args[1].constructor.name : ""));
        return fire.call.apply(fire, [scene].concat(__slice.call(arguments)));
      };
      send = scene.send;
      scene.send = function() {
        var args;
        args = Array.prototype.slice.call(arguments, 0);
        _this.log(("[EVENT (Immediate)] - " + args[0]) + (args[1] !== void 0 ? " - " + args[1].constructor.name : ""));
        return send.call.apply(send, [scene].concat(__slice.call(arguments)));
      };
    }

    DebugEngine.prototype.log = function() {
      var message, messages, part, _i, _len;
      messages = Array.prototype.slice.call(arguments, 0);
      message = "";
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        part = messages[_i];
        message += part.toString();
      }
      this.messageLog.push(message);
      return console.log(message);
    };

    return DebugEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.RenderingEngine = (function(_super) {

    __extends(RenderingEngine, _super);

    RenderingEngine.prototype.initializer = function(config, rootModel) {
      var canvas, property, rootConfig, value, _ref;
      if (!rootModel.get('canvas')) {
        rootConfig = rootModel.config;
        canvas = new gleam.Canvas(rootConfig.canvas.id);
        canvas.setSize(rootConfig.canvas.width, rootConfig.canvas.height);
        canvas.setMaxSize(rootConfig.canvas.maxWidth, rootConfig.canvas.maxHeight);
        _ref = rootConfig.canvas.css;
        for (property in _ref) {
          value = _ref[property];
          canvas.setStyle(property, value);
        }
        canvas.setFullscreen(rootConfig.canvas.fullscreen);
        canvas.setResponsive(rootConfig.canvas.responsive);
        if (!rootConfig.canvas.id) {
          document.body.appendChild(canvas.source);
        }
        rootModel.set('canvas', canvas);
      }
      return nv.extend(config, {
        canvas: rootModel.canvas,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height,
        autoRendering: true
      });
    };

    function RenderingEngine(scene, config) {
      RenderingEngine.__super__.constructor.call(this, scene, config);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.drawables = [];
      this.camera = new gleam.Camera;
    }

    RenderingEngine.prototype["event(engine:rendering:create)"] = function(drawable) {
      return this.drawables.push(drawable);
    };

    RenderingEngine.prototype["event(engine:rendering:destroy)"] = function(drawable) {
      return this.drawables.splice(this.drawables.indexOf(drawable), 1);
    };

    RenderingEngine.prototype["event(engine:rendering:draw)"] = function() {
      return this._render(0);
    };

    RenderingEngine.prototype.prepare = function() {
      this.scene.fire("engine:timing:register:after", nv.bind(this, this.draw));
      return this.scene.on("engine:gamepad:mouse:down", nv.bind(this, this.onMouseDown));
    };

    RenderingEngine.prototype.update = function(dt) {
      var drawable, _i, _len, _ref, _results;
      _ref = this.drawables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        if (!!drawable.update) {
          _results.push(drawable.update(dt));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    RenderingEngine.prototype.draw = function(dt) {
      if (!this.config.autoRendering) {
        return;
      }
      return this._render(dt);
    };

    RenderingEngine.prototype._render = function(dt) {
      var drawable, _i, _len, _ref;
      this.context.save();
      this.context.clearRect();
      this.camera.update(dt, this.context, this.canvas);
      _ref = this.drawables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        drawable.draw(this.context, this.canvas);
      }
      return this.context.restore();
    };

    RenderingEngine.prototype.onMouseDown = function(data) {
      var bounds, drawable, _i, _len, _ref, _results;
      _ref = this.drawables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        if (drawable.clickable === true) {
          if (drawable.bounds) {
            bounds = drawable.bounds();
            if (bounds.contains(new nv.Point(data.x, data.y))) {
              _results.push(this.scene.fire("engine:rendering:clicked:" + drawable.entity.constructor.name, drawable.entity));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    RenderingEngine.prototype.destroy = function() {
      delete this.drawables;
      return RenderingEngine.__super__.destroy.apply(this, arguments);
    };

    return RenderingEngine;

  })(nv.Engine);

  nv.RenderingPlugin = (function(_super) {

    __extends(RenderingPlugin, _super);

    function RenderingPlugin(scene, entity) {
      var _ref;
      RenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.clickable = (_ref = entity.model.clickable) != null ? _ref : false;
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
      this.scene.fire("engine:rendering:destroy", this);
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

    DrawableRenderingPlugin.prototype.bounds = function() {
      return new nv.Rect(this.drawable.x, this.drawable.y, this.drawable.x + this.drawable.width, this.drawable.y + this.drawable.height);
    };

    DrawableRenderingPlugin.prototype.draw = function(context, canvas) {
      this.drawable.x = this.entity.model.x;
      this.drawable.y = this.entity.model.y;
      return this.drawable.draw(context, canvas);
    };

    return DrawableRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.SpriteRenderingPlugin = (function(_super) {

    __extends(SpriteRenderingPlugin, _super);

    function SpriteRenderingPlugin(scene, entity) {
      SpriteRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.sprite = new gleam.Sprite(entity.model);
    }

    SpriteRenderingPlugin.prototype.draw = function(context, canvas) {
      return this.sprite.draw(context, canvas);
    };

    return SpriteRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.AnimatedSpriteRenderingPlugin = (function(_super) {

    __extends(AnimatedSpriteRenderingPlugin, _super);

    function AnimatedSpriteRenderingPlugin(scene, entity) {
      AnimatedSpriteRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.sprite = new gleam.AnimatedSprite(entity.model);
      this.sprite.play(entity.model.currentAnimation);
    }

    AnimatedSpriteRenderingPlugin.prototype.play = function(animation) {
      return this.sprite.play(animation);
    };

    AnimatedSpriteRenderingPlugin.prototype.update = function(dt) {
      return this.sprite.update(dt);
    };

    AnimatedSpriteRenderingPlugin.prototype.draw = function(context, canvas) {
      this.sprite.x = this.entity.model.x;
      this.sprite.y = this.entity.model.y;
      return this.sprite.draw(context, canvas);
    };

    return AnimatedSpriteRenderingPlugin;

  })(nv.SpriteRenderingPlugin);

  nv.SpriteMapRenderingPlugin = (function(_super) {

    __extends(SpriteMapRenderingPlugin, _super);

    function SpriteMapRenderingPlugin(scene, entity) {
      SpriteMapRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.map = this.entity.model.map;
    }

    SpriteMapRenderingPlugin.prototype.draw = function(context, canvas) {
      return this.sprite.draw(context, canvas);
    };

    return SpriteMapRenderingPlugin;

  })(nv.SpriteRenderingPlugin);

  nv.TextRenderingPlugin = (function(_super) {

    __extends(TextRenderingPlugin, _super);

    function TextRenderingPlugin(scene, entity) {
      TextRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.text = new gleam.Text(entity.model);
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
      var point, shape, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.entity.model.shapes();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        shape = _ref[_i];
        if (shape.strokeColor) {
          context.setStrokeStyle(shape.strokeColor);
        }
        if (shape.strokeWidth) {
          context.setStrokeWidth(shape.strokeWidth);
        }
        if (shape.fillStyle) {
          context.setFillStyle(shape.fillStyle);
        }
        context.beginPath();
        context.moveTo(shape.points[0].x, shape.points[0].y);
        _ref1 = shape.points.slice(1);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          point = _ref1[_j];
          context.lineTo(point.x, point.y);
        }
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

    function GamepadEngine(scene, config) {
      var key,
        _this = this;
      GamepadEngine.__super__.constructor.call(this, scene, config);
      this.gamepad = scene.get('gamepad');
      this.options = scene.options;
      this.options.setMany(config);
      if (this.options.trackMouse != null) {
        this.gamepad.trackMouse();
      }
      if (this.options.keyRepeatEvents) {
        this.gamepad.keyRepeatEvents = true;
      }
      for (key in this.options.keys) {
        this.gamepad.aliasKey(key, this.options.keys[key]);
      }
      for (key in this.config.controller) {
        this.gamepad.aliasGamepadButton(key, this.config.controller[key]);
      }
      this.buttonPressFunction = nv.bind(this, this.onButtonPress);
      this.buttonReleaseFunction = nv.bind(this, this.onButtonRelease);
      this.buttonRepeatFunction = nv.bind(this, this.onButtonRepeat);
      this.mouseDownFunction = nv.bind(this, this.onMouseDown);
      this.mouseUpFunction = nv.bind(this, this.onMouseUp);
      this.gamepad.on("press", this.buttonPressFunction);
      this.gamepad.on("release", this.buttonReleaseFunction);
      this.gamepad.on("repeat", this.buttonRepeatFunction);
      this.gamepad.on("gamepad:connected", function() {
        return _this.scene.fire("engine:gamepad:controller:connected");
      });
      this.gamepad.on("mousedown", this.mouseDownFunction);
      this.gamepad.on("mouseup", this.mouseUpFunction);
    }

    GamepadEngine.prototype.onButtonPress = function(button) {
      return this.scene.fire("engine:gamepad:press:" + button);
    };

    GamepadEngine.prototype.onButtonRelease = function(button) {
      return this.scene.fire("engine:gamepad:release:" + button);
    };

    GamepadEngine.prototype.onButtonRepeat = function(button) {
      return this.scene.fire("engine:gamepad:repeat:" + button);
    };

    GamepadEngine.prototype.onMouseDown = function(data) {
      if (!!this.config.trackMouse) {
        return this.scene.fire("engine:gamepad:mouse:down", data);
      }
    };

    GamepadEngine.prototype.onMouseUp = function(data) {
      if (!!this.config.trackMouse) {
        return this.scene.fire("engine:gamepad:mouse:up", data);
      }
    };

    GamepadEngine.prototype.update = function(dt) {
      return this.gamepad.update(dt);
    };

    GamepadEngine.prototype.destroy = function() {
      this.gamepad.off("press", this.buttonPressFunction);
      this.gamepad.off("release", this.buttonReleaseFunction);
      this.gamepad.off("repeat", this.buttonRepeatFunction);
      this.gamepad.off("mousedown", this.mouseDownFunction);
      this.gamepad.off("mouseup", this.mouseUpFunction);
      delete this.buttonPressFunction;
      delete this.buttonReleaseFunction;
      delete this.buttonRepeatFunction;
      delete this.gamepad;
      delete this.config;
      return GamepadEngine.__super__.destroy.apply(this, arguments);
    };

    return GamepadEngine;

  })(nv.Engine);

  nv.TouchTargetPlugin = (function(_super) {

    __extends(TouchTargetPlugin, _super);

    function TouchTargetPlugin(scene, entity) {
      var _this = this;
      TouchTargetPlugin.__super__.constructor.call(this, scene, entity);
      this.pressed = false;
      this.scene.on("engine:gamepad:mouse:down", function(event) {
        if (_this.entity.model.bounds.contains(new nv.Point(event.x, event.y))) {
          _this.pressed = true;
          return _this.scene.fire("engine:gamepad:press:" + _this.entity.model.action);
        }
      });
      this.scene.on("engine:gamepad:mouse:up", function(event) {
        if (_this.pressed) {
          _this.pressed = false;
          return _this.scene.fire("engine:gamepad:release:" + _this.entity.model.action);
        }
      });
    }

    return TouchTargetPlugin;

  })(nv.Plugin);

  nv.Gamepad = (function(_super) {

    __extends(Gamepad, _super);

    function Gamepad() {
      Gamepad.__super__.constructor.apply(this, arguments);
      this.gamepad = navigator.webkitGamepad;
      this.state = {};
      this.listeners = {};
      this.trackers = {};
      this.gamepadAliases = {};
      this.previousGamepadState = void 0;
      this.trackGamepad = false;
      this.keyRepeatEvents = false;
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
        _this.state.mouse.down = true;
        return _this.send("mousedown", _this.state.mouse);
      });
      nv.mouseup(function(event) {
        _this.state.mouse.x = event.clientX;
        _this.state.mouse.y = event.clientY;
        _this.state.mouse.down = false;
        return _this.send("mouseup", _this.state.mouse);
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
        if (!_this.state[button]) {
          _this.fireButton(button, "press");
          return _this.state[button] = true;
        }
      }));
      if (this.keyRepeatEvents) {
        this.trackers[button].push(nv.keypress(key + 32, function() {
          if (!_this.state[button]) {
            return;
          }
          return _this.fireButton(button, "repeat");
        }));
      }
      return this.trackers[button].push(nv.keyup(key, function() {
        _this.state[button] = false;
        return _this.fireButton(button, "release");
      }));
    };

    Gamepad.prototype.aliasGamepadButton = function(button, gamepadButton) {
      this.trackGamepad = true;
      if (!this.gamepadAliases[gamepadButton]) {
        this.gamepadAliases[gamepadButton] = [];
      }
      return this.gamepadAliases[gamepadButton].push(button);
    };

    Gamepad.prototype.fireButton = function(button, state) {
      return this.send(state, button);
    };

    Gamepad.prototype.getState = function() {
      return this.state;
    };

    Gamepad.prototype.update = function(dt) {
      var button, gamepad, key, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
      if (this.trackGamepad) {
        gamepad = navigator.webkitGetGamepads()[0];
        if (gamepad && this.previousGamepadState) {
          for (key in this.gamepadAliases) {
            key = parseInt(key);
            if (gamepad.buttons[key] > 0 && this.previousGamepadState.buttons[key] === 0) {
              _ref = this.gamepadAliases[key];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                button = _ref[_i];
                this.state[button] = true;
              }
              _ref1 = this.gamepadAliases[key];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                button = _ref1[_j];
                this.fireButton(button, "press");
              }
            } else if (gamepad.buttons[key] === 0 && this.previousGamepadState.buttons[key] > 0) {
              _ref2 = this.gamepadAliases[key];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                button = _ref2[_k];
                this.state[button] = false;
              }
              _ref3 = this.gamepadAliases[key];
              for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                button = _ref3[_l];
                this.fireButton(button, "release");
              }
            }
          }
          return this.previousGamepadState = nv.extend({}, gamepad);
        } else {
          this.previousGamepadState = nv.extend({}, gamepad);
          return this.send("controller:connected");
        }
      }
    };

    Gamepad.prototype.destroy = function() {};

    return Gamepad;

  })(nv.EventDispatcher);

  nv.gamepad = function() {
    return new nv.Gamepad;
  };

}).call(this);

(function() {
  var __objectId,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PhysicsEngine = (function(_super) {

    __extends(PhysicsEngine, _super);

    function PhysicsEngine(scene, config) {
      PhysicsEngine.__super__.constructor.call(this, scene, config);
      this.passiveObjects = {};
      this.activeObjects = {};
      this.physicsObjects = [];
    }

    PhysicsEngine.prototype["event(engine:physics:create)"] = function(collidable) {
      return this.trackObject(collidable);
    };

    PhysicsEngine.prototype["event(engine:physics:delete)"] = function(collidable) {
      return this.removeObject(collidable);
    };

    PhysicsEngine.prototype["event(engine:physics:register)"] = function(obj) {
      return this.physicsObjects.push(obj);
    };

    PhysicsEngine.prototype.prepare = function() {
      if (this.config.debug === true) {
        this.canvas = this.scene.getEngine(nv.RenderingEngine).canvas;
        return this.scene.fire("engine:timing:register:after", nv.bind(this, this.drawObjects));
      }
    };

    PhysicsEngine.prototype.drawObjects = function() {
      var drawObj, ida, obj, _ref, _ref1, _results,
        _this = this;
      drawObj = function(obj) {
        var bounds;
        _this.canvas.context.setStrokeStyle("#FF0000");
        _this.canvas.context.setStrokeWidth(2);
        bounds = obj.bounds();
        return _this.canvas.context.strokeRect(bounds.x, bounds.y, bounds.x2 - bounds.x, bounds.y2 - bounds.y);
      };
      _ref = this.activeObjects;
      for (ida in _ref) {
        obj = _ref[ida];
        drawObj(obj);
      }
      _ref1 = this.passiveObjects;
      _results = [];
      for (ida in _ref1) {
        obj = _ref1[ida];
        _results.push(drawObj(obj));
      }
      return _results;
    };

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
      var ida, idp, ivec, obj, obja, objaBounds, objp, objpBounds, _i, _len, _ref, _ref1, _ref2, _results;
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
          objpBounds = objp.bounds();
          if (objpBounds.intersects(objaBounds)) {
            ivec = this.impactVector(objaBounds, objpBounds);
            this.scene.send("engine:collision:queued", {
              actor: obja.entity,
              target: objp.entity
            });
            this.scene.fire("engine:collision:" + obja.entity.constructor.name + ":" + objp.entity.constructor.name, {
              actor: obja.entity,
              target: objp.entity,
              impactVector: ivec
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

    PhysicsEngine.prototype.impactVector = function(colliderBounds, collideeBounds) {
      var bottom, iVec, left, right, top;
      iVec = new nv.Point(0, 0);
      left = collideeBounds.x - colliderBounds.x2;
      right = collideeBounds.x2 - colliderBounds.x;
      top = collideeBounds.y - colliderBounds.y2;
      bottom = collideeBounds.y2 - colliderBounds.y;
      iVec.x = -1 * (Math.abs(left) <= right ? left : right);
      iVec.y = -1 * (Math.abs(top) <= bottom ? top : bottom);
      return iVec;
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
      this.type = entity.model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      PathPhysicsPlugin.__super__.constructor.call(this, scene, entity);
      this.updateBounds();
    }

    PathPhysicsPlugin.prototype.bounds = function() {
      this.updateBounds();
      return this.boundingRect;
    };

    PathPhysicsPlugin.prototype.updateBounds = function() {
      var point, x1, x2, y1, y2, _i, _len, _ref;
      x1 = x2 = y1 = y2 = null;
      _ref = this.entity.model.points();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (x1 === null || point.x < x1) {
          x1 = point.x;
        }
        if (x2 === null || point.x > x2) {
          x2 = point.x;
        }
        if (y1 === null || point.y < y1) {
          y1 = point.y;
        }
        if (y2 === null || point.y > y2) {
          y2 = point.y;
        }
      }
      return this.boundingRect.reset(x1, y1, x2, y2);
    };

    return PathPhysicsPlugin;

  })(nv.PhysicsPlugin);

  nv.RectanglePhysicsPlugin = (function(_super) {

    __extends(RectanglePhysicsPlugin, _super);

    function RectanglePhysicsPlugin(scene, entity) {
      this.id = __objectId++;
      this.type = entity.model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      RectanglePhysicsPlugin.__super__.constructor.call(this, scene, entity);
    }

    RectanglePhysicsPlugin.prototype.bounds = function() {
      var model;
      model = this.entity.model;
      return new nv.Rect(model.x, model.y, model.x + model.width, model.y + model.height);
    };

    return RectanglePhysicsPlugin;

  })(nv.PhysicsPlugin);

  nv.GravityPhysicsPlugin = (function(_super) {

    __extends(GravityPhysicsPlugin, _super);

    function GravityPhysicsPlugin(scene, entity) {
      this.gravity = 0.003;
      GravityPhysicsPlugin.__super__.constructor.call(this, scene, entity);
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
      var dispatch, self;
      this.options = options;
      SoundPlugin.__super__.constructor.call(this, scene, entity);
      this.state = "stopped";
      this.sound = new Audio(this.options.asset);
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
      this.scene.on(this.options.event, dispatch.bind(this.options));
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

    function SoundFactory() {}

    SoundFactory.prototype.wire = function(scene, sounds) {
      var name, sound, _results;
      this.scene = scene;
      _results = [];
      for (name in sounds) {
        sound = sounds[name];
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
  var randRange, randVariation,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  randRange = function(min, max) {
    return Math.random() * (max - min) + min;
  };

  randVariation = function(center, variation) {
    return center + (variation * randRange(-0.5, 0.5));
  };

  nv.ParticleEngine = (function(_super) {

    __extends(ParticleEngine, _super);

    ParticleEngine.prototype.initializer = function(config, rootModel) {
      return nv.extend(config, {
        canvas: rootModel.canvas,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height
      });
    };

    function ParticleEngine(scene, config) {
      ParticleEngine.__super__.constructor.call(this, scene);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.emitters = [];
    }

    ParticleEngine.prototype["event(engine:particle:register:emitter)"] = function(emitter) {
      this.emitters.push(emitter);
      return this.scene.fire("engine:rendering:create", emitter);
    };

    ParticleEngine.prototype["event(engine:particle:destroy:emitter)"] = function(emitter) {
      this.scene.fire("engine:rendering:destroy", emitter);
      return this.emitters.splice(this.emitters.indexOf(emitter), 1);
    };

    ParticleEngine.prototype.update = function(dt) {
      var emitter, _i, _len, _ref;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.update(dt);
      }
      return this.emitters = this.emitters.filter(function(emitter) {
        return !emitter.complete;
      });
    };

    ParticleEngine.prototype.destroy = function() {
      var emitter, _i, _len, _ref;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.destroy;
      }
      delete this.emitters;
      return ParticleEngine.__super__.destroy.apply(this, arguments);
    };

    return ParticleEngine;

  })(nv.Engine);

  nv.ParticleEmitter = (function() {

    ParticleEmitter.prototype.defaults = {
      position: new nv.Point(0, 0),
      particlesPerSecond: 100,
      maxParticles: 1024000,
      particleLife: 0.5,
      lifeVariation: 0.52,
      colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(0, 0, 0, 0)]),
      angle: 0,
      angleVariation: Math.PI * 2,
      minVelocity: 20,
      maxVelocity: 50,
      gravity: new nv.Point(0, 0),
      collider: null,
      bounceDamper: 0.5,
      on: false
    };

    function ParticleEmitter(scene, options) {
      this.scene = scene;
      this.options = nv.clone(this.defaults);
      this.options = nv.extend(this.options, options);
      this.particles = [];
      this.particleCounter = 0;
      this.complete = false;
      this.particlesThisFrame = 0;
      this.scene.fire("engine:particle:register:emitter", this);
    }

    ParticleEmitter.prototype.destroy = function() {
      this.options.on = false;
      this.scene.fire("engine:particle:destroy:emitter", this);
      return delete this.scene;
    };

    ParticleEmitter.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    ParticleEmitter.prototype.get = function(key) {
      return this.options[key];
    };

    ParticleEmitter.prototype.draw = function(context, canvas) {
      var particle, _i, _len, _ref, _results;
      _ref = this.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        particle = _ref[_i];
        _results.push(particle.draw(context, canvas));
      }
      return _results;
    };

    ParticleEmitter.prototype.spawnParticle = function(offset) {
      var angle, life, position, speed, velocity;
      angle = randVariation(this.options.angle, this.options.angleVariation);
      speed = randRange(this.options.minVelocity, this.options.maxVelocity);
      life = randVariation(this.options.particleLife, this.options.particleLife * this.options.lifeVariation);
      velocity = new nv.Point().fromPolar(angle, speed);
      position = this.options.position.clone().add(velocity.times(offset));
      this.particles.push(new nv.Particle(this.options, position, velocity, life));
      return this.particleCounter++;
    };

    ParticleEmitter.prototype.update = function(dt) {
      var dead, deadParticle, i, index, particle, particlesToSpawn, _i, _j, _len, _len1, _ref;
      dead = [];
      _ref = this.particles;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        particle = _ref[index];
        particle.update(dt);
        if (particle.isDead()) {
          dead.push(particle);
        }
      }
      for (_j = 0, _len1 = dead.length; _j < _len1; _j++) {
        deadParticle = dead[_j];
        deadParticle.destroy();
        this.particles.splice(this.particles.indexOf(deadParticle), 1);
      }
      dead = void 0;
      if (this.options.on) {
        this.particlesThisFrame += this.options.particlesPerSecond * dt;
        i = 0;
        particlesToSpawn = this.particlesThisFrame;
        while (this.particlesThisFrame > 1) {
          i++;
          this.particlesThisFrame--;
          this.spawnParticle((1.0 + i) / particlesToSpawn * dt);
        }
      }
      if (this.options.maxParticles !== void 0 && this.particleCounter > this.options.maxParticles) {
        this.options.on = false;
        return this.complete = this.particles.length === 0;
      }
    };

    return ParticleEmitter;

  })();

  nv.Particle = (function() {

    function Particle(options, position, velocity, life) {
      this.options = options;
      this.position = position;
      this.velocity = velocity;
      this.life = life;
      this.maxLife = this.life;
    }

    Particle.prototype.isDead = function() {
      return this.life <= 0;
    };

    Particle.prototype.draw = function(context, canvas) {
      var color, lifePercent;
      if (this.isDead()) {
        return;
      }
      lifePercent = 1.0 - (this.life / this.maxLife);
      color = this.options.colors.getColor(lifePercent);
      context.save();
      context.globalAlpha = color.a;
      context.setFillStyle(color.toCanvasColor());
      context.fillRect(this.position.x - 1, this.position.y - 1, 3, 3);
      return context.restore();
    };

    Particle.prototype.update = function(dt) {
      this.velocity.add(this.options.gravity.times(dt));
      this.position.add(this.velocity.times(dt));
      return this.life -= dt;
    };

    Particle.prototype.destroy = function() {
      delete this.options;
      delete this.position;
      delete this.velocity;
      delete this.life;
      return delete this.maxLife;
    };

    return Particle;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.EditorEngine = (function(_super) {

    __extends(EditorEngine, _super);

    EditorEngine.prototype.initializer = function(config, rootModel) {};

    function EditorEngine(scene, config) {
      EditorEngine.__super__.constructor.call(this, scene, config);
      window.addEventListener('message', nv.bind(this, this.handleMessage));
    }

    EditorEngine.prototype["event(game:start)"] = function() {
      return this.sendMessage('load', '');
    };

    EditorEngine.prototype.handleMessage = function(event) {
      var message;
      console.log("MESSAGE: ", event);
      message = event.data;
      return this.scene.fire("engine:editor:" + message.type, message.data);
    };

    EditorEngine.prototype.sendMessage = function(type, message) {
      console.log('posting', type, message);
      return window.parent.postMessage({
        type: type,
        message: message
      }, window.location.href);
    };

    return EditorEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.LiveEditEngine = (function(_super) {

    __extends(LiveEditEngine, _super);

    LiveEditEngine.prototype.initializer = function(config, rootModel) {
      var script,
        _this = this;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://localhost:8888/socket.io/socket.io.js';
      script.addEventListener('load', function(event) {
        return _this.connect();
      });
      return document.querySelector('head').appendChild(script);
    };

    function LiveEditEngine(scene, config) {
      if (!this.connected) {
        this.connect();
      }
    }

    LiveEditEngine.prototype.connect = function() {
      if (!(typeof io === "undefined" || io === null)) {
        this.socket = io.connect('http://localhost:8888');
        this.socket.on('change', function(data) {
          return window.location.href = window.location.href;
        });
        return this.connected = true;
      }
    };

    return LiveEditEngine;

  })(nv.Engine);

}).call(this);

(function() {



}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.scenes = {};

  this.entities = {};

  this.models = {};

  this.renderers = {};

  this.breakout = {};

  this.Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      var start,
        _this = this;
      Application.__super__.constructor.call(this, breakout.gameConfig);
      nv.configure({
        debug: true
      });
      start = function() {
        return _this.start('Main');
      };
      setTimeout(start, 0);
    }

    return Application;

  })(nv.Game);

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
      this.camera = scene.getEngine(nv.RenderingEngine).camera;
    }

    Hud.prototype.draw = function(context, canvas) {
      var data, point, points, score, self, ship, textWidth, _i, _j, _len, _len1, _ref;
      context.save();
      context.shadowColor = this.entity.model.color;
      context.shadowBlur = 5;
      context.setStrokeStyle(this.entity.model.color);
      context.strokeRect(this.entity.model.x, this.entity.model.y, this.entity.model.width, this.entity.model.height);
      context.restore();
      context.save();
      context.translate(-this.camera.x, -this.camera.y);
      context.setFont(this.entity.model.font);
      context.setStrokeStyle(this.entity.model.color);
      score = this.entity.model.score.toString();
      textWidth = context.measureText(score).width;
      context.strokeText(score, this.entity.model.width - textWidth - 20, 50);
      _ref = this.entity.model.ships;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ship = _ref[_i];
        data = [];
        self = ship;
        points = ship.points('ship');
        for (_j = 0, _len1 = points.length; _j < _len1; _j++) {
          point = points[_j];
          data.push(point.x + self.x, point.y + self.y);
        }
        data.push(points[0].x + ship.x, points[0].y + ship.y);
        context.setStrokeStyle(ship.strokeColor);
        context.setStrokeWidth(ship.strokeWidth);
        context.path.apply(context, data);
      }
      return context.restore();
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
        context.setFillStyle(_this.entity.model.color);
        return context.arc(_this.entity.model.x, _this.entity.model.y, _this.entity.model.radius, 0, Math.PI * 2, true);
      });
    };

    return Bullet;

  })(nv.RenderingPlugin);

  renderers.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship() {
      Ship.__super__.constructor.apply(this, arguments);
    }

    Ship.prototype.constuctor = function(scene, entity) {
      return Ship.__super__.constuctor.call(this, scene, entity);
    };

    return Ship;

  })(nv.PathRenderingPlugin);

  renderers.Background = (function(_super) {

    __extends(Background, _super);

    function Background(scene, entity) {
      var i, radius, renderingEngine, x, y;
      Background.__super__.constructor.call(this, scene, entity);
      this.canvas = new gleam.Canvas;
      this.canvas.setSize(700, 700);
      this.canvas.width = entity.model.width;
      this.canvas.height = entity.model.height;
      renderingEngine = scene.getEngine(nv.RenderingEngine);
      this.rootCanvas = renderingEngine.canvas;
      this.camera = renderingEngine.camera;
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
          context.setFillStyle(gradient);
          return context.arc(x, y, radius, 0, Math.PI * 2, true);
        });
      }
    }

    Background.prototype.draw = function(context, canvas) {
      var camX, camY, curX, curY, startX, startY;
      context.globalCompositeOperation = "lighter";
      camX = -this.camera.x;
      camY = -this.camera.y;
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
      while (curX < camX + this.rootCanvas.width) {
        while (curY < camY + this.rootCanvas.height) {
          context.drawImage(this.canvas.source, curX, curY);
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
  var models,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.models = models = {};

  models.PathObject = (function(_super) {

    __extends(PathObject, _super);

    function PathObject(options, defaultShape) {
      this.defaultShape = defaultShape != null ? defaultShape : "";
      if (options.shapes != null) {
        this.modelShapes = options.shapes;
      }
      delete options.shapes;
      PathObject.__super__.constructor.call(this, options);
    }

    PathObject.prototype.preparePath = function() {
      return {
        points: []
      };
    };

    PathObject.prototype.shouldDrawShape = function(shapeName) {
      return false;
    };

    PathObject.prototype.points = function(shapeName) {
      var shape;
      if (shapeName == null) {
        shapeName = this.defaultShape;
      }
      shape = this.prepareShape(this.modelShapes[shapeName]);
      return shape.points;
    };

    PathObject.prototype.shapes = function() {
      var shapeName, shapes;
      shapes = [];
      for (shapeName in this.modelShapes) {
        if (this.shouldDrawShape(shapeName)) {
          shapes.push(this.prepareShape(this.modelShapes[shapeName]));
        }
      }
      return shapes;
    };

    PathObject.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    };

    PathObject.prototype.rotate = function(dr) {
      this.rotation += dr;
      return this;
    };

    PathObject.prototype.bounds = function() {
      var point, x1, x2, y1, y2, _i, _len, _ref;
      x1 = x2 = y1 = y2 = null;
      _ref = this.points();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (x1 === null || point.x < x1) {
          x1 = point.x;
        }
        if (x2 === null || point.x > x2) {
          x2 = point.x;
        }
        if (y1 === null || point.y < y1) {
          y1 = point.y;
        }
        if (y2 === null || point.y > y2) {
          y2 = point.y;
        }
      }
      return new nv.Rect(x1, y1, x2, y2);
    };

    return PathObject;

  })(nv.Model);

  models.Ship = (function(_super) {

    __extends(Ship, _super);

    function Ship(options) {
      Ship.__super__.constructor.call(this, options, "ship");
      this.resetProps = {
        x: this.x,
        y: this.y,
        thrusters: this.thrusters,
        health: this.health,
        rotation: this.rotation,
        thrustVector: new nv.Point(0, 0)
      };
    }

    Ship.prototype.reset = function() {
      return this.setMany(this.resetProps);
    };

    Ship.prototype.shouldDrawShape = function(shapeName) {
      switch (shapeName) {
        case "ship":
          return true;
        case "thrusters":
          return this.thrusters;
        default:
          return false;
      }
    };

    Ship.prototype.prepareShape = function(object) {
      var cosine, model, path, point, shape, sine, _i, _len, _ref;
      shape = nv.extend({}, object);
      model = this;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      _ref = shape.points;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        path.push(new nv.Point(point.x * cosine - point.y * sine + model.x, point.x * sine + point.y * cosine + model.y));
      }
      shape.points = path;
      return shape;
    };

    return Ship;

  })(models.PathObject);

  models.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(options) {
      Asteroid.__super__.constructor.call(this, options);
      this.wireframe = this.buildWireframe(this.scale * .5);
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
          points: this.points(),
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          fillStyle: this.fillStyle
        }
      ];
    };

    Asteroid.prototype.points = function() {
      var cosine, model, path, point, sine, _i, _len, _ref;
      cosine = Math.cos(this.rotation);
      sine = Math.sin(this.rotation);
      path = [];
      model = this;
      _ref = this.wireframe;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        path.push(new nv.Point(point.x * cosine - point.y * sine + model.x, point.x * sine + point.y * cosine + model.y));
      }
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

  })(models.PathObject);

  models.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(options) {
      Bullet.__super__.constructor.call(this, options);
      this.wireframe = this.buildWireframe();
    }

    Bullet.prototype.points = function() {
      var model, path, point, _i, _len, _ref;
      path = [];
      model = this;
      _ref = this.wireframe;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        path.push(new nv.Point(model.x, model.y));
      }
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Ball = (function(_super) {

    __extends(Ball, _super);

    function Ball(scene, plugins, model) {
      Ball.__super__.constructor.call(this, scene, plugins, model);
      this.startDelay = 5;
      this.started = false;
      this.pendingCollision = false;
      this.canvas = this.scene.getEngine(nv.RenderingEngine).canvas;
    }

    Ball.prototype["event(engine:collision:queued)"] = function(data) {
      if (data.actor !== this) {
        return;
      }
      return this.pendingCollision = true;
    };

    Ball.prototype["event(engine:collision:Ball:Player)"] = function(data) {
      if (Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)) {
        this.model.x -= data.impactVector.x + this.model.direction.x;
        this.model.direction.x = -this.model.direction.x;
      } else if (Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)) {
        this.model.y -= data.impactVector.y + this.model.direction.y;
        this.model.direction.y = -this.model.direction.y;
      }
      return this.pendingCollision = false;
    };

    Ball.prototype["event(engine:collision:Ball:Brick)"] = function(data) {
      if (Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)) {
        this.model.x -= data.impactVector.x + this.model.direction.x;
        this.model.direction.x = -this.model.direction.x;
      } else if (Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)) {
        this.model.y -= data.impactVector.y + this.model.direction.y;
        this.model.direction.y = -this.model.direction.y;
      }
      this.pendingCollision = false;
      this.model.speed += this.model.speedIncrement;
      return this.pendingCollision = false;
    };

    Ball.prototype["event(engine:collision:Ball:Wall)"] = function(data) {
      var dimensions;
      dimensions = this.canvas.getSize();
      if (Math.abs(data.impactVector.y) > Math.abs(data.impactVector.x)) {
        this.model.x -= data.impactVector.x + this.model.direction.x;
        this.model.direction.x = -this.model.direction.x;
      } else if (Math.abs(data.impactVector.y) < Math.abs(data.impactVector.x)) {
        this.model.y -= data.impactVector.y + this.model.direction.y;
        this.model.direction.y = -this.model.direction.y;
      }
      return this.pendingCollision = false;
    };

    Ball.prototype.restart = function() {
      this.started = false;
      this.startDelay = 5;
      this.model.x = 150;
      return this.model.y = 250;
    };

    Ball.prototype.update = function(dt) {
      var dimensions;
      if (this.started === false) {
        this.startDelay -= dt;
        if (!(this.startDelay > 0)) {
          return this.started = true;
        }
      } else if (this.pendingCollision !== true) {
        dimensions = this.canvas.getSize();
        this.model.x += this.model.speed * this.model.direction.x;
        this.model.y += this.model.speed * this.model.direction.y;
        if (this.model.y > dimensions.height) {
          this.scene.fire("game:ball:destroyed");
          return this.restart();
        }
      }
    };

    return Ball;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Brick = (function(_super) {

    __extends(Brick, _super);

    function Brick(scene, plugins, model) {
      Brick.__super__.constructor.call(this, scene, plugins, model);
    }

    Brick.prototype["event(engine:collision:Ball:Brick)"] = function(data) {
      if (data.target !== this) {
        return;
      }
      this.scene.fire("game:score", {
        score: data.target.model.get('value')
      });
      return this.destroy();
    };

    return Brick;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
      Title.__super__.constructor.call(this, scene, [renderers.StrokeText], {
        color: "#000",
        strokeColor: "#0F0",
        x: 200,
        y: 320,
        font: "bold italic 50px sans-serif",
        text: "Novus",
        strokeWidth: 2,
        shadowBlur: 20,
        clickable: true
      });
      this.direction = "out";
    }

    Title.prototype.update = function(dt) {
      if (this.direction === "out") {
        this.model.shadowBlur -= 0.2;
        if (!(this.model.shadowBlur > 0)) {
          return this.direction = "in";
        }
      } else if (this.direction === "in") {
        this.model.shadowBlur += 0.2;
        if (!(this.model.shadowBlur < 20)) {
          return this.direction = "out";
        }
      }
    };

    return Title;

  })(nv.Entity);

  entities.ActionText = (function(_super) {

    __extends(ActionText, _super);

    function ActionText(scene) {
      ActionText.__super__.constructor.call(this, scene, [renderers.StrokeText], {
        color: "#0F0",
        x: 200,
        y: 400,
        font: "bold 20px sans-serif",
        text: "Press <Space> to Start",
        strokeWidth: 0,
        shadowBlur: 0,
        fade: true,
        fadeSpeed: 0.02
      });
    }

    ActionText.prototype.update = function(dt) {
      return this.plugins[0].update(dt);
    };

    return ActionText;

  })(nv.Entity);

  entities.Cursor = (function(_super) {

    __extends(Cursor, _super);

    function Cursor(scene) {
      Cursor.__super__.constructor.call(this, scene, [nv.DrawableRenderingPlugin], {
        drawable: new gleam.Square
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

  entities.WrappingEntity = (function(_super) {

    __extends(WrappingEntity, _super);

    function WrappingEntity(scene, plugins, model) {
      WrappingEntity.__super__.constructor.call(this, scene, plugins, model);
      this.canvas = this.scene.getEngine(nv.RenderingEngine).canvas;
    }

    WrappingEntity.prototype.wrap = function() {
      var dimensions;
      dimensions = this.canvas.getSize();
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

  entities.Asteroid = (function(_super) {

    __extends(Asteroid, _super);

    function Asteroid(scene, plugins, model) {
      this["event(engine:collision:Bullet:Asteroid)"] = __bind(this["event(engine:collision:Bullet:Asteroid)"], this);
      this["event(engine:collision:Ship:Asteroid)"] = __bind(this["event(engine:collision:Ship:Asteroid)"], this);      Asteroid.__super__.constructor.call(this, scene, plugins, model);
    }

    Asteroid.prototype["event(engine:collision:Ship:Asteroid)"] = function(data) {
      if (data.target === this) {
        return this.handleCollision(data);
      }
    };

    Asteroid.prototype["event(engine:collision:Bullet:Asteroid)"] = function(data) {
      if (data.target === this) {
        return this.handleCollision(data);
      }
    };

    Asteroid.prototype.handleCollision = function(data) {
      var bounds, offset, options, size;
      if (data.target.model.get("dead") !== true) {
        this.scene.fire("entity:destroyed:Asteroid", data.target);
        this.scene.fire("entity:remove", data.target);
        this.emitter = new nv.ParticleEmitter(this.scene, {
          position: new nv.Point(data.target.model.get('x'), data.target.model.get('y')),
          particlesPerSecond: 100,
          maxParticles: 20,
          colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(125, 125, 125, 0.7), new nv.Color(0, 0, 0, 0)]),
          particleLife: 3,
          angleVariation: 6.28,
          minVelocity: 1,
          maxVelocity: 3,
          on: true
        });
        size = data.target.model.get('size') - 1;
        if (size !== 0) {
          bounds = data.target.model.bounds();
          offset = (bounds.x2 - bounds.x) / (6 - data.target.model.get('size'));
          options = {
            entity: "asteroid",
            x: data.target.model.get('x') - offset,
            y: data.target.model.get('y'),
            scale: size,
            direction: data.target.model.get('direction') - 0.3
          };
          this.scene.fire('entity:create', options);
          options = nv.extend({}, options);
          options.x += offset * 2;
          options.direction += 0.6;
          this.scene.fire('entity:create', options);
        }
      }
      return data.target.model.set('dead', true);
    };

    Asteroid.prototype.update = function(dt) {
      this.model.rotation += this.model.rotationSpeed;
      this.model.translate(Math.sin(this.model.direction) * this.model.speed, Math.cos(this.model.direction) * this.model.speed);
      return this.wrap();
    };

    return Asteroid;

  })(entities.WrappingEntity);

  entities.Bullet = (function(_super) {

    __extends(Bullet, _super);

    function Bullet(scene, plugins, model) {
      this["event(engine:collision:Bullet:Asteroid)"] = __bind(this["event(engine:collision:Bullet:Asteroid)"], this);      Bullet.__super__.constructor.call(this, scene, plugins, model);
    }

    Bullet.prototype["event(engine:collision:Bullet:Asteroid)"] = function(data) {
      if (data.actor === this) {
        return this.scene.fire("entity:remove", data.actor);
      }
    };

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

  })(entities.WrappingEntity);

  entities.Hud = (function(_super) {

    __extends(Hud, _super);

    function Hud(scene, plugins, model) {
      this["event(entity:destroyed:Asteroid)"] = __bind(this["event(entity:destroyed:Asteroid)"], this);      Hud.__super__.constructor.call(this, scene, plugins, model);
    }

    Hud.prototype["event(entity:destroyed:Asteroid)"] = function(data) {
      if (!!data.model) {
        return this.model.score += [500, 300, 200, 100][data.model.size - 1];
      }
    };

    Hud.prototype.shipDestroyed = function() {
      this.model.ships.pop();
      this.model.lives--;
      return this.model.lives;
    };

    return Hud;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Lives = (function(_super) {

    __extends(Lives, _super);

    function Lives(scene, plugins, model) {
      Lives.__super__.constructor.call(this, scene, plugins, model);
      this.updateText();
    }

    Lives.prototype["event(game:ball:destroyed)"] = function(data) {
      this.model.lives--;
      this.updateText();
      if (this.model.lives === 0) {
        return this.scene.fire("game:over");
      }
    };

    Lives.prototype.updateText = function() {
      return this.model.drawable.text = ["\u25CF", "\u25CF", "\u25CF"].slice(0, this.model.lives - 1).join("");
    };

    return Lives;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Player = (function(_super) {

    __extends(Player, _super);

    function Player(scene, plugins, model) {
      Player.__super__.constructor.call(this, scene, plugins, model);
      this.gameWidth = this.scene.get('canvas').getSize().width;
    }

    Player.prototype["event(engine:gamepad:press:left)"] = function() {
      return this.left = true;
    };

    Player.prototype["event(engine:gamepad:release:left)"] = function() {
      return this.left = false;
    };

    Player.prototype["event(engine:gamepad:press:right)"] = function() {
      return this.right = true;
    };

    Player.prototype["event(engine:gamepad:release:right)"] = function() {
      return this.right = false;
    };

    Player.prototype.update = function(dt) {
      if (!!this.right) {
        this.model.x += this.model.speed;
      }
      if (!!this.left) {
        this.model.x -= this.model.speed;
      }
      if (!(this.model.x > 0)) {
        this.model.x = 0;
      }
      if (this.model.x > this.gameWidth - this.model.width) {
        return this.model.x = this.gameWidth - this.model.width;
      }
    };

    return Player;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Scoreboard = (function(_super) {

    __extends(Scoreboard, _super);

    function Scoreboard(scene, plugins, model) {
      Scoreboard.__super__.constructor.call(this, scene, plugins, model);
      this.updateText();
    }

    Scoreboard.prototype["event(game:score)"] = function(data) {
      this.model.score += data.score;
      return this.updateText();
    };

    Scoreboard.prototype.updateText = function() {
      return this.model.drawable.text = "SCORE: " + this.model.score;
    };

    return Scoreboard;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Wall = (function(_super) {

    __extends(Wall, _super);

    function Wall(scene, plugins, model) {
      Wall.__super__.constructor.call(this, scene, plugins, model);
    }

    Wall.prototype["event(engine:collision:Ball:Wall)"] = function(data) {
      if (data.target !== this) {
        return;
      }
      return this.flash = false;
    };

    Wall.prototype.update = function(dt) {
      if (!(this.flash || this.restore)) {
        return;
      }
      if (this.flash && this.restore === void 0) {
        this.restore = shallowClone(this.model.drawable);
        this.model.drawable.color = 'yellow';
        return this.flash = false;
      } else if (this.restore) {
        this.model.drawable.color = this.restore.color;
        return delete this.restore;
      }
    };

    return Wall;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Game = (function(_super) {

    __extends(Game, _super);

    function Game(name, game, rootModel) {
      Game.__super__.constructor.call(this, name, game, rootModel);
      this.level = 1;
      this.createEntities(rootModel.config.levels["level" + this.level].entities);
      this.send("engine:timing:start");
    }

    Game.prototype.destroy = function() {
      return Game.__super__.destroy.apply(this, arguments);
    };

    return Game;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Gameover = (function(_super) {

    __extends(Gameover, _super);

    function Gameover(name, game, rootModel) {
      var _this = this;
      Gameover.__super__.constructor.call(this, name, game, rootModel);
      this.on("engine:gamepad:press:shoot", function() {
        _this.game.closeScene("Gameover");
        return _this.game.openScene('Game');
      });
      this.send("engine:timing:start");
    }

    Gameover.prototype.destroy = function() {
      return Gameover.__super__.destroy.apply(this, arguments);
    };

    return Gameover;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Main = (function(_super) {

    __extends(Main, _super);

    function Main(name, game, rootModel) {
      var _this = this;
      Main.__super__.constructor.call(this, name, game, rootModel);
      this.on("engine:gamepad:press:shoot", function() {
        _this.fire("scene:close");
        return _this.game.openScene('Game');
      });
      this.send("engine:timing:start");
    }

    Main.prototype.destroy = function() {
      this.send("engine:timing:stop");
      return Main.__super__.destroy.apply(this, arguments);
    };

    return Main;

  })(nv.Scene);

}).call(this);

(function() {

  breakout.entities = {
    background: {
      entity: nv.Entity,
      plugins: [nv.SpriteRenderingPlugin],
      model: {
        options: {
          src: '/assets/bg_prerendered.png',
          x: 0,
          y: 0
        }
      }
    },
    leftwall: {
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      entity: entities.Wall,
      model: {
        options: {
          drawable: new gleam.Square({
            width: 20,
            height: 30 * 22,
            color: "darkBlue"
          }),
          width: 20,
          height: 30 * 22,
          x: 0,
          y: 0,
          physicsObjectType: "passive"
        }
      }
    },
    topwall: {
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      entity: entities.Wall,
      model: {
        options: {
          drawable: new gleam.Square({
            width: 30 * 18,
            height: 20,
            color: "darkBlue"
          }),
          width: 30 * 18,
          height: 20,
          x: 20,
          y: 0,
          physicsObjectType: "passive"
        }
      }
    },
    rightwall: {
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      entity: entities.Wall,
      model: {
        options: {
          drawable: new gleam.Square({
            width: 20,
            height: 30 * 22,
            color: "darkBlue"
          }),
          width: 20,
          height: 30 * 22,
          x: 300,
          y: 0,
          physicsObjectType: "passive"
        }
      }
    },
    player: {
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      entity: entities.Player,
      model: {
        options: {
          drawable: new gleam.Square({
            width: 100,
            height: 15,
            color: "#FFF"
          }),
          type: 'passive',
          width: 100,
          height: 15,
          x: 100,
          y: 400,
          speed: 5,
          physicsObjectType: "passive"
        }
      }
    },
    ball: {
      entity: entities.Ball,
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        options: {
          drawable: new gleam.Circle({
            width: 20,
            height: 20,
            color: "gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(125,126,125,1)), color-stop(100%,rgba(14,14,14,1)))"
          }),
          type: 'active',
          width: 20,
          height: 20,
          x: 150,
          y: 250,
          speed: 5,
          speedIncrement: 0.2,
          direction: new nv.Point(1, 1),
          physicsObjectType: "active"
        }
      }
    },
    brick: {
      entity: entities.Brick,
      plugins: [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        klass: nv.Model,
        initializers: {
          x: function(scene, index) {
            return [40, 145, 250, 355, 460][index % 5];
          },
          y: function(scene, index) {
            return [60, 90, 120, 150][Math.floor(index / 5)];
          }
        },
        options: {
          drawable: new gleam.Rectangle({
            width: 100,
            height: 20,
            fillStyle: "darkOrange",
            strokeStyle: "darkRed",
            strokeWidth: 5,
            cornerRadius: 8
          }),
          width: 100,
          height: 20,
          physicsObjectType: "passive"
        }
      }
    },
    scoreboard: {
      entity: entities.Scoreboard,
      plugins: [nv.DrawableRenderingPlugin],
      model: {
        klass: nv.Model,
        options: {
          drawable: new gleam.Text({
            color: '#CCC',
            font: 'bold 40px courier',
            textBaseline: 'bottom',
            text: 'SCORE: 100'
          }),
          x: 36,
          y: 760,
          width: 400,
          height: 40,
          score: 0
        }
      }
    },
    lives: {
      entity: entities.Lives,
      plugins: [nv.DrawableRenderingPlugin],
      model: {
        klass: nv.Model,
        options: {
          drawable: new gleam.Text({
            color: '#CCC',
            font: 'bold 60px courier',
            textBaseline: 'bottom',
            text: '***'
          }),
          x: 450,
          y: 773,
          width: 400,
          height: 40,
          lives: 4
        }
      }
    }
  };

}).call(this);

(function() {

  breakout.levels = {
    level1: {
      entities: {
        brick: {
          count: 20,
          entity: entities.Brick,
          plugins: [nv.SpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
          model: {
            klass: nv.Model,
            initializers: {
              x: function(scene, index) {
                return [40, 145, 250, 355, 460][index % 5] + 1;
              },
              y: function(scene, index) {
                return [60, 90, 120, 150][Math.floor(index / 5)];
              }
            },
            options: {
              src: 'assets/tiles.png',
              width: 32,
              height: 16,
              origin: {
                x: 0,
                y: 0,
                width: 32,
                height: 16
              },
              physicsObjectType: "passive",
              value: 50
            }
          }
        }
      }
    }
  };

}).call(this);

(function() {

  breakout.gameConfig = {
    canvas: {
      id: '#game-canvas',
      width: 320,
      height: 416,
      responsive: false,
      css: {
        background: '000',
        margin: '0 auto 0 auto',
        display: 'block'
      }
    },
    engines: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine],
    scenes: {
      main: {
        config: {
          gamepad: {
            keys: {
              shoot: nv.Key.Spacebar
            },
            trackMouse: false
          }
        },
        engines: [nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine],
        entities: {
          background: {
            include: "background"
          },
          logo: {
            entity: nv.Entity,
            plugins: [nv.SpriteRenderingPlugin],
            model: {
              options: {
                src: 'assets/logo.png',
                width: 131,
                height: 200,
                x: 20,
                y: 20
              }
            }
          },
          title: {
            entity: nv.Entity,
            plugins: [nv.TextRenderingPlugin],
            model: {
              options: {
                color: "#000",
                x: 20,
                y: 300,
                font: "bold 25px sans-serif",
                text: "Press <Space> to start"
              }
            }
          },
          start_button: {
            entity: nv.Entity,
            plugins: [nv.TouchTargetPlugin],
            model: {
              initializers: {
                bounds: function() {
                  return new nv.Rect(10, 10, 100, 100);
                }
              },
              options: {
                action: "shoot"
              }
            }
          }
        }
      },
      game: {
        config: {
          gamepad: {
            keys: {
              left: nv.Key.A,
              right: nv.Key.D
            }
          }
        },
        engines: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine],
        soundfx: {
          brick_collision: {
            asset: "/assets/sounds/brickDeath.wav",
            event: "engine:collision:Ball:Brick",
            action: "play"
          }
        },
        entities: {
          background: {
            include: "background"
          },
          leftwall: {
            include: "leftwall"
          },
          topwall: {
            include: "topwall"
          },
          rightwall: {
            include: "rightwall"
          },
          player: {
            include: "player"
          },
          ball: {
            include: "ball"
          },
          scoreboard: {
            include: "scoreboard"
          },
          lives: {
            include: "lives"
          }
        }
      }
    },
    levels: breakout.levels,
    entities: breakout.entities
  };

}).call(this);

(function() {

  nv.ready(function() {
    return this.app = new Application;
  });

}).call(this);
