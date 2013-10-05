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
      this.ratio = 1;
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
      var height, width;
      this.source.style.webkitTransformOrigin = "top";
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      this.ratio = Math.min(width / this.width, height / this.height);
      return this.source.style.webkitTransform = "scale(" + this.ratio + ")";
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

    Context.prototype.setTextAlign = function(alignment) {
      return this.source.textAlign = alignment;
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
        textAlign: 'start',
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
      context.setTextAlign(this.textAlign);
      return context.fillText(this.text, this.x, this.y);
    };

    return Text;

  })();

}).call(this);

(function() {
  gleam.ImageLoader = (function() {
    function ImageLoader() {
      this.images = {};
      this.callbacks = {};
    }

    ImageLoader.prototype.onLoad = function(src) {
      var callback, image, _i, _len, _ref, _results;
      image = this.images[src];
      _ref = this.callbacks[src];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(image.width, image.height));
      }
      return _results;
    };

    ImageLoader.prototype.get = function(src, callback) {
      var image, _ref,
        _this = this;
      if (!this.images[src]) {
        image = new Image;
        image.loaded = false;
        this.callbacks[src] = (_ref = this.callbacks[src]) != null ? _ref : [];
        if (!!callback) {
          this.callbacks[src].push(callback);
        }
        image.onload = function() {
          image.loaded = true;
          return _this.onLoad(src);
        };
        image.src = src;
        this.images[src] = image;
        return image;
      } else {
        image = this.images[src];
        if (!!callback) {
          if (image.loaded === true) {
            callback(image.width, image.height);
          } else {
            this.callbacks[src].push(callback);
          }
        }
        return image;
      }
    };

    return ImageLoader;

  })();

  gleam.image = new gleam.ImageLoader;

}).call(this);

