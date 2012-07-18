var gl;

gl = function(canvas) {
  return new gl.prototype.init(canvas);
};

gl.prototype = {
  init: function(canvas) {
    if (typeof canvas === 'string') {
      canvas = document.querySelector(canvas);
    }
    this.canvas = canvas;
    this.context = gl.context(canvas.getContext('2d'));
    this.objects = [];
    return this;
  },
  size: function(width, height) {
    this.width = width;
    return this.height = height;
  },
  background: function(color) {
    return this.canvas.style.background = color;
  },
  draw: function(object) {
    return object.draw(this.context, this.canvas);
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
  }
});

gl.implement({
  drawable: function(options) {
    gl.prototype.extend.call(this, options);
    return gl.prototype.extend.call(this.prototype, options);
  }
});
