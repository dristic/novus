class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @gamepad = config.gamepad
    @scene.gamepad = config.gamepad

    @gamepad.trackMouse() unless not @config.trackMouse

    for key of @config.keys
      @gamepad.aliasKey key, @config.keys[key]

    @buttonPressFunction = nv.bind(this, @onButtonPress)
    @buttonReleaseFunction = nv.bind(this, @onButtonRelease)

    @gamepad.on "press", @buttonPressFunction
    @gamepad.on "release", @buttonReleaseFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:press:#{button}"

  onButtonRelease: (button) ->
    @scene.fire "engine:gamepad:release:#{button}"

  destroy: () ->
    @gamepad.off "press", @buttonPressFunction
    @gamepad.off "release", @buttonReleaseFunction
    delete @buttonPressFunction
    delete @buttonReleaseFunction
    delete @gamepad
    delete @config

    super

class nv.Gamepad extends nv.EventDispatcher
  constructor: () ->
    super
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
        @fireButton(button, "press")
        @state[button] = true
    @trackers[button].push nv.keyup key, () =>
      @state[button] = false
      @fireButton(button, "release")

  fireButton: (button, state) ->
    @send state, button

  getState: () ->
    @state

nv.gamepad = () ->
  new nv.Gamepad