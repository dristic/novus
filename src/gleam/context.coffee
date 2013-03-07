# Decorator class for canvas rendering context
class gleam.Context
  constructor: (@source, @canvas) ->

  setFillStyle: (style) ->
    @source.fillStyle = style

  setStrokeStyle: (style) ->
    @source.strokeStyle = style

  setStrokeWidth: (width) ->
    @source.lineWidth = width

  setFont: (font) ->
    @source.font = font

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
    @clearOpacity = opacity

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

# Extend the base context class
proto = CanvasRenderingContext2D.prototype
for key of proto
  unless gleam.Context.prototype[key]
    gleam.Context.prototype[key] = proto[key]