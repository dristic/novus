class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @gamepad = config.gamepad
    scene.gamepad = config.gamepad

    @gamepad.trackMouse() unless not @config.trackMouse

    for key of @config.keys
      @gamepad.aliasKey key, @config.keys[key]
      @buttonPressFunction = nv.bind(this, @onButtonPress)
      @gamepad.onButtonPress key, @buttonPressFunction
      @buttonReleaseFunction = nv.bind(this, @onButtonRelease)
      @gamepad.onButtonRelease key, @buttonReleaseFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:press:#{button}"

  onButtonRelease: (button) ->
    @scene.fire "engine:gamepad:release:#{button}"

  destroy: () ->
    for key of @config.keys
      @gamepad.offButtonPress key, @buttonPressFunction
      @gamepad.offButtonRelease key, @buttonReleaseFunction
    delete @gamepad
    delete @config

    super

class nv.Gamepad
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
      unless @state[button]
        @fireButton(button, "-press")
        @state[button] = true
    @trackers[button].push nv.keyup key, () =>
      @state[button] = false
      @fireButton(button, "-release")

  fireButton: (button, state) ->
    listeners = @listeners[button + state]
    if listeners instanceof Array
      for listener in listeners
        listener(button)

  onButtonPress: (button, func) ->
    button = button + "-press"
    listeners = @listeners[button]

    if not listeners then listeners = []

    listeners.push func
    @listeners[button] = listeners
    func

  onButtonRelease: (button, func) ->
    button = button + "-release"
    listeners = @listeners[button]

    if not listeners then listeners = []

    listeners.push func
    @listeners[button] = listeners
    func

  offButtonPress: (button, func) ->
    button = button + "-press"
    listeners = @listeners[button]

    if listeners.indexOf func isnt 0
      listeners.splice listeners.indexOf(func), 1

    @listeners[button] = listeners
    func

  offButtonRelease: (button, func) ->
    button = button + "-release"
    listeners = @listeners[button]

    if listeners.indexOf func isnt 0
      listeners.splice listeners.indexOf(func), 1

    @listeners[button] = listeners
    func

  getState: () ->
    @state

nv.gamepad = () ->
  new nv.Gamepad