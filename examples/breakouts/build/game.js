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

    Square.prototype.destroy = function() {
      return delete this.color;
    };

    return Square;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  gleam.Text = (function() {
    function Text(options) {
      this.measureText = __bind(this.measureText, this);
      var defaults;
      defaults = {
        color: '#CCC',
        x: 10,
        y: 10,
        font: 'bold 20px sans-serif',
        textBaseline: 'bottom',
        textAlign: 'start',
        text: 'Lorem Ipsum',
        alpha: 1
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Text.prototype.measureText = function(context, canvas) {
      var width;
      context.save();
      context.setFont(this.font);
      width = context.measureText(this.text).width;
      context.restore();
      return width;
    };

    Text.prototype.draw = function(context, canvas) {
      var line, y, _i, _len, _ref, _results;
      context.source.globalAlpha = this.alpha;
      context.setFillStyle(this.color);
      context.setFont(this.font);
      context.setTextBaseline(this.textBaseline);
      context.setTextAlign(this.textAlign);
      if (typeof this.text === "string") {
        return context.fillText(this.text, this.x, this.y);
      } else {
        y = this.y;
        _ref = this.text;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          context.fillText(line, this.x, y);
          _results.push(y += this.lineHeight);
        }
        return _results;
      }
    };

    Text.prototype.destroy = function() {
      delete this.font;
      delete this.textBaseline;
      delete this.textAlign;
      delete this.text;
      return delete this.color;
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
        origin: null,
        alpha: 1.0
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
      this.halfWidth = this.width / 2;
      this.halfHeight = this.height / 2;
      return this.loaded = true;
    };

    Sprite.prototype.draw = function(context, canvas) {
      if (!!this.loaded) {
        context.save();
        context.source.globalAlpha = this.alpha;
        if (!this.origin) {
          context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
          context.drawImage(this.image, this.origin.x, this.origin.y, this.origin.width, this.origin.height, this.x, this.y, this.width, this.height);
        }
        return context.restore();
      }
    };

    Sprite.prototype.destroy = function() {
      return delete this.image;
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
  gleam.Circle = (function() {
    function Circle(options) {
      var defaults;
      defaults = {
        color: '#CCC',
        width: 10,
        height: 10,
        x: 10,
        y: 10
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Circle.prototype.draw = function(context, canvas) {
      context.beginPath();
      context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      return context.closePath();
    };

    Circle.prototype.destroy = function() {
      return delete this.color;
    };

    return Circle;

  })();

}).call(this);

(function() {
  gleam.Rectangle = (function() {
    function Rectangle(options) {
      var defaults;
      defaults = {
        width: 10,
        height: 10,
        cornerRadius: 0,
        x: 0,
        y: 0,
        alpha: 1
      };
      if (!!options) {
        gleam.extend(defaults, options);
      }
      gleam.extend(this, defaults);
    }

    Rectangle.prototype.draw = function(context, canvas) {
      context.source.globalAlpha = this.alpha;
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
      if (this.fillStyle) {
        context.fill();
      }
      return context.closePath();
    };

    Rectangle.prototype.destroy = function() {
      return delete this.fillStyle;
    };

    return Rectangle;

  })();

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
        framesInARow = this.image.width / this.tileWidth;
        _results = [];
        while (y < this.height) {
          while (x < this.width) {
            cell = this.data[++index];
            tileX = ((cell - 1) % framesInARow) * this.tileWidth;
            tileY = Math.floor((cell - 1) / framesInARow) * this.tileHeight;
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  gleam.IsoSpriteMap = (function(_super) {
    __extends(IsoSpriteMap, _super);

    function IsoSpriteMap(options) {
      var defaults;
      IsoSpriteMap.__super__.constructor.call(this, options);
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

    IsoSpriteMap.prototype.getTileFromScreenXY = function(x, y) {
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

    IsoSpriteMap.prototype.draw = function(context, canvas) {
      var cell, framesInARow, halfHeight, halfWidth, index, tileX, tileY, x, xPos, y, yPos, _results;
      if (!!this.loaded) {
        x = 0;
        y = 0;
        index = -1;
        framesInARow = this.image.width / this.tileWidth;
        halfWidth = this.tileWidth / 2;
        halfHeight = this.tileHeight / 2;
        _results = [];
        while (y < this.height / this.tileHeight) {
          while (x < this.width / this.tileWidth) {
            cell = this.data[++index];
            tileX = ((cell - 1) % framesInARow) * this.tileWidth;
            tileY = Math.floor((cell - 1) / framesInARow) * this.tileHeight;
            xPos = (this.width / 2) + (halfWidth * x) - (halfWidth * y);
            yPos = (halfHeight * y) + (halfHeight * x);
            context.drawImage(this.image, tileX, tileY, this.tileWidth, this.tileHeight, Math.floor(xPos + this.x), Math.floor(yPos + this.y), this.tileWidth, this.tileHeight);
            x++;
          }
          y++;
          _results.push(x = 0);
        }
        return _results;
      }
    };

    return IsoSpriteMap;

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
    keydown: function(origin, callback) {
      origin.addEventListener('keydown', callback, false);
      return callback;
    },
    keypress: function(origin, callback) {
      origin.addEventListener('keypress', callback, false);
      return callback;
    },
    keyup: function(origin, callback) {
      origin.addEventListener('keyup', callback, false);
      return callback;
    },
    mousedown: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mousedown', callback);
      return callback;
    },
    mouseup: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mouseup', callback);
      return callback;
    },
    mousemove: function(origin, callback) {
      if (typeof origin === "function") {
        callback = origin;
        origin = document;
      }
      origin.addEventListener('mousemove', callback);
      return callback;
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
  nv.SceneDispatcher = (function() {
    function SceneDispatcher(scene) {
      var key;
      this.scene = scene;
      this.listeners = [];
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    SceneDispatcher.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    SceneDispatcher.prototype.off = function(name, callback) {
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

    SceneDispatcher.prototype.destroy = function() {
      var i, listener;
      i = this.listeners.length;
      while (i--) {
        listener = this.listeners[i];
        this.off(listener.name, listener.callback);
      }
      return delete this.listeners;
    };

    return SceneDispatcher;

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
  nv.Component = (function() {
    function Component(scene, model, options) {
      var key;
      this.scene = scene;
      this.model = model;
      this.options = options != null ? options : {};
      this.listeners = [];
      this.destroyed = false;
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
    }

    Component.prototype.on = function(name, callback) {
      this.scene.on(name, callback);
      return this.listeners.push({
        name: name,
        callback: callback
      });
    };

    Component.prototype.off = function(name, callback) {
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

    Component.prototype.destroy = function() {
      var i, listener;
      if (!this.destroyed) {
        this.destroyed = true;
        i = this.listeners.length;
        while (i--) {
          listener = this.listeners[i];
          this.off(listener.name, listener.callback);
        }
        delete this.scene;
        delete this.model;
        return delete this.options;
      }
    };

    return Component;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Engine = (function(_super) {
    __extends(Engine, _super);

    function Engine(scene, config) {
      var _ref;
      this.config = config;
      Engine.__super__.constructor.call(this, scene);
      this.config = (_ref = this.config) != null ? _ref : {};
    }

    Engine.prototype.prepare = function() {};

    Engine.prototype.update = function(dt) {};

    Engine.prototype.destroy = function() {
      Engine.__super__.destroy.apply(this, arguments);
      delete this.scene;
      return delete this.config;
    };

    return Engine;

  })(nv.SceneDispatcher);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Entity = (function(_super) {
    __extends(Entity, _super);

    function Entity(scene, options) {
      if (options == null) {
        options = {};
      }
      Entity.__super__.constructor.call(this, scene);
      this.components = [];
      this.destroyed = false;
      this.model = new nv.Model(options);
      this.scene.fire("entity:create:" + this.constructor.name);
    }

    Entity.prototype.addComponent = function(klass, options) {
      var component;
      if (options == null) {
        options = {};
      }
      if (this.getComponentByType(klass) != null) {
        return nv.log("nv.Entity.addComponent", "Cannot add two components of the same type: ", klass);
      } else {
        component = new klass(this.scene, this.model, options);
        this.components.push(component);
        this.scene.fire("entity:component:new", component);
        return component;
      }
    };

    Entity.prototype.removeComponent = function(klass) {
      var component, _i, _len, _ref, _results;
      _ref = this.components;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if (component instanceof klass) {
          component.destroy();
          this.scene.fire("entity:component:destroy", component);
          _results.push(this.components.splice(this.components.indexOf(component), 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Entity.prototype.getComponentByType = function(klass) {
      var component, _i, _len, _ref;
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if (component instanceof klass) {
          return component;
        }
      }
      return null;
    };

    Entity.prototype.update = function(dt) {};

    Entity.prototype.destroy = function() {
      var component, _i, _len, _ref;
      if (!this.destroyed) {
        this.destroyed = true;
        Entity.__super__.destroy.apply(this, arguments);
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          this.removeComponent(component.constructor);
        }
        delete this.model;
        delete this.components;
        return delete this.scene;
      }
    };

    return Entity;

  })(nv.SceneDispatcher);

}).call(this);

(function() {
  var __slice = [].slice;

  nv.Factory = (function() {
    function Factory() {
      this.objects = {};
      this.classes = {};
    }

    Factory.prototype["class"] = function(name, klass) {
      this.register(name, function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(klass, args, function(){});
      });
      return this.classes[name] = klass;
    };

    Factory.prototype.getClass = function(name) {
      return this.classes[name];
    };

    Factory.prototype.register = function(name, factory) {
      return this.objects[name] = factory;
    };

    Factory.prototype.deregister = function(name) {
      return delete this.objects[name];
    };

    Factory.prototype.getFactory = function(name) {
      return this.objects[name];
    };

    Factory.prototype.create = function() {
      var args, name, _ref;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.objects)[name].apply(_ref, args);
    };

    Factory.prototype.destroy = function() {
      return delete this.objects;
    };

    return Factory;

  })();

  nv.factory = new nv.Factory();

}).call(this);

(function() {
  var __slice = [].slice;

  nv.Game = (function() {
    function Game(config) {
      var scene, _i, _len, _ref;
      this.config = config;
      this.scenes = [];
      this.factory = new nv.Factory();
      if (this.config.scenes != null) {
        _ref = this.config.scenes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          scene = _ref[_i];
          this.factory["class"](scene.name, scene);
        }
      }
    }

    Game.prototype.openScene = function() {
      var args, name, _ref,
        _this = this;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.scenes.push((_ref = this.factory).create.apply(_ref, [name, this].concat(__slice.call(args))));
      return this.scenes[this.scenes.length - 1].on("scene:close", function() {
        return _this.closeScene(name);
      });
    };

    Game.prototype.getScenes = function() {
      return this.scenes;
    };

    Game.prototype.closeScene = function(name) {
      var index, scene, _i, _len, _ref, _results;
      if (name == null) {
        if (this.scenes.length > 0) {
          name = this.scenes[this.scenes.length - 1].constructor.name;
        } else {
          nv.log("Unable to find scene to close: ", name);
          return false;
        }
      }
      _ref = this.scenes;
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        scene = _ref[index];
        if (scene instanceof this.factory.getClass(name)) {
          scene.destroy();
          _results.push(this.scenes.splice(index, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Game.prototype.destroy = function() {
      var scene, _i, _len, _ref;
      _ref = this.scenes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        scene = _ref[_i];
        this.closeScene();
      }
      this.factory.destroy();
      delete this.scenes;
      delete this.factory;
      return delete this.config;
    };

    return Game;

  })();

}).call(this);

(function() {
  nv.Map = (function() {
    function Map(data) {
      this.data = data;
    }

    Map.prototype.parse = function() {
      var key, layer, object, objects, value, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      objects = [];
      console.log(this.data);
      _ref = this.data.layers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        _ref1 = layer.objects;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          object = _ref1[_j];
          objects.push({
            name: object.type,
            options: {
              x: object.x,
              y: object.y
            }
          });
          _ref2 = object.properties;
          for (key in _ref2) {
            value = _ref2[key];
            objects[objects.length - 1].options[key] = value;
          }
        }
      }
      return objects;
    };

    return Map;

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
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.Scene = (function(_super) {
    __extends(Scene, _super);

    function Scene(game, options) {
      var key,
        _this = this;
      this.game = game;
      this.options = options != null ? options : {};
      Scene.__super__.constructor.apply(this, arguments);
      this.engines = [];
      this.entities = [];
      this.factory = nv.factory;
      this.deletedEntities = [];
      this.on("entity:remove", function(entity) {
        return _this.removeEntity(entity);
      });
      this.on("entity:add", function(entity) {
        return _this.addEntity(entity);
      });
      this.on("entity:create", function(options) {
        return _this.createEntity(options);
      });
      this.on("scene:destroy", function(options) {
        return _this.destruct();
      });
      for (key in this) {
        if (/event\(.*\)/.test(key)) {
          this.on(key.slice(6, -1), nv.bind(this, this[key]));
        }
      }
      this.fire("scene:initialized");
    }

    Scene.prototype.get = function(key) {
      return this.options[key];
    };

    Scene.prototype.set = function(key, value) {
      return this.options[key] = value;
    };

    Scene.prototype.loadEngine = function(engine, options) {
      if (options == null) {
        options = {};
      }
      return this.engines.push(new engine(this, options));
    };

    Scene.prototype.loadMap = function(mapData) {
      var entities, entity, map, _i, _len, _results;
      map = new nv.Map(mapData);
      entities = map.parse();
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        _results.push(this.createEntity(entity.name, entity.options));
      }
      return _results;
    };

    Scene.prototype.createEntity = function(name, options) {
      if (options == null) {
        options = {};
      }
      return this.addEntity(this.factory.create(name, this, options));
    };

    Scene.prototype.addEntity = function(entity) {
      this.entities.push(entity);
      return entity;
    };

    Scene.prototype.getEntitiesByType = function(type) {
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
      } else {
        return nv.log("Could not find entity", entity);
      }
    };

    Scene.prototype.onRemoveEntity = function(entity) {
      return this.deletedEntities.push(entity);
    };

    Scene.prototype.getEngineByType = function(type) {
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
      var engine, entity, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.engines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        engine = _ref[_i];
        engine.update(dt);
      }
      Scene.__super__.update.call(this, dt);
      if (this.entities) {
        _ref1 = this.entities;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          entity = _ref1[_j];
          _results.push(entity.update(dt));
        }
        return _results;
      }
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
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return nv.log.apply(nv, args);
    };

    return DebugEngine;

  })(nv.Engine);

}).call(this);

(function() {
  var Logger,
    __slice = [].slice;

  Logger = (function() {
    function Logger() {}

    Logger.prototype.log = function() {
      var _ref;
      if (nv.config.debug === true) {
        return (_ref = console.log).call.apply(_ref, [console].concat(__slice.call(arguments)));
      }
    };

    return Logger;

  })();

  nv.logger = new Logger;

  nv.log = nv.logger.log;

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

    PhysicsEngine.prototype["event(entity:component:new)"] = function(component) {
      if (component instanceof nv.PhysicsComponent) {
        return this.trackObject(component);
      }
    };

    PhysicsEngine.prototype["event(entity:component:destroy)"] = function(component) {
      if (component instanceof nv.PhysicsComponent) {
        return this.removeObject(component);
      }
    };

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
      var object, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        object = array[_i];
        _results.push(this.trackObject(object));
      }
      return _results;
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
              actor: obja.model,
              target: objp.model
            });
            this.scene.fire("engine:collision:" + obja.options.name + ":" + objp.options.name, {
              actor: obja.model,
              target: objp.model,
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
      if (Math.abs(iVec.x) < Math.abs(iVec.y)) {
        iVec.y = 0;
      } else {
        iVec.x = 0;
      }
      return iVec;
    };

    return PhysicsEngine;

  })(nv.Engine);

  nv.PhysicsComponent = (function(_super) {
    __extends(PhysicsComponent, _super);

    function PhysicsComponent(scene, model, options) {
      PhysicsComponent.__super__.constructor.call(this, scene, model, options);
    }

    return PhysicsComponent;

  })(nv.Component);

  __objectId = 0;

  nv.PathPhysicsComponent = (function(_super) {
    __extends(PathPhysicsComponent, _super);

    function PathPhysicsComponent(scene, model, options) {
      this.id = __objectId++;
      this.type = model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      PathPhysicsComponent.__super__.constructor.call(this, scene, model, options);
      this.updateBounds();
    }

    PathPhysicsComponent.prototype.bounds = function() {
      this.updateBounds();
      return this.boundingRect;
    };

    PathPhysicsComponent.prototype.updateBounds = function() {
      var point, x1, x2, y1, y2, _i, _len, _ref;
      x1 = x2 = y1 = y2 = null;
      _ref = this.model.points();
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

    return PathPhysicsComponent;

  })(nv.PhysicsComponent);

  nv.RectanglePhysicsComponent = (function(_super) {
    __extends(RectanglePhysicsComponent, _super);

    function RectanglePhysicsComponent(scene, model, options) {
      this.id = __objectId++;
      this.type = model.physicsObjectType;
      this.boundingRect = new nv.Rect(0, 0, 0, 0);
      RectanglePhysicsComponent.__super__.constructor.call(this, scene, model, options);
    }

    RectanglePhysicsComponent.prototype.bounds = function() {
      return new nv.Rect(this.model.x, this.model.y, this.model.x + this.model.width, this.model.y + this.model.height);
    };

    return RectanglePhysicsComponent;

  })(nv.PhysicsComponent);

  nv.GravityPhysicsComponent = (function(_super) {
    __extends(GravityPhysicsComponent, _super);

    function GravityPhysicsComponent(scene, model, options) {
      this.gravity = 0.003;
      GravityPhysicsComponent.__super__.constructor.call(this, scene, model, options);
    }

    GravityPhysicsComponent.prototype.update = function(dt) {
      var model, tx, ty;
      model = this.model;
      if (!model.thrusters) {
        tx = this.gravity * (model.thrustVector.x < 0 ? 1 : -1);
        ty = this.gravity * (model.thrustVector.y < 0 ? 1 : -1);
        return model.thrustVector.translate(tx, ty);
      }
    };

    return GravityPhysicsComponent;

  })(nv.PhysicsComponent);

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
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.RenderingEngine = (function(_super) {
    __extends(RenderingEngine, _super);

    RenderingEngine.prototype.initialized = false;

    RenderingEngine.prototype.canvas = null;

    RenderingEngine.prototype.camera = null;

    RenderingEngine.prototype.init = function(config) {
      var canvas, property, src, value, _i, _len, _ref, _ref1, _results;
      if (config.id) {
        canvas = new gleam.Canvas(config.id);
        canvas.setSize(config.width, config.height);
        canvas.setMaxSize(config.maxWidth, config.maxHeight);
        _ref = config.css;
        for (property in _ref) {
          value = _ref[property];
          canvas.setStyle(property, value);
        }
        canvas.setFullscreen(config.fullscreen);
        canvas.setResponsive(config.responsive);
        if (!(document.contains && document.contains(canvas.source))) {
          document.body.appendChild(canvas.source);
        }
        nv.RenderingEngine.prototype.canvas = canvas;
        nv.RenderingEngine.prototype.camera = new gleam.Camera;
      }
      if (config.preload) {
        _ref1 = config.preload;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          src = _ref1[_i];
          _results.push(gleam.image.get(src));
        }
        return _results;
      }
    };

    function RenderingEngine(scene, config) {
      RenderingEngine.__super__.constructor.call(this, scene, config);
      if (nv.RenderingEngine.prototype.initialized === false) {
        this.init(config);
        nv.RenderingEngine.prototype.initialized = true;
      }
      this.canvas = nv.RenderingEngine.prototype.canvas;
      this.context = this.canvas.context;
      this.drawables = [];
      this.camera = nv.RenderingEngine.prototype.camera;
      this.gamepadEngine = scene.getEngineByType(nv.GamepadEngine);
      this.calculateScreenDimensions();
      this.resizeListener = nv.bind(this, this.calculateScreenDimensions);
      window.addEventListener('resize', this.resizeListener);
      this.mouseDownListener = nv.mousedown(document, nv.bind(this, this.onMouseDown));
      this.mouseUpListener = nv.mouseup(document, nv.bind(this, this.onMouseUp));
      this.keyDownListener = nv.keydown(document, nv.bind(this, this.onKeyDown));
      this.keyUpListener = nv.keyup(document, nv.bind(this, this.onKeyUp));
      if (config.mouseMove === true) {
        this.mouseMoveListener = nv.mousemove(document, nv.bind(this, this.onMouseMove));
      }
      this.scene.fire("engine:timing:register:after", nv.bind(this, this.draw));
    }

    RenderingEngine.prototype["event(entity:component:new)"] = function(component) {
      if (component instanceof nv.RenderingComponent) {
        return this.drawables.push(component);
      }
    };

    RenderingEngine.prototype["event(entity:component:destroy)"] = function(component) {
      if (component instanceof nv.RenderingComponent) {
        return this.drawables.splice(this.drawables.indexOf(component), 1);
      }
    };

    RenderingEngine.prototype.onKeyDown = function(event) {
      if (event.target.type === 'text') {
        return;
      }
      return this.gamepadEngine.onKeyDown(event.keyCode, event);
    };

    RenderingEngine.prototype.onKeyUp = function(event) {
      if (event.target.type === 'text') {
        return;
      }
      return this.gamepadEngine.onKeyUp(event.keyCode, event);
    };

    RenderingEngine.prototype.onMouseDown = function(event) {
      var coords;
      coords = this.toGameCoords(event.pageX, event.pageY);
      return this.gamepadEngine.onMouseDown(event.button, coords.x, coords.y, event);
    };

    RenderingEngine.prototype.onMouseUp = function(event) {
      var coords;
      coords = this.toGameCoords(event.pageX, event.pageY);
      return this.gamepadEngine.onMouseUp(event.button, coords.x, coords.y, event);
    };

    RenderingEngine.prototype.onMouseMove = function(event) {
      var coords;
      coords = this.toGameCoords(event.pageX, event.pageY);
      return this.gamepadEngine.onMouseMove(coords.x, coords.y, event);
    };

    RenderingEngine.prototype.calculateScreenDimensions = function() {
      var height, ratio, width;
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      ratio = Math.min(width / this.canvas.width, height / this.canvas.height);
      this.ratio = ratio;
      return this.bounds = this.canvas.source.getBoundingClientRect();
    };

    RenderingEngine.prototype.toGameCoords = function(x, y) {
      x -= this.bounds.left;
      y -= this.bounds.top;
      x /= this.ratio;
      y /= this.ratio;
      return {
        x: x,
        y: y
      };
    };

    RenderingEngine.prototype["event(engine:rendering:draw)"] = function() {
      return this.render(0);
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
      return this.render(dt);
    };

    RenderingEngine.prototype.render = function(dt) {
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

    RenderingEngine.prototype.onMouseDown_old = function(data) {
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
      window.removeEventListener('resize', this.resizeListener);
      document.removeEventListener('mousedown', this.mouseDownListener);
      document.removeEventListener('mouseup', this.mouseUpListener);
      document.removeEventListener('keydown', this.keyDownListener);
      document.removeEventListener('keyup', this.keyUpListener);
      if (this.mouseMoveListener != null) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
      }
      return RenderingEngine.__super__.destroy.apply(this, arguments);
    };

    return RenderingEngine;

  })(nv.Engine);

  nv.RenderingComponent = (function(_super) {
    __extends(RenderingComponent, _super);

    function RenderingComponent(scene, model, options) {
      RenderingComponent.__super__.constructor.call(this, scene, model, options);
    }

    RenderingComponent.prototype.cache = function(width, height) {
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

    return RenderingComponent;

  })(nv.Component);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.GleamRenderingComponent = (function(_super) {
    __extends(GleamRenderingComponent, _super);

    function GleamRenderingComponent(scene, model, options) {
      var _this = this;
      GleamRenderingComponent.__super__.constructor.call(this, scene, model, options);
      this.options.drawable.x = this.model.get('x');
      this.options.drawable.y = this.model.get('y');
      this.model.on('change:x', function(value) {
        return _this.options.drawable.x = value;
      });
      this.model.on('change:y', function(value) {
        return _this.options.drawable.y = value;
      });
    }

    GleamRenderingComponent.prototype.draw = function(context, canvas) {
      return this.options.drawable.draw(context, canvas);
    };

    return GleamRenderingComponent;

  })(nv.RenderingComponent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.TextRenderingComponent = (function(_super) {
    __extends(TextRenderingComponent, _super);

    function TextRenderingComponent(scene, model, options) {
      var _this = this;
      TextRenderingComponent.__super__.constructor.call(this, scene, model, options);
      this.text = new gleam.Text(this.options);
      this.text.x = this.model.get('x');
      this.text.y = this.model.get('y');
      this.model.on('change:x', function(value) {
        return _this.text.x = value;
      });
      this.model.on('change:y', function(value) {
        return _this.text.y = value;
      });
    }

    TextRenderingComponent.prototype.draw = function(context, canvas) {
      return this.text.draw(context, canvas);
    };

    return TextRenderingComponent;

  })(nv.RenderingComponent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SpriteRenderingComponent = (function(_super) {
    __extends(SpriteRenderingComponent, _super);

    function SpriteRenderingComponent(scene, model, options) {
      var _this = this;
      SpriteRenderingComponent.__super__.constructor.call(this, scene, model, options);
      this.sprite = new gleam.Sprite(this.options);
      this.sprite.x = this.model.get('x');
      this.sprite.y = this.model.get('y');
      this.model.on('change:x', function(value) {
        return _this.sprite.x = value;
      });
      this.model.on('change:y', function(value) {
        return _this.sprite.y = value;
      });
    }

    SpriteRenderingComponent.prototype.draw = function(context, canvas) {
      return this.sprite.draw(context, canvas);
    };

    return SpriteRenderingComponent;

  })(nv.RenderingComponent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.AnimatedSpriteRenderingComponent = (function(_super) {
    __extends(AnimatedSpriteRenderingComponent, _super);

    function AnimatedSpriteRenderingComponent(scene, model, options) {
      var _this = this;
      AnimatedSpriteRenderingComponent.__super__.constructor.call(this, scene, model, options);
      this.sprite = new gleam.AnimatedSprite(this.options);
      this.sprite.x = this.model.get('x');
      this.sprite.y = this.model.get('y');
      if (this.model.get('currentAnimation')) {
        this.sprite.play(this.model.get('currentAnimation'));
      }
      if (this.model.get('playing') === false) {
        this.sprite.stop();
      }
      this.model.on('change:x', function(value) {
        return _this.sprite.x = value;
      });
      this.model.on('change:y', function(value) {
        return _this.sprite.y = value;
      });
      this.model.on('change:currentAnimation', function(value) {
        return _this.play(value);
      });
    }

    AnimatedSpriteRenderingComponent.prototype.play = function(animation) {
      return this.sprite.play(animation);
    };

    AnimatedSpriteRenderingComponent.prototype.stop = function() {
      return this.sprite.stop();
    };

    AnimatedSpriteRenderingComponent.prototype.update = function(dt) {
      return this.sprite.update(dt);
    };

    AnimatedSpriteRenderingComponent.prototype.draw = function(context, canvas) {
      this.sprite.x = this.model.x;
      this.sprite.y = this.model.y;
      return this.sprite.draw(context, canvas);
    };

    return AnimatedSpriteRenderingComponent;

  })(nv.SpriteRenderingComponent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.SpriteMapRenderingComponent = (function(_super) {
    __extends(SpriteMapRenderingComponent, _super);

    function SpriteMapRenderingComponent(scene, model, options) {
      var _this = this;
      SpriteMapRenderingComponent.__super__.constructor.call(this, scene, model, options);
      if (options.isometric === true) {
        this.sprite = new gleam.IsoSpriteMap(this.options);
      } else {
        this.sprite = new gleam.SpriteMap(this.options);
      }
      this.sprite.x = this.model.get('x');
      this.sprite.y = this.model.get('y');
      this.model.on('change:x', function(value) {
        return _this.sprite.x = value;
      });
      this.model.on('change:y', function(value) {
        return _this.sprite.y = value;
      });
    }

    SpriteMapRenderingComponent.prototype.getTileFromScreenXY = function(x, y) {
      return this.sprite.getTileFromScreenXY(x, y);
    };

    SpriteMapRenderingComponent.prototype.loadData = function(data, width, height) {
      this.sprite.data = data;
      this.sprite.width = width;
      return this.sprite.height = height;
    };

    SpriteMapRenderingComponent.prototype.draw = function(context, canvas) {
      this.sprite.x = this.model.x;
      this.sprite.y = this.model.y;
      return this.sprite.draw(context, canvas);
    };

    return SpriteMapRenderingComponent;

  })(nv.RenderingComponent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.PathRenderingComponent = (function(_super) {
    __extends(PathRenderingComponent, _super);

    function PathRenderingComponent(scene, model, options) {
      PathRenderingComponent.__super__.constructor.call(this, scene, model, options);
    }

    PathRenderingComponent.prototype.draw = function(context, canvas) {
      var point, shape, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.model.shapes();
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

    return PathRenderingComponent;

  })(nv.RenderingComponent);

}).call(this);

(function() {


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

  nv.GamepadEngine = (function(_super) {
    __extends(GamepadEngine, _super);

    function GamepadEngine(scene, config) {
      var button, key, _i, _len, _ref;
      GamepadEngine.__super__.constructor.call(this, scene, config);
      this.state = {
        mouse: {
          x: -1,
          y: -1
        }
      };
      this.buttons = {};
      for (key in this.config.keys) {
        if (nv.isArray(this.config.keys[key])) {
          _ref = this.config.keys[key];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            button = _ref[_i];
            this.setButton(key, button);
          }
        } else {
          this.setButton(key, this.config.keys[key]);
        }
      }
    }

    GamepadEngine.prototype.onMouseDown = function(button, x, y, event) {
      this.state.mouse.x = x;
      this.state.mouse.y = y;
      if (button === 0) {
        button = nv.Key.Mouse1;
      } else {
        button = nv.Key.Mouse2;
      }
      return this.onKeyDown(button, event);
    };

    GamepadEngine.prototype.onMouseUp = function(button, x, y, event) {
      this.state.mouse.x = x;
      this.state.mouse.y = y;
      if (button === 0) {
        button = nv.Key.Mouse1;
      } else {
        button = nv.Key.Mouse2;
      }
      return this.onKeyUp(button, event);
    };

    GamepadEngine.prototype.onMouseMove = function(x, y, event) {
      this.state.mouse.x = x;
      return this.state.mouse.y = y;
    };

    GamepadEngine.prototype.onKeyDown = function(key, event) {
      var button, buttons, _i, _len, _results;
      buttons = this.buttons[key];
      if (buttons != null) {
        _results = [];
        for (_i = 0, _len = buttons.length; _i < _len; _i++) {
          button = buttons[_i];
          this.state[button] = true;
          _results.push(this.scene.fire("engine:gamepad:down:" + button));
        }
        return _results;
      }
    };

    GamepadEngine.prototype.onKeyUp = function(key, event) {
      var button, buttons, _i, _len, _results;
      buttons = this.buttons[key];
      if (buttons != null) {
        _results = [];
        for (_i = 0, _len = buttons.length; _i < _len; _i++) {
          button = buttons[_i];
          this.state[button] = false;
          _results.push(this.scene.fire("engine:gamepad:up:" + button));
        }
        return _results;
      }
    };

    GamepadEngine.prototype.setButton = function(button, key) {
      if (!this.buttons[key]) {
        this.buttons[key] = [];
      }
      return this.buttons[key].push(button);
    };

    GamepadEngine.prototype.unsetButton = function(button, key) {
      if (this.buttons[key] != null) {
        return this.buttons[key].splice(this.buttons[key].indexOf(button), 1);
      }
    };

    GamepadEngine.prototype.getState = function() {
      return this.state;
    };

    GamepadEngine.prototype.update = function(dt) {};

    GamepadEngine.prototype.destroy = function() {
      GamepadEngine.__super__.destroy.apply(this, arguments);
      delete this.state;
      return delete this.buttons;
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
    Mouse1: 0,
    Mouse2: 1,
    MWheelUp: 2,
    MWheelDown: 3,
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
      this.dirty = false;
      this.values = {};
      this.width = null;
      if (this.entity.model.bind != null) {
        this.dirty = true;
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
      this.entity.model.on("change:text", function(newText) {
        return _this.setText(newText);
      });
    }

    TextUIPlugin.prototype.setText = function(text) {
      return this.text.text = text;
    };

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
      this.width = this.width || this.text.measureText(context, canvas);
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
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
        _this = this;
      ButtonUIPlugin.__super__.constructor.call(this, scene, entity);
      this.id = this.entity.model.id;
      this.entity.model.on('change', function(key, value) {
        if (['x', 'y', 'width', 'height'].indexOf(key) > -1) {
          return _this.button[key] = value;
        }
      });
      this.button = new gleam.Rectangle({
        strokeStyle: (_ref = this.entity.model.strokeStyle) != null ? _ref : "#000",
        strokeWidth: (_ref1 = this.entity.model.strokeWidth) != null ? _ref1 : 4,
        cornerRadius: (_ref2 = this.entity.model.cornerRadius) != null ? _ref2 : 16,
        fillStyle: typeof this.entity.model.fillStyle !== "undefined" ? this.entity.model.fillStyle : "#FFF",
        width: (_ref3 = this.entity.model.width) != null ? _ref3 : 150,
        height: (_ref4 = this.entity.model.height) != null ? _ref4 : 50,
        x: this.entity.model.x,
        y: this.entity.model.y
      });
      this.text = new gleam.Text({
        color: (_ref5 = this.entity.model.textColor) != null ? _ref5 : "#000",
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
      return new nv.Rect(this.button.x, this.button.y, this.button.x + this.button.width, this.button.y + this.button.height);
    };

    ButtonUIPlugin.prototype.draw = function(context, canvas) {
      if (this.hidden === true) {
        return;
      }
      this.text.x = this.button.x + (this.button.width / 2);
      this.text.y = this.button.y + (this.button.height / 2);
      this.button.draw(context, canvas);
      return this.text.draw(context, canvas);
    };

    ButtonUIPlugin.prototype.fillStyle = function(style) {
      return this.button.fillStyle = style || "#FFF";
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
      if (!this.hidden) {
        this.background.x = this.entity.model.x;
        this.background.y = this.entity.model.y;
        return this.background.draw(context, canvas);
      }
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
      var _ref, _ref1, _ref2;
      SliderUIPlugin.__super__.constructor.call(this, scene, entity);
      this.gamepad = scene.get('gamepad');
      entity.model.value = (_ref = entity.model.value) != null ? _ref : 1;
      this.value = entity.model.value;
      this.max = 100;
      this.gap = (_ref1 = entity.model.gap) != null ? _ref1 : 10;
      this.height = (_ref2 = entity.model.height) != null ? _ref2 : 30;
      this.offset = 0;
      if (this.entity.model.leftText) {
        this.down = new nv.TextUIPlugin(scene, {
          model: {
            text: entity.model.leftText,
            font: entity.model.font,
            textBaseline: 'bottom',
            x: entity.model.x,
            y: entity.model.y + this.entity.model.lineHeight + (this.height - entity.model.lineHeight) / 2
          }
        });
      } else {
        this.down = new gleam.Sprite({
          src: entity.model.leftImage,
          x: entity.model.x,
          y: entity.model.y
        });
      }
      this.entity.model.on('change:value', nv.bind(this, this.onValueChange));
      this.onValueChange(this.value);
    }

    SliderUIPlugin.prototype.createControls = function() {
      var lineWidth, model, x;
      if (!this.down.width) {
        return;
      }
      model = this.entity.model;
      x = this.entity.model.x + this.down.width + this.gap;
      if (this.down.onLoad != null) {
        this.down.y += (this.height - this.down.height) / 2;
      }
      this.minBox = new gleam.Square({
        color: "#555",
        width: 1,
        height: this.height,
        x: x,
        y: this.entity.model.y
      });
      this.boxLeftX = x + 1;
      this.box = new gleam.Square({
        color: "#FFF",
        width: 10,
        height: this.height,
        x: this.boxLeftX,
        y: this.entity.model.y
      });
      lineWidth = this.max + this.box.width;
      this.line = new gleam.Square({
        color: '#555',
        width: lineWidth,
        height: 1,
        x: x,
        y: this.entity.model.y + this.height / 2
      });
      this.maxBox = new gleam.Square({
        color: "#555",
        width: 1,
        height: this.height,
        x: x + lineWidth,
        y: this.entity.model.y
      });
      if (this.entity.model.rightText) {
        return this.up = new nv.TextUIPlugin(this.scene, {
          model: {
            text: this.entity.model.rightText,
            font: this.entity.model.font,
            textBaseline: 'bottom',
            x: x + lineWidth + this.gap,
            y: this.entity.model.y + this.entity.model.lineHeight + (this.height - this.entity.model.lineHeight) / 2
          }
        });
      } else {
        return this.up = new gleam.Sprite({
          src: this.entity.model.rightImage,
          x: x + lineWidth + this.gap,
          y: -100
        });
      }
    };

    SliderUIPlugin.prototype.onValueChange = function(value) {
      return this.scene.fire("engine:ui:slider:change", this.entity);
    };

    SliderUIPlugin.prototype.bounds = function() {
      return new nv.Rect(this.minBox.x, this.minBox.y, this.maxBox.x, this.maxBox.y + this.box.height);
    };

    SliderUIPlugin.prototype.getBoxBounds = function() {
      return new nv.Rect(this.box.x, this.box.y, this.box.x + this.box.width, this.box.y + this.box.height);
    };

    SliderUIPlugin.prototype["event(engine:ui:mouse:down)"] = function(data) {
      if (this.getBoxBounds().contains(new nv.Point(data.x, data.y))) {
        this.offset = data.x - this.box.x;
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
      if (!this.up) {
        this.createControls();
      }
      if (!this.up) {
        return;
      }
      if (!!this.hidden) {
        return;
      }
      if (this.up.y < 0 && this.up.loaded) {
        this.up.y = this.entity.model.y + (this.height - this.up.height) / 2;
      }
      if (this.dragging === true) {
        mouseX = this.gamepad.getState().mouse.x;
        this.value = mouseX - this.minBox.x - this.offset;
        this.clamp();
      }
      this.box.x = this.minBox.x + this.value;
      this.down.draw(context, canvas);
      this.up.draw(context, canvas);
      this.minBox.draw(context, canvas);
      this.maxBox.draw(context, canvas);
      this.line.draw(context, canvas);
      return this.box.draw(context, canvas);
    };

    SliderUIPlugin.prototype.destroy = function() {
      this.up.destroy();
      this.down.destroy();
      this.box.destroy();
      this.line.destroy();
      this.minBox.destroy();
      this.maxBox.destroy();
      return SliderUIPlugin.__super__.destroy.apply(this, arguments);
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
      if (this.hidden !== true) {
        if (this.entity.model.rotate != null) {
          this.sprite.x = -this.sprite.halfWidth;
          this.sprite.y = -this.sprite.halfHeight;
          context.save();
          context.translate(this.entity.model.x + this.sprite.halfWidth, this.entity.model.y + this.sprite.halfHeight);
          context.source.rotate(this.entity.model.rotate);
          this.sprite.draw(context, canvas);
          return context.restore();
        } else {
          this.sprite.x = this.entity.model.x;
          this.sprite.y = this.entity.model.y;
          return this.sprite.draw(context, canvas);
        }
      }
    };

    return SpriteUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.DialogUIPlugin = (function(_super) {
    __extends(DialogUIPlugin, _super);

    function DialogUIPlugin(scene, entity) {
      DialogUIPlugin.__super__.constructor.call(this, scene, entity);
      this.gamepad = scene.get('gamepad');
      this.panel = new nv.PanelUIPlugin(scene, {
        model: {
          color: 'rgba(0, 0, 0, 0.7)',
          width: 3000,
          height: 3000,
          x: 0,
          y: 0
        }
      });
      this.confirm = new nv.ButtonUIPlugin(scene, {
        model: new nv.Model({
          text: "Confirm",
          id: 'confirm',
          x: entity.model.x,
          y: entity.model.y + 20
        })
      });
      this.cancel = new nv.ButtonUIPlugin(scene, {
        model: new nv.Model({
          text: "Cancel",
          id: 'cancel',
          x: entity.model.x + 160,
          y: entity.model.y + 20
        })
      });
    }

    DialogUIPlugin.prototype.show = function() {
      this.panel.show();
      this.confirm.show();
      return this.cancel.show();
    };

    DialogUIPlugin.prototype.hide = function() {
      this.panel.hide();
      this.confirm.hide();
      return this.cancel.hide();
    };

    DialogUIPlugin.prototype["event(engine:ui:clicked)"] = function(entity) {
      if (entity === this.confirm) {
        return this.scene.fire("engine:ui:dialog:confirm", this);
      } else if (entity === this.cancel) {
        return this.scene.fire("engine:ui:dialog:cancel", this);
      }
    };

    DialogUIPlugin.prototype.destroy = function() {
      this.panel.destroy();
      this.confirm.destroy();
      this.cancel.destroy();
      return DialogUIPlugin.__super__.destroy.apply(this, arguments);
    };

    return DialogUIPlugin;

  })(nv.UIPlugin);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  nv.AlertUIPlugin = (function(_super) {
    __extends(AlertUIPlugin, _super);

    function AlertUIPlugin(scene, entity) {
      var model, textX;
      AlertUIPlugin.__super__.constructor.call(this, scene, entity);
      model = entity.model;
      model.width = model.width || 400;
      model.height = model.height || 50;
      model.x = (function() {
        switch (model.position) {
          case 'left':
            return 10;
          case 'right':
            return scene.rootModel.canvas.width - 10 - model.width;
          case 'center':
            return scene.rootModel.canvas.halfWidth - (model.width / 2);
        }
      })();
      model.y = model.y || 30;
      model.textAlign = model.textAlign || 'center';
      model.font = model.font || '14px sans-serif';
      model.lineHeight = model.lineHeight || 14;
      model.viewTimeMs = (model.viewTime || 3) * 1000;
      model.fadeTimeMs = (model.fadeTime || 1) * 1000;
      this.timerStart = null;
      this.hidden = true;
      this.panel = new gleam.Rectangle({
        x: model.x,
        y: model.y,
        width: model.width,
        height: model.height,
        cornerRadius: model.corderRadius || 8,
        fillStyle: 'white',
        strokeStyle: 'black',
        strokeWidth: model.strokeWidth || 3
      });
      textX = (function() {
        switch (model.textAlign) {
          case 'left':
          case 'start':
            return model.x + 10;
          case 'right':
          case 'end':
            return model.x + model.width - 10;
          case 'center':
            return model.x + (model.width / 2);
        }
      })();
      this.text = new gleam.Text({
        color: model.color || '#000',
        x: textX,
        y: model.y + model.height - Math.floor((model.height - model.lineHeight) / 2),
        textAlign: model.textAlign,
        font: model.font,
        text: 'Lorem Ipsum Dolar'
      });
    }

    AlertUIPlugin.prototype["event(game:ui:alert)"] = function(data) {
      var style;
      style = (function() {
        switch (data.type) {
          case 'warning':
            return this.entity.model.warning;
          case 'alert':
            return this.entity.model.alert;
          default:
            return this.entity.model.info;
        }
      }).call(this);
      this.panel.fillStyle = style.style;
      this.text.color = style.color;
      this.text.text = data.message;
      return this.showAlert();
    };

    AlertUIPlugin.prototype.showAlert = function() {
      this.hidden = false;
      this.fading = false;
      this.timerStart = null;
      this.timerEndMs = null;
      this.opacity = 1;
      return this.setElementAlpha(this.opacity);
    };

    AlertUIPlugin.prototype.hideAlert = function() {
      this.hidden = true;
      this.fading = false;
      this.timerStart = null;
      this.timerEndMs = null;
      return this.opacity = 1;
    };

    AlertUIPlugin.prototype.setElementAlpha = function(alpha) {
      this.panel.alpha = alpha;
      return this.text.alpha = alpha;
    };

    AlertUIPlugin.prototype.update = function(dt) {
      var deltaMs, now;
      if (this.hidden) {
        return;
      }
      now = Date.now();
      deltaMs = now - this.timerStart;
      if (this.timerStart === null) {
        this.timerStart = now;
        this.timerEndMs = this.entity.model.viewTimeMs + this.entity.model.fadeTimeMs;
      } else if (deltaMs > this.timerEndMs) {
        this.hideAlert();
      } else if (!this.fading && deltaMs > this.entity.model.viewTimeMs) {
        this.fading = true;
      }
      if (this.fading) {
        this.opacity = 1 - ((deltaMs - this.entity.model.viewTimeMs) / this.entity.model.fadeTimeMs);
        return this.setElementAlpha(this.opacity);
      }
    };

    AlertUIPlugin.prototype.draw = function(context, canvas) {
      if (this.hidden) {
        return;
      }
      context.save();
      this.panel.draw(context, canvas);
      this.text.draw(context, canvas);
      return context.restore();
    };

    AlertUIPlugin.prototype.destroy = function() {
      this.panel.destroy();
      this.text.destroy();
      return AlertUIPlugin.__super__.destroy.apply(this, arguments);
    };

    return AlertUIPlugin;

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

  this.breakout = {};

  nv.configure({
    debug: true
  });

  this.Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      var start,
        _this = this;
      Application.__super__.constructor.call(this, {
        scenes: [scenes.Main, scenes.Game, scenes.GameOver]
      });
      start = function() {
        return _this.openScene('Main');
      };
      setTimeout(start, 0);
    }

    return Application;

  })(nv.Game);

}).call(this);

(function() {
  nv.factory.register('Background', function(scene, options) {
    var entity;
    if (options == null) {
      options = {};
    }
    entity = new nv.Entity(scene, options);
    entity.addComponent(nv.SpriteRenderingComponent, {
      src: '/assets/bg_prerendered.png'
    });
    return entity;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Ball = (function(_super) {
    __extends(Ball, _super);

    function Ball(scene, options) {
      if (options == null) {
        options = {};
      }
      Ball.__super__.constructor.call(this, scene, options);
      this.model.set('startDelay', 3);
      this.model.set('speed', 2);
      this.model.set('speedIncrement', 0.2);
      this.model.set('direction', new nv.Point(1, 1));
      this.model.set('width', 16);
      this.model.set('height', 16);
      this.model.set('physicsObjectType', 'active');
      this.model.set('type', 'active');
      this.addComponent(nv.AnimatedSpriteRenderingComponent, {
        src: 'assets/tiles.png',
        frameWidth: 16,
        frameHeight: 16,
        animations: {
          move: {
            frames: [51, 52, 53, 54, 55]
          }
        },
        currentAnimation: 'move',
        framesPerSecond: 10,
        width: 16,
        height: 16
      });
      this.addComponent(nv.RectanglePhysicsComponent, {
        width: 16,
        height: 16,
        name: 'Ball'
      });
      this.startDelay = this.model.startDelay;
      this.started = false;
      this.pendingCollision = false;
      this.canvas = this.scene.getEngineByType(nv.RenderingEngine).canvas;
    }

    Ball.prototype["event(engine:collision:queued)"] = function(data) {
      if (data.actor !== this) {
        return;
      }
      return this.pendingCollision = true;
    };

    Ball.prototype["event(engine:collision:Ball:Player)"] = function(data) {
      var ball, ballVx, ballVy, bounceAngle, impactVector, normalizedRelativeX, paddle, relativeX;
      ball = data.actor;
      paddle = data.target;
      impactVector = data.impactVector;
      if (data.impactVector.x !== 0) {
        this.model.x -= data.impactVector.x;
        this.model.direction.x = -this.model.direction.x;
      } else if (data.impactVector.y !== 0) {
        this.model.y -= data.impactVector.y;
        this.model.direction.y = -this.model.direction.y;
        relativeX = (ball.x + (ball.width / 2)) - (paddle.x + (paddle.width / 2));
        normalizedRelativeX = relativeX / (paddle.width / 2);
        bounceAngle = normalizedRelativeX * (5 * Math.PI / 12);
        ballVx = Math.sin(bounceAngle);
        ballVy = -Math.cos(bounceAngle);
        this.model.direction.x = ballVx;
        this.model.direction.y = ballVy;
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
      if (data.impactVector.x !== 0) {
        this.model.x -= data.impactVector.x + this.model.direction.x;
        this.model.direction.x = -this.model.direction.x;
      } else if (data.impactVector.y !== 0) {
        this.model.y -= data.impactVector.y + this.model.direction.y;
        this.model.direction.y = -this.model.direction.y;
      }
      return this.pendingCollision = false;
    };

    Ball.prototype.restart = function() {
      this.started = false;
      this.startDelay = this.model.startDelay;
      this.model.x = 150;
      this.model.y = 250;
      return this.model.direction = new nv.Point(1, 1);
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

  nv.factory.register('Ball', function(scene, options) {
    if (options == null) {
      options = {};
    }
    return new entities.Ball(scene, options);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Brick = (function(_super) {
    __extends(Brick, _super);

    function Brick(scene, options) {
      var _ref, _ref1;
      if (options == null) {
        options = {};
      }
      Brick.__super__.constructor.call(this, scene, options);
      this.model.set('width', 32);
      this.model.set('height', 16);
      this.model.set('physicsObjectType', 'passive');
      this.addComponent(nv.AnimatedSpriteRenderingComponent, {
        src: 'assets/tiles.png',
        frameWidth: 16,
        frameHeight: 16,
        animations: options.animations,
        currentAnimation: 'move',
        framesPerSecond: 10,
        width: 32,
        height: 16,
        playing: true
      });
      this.model.set('value', 50);
      this.addComponent(nv.RectanglePhysicsComponent, {
        width: (_ref = options.width) != null ? _ref : 32,
        height: (_ref1 = options.height) != null ? _ref1 : 16,
        name: 'Brick'
      });
    }

    Brick.prototype["event(engine:collision:Ball:Brick)"] = function(data) {
      var kill,
        _this = this;
      if (data.target !== this.model) {
        return;
      }
      this.scene.fire("game:score", {
        score: data.target.get('value')
      });
      this.removeComponent(nv.RectanglePhysicsComponent);
      this.model.set('currentAnimation', 'die');
      kill = function() {
        return _this.destroy();
      };
      return setTimeout(kill, 500);
    };

    return Brick;

  })(nv.Entity);

  nv.factory.register('Brick', function(scene, options) {
    if (options == null) {
      options = {};
    }
    options.animations = {
      die: {
        frames: [0, 1, 2, 3, 4, "dead"]
      },
      dead: {
        frames: [4]
      },
      spawn: {
        frames: [4, 3, 2, 1, 0, "idle"]
      },
      idle: {
        frames: [0]
      }
    };
    return new entities.Brick(scene, options);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Countdown = (function(_super) {
    __extends(Countdown, _super);

    function Countdown(scene, plugins, model) {
      Countdown.__super__.constructor.call(this, scene, plugins, model);
      this.delay = model.delay;
    }

    Countdown.prototype.update = function(dt) {
      Countdown.__super__.update.call(this, dt);
      this.delay -= dt;
      if (!(this.delay > 0)) {
        return this.destroy();
      }
    };

    return Countdown;

  })(nv.Entity);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.LevelSpawner = (function(_super) {
    __extends(LevelSpawner, _super);

    function LevelSpawner(scene, plugins, model) {
      LevelSpawner.__super__.constructor.call(this, scene, plugins, model);
    }

    LevelSpawner.prototype["event(spawn:level)"] = function(data) {
      var a, cell, color, levelData, row, startX, x, y, _i, _j, _len, _len1, _ref, _results;
      levelData = breakout.levels[data];
      startX = 17;
      x = startX;
      y = levelData.height;
      _ref = levelData.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          cell = row[_j];
          color = "blue";
          switch (cell) {
            case "X":
              a = 10;
              break;
            case "b":
              color = "blue";
              break;
            case "o":
              color = "orange";
              break;
            case "r":
              color = "red";
              break;
            case "g":
              color = "green";
          }
          this.scene.createEntity('Brick', {
            x: x,
            y: y,
            color: color
          });
          x += levelData.width;
        }
        y += levelData.height;
        _results.push(x = startX);
      }
      return _results;
    };

    return LevelSpawner;

  })(nv.Entity);

  nv.factory.register('LevelSpawner', function(scene, options) {
    if (options == null) {
      options = {};
    }
    return new entities.LevelSpawner(scene, options);
  });

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
  nv.factory.register('Logo', function(scene, options) {
    var entity;
    if (options == null) {
      options = {};
    }
    entity = new nv.Entity(scene, options);
    entity.addComponent(nv.SpriteRenderingComponent, {
      src: '/assets/logo.png',
      width: 131,
      height: 200
    });
    return entity;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Player = (function(_super) {
    __extends(Player, _super);

    function Player(scene, options) {
      if (options == null) {
        options = {};
      }
      Player.__super__.constructor.call(this, scene, options);
      this.model.set('width', 48);
      this.model.set('height', 16);
      this.model.set('physicsObjectType', 'passive');
      this.addComponent(nv.SpriteRenderingComponent, {
        src: 'assets/tiles.png',
        width: 48,
        height: 16,
        origin: {
          x: 0,
          y: 64,
          width: 48,
          height: 16
        }
      });
      this.addComponent(nv.RectanglePhysicsComponent, {
        width: 48,
        height: 16,
        name: 'Player'
      });
      this.gamepadEngine = this.scene.getEngineByType(nv.GamepadEngine);
      this.gameWidth = breakout.config.graphics.width;
    }

    Player.prototype.update = function(dt) {
      var mouseX;
      mouseX = this.gamepadEngine.getState().mouse.x - (this.model.width / 2);
      return this.model.set('x', mouseX);
    };

    return Player;

  })(nv.Entity);

  nv.factory.register('Player', function(scene, options) {
    var _ref, _ref1;
    if (options == null) {
      options = {};
    }
    options.x = (_ref = options.x) != null ? _ref : 100;
    options.y = (_ref1 = options.y) != null ? _ref1 : 368;
    return new entities.Player(scene, options);
  });

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

  entities.Title = (function(_super) {
    __extends(Title, _super);

    function Title(scene, options) {
      if (options == null) {
        options = {};
      }
      Title.__super__.constructor.call(this, scene, options);
      this.addComponent(nv.TextRenderingComponent, {
        color: "#000",
        font: "bold 25px sans-serif",
        text: "Click to Start"
      });
    }

    return Title;

  })(nv.Entity);

  nv.factory.register('Title', function(scene, options) {
    var _ref, _ref1;
    if (options == null) {
      options = {};
    }
    options.x = (_ref = options.x) != null ? _ref : 85;
    options.y = (_ref1 = options.y) != null ? _ref1 : 350;
    return new entities.Title(scene, options);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  entities.Wall = (function(_super) {
    __extends(Wall, _super);

    function Wall(scene, options) {
      var _ref, _ref1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      Wall.__super__.constructor.call(this, scene, options);
      this.model.set('width', (_ref = options.width) != null ? _ref : 16);
      this.model.set('height', (_ref1 = options.height) != null ? _ref1 : 30 * 22);
      this.model.set('physicsObjectType', 'passive');
      this.addComponent(nv.RectanglePhysicsComponent, {
        width: (_ref2 = options.width) != null ? _ref2 : 48,
        height: (_ref3 = options.height) != null ? _ref3 : 16,
        name: 'Wall'
      });
    }

    Wall.prototype["event(engine:collision:Ball:Wall)"] = function(data) {
      if (data.target !== this.model) {

      }
    };

    Wall.prototype.update = function(dt) {};

    return Wall;

  })(nv.Entity);

  nv.factory.register('Wall', function(scene, options) {
    var wall, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    wall = new entities.Wall(scene, options);
    if (breakout.config.debug === true) {
      wall.addComponent(nv.GleamRenderingComponent, {
        drawable: new gleam.Square({
          width: (_ref = options.width) != null ? _ref : 16,
          height: (_ref1 = options.height) != null ? _ref1 : 30 * 22,
          x: options.x,
          y: options.y,
          color: "darkBlue"
        })
      });
    }
    return wall;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Game = (function(_super) {
    __extends(Game, _super);

    function Game(game, options) {
      var renderingConfig;
      if (options == null) {
        options = {};
      }
      Game.__super__.constructor.call(this, game, options);
      renderingConfig = nv.clone(breakout.config.graphics);
      renderingConfig.mouseMove = true;
      this.loadEngine(nv.TimingEngine);
      this.loadEngine(nv.GamepadEngine, breakout.config.gamepad);
      this.loadEngine(nv.RenderingEngine, renderingConfig);
      this.loadEngine(nv.PhysicsEngine);
      this.loadEngine(nv.DebugEngine);
      this.loadMap(breakout.maps.game);
      this.fire("spawn:level", 'level1');
      this.send("engine:timing:start");
    }

    Game.prototype.destroy = function() {
      this.send("engine:timing:stop");
      return Game.__super__.destroy.apply(this, arguments);
    };

    return Game;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.GameOver = (function(_super) {
    __extends(GameOver, _super);

    function GameOver(name, game, rootModel) {
      var _this = this;
      GameOver.__super__.constructor.call(this, name, game, rootModel);
      this.on("engine:gamepad:press:shoot", function() {
        _this.game.closeScene("Gameover");
        return _this.game.openScene('Game');
      });
      this.send("engine:timing:start");
    }

    GameOver.prototype.destroy = function() {
      return GameOver.__super__.destroy.apply(this, arguments);
    };

    return GameOver;

  })(nv.Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  scenes.Main = (function(_super) {
    __extends(Main, _super);

    function Main(game, options) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      Main.__super__.constructor.call(this, game, options);
      this.loadEngine(nv.TimingEngine);
      this.loadEngine(nv.GamepadEngine, breakout.config.gamepad);
      this.loadEngine(nv.RenderingEngine, breakout.config.graphics);
      this.loadEngine(nv.DebugEngine);
      this.loadMap(breakout.maps.main);
      this.on("engine:gamepad:down:activate", function() {
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
    backgroundTiled: {
      entity: nv.Entity,
      plugins: [nv.SpriteMapRenderingPlugin],
      model: {
        options: {
          src: '/assets/tiles.png',
          x: 0,
          y: 0,
          tileWidth: 16,
          tileHeight: 16,
          data: [[59, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 83, 47], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [71, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 71], [95, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 95], [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23], [107, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 107], [95, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 95]]
        }
      }
    },
    leftwall: {
      plugins: [nv.RectanglePhysicsPlugin],
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
      plugins: [nv.RectanglePhysicsPlugin],
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
      plugins: [nv.RectanglePhysicsPlugin],
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
      plugins: [nv.SpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      entity: entities.Player,
      model: {
        options: {
          src: 'assets/tiles.png',
          type: 'passive',
          width: 48,
          height: 16,
          origin: {
            x: 0,
            y: 64,
            width: 48,
            height: 16
          },
          x: 100,
          y: 368,
          speed: 5,
          physicsObjectType: "passive"
        }
      }
    },
    ball: {
      entity: entities.Ball,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        options: {
          startDelay: 3,
          src: 'assets/tiles.png',
          frameWidth: 16,
          frameHeight: 16,
          animations: {
            move: {
              frames: [51, 52, 53, 54, 55]
            }
          },
          currentAnimation: 'move',
          framesPerSecond: 10,
          type: 'active',
          width: 16,
          height: 16,
          x: 150,
          y: 250,
          speed: 2,
          speedIncrement: 0.2,
          direction: new nv.Point(1, 1),
          physicsObjectType: "active"
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
            color: '#000',
            font: 'bold 60px courier',
            textBaseline: 'bottom',
            text: '***'
          }),
          x: 200,
          y: 430,
          width: 400,
          height: 40,
          lives: 4
        }
      }
    },
    countdown: {
      entity: entities.Countdown,
      plugins: [nv.AnimatedSpriteRenderingPlugin],
      model: {
        klass: nv.Model,
        options: {
          delay: 3,
          src: 'assets/tiles.png',
          x: 144,
          y: 176,
          width: 32,
          height: 48,
          frameWidth: 32,
          frameHeight: 48,
          animations: {
            count: {
              frames: [12, 13, 14, "idle"]
            },
            idle: {
              frames: [14]
            }
          },
          currentAnimation: 'count',
          framesPerSecond: 1,
          playing: true
        }
      }
    },
    blueBrick: {
      entity: entities.Brick,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        klass: nv.Model,
        options: {
          src: 'assets/tiles.png',
          width: 32,
          height: 16,
          frameWidth: 32,
          frameHeight: 16,
          animations: {
            die: {
              frames: [0, 1, 2, 3, 4, "dead"]
            },
            dead: {
              frames: [4]
            },
            spawn: {
              frames: [4, 3, 2, 1, 0, "idle"]
            },
            idle: {
              frames: [0]
            }
          },
          currentAnimation: 'spawn',
          framesPerSecond: 10,
          playing: true,
          physicsObjectType: "passive",
          value: 50
        }
      }
    },
    orangeBrick: {
      entity: entities.Brick,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        klass: nv.Model,
        options: {
          src: 'assets/tiles.png',
          width: 32,
          height: 16,
          frameWidth: 32,
          frameHeight: 16,
          animations: {
            die: {
              frames: [6, 7, 8, 9, 10, "dead"]
            },
            dead: {
              frames: [10]
            },
            spawn: {
              frames: [10, 9, 8, 7, 6, "idle"]
            },
            idle: {
              frames: [6]
            }
          },
          currentAnimation: 'spawn',
          framesPerSecond: 10,
          playing: true,
          physicsObjectType: "passive",
          value: 50
        }
      }
    },
    redBrick: {
      entity: entities.Brick,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        klass: nv.Model,
        options: {
          src: 'assets/tiles.png',
          width: 32,
          height: 16,
          frameWidth: 32,
          frameHeight: 16,
          animations: {
            die: {
              frames: [12, 13, 14, 15, 16, "dead"]
            },
            dead: {
              frames: [16]
            },
            spawn: {
              frames: [16, 15, 14, 13, 12, "idle"]
            },
            idle: {
              frames: [12]
            }
          },
          currentAnimation: 'spawn',
          framesPerSecond: 10,
          playing: true,
          physicsObjectType: "passive",
          value: 50
        }
      }
    },
    greenBrick: {
      entity: entities.Brick,
      plugins: [nv.AnimatedSpriteRenderingPlugin, nv.RectanglePhysicsPlugin],
      model: {
        klass: nv.Model,
        options: {
          src: 'assets/tiles.png',
          width: 32,
          height: 16,
          frameWidth: 32,
          frameHeight: 16,
          animations: {
            die: {
              frames: [18, 19, 20, 21, 22, "dead"]
            },
            dead: {
              frames: [22]
            },
            spawn: {
              frames: [22, 21, 20, 19, 18, "idle"]
            },
            idle: {
              frames: [18]
            }
          },
          currentAnimation: 'spawn',
          framesPerSecond: 10,
          playing: true,
          physicsObjectType: "passive",
          value: 50
        }
      }
    }
  };

}).call(this);

(function() {
  breakout.levels = {
    level1: {
      width: 32,
      height: 16,
      data: [["X", "X", "X", "X", "X", "X", "X", "X"], ["X", "X", "X", "X", "X", "X", "X", "X"], ["X", "X", "X", "X", "X", "X", "X", "X"], ["X", "X", "X", "X", "X", "X", "X", "X"], ["X", "X", "X", "g", "o", "g", "X", "X"], ["X", "o", "b", "g", "g", "g", "b", "o"], ["X", "X", "b", "b", "b", "b", "b", "X"]]
    }
  };

}).call(this);

(function() {
  breakout.config = {
    debug: false,
    graphics: {
      id: '#game-canvas',
      width: 320,
      height: 410,
      scaled: true,
      css: {
        backgrund: '#000',
        margin: '0 auto',
        display: 'block'
      },
      preload: ['assets/logo.png', 'assets/tiles.png']
    },
    gamepad: {
      keys: {
        left: nv.Key.A,
        right: nv.Key.D,
        activate: [nv.Key.Spacebar, nv.Key.Mouse1]
      }
    },
    preload: ['assets/logo.png', 'assets/tiles.png']
  };

  breakout.maps = {};

  breakout.maps.main = {
    layers: [
      {
        name: "UI",
        objects: [
          {
            type: "Background",
            x: 0,
            y: 0
          }, {
            type: "Title",
            x: 85,
            y: 350
          }, {
            type: "Logo",
            x: 94.5,
            y: 50
          }
        ]
      }
    ]
  };

  breakout.maps.game = {
    layers: [
      {
        name: "Background",
        objects: [
          {
            type: "Background",
            x: 0,
            y: 0
          }
        ]
      }, {
        name: "Physics",
        objects: [
          {
            type: "Wall",
            x: 0,
            y: 0
          }, {
            type: "Wall",
            x: 20,
            y: 0,
            properties: {
              width: 30 * 18,
              height: 20
            }
          }, {
            type: "Wall",
            x: 300,
            y: 0
          }
        ]
      }, {
        name: "Objects",
        objects: [
          {
            type: "Player",
            x: 100,
            y: 368
          }, {
            type: "Ball",
            x: 150,
            y: 250
          }, {
            type: "LevelSpawner",
            x: 0,
            y: 0
          }
        ]
      }
    ]
  };

  breakout.gameConfig = {
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
        engines: [nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine],
        entities: {
          background: {
            include: "backgroundTiled"
          },
          logo: {
            entity: nv.Entity,
            plugins: [nv.SpriteRenderingPlugin],
            model: {
              options: {
                src: 'assets/logo.png',
                width: 131,
                height: 200,
                x: 94.5,
                y: 50
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
            },
            trackMouse: true
          }
        },
        engines: [nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine],
        soundfx: {
          brick_collision: {
            asset: "/assets/sfx/brickDeath.wav",
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
          },
          countdown: {
            include: "countdown"
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
