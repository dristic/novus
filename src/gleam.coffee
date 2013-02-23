requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

gl = (canvas) ->
  return new gl.prototype.init(canvas)

# Global options
gl.zOrderProperty = 'zIndex'

_updateId = 0

# Gleam.CanvasDecorator
# This decorates a canvas object and gives more options.
gl.prototype =
  # Decorator function for canvas object
  init: (canvas) ->
    if typeof canvas is 'string'
      canvas = document.querySelector canvas
    canvas = canvas ? document.createElement 'canvas'
    gl.prototype.extend.call canvas, gl.prototype
    canvas.context = gl.context canvas.getContext('2d')
    canvas.objects = []
    canvas.requestFrameKey = null
    canvas.updating = false
    canvas.fullscreened = false
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

  fullscreen: () ->
    @fullscreened = true
    @size window.innerWidth, window.innerHeight

    document.body.style.overflow = "hidden"

    window.addEventListener 'resize', (event) =>
      @size window.innerWidth, window.innerHeight

  background: (color) ->
    @style.background = color

  draw: (object, context = @context) ->
    object.draw context, this

  addDrawable: (object) ->
    @objects.push object

  removeDrawable: (object) ->
    @objects.splice @objects.indexOf(object), 1

  drawObjects: (context = @context) ->
    @objects.sort (a, b) ->
      a = a[gl.zOrderProperty]
      b = b[gl.zOrderProperty]
      if a and not b then 1
      else if b and not a then -1
      else if a < b then -1
      else if a is b then 0
      else if a > b then 1

    @draw object, context for object in @objects

  startDrawUpdate: (fps, func) ->
    @updating = true
    lastTime = Date.now()
    updateId = _updateId++

    dimensions = @size()
    @buffer = gl().size dimensions.width, dimensions.height
    @buffer.fullscreen() unless not @fullscreened

    update = () =>
      now = Date.now()
      delta = now - lastTime
      delta /= 1000

      stop = func delta

      bufferContext = @buffer.context
      bufferContext.save()
      bufferContext.clear()

      if @camera then @camera.update delta, bufferContext, this

      @drawObjects bufferContext

      bufferContext.restore()

      @context.clear()
      @context.drawImage @buffer, 0, 0

      lastTime = now

      if @cancel isnt undefined and @cancel.indexOf(updateId) isnt -1
        @cancel.splice @cancel.indexOf(updateId), 1
        delete @cancel if @cancel.length is 0
      else
        @requestFrameKey = requestFrame update unless not @updating

    @requestFrameKey = requestFrame update
    updateId

  stopDrawUpdate: (updateId) ->
    @updating = false
    @cancel = [] unless @cancel
    @cancel.push updateId
    cancelFrame @requestFrameKey

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

  setFont: (font) ->
    @font = font

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

gl.prototype.extend.call gl.drawable.prototype,
  draw: (context) ->
    # Do nothing

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

# Gleam.text
gl.implement
  text: (options) ->
    defaults =
      color: '#CCC'
      x: 10
      y: 10
      font: 'bold 20px sans-serif'
      textBaseline: 'bottom'
      text: 'Lorem Ipsum'
    gl.prototype.extend.call defaults, options
    gl.drawable.call this, defaults
    this

gl.prototype.extend.call gl.text.prototype,
  draw: (context) ->
    context.color @color
    context.setFont @font
    context.textBaseline = @textBaseline

    context.fillText @text, @x, @y

# Gleam.sprite
gl.implement
  sprite: (options) ->
    defaults =
      src: ''
      x: 10
      y: 10
      width: null
      height: null
    gl.prototype.extend.call defaults, options
    gl.drawable.call this, defaults

    @loaded = false
    @image = new Image
    @image.onload = () =>
      @width = @image.width unless @width
      @height = @image.height unless @height
      @loaded = true
    @image.src = @src

    this

gl.prototype.extend.call gl.sprite.prototype,
  draw: (context) ->
    context.drawImage @image, @x, @y, @width, @height