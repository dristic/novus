gl = (canvas) ->
  return new gl.prototype.init(canvas)

gl.prototype =
  # Decorator function for canvas object
  init: (canvas) ->
    this.canvas = canvas
    this.context = canvas.getContext '2d'
    this

  size: (width, height) ->
    this.width = width
    this.height = height

  background: (color) ->
    this.canvas.style.background = color

# Setup gl.init to implement the gl core methods
gl.prototype.init.prototype = gl.prototype

window.gl = gl