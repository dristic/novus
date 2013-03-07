#= require key

nv.config =
  debug: false

nv.implement = (other) ->
  this[key] = other[key] for key of other

nv.implement
  log: () ->
    console.log message for message in arguments

  configure: (options) ->
    nv.config = nv.extend(nv.config, options)

  bind: (context, func) ->
    f = () ->
      func.call context, arguments...
    f

  clone: (object) ->
    obj = {}
    nv.extend obj, object
    obj

  extend: (object, other) ->
    for key of other
      if object[key] instanceof Object and other[key] instanceof Object
        nv.extend(object[key], other[key])
      else
        object[key] = other[key]
    object

  keydown: (key, callback) ->
    func = (event) ->
      if event.keyCode is key then callback()
    $(document).on 'keydown', func
    func

  keyup: (key, callback) ->
    func = (event) ->
      if event.keyCode is key then callback()
    $(document).on 'keyup', func
    func

  mousedown: (callback) ->
    $(document).on 'mousedown', callback
    $(document).on 'touchstart', callback

  mouseup: (callback) ->
    $(document).on 'mouseup', callback
    $(document).on 'touchend', callback

  mousemove: (callback) ->
    $(document).on 'mousemove', callback
    $(document).on 'touchmove', callback

  isMobile: () ->
    agent = navigator.userAgent.toLowerCase()
    (agent.match(/android/i) or
    agent.match(/webos/i) or
    agent.match(/iphone/i) or
    agent.match(/ipad/i) or
    agent.match(/ipod/i) or
    agent.match(/blackberry/i) or
    agent.match(/windows phone/i)) isnt null

  ready: (func) ->
    return func() unless not @isReady
    document.addEventListener 'DOMContentLoaded', () =>
      @isReady = true
      func()

class Camera
  constructor: () ->
    @following = null
    @x = 0
    @y = 0
    @offsetX = 0
    @offsetY = 0
    @zoomValue = 1

  follow: (object, offsetX, offsetY) ->
    @following = object
    @offsetX = offsetX
    @offsetY = offsetY

  zoom: (distance, duration) ->
    if duration
      startTime = Date.now()
      initial = @zoomValue

      @onUpdate = (dt) =>
        now = Date.now()
        diff = now - startTime
        @zoomValue = (distance - initial) * (diff / duration) + initial

        if diff > duration
          @onUpdate = null
          @zoomValue = distance
    else
      @zoomValue = distance

  update: (dt, context, canvas) ->
    if @following
      size = canvas.size()
      @offsetX = size.width / 2
      @offsetY = size.height / 2
      @x = -@following.x * @zoomValue + @offsetX
      @y = -@following.y * @zoomValue + @offsetY

    if @onUpdate then @onUpdate dt

    context.translate @x, @y
    context.scale @zoomValue, @zoomValue

nv.camera = () ->
  new Camera

class nv.Color
  constructor: (@r, @b, @g, @a) ->

  interpolate: (percent, other) ->
    new Color(
      @r + (other.r - @r) * percent,
      @g + (other.g - @g) * percent,
      @b + (other.b - @b) * percent,
      @a + (other.a - @a) * percent
    )

  toCanvasColor: () ->
    "rgb(#{parseInt(@r)}, #{parseInt(@g)}, #{parseInt(@b)})"

class nv.Gradient
  constructor: (@colorStops) ->

  getColor: (percent) ->
    colorF = percent * (@colorStops.length - 1)

    color1 = parseInt(colorF)
    color2 = parseInt(colorF + 1)

    @colorStops[color1].interpolate((colorF - color1) / (color2 - color1), @colorStops[color2])