#<< key

nv.extend = (other) ->
  this[key] = other[key] for key of other

nv.extend
  log: () ->
    console.log message for message in arguments

  keydown: (key, callback) ->
    $(document).on 'keydown', (event) ->
      if event.keyCode is key then callback()

  keyup: (key, callback) ->
    $(document).on 'keyup', (event) ->
      if event.keyCode is key then callback()

class Gamepad
  constructor: () ->
    @gamepad = navigator.webkitGamepad
    @state = {}

  aliasKey: (button, key) ->
    nv.keydown key, () =>
      @state[button] = true
    nv.keyup key, () =>
      @state[button] = false

  getState: () ->
    @state

nv.gamepad = () ->
  new Gamepad

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

  update: (dt, context) ->
    if @following
      @x = -@following.x * @zoomValue + @offsetX
      @y = -@following.y * @zoomValue + @offsetY

    if @onUpdate then @onUpdate dt

    context.translate @x, @y
    context.scale @zoomValue, @zoomValue

nv.camera = () ->
  new Camera