(function() {
  gleam.Sprite = (function() {
    function Sprite(options) {
      var defaults;
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
      this.image = gleam.image.get(this.src, nv.bind(this, this.onLoad));
    }

    Sprite.prototype.onLoad = function(width, height) {
      if (!this.width) {
        this.width = width;
      }
      if (!this.height) {
        this.height = height;
      }
      return this.loaded = true;
    };

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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gleam.AnimatedSprite = (function(_super) {
    __extends(AnimatedSprite, _super);

    function AnimatedSprite(options) {
      var defaults, key;
      AnimatedSprite.__super__.constructor.call(this, options);
      defaults = {
        frameWidth: 32,
        frameHeight: 32,
        framesPerSecond: 60,
        animations: {
          run: {
            frames: [0, 1, 2]
          },
          jump: {
            frames: [0, 1, 2, "run"],
            framesPerSecond: 60
          }
        },
        playing: false
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
      for (key in this.animations) {
        this.play(key);
        break;
      }
      this.frameTime = 0;
      this.currentMs = 0;
    }

    AnimatedSprite.prototype.onLoad = function(width, height) {
      AnimatedSprite.__super__.onLoad.call(this, width, height);
      if ((this.currentAnimation != null) && (this.currentIndex != null) && this.playing === false) {
        return this.goTo(this.currentAnimation.frames[this.currentIndex]);
      }
    };

    AnimatedSprite.prototype.play = function(animation, override) {
      var _ref;
      if (override == null) {
        override = false;
      }
      if (this.currentAnimationName !== animation || override === true) {
        this.playing = true;
        this.currentAnimationName = animation;
        this.currentAnimation = this.animations[animation];
        this.currentFps = (_ref = this.currentAnimation.framesPerSecond) != null ? _ref : this.framesPerSecond;
        this.currentDelta = 1 / this.currentFps;
        this.currentIndex = 0;
        return this.goTo(this.currentAnimation.frames[0]);
      }
    };

    AnimatedSprite.prototype.stop = function() {
      return this.playing = false;
    };

    AnimatedSprite.prototype.update = function(dt) {
      if (this.playing) {
        this.frameTime += dt;
        if (this.frameTime > this.currentDelta) {
          this.frameTime -= this.currentDelta;
          return this.nextFrame();
        }
      }
    };

    AnimatedSprite.prototype.nextFrame = function() {
      var frame;
      this.currentIndex++;
      if (!(this.currentIndex < this.currentAnimation.frames.length)) {
        this.currentIndex = 0;
      }
      frame = this.currentAnimation.frames[this.currentIndex];
      if (typeof frame === "string") {
        return this.play(frame);
      } else {
        return this.goTo(frame);
      }
    };

    AnimatedSprite.prototype.goTo = function(frame) {
      var framesInARow, x, y;
      framesInARow = this.image.width / this.frameWidth;
      x = (frame % framesInARow) * this.frameWidth;
      y = Math.floor(frame / framesInARow) * this.frameHeight;
      return this.origin = {
        x: x,
        y: y,
        width: this.frameWidth,
        height: this.frameHeight
      };
    };

    AnimatedSprite.prototype.draw = function(context, canvas) {
      return AnimatedSprite.__super__.draw.apply(this, arguments);
    };

    return AnimatedSprite;

  })(gleam.Sprite);

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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gleam.SpriteMap = (function(_super) {
    __extends(SpriteMap, _super);

    function SpriteMap(options) {
      var defaults;
      SpriteMap.__super__.constructor.call(this, options);
      defaults = {
        tileWidth: 10,
        tileHeight: 10,
        width: 640,
        height: 480,
        x: 0,
        y: 0,
        data: [0, 1, 1, 0]
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    SpriteMap.prototype.getTileFromScreenXY = function(x, y) {
      var framesInARow, tile, tileIndex, tileX, tileY;
      x = x - this.x;
      y = y - this.y;
      framesInARow = this.width / this.tileWidth;
      tileX = Math.floor(x / this.tileWidth);
      tileY = Math.floor(y / this.tileHeight);
      tileIndex = tileX + (tileY * framesInARow);
      tile = this.data[tileIndex];
      return tile;
    };

    SpriteMap.prototype.draw = function(context, canvas) {
      var cell, framesInARow, index, tileX, tileY, x, y, _results;
      if (!!this.loaded) {
        x = 0;
        y = 0;
        index = -1;
        _results = [];
        while (y < this.height) {
          while (x < this.width) {
            cell = this.data[++index];
            framesInARow = this.image.width / this.tileWidth;
            tileX = ((cell - 1) % framesInARow) * this.tileWidth;
            tileY = Math.floor(cell / framesInARow) * this.tileHeight;
            context.drawImage(this.image, tileX, tileY, this.tileWidth, this.tileHeight, Math.floor(x + this.x), Math.floor(y + this.y), this.tileWidth, this.tileHeight);
            x += this.tileWidth;
          }
          y += this.tileHeight;
          _results.push(x = 0);
        }
        return _results;
      }
    };

    return SpriteMap;

  })(gleam.Sprite);

}).call(this);

(function() {


}).call(this);

(function() {
  var _ref;

  this.nv = (_ref = this.nv) != null ? _ref : {};

  this.getClass = function(name) {
    var klass, part, _i, _len, _ref1;
    klass = window;
    _ref1 = name.split(".");
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      part = _ref1[_i];
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
    mousedown: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mousedown', callback);
      return origin.addEventListener('touchstart', callback);
    },
    mouseup: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mouseup', callback);
      return origin.addEventListener('touchend', callback);
    },
    mousemove: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mousemove', callback);
      return origin.addEventListener('touchmove', callback);
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
    },
    s4: function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    guid: function() {
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
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
  var __slice = [].slice;

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

    EventDispatcher.prototype.send = function() {
      var data, ev, event, event_listeners, listener, stop, _i, _len, _results;
      event = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      stop = false;
      ev = {
        stopPropagation: function() {
          return stop = true;
        }
      };
      event_listeners = this.event_listeners[event];
      if (event_listeners instanceof Array) {
        _results = [];
        for (_i = 0, _len = event_listeners.length; _i < _len; _i++) {
          listener = event_listeners[_i];
          listener.apply(null, __slice.call(data).concat([ev]));
          if (stop === true) {
            break;
          } else {
            _results.push(void 0);
          }
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
      var event, events, _i, _len;
      while (this.event_async_queue.length) {
        events = this.event_async_queue.slice(0);
        this.event_async_queue = [];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          this.send(event.event, event.data);
        }
      }
      return null;
    };

    return EventDispatcher;

  })();

}).call(this);

(function() {
  nv.ajax = function(url, method, data, callback) {
    var e, onReadyStateChange, version, versions, xhr, _i, _len;
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
        } catch (_error) {
          e = _error;
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Model = (function(_super) {
    __extends(Model, _super);

    function Model(data) {
      Model.__super__.constructor.apply(this, arguments);
      this.setMany(data);
    }

    Model.prototype.setMany = function(object) {
      var key, _results;
      _results = [];
      for (key in object) {
        _results.push(this.set(key, object[key]));
      }
      return _results;
    };

    Model.prototype.get = function(key) {
      return this[key];
    };

    Model.prototype.set = function(key, value) {
      this[key] = value;
      this.send("change", key, value);
      return this.send("change:" + key, value);
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

  })(nv.EventDispatcher);

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
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PathShapeModel = (function(_super) {
    __extends(PathShapeModel, _super);

    function PathShapeModel(options, defaultShape) {
      this.defaultShape = defaultShape != null ? defaultShape : "";
      if (options.shapes != null) {
        this.modelShapes = options.shapes;
      }
      delete options.shapes;
      PathShapeModel.__super__.constructor.call(this, options);
    }

    PathShapeModel.prototype.preparePath = function() {
      return {
        points: []
      };
    };

    PathShapeModel.prototype.shouldDrawShape = function(shapeName) {
      return true;
    };

    PathShapeModel.prototype.points = function(shapeName) {
      var shape;
      if (shapeName == null) {
        shapeName = this.defaultShape;
      }
      shape = this.prepareShape(this.modelShapes[shapeName]);
      return shape.points;
    };

    PathShapeModel.prototype.shapes = function() {
      var shapeName, shapes;
      shapes = [];
      for (shapeName in this.modelShapes) {
        if (this.shouldDrawShape(shapeName)) {
          shapes.push(this.prepareShape(this.modelShapes[shapeName]));
        }
      }
      return shapes;
    };

    PathShapeModel.prototype.translate = function(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    };

    PathShapeModel.prototype.rotate = function(dr) {
      this.rotation += dr;
      return this;
    };

    PathShapeModel.prototype.bounds = function() {
      var x1, x2, y1, y2;
      x1 = x2 = y1 = y2 = null;
      $.each(this.points(), function() {
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
      return new nv.Rect(x1, y1, x2, y2);
    };

    return PathShapeModel;

  })(nv.Model);

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
  nv.Entity = (function() {
    function Entity(scene, pluginClasses, model) {
      var key, klass, _i, _len, _ref;
      this.scene = scene;
      this.model = model;
      this.plugins = [];
      this.listeners = [];
      this.destroyed = false;
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
      if (!this.destroyed) {
        this.destroyed = true;
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
        delete this.plugins;
        return delete this.scene;
      }
    };

    return Entity;

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
        config: config
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
  nv.Plugin = (function() {
    function Plugin(scene, entity) {
      var key;
      this.scene = scene;
      this.entity = entity;
      this.listeners = [];
      this.destroyed = false;
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Plugin.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Plugin.prototype.off = function(name, callback) {
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

    Plugin.prototype.destroy = function() {
      var i, listener;
      if (!this.destroyed) {
        this.destroyed = true;
        i = this.listeners.length;
        while (i--) {
          listener = this.listeners[i];
          this.off(listener.name, listener.callback);
        }
        delete this.scene;
        return delete this.entity;
      }
    };

    return Plugin;

  })();

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
      this.fire("scene:initialized");
    }

    Scene.prototype.get = function(key) {
      var _ref;
      return (_ref = this.options[key]) != null ? _ref : this.rootModel[key];
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

    Scene.prototype.getEntities = function(type) {
      var entities, entity, _i, _len, _ref;
      entities = [];
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if (entity instanceof type) {
          entities.push(entity);
        }
      }
      return entities;
    };

    Scene.prototype.getEntityById = function(id) {
      var entity, _i, _len, _ref;
      _ref = this.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if ((entity.model != null) && (entity.model.id != null) && entity.model.id === id) {
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

  nv.RenderingEngine = (function(_super) {
    __extends(RenderingEngine, _super);

    RenderingEngine.prototype.initializer = function(config, rootModel) {
      var canvas, property, rootConfig, src, value, _i, _len, _ref, _ref1, _results;
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
        if (!(document.contains && document.contains(canvas.source))) {
          document.body.appendChild(canvas.source);
        }
        rootModel.set('canvas', canvas);
        rootModel.set('origin', canvas.source);
        rootModel.set('camera', new gleam.Camera);
      }
      nv.extend(config, {
        canvas: rootModel.canvas,
        camera: rootModel.camera,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height,
        autoRendering: true
      });
      if (rootModel.config.preload) {
        _ref1 = rootModel.config.preload;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          src = _ref1[_i];
          _results.push(gleam.image.get(src));
        }
        return _results;
      }
    };

    function RenderingEngine(scene, config) {
      var _ref;
      RenderingEngine.__super__.constructor.call(this, scene, config);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.drawables = [];
      this.camera = (_ref = config.camera) != null ? _ref : new gleam.Camera;
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
      var bounds, coords, drawable, _i, _len, _ref, _results;
      coords = nv.clone(data);
      coords.x -= this.camera.x;
      coords.y -= this.camera.y;
      _ref = this.drawables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        if (drawable.clickable === true) {
          if (drawable.bounds) {
            bounds = drawable.bounds();
            if (bounds.contains(new nv.Point(coords.x, coords.y))) {
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
      this.cached = new gleam.Canvas();
      this.cached.setSize(width, height);
      this.draw(this.cached.context, this.cached);
      this._draw = this.draw;
      this.entity.model.x = oldX;
      this.entity.model.y = oldY;
      return this.draw = function(context, canvas) {
        return context.drawImage(this.cached.source, this.entity.model.x, this.entity.model.y);
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

    SpriteRenderingPlugin.prototype.bounds = function() {
      return new nv.Rect(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
    };

    SpriteRenderingPlugin.prototype.draw = function(context, canvas) {
      this.sprite.x = this.entity.model.x;
      this.sprite.y = this.entity.model.y;
      return this.sprite.draw(context, canvas);
    };

    return SpriteRenderingPlugin;

  })(nv.RenderingPlugin);

  nv.AnimatedSpriteRenderingPlugin = (function(_super) {
    __extends(AnimatedSpriteRenderingPlugin, _super);

    function AnimatedSpriteRenderingPlugin(scene, entity) {
      AnimatedSpriteRenderingPlugin.__super__.constructor.call(this, scene, entity);
      this.sprite = new gleam.AnimatedSprite(entity.model);
      if (entity.model.currentAnimation) {
        this.sprite.play(entity.model.currentAnimation);
      }
      if (entity.model.playing === false) {
        this.sprite.stop();
      }
    }

    AnimatedSpriteRenderingPlugin.prototype.play = function(animation) {
      return this.sprite.play(animation);
    };

    AnimatedSpriteRenderingPlugin.prototype.stop = function() {
      return this.sprite.stop();
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
      this.sprite = new gleam.SpriteMap(entity.model);
    }

    SpriteMapRenderingPlugin.prototype.getTileFromScreenXY = function(x, y) {
      return this.sprite.getTileFromScreenXY(x, y);
    };

    SpriteMapRenderingPlugin.prototype.draw = function(context, canvas) {
      this.sprite.x = this.entity.model.x;
      this.sprite.y = this.entity.model.y;
      return this.sprite.draw(context, canvas);
    };

    return SpriteMapRenderingPlugin;

  })(nv.RenderingPlugin);

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

    GamepadEngine.prototype.initializer = function(config, rootModel) {
      return nv.extend(config, {
        width: rootModel.canvas.width,
        height: rootModel.canvas.height
      });
    };

    function GamepadEngine(scene, config) {
      var key, origin,
        _this = this;
      GamepadEngine.__super__.constructor.call(this, scene, config);
      this.gamepad = new nv.Gamepad();
      this.options = scene.options;
      this.options.setMany(config);
      this.originalWidth = config.width;
      this.originalHeight = config.height;
      scene.set('gamepad', this.gamepad);
      origin = scene.get('origin');
      if (origin) {
        this.gamepad.setOrigin(origin);
      }
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
      var height, ratio, width;
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      ratio = Math.min(width / this.originalWidth, height / this.originalHeight);
      this.gamepad.setRatio(ratio);
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
      this.origin = document;
      this.ratio = 1;
    }

    Gamepad.prototype.setRatio = function(ratio) {
      return this.ratio = ratio;
    };

    Gamepad.prototype.setOrigin = function(origin) {
      return this.origin = origin;
    };

    Gamepad.prototype.toGameCoords = function(x, y) {
      var rect;
      if (this.origin.getBoundingClientRect) {
        rect = this.origin.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
      }
      x /= this.ratio;
      y /= this.ratio;
      return {
        x: x,
        y: y
      };
    };

    Gamepad.prototype.trackMouse = function() {
      var _this = this;
      this.state.mouse = {
        x: -1,
        y: -1,
        down: false
      };
      nv.mousedown(document, function(event) {
        _this.state.mouse = _this.toGameCoords(event.clientX, event.clientY);
        _this.state.mouse.down = true;
        return _this.send("mousedown", _this.state.mouse);
      });
      nv.mouseup(document, function(event) {
        _this.state.mouse = _this.toGameCoords(event.clientX, event.clientY);
        _this.state.mouse.down = false;
        return _this.send("mouseup", _this.state.mouse);
      });
      return nv.mousemove(document, function(event) {
        return _this.state.mouse = _this.toGameCoords(event.clientX, event.clientY);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.UIEngine = (function(_super) {
    __extends(UIEngine, _super);

    UIEngine.prototype.initializer = function(config, rootModel) {
      return nv.extend(config, {
        canvas: rootModel.canvas,
        width: rootModel.canvas.width,
        height: rootModel.canvas.height
      });
    };

    function UIEngine(scene, config) {
      UIEngine.__super__.constructor.call(this, scene, config);
      this.canvas = config.canvas;
      this.context = this.canvas.context;
      this.elements = [];
    }

    UIEngine.prototype.prepare = function() {
      return this.scene.fire("engine:timing:register:after", nv.bind(this, this.draw));
    };

    UIEngine.prototype["event(engine:ui:create)"] = function(element) {
      return this.elements.push(element);
    };

    UIEngine.prototype["event(engine:ui:destroy)"] = function(element) {
      return this.elements.splice(this.elements.indexOf(element), 1);
    };

    UIEngine.prototype["event(engine:gamepad:mouse:down)"] = function(data, event) {
      var element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element.hidden !== true) {
          if ((element.bounds != null) && element.bounds().contains(new nv.Point(data.x, data.y))) {
            this.scene.fire("engine:ui:mouse:down", data);
            _results.push(event.stopPropagation());
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    UIEngine.prototype["event(engine:gamepad:mouse:up)"] = function(data, event) {
      var element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element.hidden !== true) {
          if ((element.bounds != null) && element.bounds().contains(new nv.Point(data.x, data.y))) {
            _results.push(this.scene.fire("engine:ui:mouse:up", data));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    UIEngine.prototype.update = function(dt) {
      var element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (!!element.update) {
          _results.push(element.update(dt));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    UIEngine.prototype.draw = function(dt) {
      var element, _i, _len, _ref;
      this.context.save();
      _ref = this.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.draw(this.context, this.canvas);
      }
      return this.context.restore();
    };

    UIEngine.prototype.drawBounds = function() {
      var bounds, element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element.bounds) {
          bounds = element.bounds();
          this.context.beginPath();
          this.context.rect(bounds.x, bounds.y, bounds.x2 - bounds.x, bounds.y2 - bounds.y);
          this.context.setLineWidth(1);
          this.context.setStrokeStyle('red');
          _results.push(this.context.stroke());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    UIEngine.prototype.destroy = function() {
      delete this.elements;
      return UIEngine.__super__.destroy.apply(this, arguments);
    };

    return UIEngine;

  })(nv.Engine);

  nv.UIPlugin = (function(_super) {
    __extends(UIPlugin, _super);

    function UIPlugin(scene, entity) {
      UIPlugin.__super__.constructor.call(this, scene, entity);
      this.hidden = entity.model.hidden;
      this.scene.fire("engine:ui:create", this);
    }

    UIPlugin.prototype.hide = function() {
      return this.hidden = true;
    };

    UIPlugin.prototype.show = function() {
      return this.hidden = false;
    };

    UIPlugin.prototype.draw = function(context, canvas) {};

    UIPlugin.prototype.destroy = function() {
      this.scene.fire("engine:ui:destroy", this);
      return UIPlugin.__super__.destroy.apply(this, arguments);
    };

    return UIPlugin;

  })(nv.Plugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.TextUIPlugin = (function(_super) {
    __extends(TextUIPlugin, _super);

    function TextUIPlugin(scene, entity) {
      var binding, key, match, _i, _len, _ref,
        _this = this;
      TextUIPlugin.__super__.constructor.call(this, scene, entity);
      this.id = this.entity.model.id;
      this.text = new gleam.Text(this.entity.model);
      this.dirty = true;
      this.values = {};
      if (this.entity.model.bind != null) {
        binding = this.scene.getEntity(this.entity.model.bind);
        _ref = this.entity.model.text.match(/\{{[\s\S]+?}}/g);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          match = _ref[_i];
          key = match.slice(2, -2);
          this.values[key] = binding.model[key];
          this.dirty = true;
          binding.model.on("change:" + key, function(value) {
            _this.values[key] = value;
            return _this.dirty = true;
          });
        }
      }
    }

    TextUIPlugin.prototype.updateText = function() {
      var key, text, value, _ref;
      if (this.dirty) {
        text = this.entity.model.text;
        _ref = this.values;
        for (key in _ref) {
          value = _ref[key];
          if (typeof value === "function") {
            value = value(key);
          }
          text = text.replace("{{" + key + "}}", value);
        }
        this.text.text = text;
        return this.dirty = false;
      }
    };

    TextUIPlugin.prototype.draw = function(context, canvas) {
      if (this.hidden !== true) {
        this.updateText();
        this.text.x = this.entity.model.x;
        this.text.y = this.entity.model.y;
        return this.text.draw(context, canvas);
      }
    };

    return TextUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.ButtonUIPlugin = (function(_super) {
    __extends(ButtonUIPlugin, _super);

    function ButtonUIPlugin(scene, entity) {
      var _ref, _ref1, _ref2, _ref3;
      ButtonUIPlugin.__super__.constructor.call(this, scene, entity);
      this.id = this.entity.model.id;
      this.drawable = new gleam.Square({
        color: (_ref = this.entity.model.fillColor) != null ? _ref : "#FFF",
        width: (_ref1 = this.entity.model.width) != null ? _ref1 : 150,
        height: (_ref2 = this.entity.model.height) != null ? _ref2 : 50,
        x: 10,
        y: 10
      });
      this.text = new gleam.Text({
        color: (_ref3 = this.entity.model.textColor) != null ? _ref3 : "#000",
        text: this.entity.model.text,
        textAlign: 'center',
        textBaseline: 'middle',
        x: 10,
        y: 10
      });
      this.down = false;
    }

    ButtonUIPlugin.prototype["event(engine:ui:mouse:down)"] = function(data) {
      if (this.hidden !== true) {
        if (this.bounds().contains(new nv.Point(data.x, data.y))) {
          return this.down = true;
        }
      }
    };

    ButtonUIPlugin.prototype["event(engine:ui:mouse:up)"] = function(data) {
      if (this.down === true) {
        if (this.bounds().contains(new nv.Point(data.x, data.y))) {
          this.down = false;
          return this.scene.fire("engine:ui:clicked", this);
        }
      }
    };

    ButtonUIPlugin.prototype.bounds = function() {
      return new nv.Rect(this.drawable.x, this.drawable.y, this.drawable.x + this.drawable.width, this.drawable.y + this.drawable.height);
    };

    ButtonUIPlugin.prototype.draw = function(context, canvas) {
      if (this.hidden === true) {
        return;
      }
      this.drawable.x = this.entity.model.x;
      this.drawable.y = this.entity.model.y;
      this.text.x = this.drawable.x + (this.drawable.width / 2);
      this.text.y = this.drawable.y + (this.drawable.height / 2);
      this.drawable.draw(context, canvas);
      return this.text.draw(context, canvas);
    };

    return ButtonUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PanelUIPlugin = (function(_super) {
    __extends(PanelUIPlugin, _super);

    function PanelUIPlugin(scene, entity) {
      PanelUIPlugin.__super__.constructor.call(this, scene, entity);
      this.background = new gleam.Square({
        color: entity.model.color,
        width: entity.model.width,
        height: entity.model.height,
        x: entity.model.x,
        y: entity.model.y
      });
    }

    PanelUIPlugin.prototype.draw = function(context, canvas) {
      this.background.x = this.entity.model.x;
      this.background.y = this.entity.model.y;
      return this.background.draw(context, canvas);
    };

    return PanelUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SliderUIPlugin = (function(_super) {
    __extends(SliderUIPlugin, _super);

    function SliderUIPlugin(scene, entity) {
      var _ref;
      SliderUIPlugin.__super__.constructor.call(this, scene, entity);
      this.gamepad = scene.get('gamepad');
      entity.model.value = (_ref = entity.model.value) != null ? _ref : 1;
      this.value = entity.model.value;
      this.max = 100;
      this.upText = new nv.TextUIPlugin(scene, {
        model: {
          text: entity.model.rightText,
          font: entity.model.font,
          textBaseline: 'bottom',
          x: entity.model.x + 115,
          y: entity.model.y + 22
        }
      });
      this.downText = new nv.TextUIPlugin(scene, {
        model: {
          text: entity.model.leftText,
          font: entity.model.font,
          textBaseline: 'bottom',
          x: entity.model.x - 60,
          y: entity.model.y + 22
        }
      });
      this.box = new gleam.Square({
        color: "#FFF",
        width: 10,
        height: 30,
        x: entity.model.x + 1,
        y: entity.model.y
      });
      this.minBox = new gleam.Square({
        color: "#555",
        width: 1,
        height: 30,
        x: entity.model.x,
        y: entity.model.y
      });
      this.maxBox = new gleam.Square({
        color: "#555",
        width: 1,
        height: 30,
        x: entity.model.x + this.max + this.box.width,
        y: entity.model.y
      });
      this.line = new gleam.Square({
        color: '#555',
        width: this.max + this.box.width,
        height: 1,
        x: entity.model.x,
        y: entity.model.y + 15
      });
      this.entity.model.on('change:value', nv.bind(this, this.onValueChange));
      this.onValueChange(this.value);
    }

    SliderUIPlugin.prototype.onValueChange = function(value) {
      return this.scene.fire("engine:ui:slider:change", this.entity);
    };

    SliderUIPlugin.prototype.bounds = function() {
      return new nv.Rect(this.minBox.x, this.minBox.x, this.maxBox.x, this.maxBox.y + this.box.height);
    };

    SliderUIPlugin.prototype.getBoxBounds = function() {
      return new nv.Rect(this.box.x, this.box.y, this.box.x + this.box.width, this.box.y + this.box.height);
    };

    SliderUIPlugin.prototype["event(engine:ui:mouse:down)"] = function(data) {
      if (this.getBoxBounds().contains(new nv.Point(data.x, data.y))) {
        return this.dragging = true;
      }
    };

    SliderUIPlugin.prototype["event(engine:ui:mouse:up)"] = function(data) {
      if (this.dragging === true) {
        this.dragging = false;
        return this.entity.model.set('value', this.value);
      }
    };

    SliderUIPlugin.prototype["event(engine:gamepad:mouse:up)"] = function(data) {
      if (this.dragging === true) {
        this.dragging = false;
        return this.entity.model.set('value', this.value);
      }
    };

    SliderUIPlugin.prototype.getValue = function() {
      return this.value / this.max;
    };

    SliderUIPlugin.prototype.clamp = function() {
      this.value = Math.min(this.value, this.max);
      return this.value = Math.max(this.value, 0);
    };

    SliderUIPlugin.prototype.draw = function(context, canvas) {
      var mouseX;
      if (this.dragging === true) {
        mouseX = this.gamepad.getState().mouse.x;
        this.value = mouseX - this.minBox.x;
        this.clamp();
      }
      this.box.x = this.entity.model.x + ((1 * this.max) * this.getValue());
      this.minBox.draw(context, canvas);
      this.maxBox.draw(context, canvas);
      this.line.draw(context, canvas);
      return this.box.draw(context, canvas);
    };

    return SliderUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SpriteUIPlugin = (function(_super) {
    __extends(SpriteUIPlugin, _super);

    function SpriteUIPlugin(scene, entity) {
      SpriteUIPlugin.__super__.constructor.call(this, scene, entity);
      this.sprite = new gleam.Sprite(entity.model);
    }

    SpriteUIPlugin.prototype.bounds = function() {
      return new nv.Rect(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
    };

    SpriteUIPlugin.prototype.draw = function(context, canvas) {
      var _this = this;
      if (this.hidden !== true) {
        this.sprite.x = this.entity.model.x;
        this.sprite.y = this.entity.model.y;
        if (this.entity.model.rotate != null) {
          return context.rotateAround(this.sprite.x, this.sprite.y, this.entity.model.rotate, function() {
            return _this.sprite.draw(context, canvas);
          });
        } else {
          return this.sprite.draw(context, canvas);
        }
      }
    };

    return SpriteUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {


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

  this.plugins = {};

  this.realms = {};

  this.Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      var start,
        _this = this;
      Application.__super__.constructor.call(this, realms.gameConfig);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.AssignedLaborRenderer = (function(_super) {
    __extends(AssignedLaborRenderer, _super);

    function AssignedLaborRenderer(scene, entity) {
      AssignedLaborRenderer.__super__.constructor.call(this, scene, entity);
      this.farmer = new Image();
      this.farmer.src = "/assets/farmer-16.png";
      this.miner = new Image();
      this.miner.src = "/assets/miner-16.png";
      this.yields = [];
      this.yields.push(new Image());
      this.yields[0].src = "/assets/yield1-16.png";
      this.yields.push(new Image());
      this.yields[1].src = "/assets/yield2-16.png";
      this.yields.push(new Image());
      this.yields[2].src = "/assets/yield3-16.png";
    }

    AssignedLaborRenderer.prototype.draw = function(context, canvas) {
      var idx, type;
      type = this.entity.model.value;
      if (type === "field" || type === "dirt") {
        return;
      }
      if (type === "grain") {
        context.drawImage(this.farmer, this.entity.model.x, this.entity.model.y + 1);
      } else {
        context.drawImage(this.miner, this.entity.model.x, this.entity.model.y + 1);
      }
      idx = Math.floor(((this.entity.model["yield"] - 0.7) * 10) / 5);
      context.drawImage(this.yields[idx], this.entity.model.x + 15, this.entity.model.y + 15);
      context.save();
      context.setFillStyle("#f1f1f1");
      context.setStrokeStyle("black");
      context.setFont("10px 'Lucida Console'");
      context.strokeText(this.entity.model.workers, this.entity.model.x + 18, this.entity.model.y + 11);
      return context.restore();
    };

    return AssignedLaborRenderer;

  })(nv.RenderingPlugin);

}).call(this);

(function() {


}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Country = (function(_super) {
    __extends(Country, _super);

    function Country(scene, plugins, model) {
      var entityConfigs, landConfig, position, rootModel, scenario, _i, _len, _ref;
      Country.__super__.constructor.call(this, scene, plugins, model);
      rootModel = this.scene.rootModel;
      scenario = rootModel.get('scenario');
      entityConfigs = rootModel.config.entities;
      this.model.set('resourceManager', this.scene.createEntity(entityConfigs.resourceManager, scenario.resources));
      this.model.resourceManager.setOwner(this);
      this.model.plots = [];
      _ref = this.model.plotData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        position = _ref[_i];
        landConfig = nv.extend({}, entityConfigs.land);
        landConfig.model.options.x = position.x;
        landConfig.model.options.y = position.y;
        this.model.plots.push(this.scene.createEntity(landConfig));
      }
    }

    Country.prototype["event(game:land:change)"] = function(land) {
      if (this.model.plots.indexOf(land) !== -1) {
        return this.resources().updateProjections();
      }
    };

    Country.prototype.resources = function() {
      return this.model.resourceManager;
    };

    Country.prototype.plots = function() {
      return this.model.plots;
    };

    Country.prototype.numberOfPlots = function(type) {
      var count, plot, _i, _len, _ref;
      count = 0;
      _ref = this.model.plots;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plot = _ref[_i];
        if (plot.model.value === type) {
          count += 1;
        }
      }
      return count;
    };

    Country.prototype.setPlotData = function(type, workers, harvest) {
      var plot, _i, _len, _ref, _results;
      _ref = this.model.plots;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plot = _ref[_i];
        if (plot.model.value === type) {
          plot.model.set('workers', workers);
          _results.push(plot.model.set('yield', harvest));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Country;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Land = (function(_super) {
    __extends(Land, _super);

    function Land(scene, plugins, model) {
      Land.__super__.constructor.call(this, scene, plugins, model);
      this.model.set('value', 'field');
      this.renderer = this.getPlugin(nv.AnimatedSpriteRenderingPlugin);
    }

    Land.prototype.changeType = function(type) {
      switch (type) {
        case 'grain':
          this.model.set('value', 'grain');
          break;
        case 'field':
          this.model.set('value', 'field');
          break;
        case 'gold':
          this.model.set('value', 'gold');
          break;
        case 'unused':
          this.model.set('value', 'dirt');
      }
      this.model.set('workers', 0);
      this.renderer.play(this.model.get('value'));
      this.renderer.stop();
      return this.scene.fire("game:land:change", this);
    };

    Land.prototype.update = function(dt) {};

    return Land;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.LandSelector = (function(_super) {
    __extends(LandSelector, _super);

    function LandSelector(scene, plugins, model) {
      var button, config;
      LandSelector.__super__.constructor.call(this, scene, plugins, model);
      this.selecting = false;
      this.land = null;
      this.playerManager = this.scene.getEntity(entities.PlayerManager);
      this.buttons = [];
      this.buttonConfig = scene.get('config').entities.landSelector;
      for (button in this.buttonConfig) {
        config = this.buttonConfig[button];
        config.model.options.hidden = true;
        button = this.scene.createEntity(config);
        button.model.y += this.model.y;
        button.model.x += this.model.x;
        this.buttons.push(button);
      }
    }

    LandSelector.prototype.show = function() {
      var button, _i, _len, _ref, _results;
      _ref = this.buttons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        _results.push(button.getPlugin(nv.ButtonUIPlugin).show());
      }
      return _results;
    };

    LandSelector.prototype.hide = function() {
      var button, _i, _len, _ref, _results;
      _ref = this.buttons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        _results.push(button.getPlugin(nv.ButtonUIPlugin).hide());
      }
      return _results;
    };

    LandSelector.prototype["event(engine:ui:clicked)"] = function(element) {
      var type;
      if (this.selecting === true) {
        if (this.buttons.indexOf(element.entity) !== -1) {
          type = element.entity.model.id;
          if (type === 'select-grain') {
            this.land.changeType('grain');
          } else if (type === 'select-field') {
            this.land.changeType('field');
          } else if (type === 'select-none') {
            this.land.changeType('unused');
          } else if (type === 'select-gold') {
            this.land.changeType('gold');
          }
          this.selecting = false;
          return this.hide();
        }
      }
    };

    LandSelector.prototype["event(engine:rendering:clicked:Land)"] = function(entity) {
      if (this.selecting === false && this.playerManager.clientPlayer().plots().indexOf(entity) !== -1) {
        this.land = entity;
        this.selecting = true;
        return this.show();
      }
    };

    return LandSelector;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Map = (function(_super) {
    __extends(Map, _super);

    function Map(scene, plugins, model) {
      var cache,
        _this = this;
      model.data = scene.get('scenario').map;
      Map.__super__.constructor.call(this, scene, plugins, model);
      this.down = false;
      this.origin = {
        x: 0,
        y: 0
      };
      this.gamepad = scene.get('gamepad');
      this.canvas = scene.get('canvas');
      this.camera = scene.get('camera');
      this.camera.x = -160;
      this.camera.y = -230;
      this.playerData = new nv.SpriteMapRenderingPlugin(scene, {
        model: {
          x: model.x,
          y: model.y,
          width: model.width,
          height: model.height,
          tileWidth: model.tileWidth,
          tileHeight: model.tileHeight,
          data: model.playerData
        }
      });
      cache = function() {
        return _this.getPlugin(nv.SpriteMapRenderingPlugin).cache(_this.model.width, _this.model.height);
      };
      setTimeout(cache, 2000);
    }

    Map.prototype.update = function(dt) {
      Map.__super__.update.call(this, dt);
      if (this.down === true) {
        this.camera.x -= (this.origin.x - this.gamepad.state.mouse.x) / this.model.speed;
        this.camera.y -= (this.origin.y - this.gamepad.state.mouse.y) / this.model.speed;
        this.origin.x = this.gamepad.state.mouse.x;
        this.origin.y = this.gamepad.state.mouse.y;
        if (this.camera.x > 0) {
          this.camera.x = 0;
        } else if (this.camera.x < -(this.model.width - this.canvas.width)) {
          this.camera.x = -(this.model.width - this.canvas.width);
        }
        if (this.camera.y > 0) {
          return this.camera.y = 0;
        } else if (this.camera.y < -(this.model.height - this.canvas.height)) {
          return this.camera.y = -(this.model.height - this.canvas.height);
        }
      }
    };

    Map.prototype["event(engine:gamepad:mouse:down)"] = function(data) {
      this.down = true;
      return this.origin = {
        x: data.x,
        y: data.y
      };
    };

    Map.prototype["event(engine:gamepad:mouse:up)"] = function(data) {
      var tile;
      this.down = false;
      tile = this.playerData.getTileFromScreenXY(data.x - this.camera.x, data.y - this.camera.y);
      if (tile !== 0) {
        return this.scene.fire("game:clicked:county", tile);
      }
    };

    return Map;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.MultiplayerController = (function(_super) {
    __extends(MultiplayerController, _super);

    function MultiplayerController(scene, plugins, model) {
      var _this = this;
      MultiplayerController.__super__.constructor.call(this, scene, plugins, model);
      this.guid = nv.guid();
      this.playerManager = scene.getEntity(entities.PlayerManager);
      this.hash = location.hash;
      if (this.hash === '') {
        this.hash = this.generateHash();
      } else {
        this.hash = this.hash.replace('#', '');
      }
      location.hash = this.hash;
      if (this.hash === 'local') {
        this.scene.fire("game:mp:player", 1);
      }
      if (typeof Firebase !== "undefined" && Firebase !== null) {
        this.ref = new Firebase("" + this.model.url + "/game/" + this.hash);
        this.ref.child('players').once('value', function(snapshot) {
          if (snapshot.val() === 0 || snapshot.val() === 2) {
            _this.scene.fire("game:mp:player", 1);
            return _this.ref.child('players').set(1);
          } else if (snapshot.val() === 1) {
            _this.scene.fire("game:mp:player", 2);
            return _this.ref.child('players').set(2);
          } else {
            _this.ref.child('turn').set(1);
            return _this.ref.child('players').set(0);
          }
        });
        this.ref.child('attacks').on('child_added', function(snapshot) {
          var data;
          data = snapshot.val();
          if (data.guid !== _this.guid) {
            _this.scene.fire("game:army:attacked", data.amount);
            return snapshot.ref().remove();
          }
        });
        this.ref.child('turn').on('value', function(snapshot) {
          console.log("FIREBASE ON VALUE", snapshot.val());
          if (_this.playerManager.model.turn !== snapshot.val()) {
            return _this.scene.fire("game:turn:next", snapshot.val());
          }
        });
      }
    }

    MultiplayerController.prototype["event(game:turn:next)"] = function(newTurn) {
      if (this.playerManager.model.turn === newTurn) {
        console.log("FIREBASE SET VALUE", newTurn);
        return this.ref.child('turn').set(newTurn);
      }
    };

    MultiplayerController.prototype["event(game:army:send)"] = function(amount) {
      return this.ref.child('attacks').push({
        guid: this.guid,
        amount: amount
      });
    };

    MultiplayerController.prototype.generateHash = function() {
      var i, possible, text, _i;
      text = "";
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (i = _i = 0; _i <= 5; i = ++_i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    return MultiplayerController;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Player = (function(_super) {
    __extends(Player, _super);

    function Player(scene, plugins, model) {
      Player.__super__.constructor.call(this, scene, plugins, model);
      this.gamepad = scene.get('gamepad');
      this.gameWidth = scene.get('canvas').getSize().width;
      this.model.countries = [];
      this.attacking = false;
      this.active = false;
    }

    Player.prototype.addCountry = function(data) {
      var entityConfigs;
      entityConfigs = this.scene.rootModel.config.entities;
      return this.model.countries.push(this.scene.createEntity(entityConfigs.country, data));
    };

    Player.prototype.resources = function(country) {
      return this.model.countries[0].resources();
    };

    Player.prototype.plots = function() {
      return this.model.countries[0].plots();
    };

    Player.prototype.update = function(dt) {
      var mouseX;
      mouseX = this.gamepad.getState().mouse.x - (this.model.width / 2);
      return this.model.x = mouseX;
    };

    Player.prototype.beginTurn = function() {
      this.active = true;
      this.resources().activate(true);
      this.resources().prepareProjections();
      return this.resources().updateProjections();
    };

    Player.prototype.endTurn = function() {
      this.active = false;
      this.resources().commitProjections();
      return this.resources().activate(false);
    };

    return Player;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.PlayerManager = (function(_super) {
    __extends(PlayerManager, _super);

    function PlayerManager(scene, plugins, model) {
      PlayerManager.__super__.constructor.call(this, scene, plugins, model);
      this.model.set('turn', 1);
      this.model.playerNumber = 1;
      this.attacking = false;
    }

    PlayerManager.prototype["event(scene:initialized)"] = function() {
      return this.attackText = this.scene.getEntityById('attack-text').getPlugin(nv.TextUIPlugin);
    };

    PlayerManager.prototype["event(game:army:created)"] = function(value) {
      return this.clientPlayer().resources().createArmy(value);
    };

    PlayerManager.prototype["event(game:clicked:county)"] = function(county) {
      if (this.model.turn === this.model.playerNumber) {
        if (this.attacking === true) {
          if (county === 1027 && this.model.playerNumber === 1) {
            this.attacking = false;
            this.attackText.hide();
            this.scene.fire("game:army:send", Math.min(this.clientPlayer().resources().current().get('soldiers'), 50));
          }
          if (county === 1026 && this.model.playerNumber === 2) {
            this.attacking = false;
            this.attackText.hide();
            return this.scene.fire("game:army:send", Math.min(this.clientPlayer().resources().current().get('soldiers'), 50));
          }
        }
      }
    };

    PlayerManager.prototype["event(game:mp:player)"] = function(number) {
      this.model.playerNumber = number;
      return this.createPlayers();
    };

    PlayerManager.prototype["event(game:army:attacked)"] = function(value) {
      return this.clientPlayer().resources().onAttacked(value);
    };

    PlayerManager.prototype.createPlayers = function() {
      var entityConfigs, name, player, playerConfig, playerNumber, rootModel, scenario, _i, _j, _len, _ref, _ref1;
      rootModel = this.scene.rootModel;
      scenario = rootModel.get('scenario');
      entityConfigs = rootModel.config.entities;
      this.model.players = [];
      for (playerNumber = _i = 1, _ref = scenario.players; 1 <= _ref ? _i <= _ref : _i >= _ref; playerNumber = 1 <= _ref ? ++_i : --_i) {
        playerConfig = nv.extend({}, entityConfigs.player);
        playerConfig.model.options.number = playerNumber;
        player = this.scene.createEntity(playerConfig);
        this.model.players.push(player);
        if (playerNumber === this.model.playerNumber) {
          this.model.set('clientPlayer', player);
          switch (playerNumber) {
            case 1:
              this.model.set('playerColor', 'Red');
              break;
            case 2:
              this.model.set('playerColor', 'Blue');
          }
        }
      }
      for (name in scenario.countries) {
        _ref1 = this.model.players;
        for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
          player = _ref1[_j];
          if (player.model.number === scenario.countries[name].owner) {
            player.addCountry({
              country: name,
              resources: scenario.resources,
              plotData: scenario.countries[name].plots,
              ratio: 0.5
            });
          }
        }
      }
      this.model.set('currentPlayer', this.model.players[this.model.turn - 1]);
      this.scene.fire("game:player:assigned");
      return this.currentPlayer().beginTurn();
    };

    PlayerManager.prototype.clientPlayer = function() {
      return this.model.clientPlayer;
    };

    PlayerManager.prototype.currentPlayer = function() {
      return this.model.currentPlayer;
    };

    PlayerManager.prototype.nextPlayersTurn = function() {
      var turn;
      turn = this.model.turn + 1;
      if (turn > this.model.players.length) {
        turn = 1;
      }
      this.currentPlayer().endTurn();
      this.model.set('turn', turn);
      this.model.set('currentPlayer', this.model.players[turn - 1]);
      this.currentPlayer().beginTurn();
      return this.scene.fire("game:turn:end", turn);
    };

    PlayerManager.prototype["event(engine:ui:slider:change)"] = function(entity) {
      var value;
      if (this.currentPlayer()) {
        value = Math.floor(entity.model.value) / 100;
        return this.currentPlayer().resources().setLaborDistribution(value);
      }
    };

    PlayerManager.prototype["event(engine:ui:clicked)"] = function(element) {
      var turn;
      turn = this.model.turn + 1;
      if (turn > this.model.players.length) {
        turn = 1;
      }
      switch (element.id) {
        case "next-turn-button":
          return this.scene.fire("game:turn:next", turn);
        case "next-turn-other-button":
          return this.scene.fire("game:turn:next", turn);
        case "create-army-button":
          if (turn === this.model.playerNumber) {
            return this.scene.fire("game:army:created", 10);
          }
          break;
        case "attack-button":
          if (turn === this.model.playerNumber) {
            this.attacking = true;
            return this.attackText.show();
          }
      }
    };

    PlayerManager.prototype["event(game:turn:next)"] = function() {
      return this.nextPlayersTurn();
    };

    return PlayerManager;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.ResourceManager = (function(_super) {
    __extends(ResourceManager, _super);

    function ResourceManager(scene, plugins, model) {
      ResourceManager.__super__.constructor.call(this, scene, plugins, model);
      this.projections = new nv.Model({});
      this.prepareProjections();
      this.active = false;
    }

    ResourceManager.prototype.calculateResources = function(lands) {};

    ResourceManager.prototype.createArmy = function(value) {
      var gold, soldiers;
      gold = this.model.get('gold');
      soldiers = Math.min(gold, value);
      console.log('soldiers', gold, value, soldiers);
      if (!(soldiers > 0)) {
        return;
      }
      this.model.set('gold', gold - soldiers);
      this.projections.set('soldiersInTraining', this.projections.get('soldiersInTraining') + soldiers);
      return this.updateProjections();
    };

    ResourceManager.prototype["event(game:army:send)"] = function(value) {
      if (this.active !== true) {
        return this.model.set('soldiers', this.model.get('soldiers') - value);
      }
    };

    ResourceManager.prototype.onAttacked = function(value) {
      var soldiers;
      soldiers = this.model.get('soldiers') - value;
      this.model.set('soldiers', Math.max(soldiers, 0));
      if (soldiers < 0) {
        return this.model.set('peasants', this.model.get('peasants') - Math.abs(soldiers));
      }
    };

    ResourceManager.prototype.setLaborDistribution = function(ratio) {
      console.log("labor ratio", ratio);
      this.projections.set('ratio', ratio);
      return this.updateProjections();
    };

    ResourceManager.prototype.setOwner = function(owner) {
      return this.owner = owner;
    };

    ResourceManager.prototype.current = function() {
      return this.model;
    };

    ResourceManager.prototype.projected = function() {
      return this.projections;
    };

    ResourceManager.prototype.activate = function(state) {
      return this.active = state;
    };

    ResourceManager.prototype.prepareProjections = function() {
      return this.projections.setMany({
        peasants: 0,
        soldiers: 0,
        soldiersInTraining: 0,
        food: 0,
        gold: 0,
        ratio: this.model.ratio
      });
    };

    ResourceManager.prototype.commitProjections = function() {
      var peasants;
      peasants = this.model.get('peasants');
      this.model.setMany({
        peasants: peasants + this.projections.peasants,
        soldiers: this.model.get('soldiers') + this.projections.soldiers,
        gold: this.model.get('gold') + this.projections.gold,
        food: Math.max(this.model.get('food') + this.projections.food, 0),
        ratio: this.projections.ratio
      });
      this.grainYield = null;
      return this.goldYield = null;
    };

    ResourceManager.prototype.updateProjections = function() {
      this.projectFarming();
      this.projectMining();
      this.projectPopulation();
      return console.log("after update", this.projections.peasants, this.projections.soldiers);
    };

    ResourceManager.prototype.projectFarming = function() {
      var farmersPerPlot, food, grainPlots, i, laborRatio, qty, _i, _ref;
      food = 0;
      grainPlots = this.owner.numberOfPlots('grain');
      if (grainPlots > 0) {
        this.grainYield = (_ref = this.grainYield) != null ? _ref : Math.random() * 1.5 + 0.7;
        laborRatio = 1 - this.projections.get('ratio');
        console.log("grain yield:", this.grainYield);
        console.log("ratio: ", laborRatio);
        farmersPerPlot = Math.floor(this.model.get('peasants') * laborRatio / grainPlots);
        farmersPerPlot = Math.min(farmersPerPlot, 50);
        this.owner.setPlotData('grain', farmersPerPlot, this.grainYield);
        console.log("farmers per plot:", farmersPerPlot);
        for (i = _i = 1; 1 <= grainPlots ? _i <= grainPlots : _i >= grainPlots; i = 1 <= grainPlots ? ++_i : --_i) {
          qty = this.grainYield * farmersPerPlot;
          food += qty;
        }
      }
      food = Math.min(food, 300);
      console.log("food to grow:", food);
      return this.projections.set('food', Math.round(food) - this.model.get('peasants') - this.model.get('soldiers'));
    };

    ResourceManager.prototype.projectMining = function() {
      var gold, goldPlots, i, laborRatio, minersPerPlot, _i, _ref;
      gold = 0;
      goldPlots = this.owner.numberOfPlots('gold');
      if (goldPlots > 0) {
        this.goldYield = (_ref = this.goldYield) != null ? _ref : Math.random() * 1.5 + 0.7;
        laborRatio = this.projections.get('ratio');
        console.log("gold yield:", this.goldYield);
        minersPerPlot = Math.floor(this.model.get('peasants') * laborRatio / goldPlots);
        minersPerPlot = Math.min(minersPerPlot, 50);
        this.owner.setPlotData('gold', minersPerPlot, this.goldYield);
        console.log("miners per plot:", minersPerPlot);
        for (i = _i = 1; 1 <= goldPlots ? _i <= goldPlots : _i >= goldPlots; i = 1 <= goldPlots ? ++_i : --_i) {
          gold += this.goldYield * 0.1 * minersPerPlot;
        }
      }
      gold = Math.min(gold, 30);
      return this.projections.set('gold', Math.round(gold));
    };

    ResourceManager.prototype.projectPopulation = function() {
      var currentPopulation, deaths, diff, foodAvailable, growthTarget, peasantDeaths, peasants, projectedPopulation, soldierDeaths, soldiers, soldiersInTraining;
      peasants = this.model.get('peasants');
      soldiers = this.model.get('soldiers');
      soldiersInTraining = this.projections.get('soldiersInTraining');
      currentPopulation = peasants + soldiers;
      console.log("cur pop:", peasants, soldiers, currentPopulation, soldiersInTraining);
      growthTarget = Math.round(currentPopulation * 0.05);
      projectedPopulation = currentPopulation + growthTarget;
      foodAvailable = this.model.get('food');
      console.log("growth:", growthTarget, projectedPopulation, foodAvailable);
      this.projections.set('soldiers', soldiersInTraining);
      if (projectedPopulation < foodAvailable) {
        this.projections.set('peasants', growthTarget - soldiersInTraining);
      } else if (currentPopulation <= foodAvailable) {
        this.projections.set('peasants', foodAvailable - currentPopulation - soldiersInTraining);
      } else {
        deaths = Math.min(Math.round(currentPopulation * .1), currentPopulation - foodAvailable);
        peasantDeaths = Math.round(deaths / 2);
        soldierDeaths = deaths - peasantDeaths;
        if (soldiers === 0) {
          peasantDeaths += soldierDeaths;
          soldierDeaths = 0;
        } else if (soldierDeaths > soldiers) {
          diff = soldierDeaths - soldiers;
          soldierDeaths = soldiers;
          peasantDeaths += diff;
        }
        this.projections.set('soldiers', soldiersInTraining - soldierDeaths);
        this.projections.set('peasants', -1 * peasantDeaths);
      }
      return console.log("pop / soldiers:", this.projections.get('peasants'), this.projections.get('soldiers'));
    };

    return ResourceManager;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Main = (function(_super) {
    __extends(Main, _super);

    function Main(name, game, rootModel) {
      rootModel.scenario = realms.gameConfig.scenarios.pvp.two;
      Main.__super__.constructor.call(this, name, game, rootModel);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  plugins.PlayerViewModel = (function(_super) {
    __extends(PlayerViewModel, _super);

    function PlayerViewModel(scene, entity) {
      var _this = this;
      PlayerViewModel.__super__.constructor.call(this, scene, entity);
      this.endTurnButton = this.scene.getEntityById("next-turn-button");
      this.endTurnButton = this.endTurnButton.getPlugin(nv.ButtonUIPlugin);
      this.endOtherTurnButton = this.scene.getEntityById("next-turn-other-button");
      this.endOtherTurnButton = this.endOtherTurnButton.getPlugin(nv.ButtonUIPlugin);
      this.entity.model.on('change:turn', function(value) {
        switch (value) {
          case 1:
            return _this.entity.model.set('turnColor', 'Red');
          case 2:
            return _this.entity.model.set('turnColor', 'Blue');
        }
      });
    }

    PlayerViewModel.prototype["event(game:player:assigned)"] = function() {
      var clientPlayer, projections, resources,
        _this = this;
      clientPlayer = this.entity.model.get('clientPlayer');
      resources = clientPlayer.resources().model;
      projections = clientPlayer.resources().projections;
      resources.on('change', function(key, value) {
        return _this.entity.model.set(key, value);
      });
      projections.on('change', function(key, value) {
        return _this.entity.model.set("p_" + key, value);
      });
      this.entity.model.setMany({
        peasants: resources.peasants,
        food: resources.food,
        gold: resources.gold,
        soldiers: resources.soldiers,
        p_peasants: projections.peasants,
        p_soldiers: projections.soldiers,
        p_food: projections.food,
        p_gold: projections.gold
      });
      return this.updateTurnButton();
    };

    PlayerViewModel.prototype["event(game:turn:end)"] = function() {
      return this.updateTurnButton();
    };

    PlayerViewModel.prototype.updateTurnButton = function() {
      var playerNumber, turn;
      turn = this.entity.model.get('turn');
      playerNumber = this.entity.model.get('playerNumber');
      if (turn === playerNumber) {
        this.endTurnButton.show();
        return this.endOtherTurnButton.hide();
      } else {
        this.endTurnButton.hide();
        return this.endOtherTurnButton.show();
      }
    };

    return PlayerViewModel;

  })(nv.Plugin);

}).call(this);

(function() {
  realms.entities = {
    map: {
      entity: entities.Map,
      plugins: [nv.SpriteMapRenderingPlugin],
      model: {
        options: {
          src: '/assets/terrain_atlas.png',
          speed: 1.5,
          x: 0,
          y: 0,
          width: 960,
          height: 960,
          tileWidth: 32,
          tileHeight: 32,
          playerData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1026, 1026, 1026, 1026, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1027, 1027, 1027, 1027, 1027, 1027, 1027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      }
    },
    player: {
      entity: entities.Player,
      plugins: [],
      model: {
        options: {
          name: "Player",
          countries: []
        }
      }
    },
    country: {
      entity: entities.Country,
      plugins: [],
      model: {
        options: {
          name: "Nowhere"
        }
      }
    },
    resourceManager: {
      entity: entities.ResourceManager,
      plugins: [],
      model: {
        options: {
          population: 0,
          food: 0,
          gold: 0
        }
      }
    },
    land: {
      entity: entities.Land,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.AssignedLaborRenderer],
      model: {
        options: {
          src: '/assets/terrain_atlas.png',
          frameWidth: 32,
          frameHeight: 32,
          animations: {
            dirt: {
              frames: [680]
            },
            field: {
              frames: [805]
            },
            grain: {
              frames: [832 + 97]
            },
            gold: {
              frames: [179]
            }
          },
          currentAnimation: 'dirt',
          playing: false,
          width: 32,
          height: 32,
          x: 576,
          y: 320,
          clickable: true,
          workers: 0,
          maxWorkers: 50,
          value: 'unused'
        }
      }
    },
    landTwo: {
      entity: entities.Land,
      plugins: [nv.AnimatedSpriteRenderingPlugin],
      model: {
        options: {
          src: '/assets/terrain_atlas.png',
          frameWidth: 32,
          frameHeight: 32,
          animations: {
            field: {
              frames: [805]
            },
            grain: {
              frames: [833]
            },
            gold: {
              frames: [24]
            }
          },
          currentAnimation: 'field',
          playing: false,
          width: 32,
          height: 32,
          x: 576,
          y: 352,
          clickable: true
        }
      }
    },
    landSelector: {
      unused: {
        entity: nv.Entity,
        plugins: [nv.ButtonUIPlugin],
        model: {
          options: {
            id: "select-none",
            text: "Unused",
            x: 330,
            y: 10,
            width: 150,
            height: 50
          }
        }
      },
      grain: {
        entity: nv.Entity,
        plugins: [nv.ButtonUIPlugin],
        model: {
          options: {
            id: "select-grain",
            text: "Grain",
            x: 10,
            y: 10,
            width: 150,
            height: 50
          }
        }
      },
      gold: {
        entity: nv.Entity,
        plugins: [nv.ButtonUIPlugin],
        model: {
          options: {
            id: "select-gold",
            text: "Gold",
            x: 170,
            y: 10,
            width: 150,
            height: 50
          }
        }
      }
    }
  };

}).call(this);

(function() {
  realms.levels = {
    x: 10
  };

}).call(this);

(function() {
  realms.scenarios = {
    pvp: {
      description: "Player v. Player",
      two: {
        description: "2-players",
        players: 2,
        map: [457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 453, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 297, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 328, 329, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 455, 456, 457, 457, 457, 296, 424, 424, 424, 424, 424, 424, 297, 452, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 550, 552, 184, 184, 182, 183, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 424, 424, 424, 424, 424, 424, 425, 614, 616, 184, 650, 650, 184, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 119, 182, 119, 184, 182, 183, 184, 182, 801, 182, 650, 184, 375, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 119, 119, 184, 183, 184, 184, 801, 184, 182, 183, 184, 184, 184, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 297, 457, 457, 328, 361, 374, 184, 650, 184, 184, 184, 184, 184, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 328, 329, 457, 457, 457, 393, 184, 182, 650, 184, 184, 184, 389, 389, 389, 389, 389, 389, 390, 457, 324, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 182, 184, 184, 184, 389, 389, 389, 389, 650, 650, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 182, 184, 184, 389, 389, 389, 389, 389, 389, 650, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 184, 184, 389, 389, 389, 389, 389, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 328, 360, 360, 360, 421, 294, 389, 650, 650, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 457, 455, 457, 457, 388, 389, 389, 389, 389, 389, 293, 421, 422, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 455, 456, 457, 457, 388, 389, 389, 389, 389, 389, 390, 457, 457, 324, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 420, 421, 421, 421, 421, 421, 422, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 455, 456, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457],
        resources: {
          food: 100,
          peasants: 50,
          soldiers: 0,
          gold: 0,
          ratio: 0.5
        },
        countries: {
          darkland: {
            owner: 1,
            plots: [new nv.Point(576, 320), new nv.Point(608, 320), new nv.Point(576, 352), new nv.Point(352, 416), new nv.Point(352, 448)]
          },
          sandyland: {
            owner: 2,
            plots: [new nv.Point(576, 480), new nv.Point(608, 480), new nv.Point(608, 512), new nv.Point(480, 576), new nv.Point(512, 576)]
          }
        }
      },
      three: {
        description: "3-players",
        players: 3,
        map: [],
        countries: {
          darkland: {
            plots: []
          },
          sandyland: {
            plots: []
          },
          greenland: {
            plots: []
          }
        }
      },
      four: {
        description: "4-players"
      }
    },
    pvc: {
      description: "Player v. Computer",
      one: {
        description: "1-player"
      }
    }
  };

}).call(this);

(function() {
  var uiFont, version;

  uiFont = 'bold 16px sans-serif';

  version = 'v0.0.3';

  realms.gameConfig = {
    canvas: {
      id: '#game-canvas',
      width: 640,
      height: 480,
      responsive: true,
      css: {
        background: '000',
        margin: '0 auto 0 auto',
        display: 'block'
      }
    },
    preload: ['assets/terrain_atlas.png'],
    engines: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine, nv.UIEngine],
    scenes: {
      main: {
        config: {
          gamepad: {
            keys: {
              shoot: nv.Key.Spacebar
            },
            trackMouse: true
          }
        },
        engines: [nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine, nv.UIEngine],
        entities: {
          map: {
            include: "map"
          },
          panel: {
            entity: nv.Entity,
            plugins: [nv.PanelUIPlugin],
            model: {
              options: {
                color: 'rgba(0, 0, 0, 0.5)',
                width: 265,
                height: 480,
                x: 0,
                y: 0
              }
            }
          },
          endTurnButton: {
            entity: nv.Entity,
            plugins: [nv.ButtonUIPlugin],
            model: {
              options: {
                text: "End Turn",
                id: "next-turn-button",
                x: 480,
                y: 420
              }
            }
          },
          endOtherTurnButton: {
            entity: nv.Entity,
            plugins: [nv.ButtonUIPlugin],
            model: {
              options: {
                text: "End Other Turn",
                id: "next-turn-other-button",
                x: 480,
                y: 360
              }
            }
          },
          createArmy: {
            entity: nv.Entity,
            plugins: [nv.ButtonUIPlugin],
            model: {
              options: {
                text: "Create Army",
                id: "create-army-button",
                x: 20,
                y: 410
              }
            }
          },
          attackButton: {
            entity: nv.Entity,
            plugins: [nv.ButtonUIPlugin],
            model: {
              options: {
                text: "Attack",
                id: "attack-button",
                x: 20,
                y: 350
              }
            }
          },
          playerManager: {
            entity: entities.PlayerManager,
            plugins: [plugins.PlayerViewModel],
            model: {
              options: {
                version: version,
                playerColor: '...',
                turn: 1,
                players: []
              }
            }
          },
          landSelectionScreen: {
            entity: entities.LandSelector,
            plugins: [],
            model: {
              options: {
                x: 70,
                y: 200
              }
            }
          },
          laborDistributionText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: 'bold 20px sans-serif',
                textBaseline: 'bottom',
                text: 'Labor Distribution',
                x: 15,
                y: 295
              }
            }
          },
          sliderControl: {
            entity: nv.Entity,
            plugins: [nv.SliderUIPlugin],
            model: {
              options: {
                leftText: "Farmers",
                rightText: "Miners",
                font: uiFont,
                x: 75,
                y: 300,
                value: 50
              }
            }
          },
          currentText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: 'bold 20px sans-serif',
                textBaseline: 'bottom',
                text: 'Current',
                x: 15,
                y: 36
              }
            }
          },
          population: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: "Peasants: {{peasants}}",
                bind: entities.PlayerManager,
                x: 15,
                y: 55
              }
            }
          },
          foodText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Food: {{food}}',
                bind: entities.PlayerManager,
                x: 15,
                y: 95
              }
            }
          },
          goldText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Gold: {{gold}}',
                bind: entities.PlayerManager,
                x: 15,
                y: 115
              }
            }
          },
          armyText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Soldiers: {{soldiers}}',
                bind: entities.PlayerManager,
                x: 15,
                y: 75
              }
            }
          },
          projectedText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: 'bold 20px sans-serif',
                textBaseline: 'bottom',
                text: 'Next Turn',
                x: 15,
                y: 170
              }
            }
          },
          populationProjected: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: "Peasants: {{p_peasants}}",
                bind: entities.PlayerManager,
                x: 15,
                y: 190
              }
            }
          },
          populationArmy: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: "Soldiers: {{p_soldiers}}",
                bind: entities.PlayerManager,
                x: 15,
                y: 210
              }
            }
          },
          foodProjected: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Food: {{p_food}}',
                bind: entities.PlayerManager,
                x: 15,
                y: 230
              }
            }
          },
          goldProjected: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Gold {{p_gold}}',
                bind: entities.PlayerManager,
                x: 15,
                y: 250
              }
            }
          },
          attackText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                id: 'attack-text',
                color: '#CCC',
                font: uiFont,
                textBaseline: 'bottom',
                text: 'Send Troops Where?',
                x: 250,
                y: 250,
                hidden: true
              }
            }
          },
          turn: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: 'bold 20px sans-serif',
                textBaseline: 'bottom',
                text: "Turn: {{turnColor}}",
                bind: entities.PlayerManager,
                x: 480,
                y: 36
              }
            }
          },
          playerColorText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#CCC',
                font: 'bold 20px sans-serif',
                textBaseline: 'bottom',
                text: "{{playerColor}}",
                bind: entities.PlayerManager,
                x: 350,
                y: 36
              }
            }
          },
          multiplayerController: {
            entity: entities.MultiplayerController,
            plugins: [],
            model: {
              options: {
                url: 'https://novus-realms.firebaseio.com'
              }
            }
          },
          versionText: {
            entity: nv.Entity,
            plugins: [nv.TextUIPlugin],
            model: {
              options: {
                color: '#999',
                font: '12px console',
                textBaseline: 'bottom',
                text: "{{version}}",
                bind: entities.PlayerManager,
                x: 3,
                y: 480
              }
            }
          }
        }
      }
    },
    levels: realms.levels,
    entities: realms.entities,
    scenarios: realms.scenarios
  };

}).call(this);

(function() {
  nv.ready(function() {
    return this.app = new Application;
  });

}).call(this);
