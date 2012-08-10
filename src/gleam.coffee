requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

gl = (canvas) ->
  return new gl.prototype.init(canvas)

# Gleam.CanvasDecorator
# This decorates a canvas object and gives more options.
gl.prototype =
  # Decorator function for canvas object
  init: (canvas) ->
    if typeof canvas is 'string'
      canvas = document.querySelector canvas
    else
      canvas = document.createElement 'canvas'
    gl.prototype.extend.call canvas, gl.prototype
    canvas.context = gl.context canvas.getContext('2d')
    canvas.objects = []
    canvas.requestFrameKey = null
    canvas.updating = false
    canvas

  size: (width, height) ->
    if width? and height?
      @width = width
      @height = height
      this
    else
      dimensions =
        width: @width
        height: @height

  background: (color) ->
    @style.background = color

  draw: (object) ->
    object.draw @context, this

  addDrawable: (object) ->
    @objects.push object

  removeDrawable: (object) ->
    @objects.slice @objects.indexOf(object), 1

  drawObjects: () ->
    @draw object for object in @objects

  startDrawUpdate: (fps, func) ->
    @updating = true
    lastTime = Date.now()

    update = () =>
      now = Date.now()
      delta = now - lastTime
      delta /= 1000

      coords = func delta

      @context.save()
      @context.clear()

      if @camera then @camera.update delta, @context

      @drawObjects()

      @context.restore()

      lastTime = now

      @requestFrameKey = requestFrame update

    @requestFrameKey = requestFrame update

  stopDrawUpdate: () ->
    @updating = false
    cancelFrame @requestFrameKey
    @requestFrameKey = null

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

  strokeColor: (color) ->
    @strokeStyle = color

  strokeWidth: (width) ->
    @lineWidth = width

  # Wraps function in begin/close path and fill
  fillPath: (func) ->
    @beginPath()
    func(this)
    @fill()
    @closePath()

  # Creates a line using the arguments passed in
  # Arguments must be divisible by "2"
  line: () ->
    @beginPath()
    @moveTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    while arguments.length > 0
      @lineTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    @stroke()
    @closePath()

  rotateAround: (x, y, angle, func) ->
    @save()
    @translate(x, y)
    @rotate(angle)
    @translate(-x, -y)
    func()
    @restore()

  clear: () ->
    @clearRect 0, 0, @canvas.width, @canvas.height

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