# Decorator class for canvas rendering context
class gleam.Context
  constructor: (@source, @canvas) ->

  set: (key, value) ->
    @source[key] = value

  get: (key) ->
    @source[key]

  setFillStyle: (style) ->
    @source.fillStyle = style

  setStrokeStyle: (style) ->
    @source.strokeStyle = style

  setStrokeWidth: (width) ->
    @source.lineWidth = width

  setFont: (font) ->
    @source.font = font

  setTextBaseline: (baseline) ->
    @source.textBaseline = baseline

  setTextAlign: (alignment) ->
    @source.textAlign = alignment

  fillPath: (func) ->
    @beginPath()
    func(this)
    @fill()
    @closePath()

  # Creates a path using the arguments passed in
  # Arguments must be divisible by "2"
  path: () ->
    throw new Exception("Arguments should be divisible by 2") unless arguments.length % 2 is 0
    @beginPath()
    @moveTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    while arguments.length > 0
      @lineTo Array.prototype.shift.call(arguments), Array.prototype.shift.call(arguments)

    @stroke()
    @closePath()

  # Rotates the context around the given point
  rotateAround: (x, y, angle, func) ->
    @save()
    @translate(x, y)
    @rotate(angle)
    @translate(-x, -y)
    func()
    @restore()

  # Allows the clearing of the screen with a color instead of using clear
  setClearColor: (hex, opacity) ->
    @clearColor = hex
    @clearOpacity = opacity ? 1

  # Clears the full screen by default or the passed in rect
  clearRect: (x, y, width, height) ->
    x = x ? 0
    y = y ? 0
    width = width ? @canvas.width
    height = height ? @canvas.height

    if @clearColor
      @source.fillStyle = @clearColor
      @source.globalAlpha = @clearOpacity
      @source.fillRect x, y, width, height
    else
      @source.clearRect x, y, width, height

# Add context aliasing function so closures work right
gleam.Context.addContextAlias = (key) ->
  unless gleam.Context.prototype[key]
    gleam.Context.prototype[key] = (args...) ->
      @source[key](args...)

# Extend the base context class
context = document.createElement('canvas').getContext('2d')
for key of context
  if typeof context[key] is "function"
    gleam.Context.addContextAlias(key)
