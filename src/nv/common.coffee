#= require key

nv.extend = (other) ->
  this[key] = other[key] for key of other

nv.extend
  log: () ->
    console.log message for message in arguments

  bind: (context, func) ->
    f = () ->
      func.call context, arguments...
    f

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

class Gamepad
  constructor: () ->
    @gamepad = navigator.webkitGamepad
    @state = {}
    @listeners = {}
    @trackers = {}

  trackMouse: () ->
    @state.mouse =
      x: -1
      y: -1
      down: false

    nv.mousedown (event) =>
      @state.mouse.x = event.clientX
      @state.mouse.y = event.clientY
      @state.mouse.down = true

    nv.mouseup (event) =>
      @state.mouse.x = event.clientX
      @state.mouse.y = event.clientY
      @state.mouse.down = false

    nv.mousemove (event) =>
      @state.mouse.x = event.clientX
      @state.mouse.y = event.clientY

  aliasKey: (button, key) ->
    @trackers[button] = [] unless @trackers[button]
    @trackers[button].push nv.keydown key, () =>
      @fireButton(button)
    @trackers[button].push nv.keyup key, () =>
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

    if listeners.indexOf func isnt 0
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