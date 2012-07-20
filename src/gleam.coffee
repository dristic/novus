gl = (canvas) ->
  return new gl.prototype.init(canvas)

# Gleam.CanvasDecorator
# This decorates a canvas object and gives more options.
gl.prototype =
  # Decorator function for canvas object
  init: (canvas) ->
    if typeof canvas is 'string'
      canvas = document.querySelector canvas
    @canvas = canvas
    @context = gl.context canvas.getContext '2d'
    @objects = []
    this

  size: (width, height) ->
    @canvas.width = width
    @canvas.height = height

  background: (color) ->
    @canvas.style.background = color

  draw: (object) ->
    object.draw @context, @canvas

  extend: (object) ->
    this[key] = object[key] for key of object
    this

# Setup gl.init to implement the gl core methods
gl.prototype.init.prototype = gl.prototype
window.gl = gl

# Gleam
# These are base methods that exist on the global object.
gl.prototype.extend.call gl,
  implement: (methods) ->
    gl.prototype.extend.call gl, methods

  context: (context) ->
    gl.prototype.extend.call context, gl.context.prototype
    context

# Gleam.Context
# Context decorator to give drawable objects more options.
gl.prototype.extend.call gl.context.prototype,
  color: (color) ->
    @fillStyle = color

# Gleam.Drawable
# This allows you to create a drawable object for gleam.
gl.implement
  drawable: (options) ->
    gl.prototype.extend.call this, options
    gl.prototype.extend.call @prototype, options
    this

# Gleam.Square
gl.implement
  square: (options) ->
    defaults =
      color: '#CCC'
      width: 10
      height: 10
      x: 10
      y: 10
    gl.prototype.extend.call defaults, options
    gl.drawable.call this, defaults
    this

gl.prototype.extend.call gl.square.prototype,
  draw: (context) ->
    context.color @color
    context.fillRect @x, @y, @width, @height