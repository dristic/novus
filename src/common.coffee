#= require key

nv.extend = (other) ->
  this[key] = other[key] for key of other

nv.extend
  log: () ->
    console.log message for message in arguments

  bind: (context, func) ->
    () ->
      func.call context, arguments...

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
    @listeners = {}

  aliasKey: (button, key) ->
    nv.keydown key, () =>
      @fireButton(button)
    nv.keyup key, () =>
      @state[button] = false

  fireButton: (button) ->
    @state[button] = true
    listeners = @listeners[button]
    if listeners instanceof Array
      for listener in listeners
        listener(button)

  onButtonPress: (button, func) ->
    listeners = @listeners[button]

    if not listeners then listeners = []

    listeners.push func
    @listeners[button] = listeners
    func

  offButtonPress: (button, func) ->
    listeners = @listeners[button]

    if listeners.indexOf func not 0
      listeners.splice listeners.indexOf(func), 1

    @listeners[button] = listeners
    func

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