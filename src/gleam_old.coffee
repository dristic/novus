requestFrame = window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
cancelFrame = window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

gleam = gleam ? {}

# From http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
gleam.extend = (object, other) ->
  if Object.keys
    Object.keys(other).forEach (property) ->
      Object.defineProperty object, property, Object.getOwnPropertyDescriptor(other, property)
  else
    for key of other
      if other.hasOwnProperty key
        object[key] = other[key]
  object

gleam.Canvas = (canvas) ->
  if typeof canvas is 'string'
    canvas = document.querySelector canvas
  @element = canvas ? document.createElement 'canvas'
  @context = @element.getContext('2d')
  @drawables = []
  @cacheValues =
    width: @element.width
    height: @element.height
    halfWidth: @element.width / 2
    halfHeight: @element.height / 2
  @aliases =
    opacity: "globalAlpha"
    color: 'fillStyle'

  this

gleam.extend gleam.Canvas.prototype,
  cache: (key, value) ->
    @cacheValues[key] = value

  get: (key) ->
    key = @aliases[key] unless not @aliases[key]
    @cacheValues[key] ? @context[key]

  set: (key, value) ->
    key = @aliases[key] unless not @aliases[key]
    @context[key] = value

  setStyle: (key, value) ->
    @element.style[key] = value

  setSize: (width, height) ->
    @element.width = width
    @element.height = height

    @cache 'width', width
    @cache 'height', height
    @cache 'halfWidth', width / 2
    @cache 'halfHeight', height / 2

  getSize: () ->
    {
      width: @cacheValues.width
      height: @cacheValues.height
    }

  fullscreen: () ->
    @fullscreened = true
    @setSize document.width, document.height

    document.body.style.overflow = "hidden"

    window.addEventListener 'resize', (event) =>
      @setSize document.width, document.height

  setClearColor: (hex, opacity) ->
    @cache 'clearColor', hex
    @cache 'clearOpacity', opacity

  clear: (x, y, width, height) ->
    x = x ? 0
    y = y ? 0
    width = width ? @cacheValues.width
    height = height ? @cacheValues.height

    if @cacheValues.clearColor
      @context.fillStyle = @cacheValues.clearColor
      @context.globalAlpha = @cacheValues.clearOpacity
      @context.fillRect x, y, width, height
    else
      @context.clearRect x, y, width, height

  # Creates a line using the arguments passed in
  # Arguments must be divisible by "2"
  line: () ->
    @context.beginPath()
    @context.moveTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    while arguments.length > 0
      @context.lineTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    @context.stroke()
    @context.closePath()

  rotateAround: (x, y, angle, func) ->
    @context.save()
    @context.translate(x, y)
    @context.rotate(angle)
    @context.translate(-x, -y)
    func()
    @context.restore()

  render: (drawables) ->
    drawable.draw(this) for drawable in drawables

# Gleam.Square
gleam.Square = (options) ->
  defaults =
    color: '#CCC'
    width: 10
    height: 10
    x: 10
    y: 10
  options = options ? {}
  gleam.extend defaults, options
  gleam.extend this, defaults
  this

gleam.extend gleam.Square.prototype,
  draw: (canvas, context) ->
    context.fillStyle = @color
    context.fillRect @x, @y, @width, @height

@gleam = gleam

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
    @size document.width, document.height

    document.body.style.overflow = "hidden"

    window.addEventListener 'resize', (event) =>
      @size document.width, document.height

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