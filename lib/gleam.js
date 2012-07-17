var gl;

gl = function(canvas) {
  return new gl.prototype.init(canvas);
};

gl.prototype = {
  init: function(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    return this;
  },
  size: function(width, height) {
    this.width = width;
    return this.height = height;
  },
  background: function(color) {
    return this.canvas.style.background = color;
  }
};

gl.prototype.init.prototype = gl.prototype;

window.gl = gl;
