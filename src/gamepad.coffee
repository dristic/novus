class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @gamepad = config.gamepad
    @scene.gamepad = config.gamepad

    @gamepad.trackMouse() unless not @config.trackMouse

    for key of @config.keys
      @gamepad.aliasKey key, @config.keys[key]

    for key of @config.controller
      @gamepad.aliasGamepadButton key, @config.controller[key]

    @buttonPressFunction = nv.bind(this, @onButtonPress)
    @buttonReleaseFunction = nv.bind(this, @onButtonRelease)

    @gamepad.on "press", @buttonPressFunction
    @gamepad.on "release", @buttonReleaseFunction
    @gamepad.on "gamepad:connected", () =>
      @scene.fire "engine:gamepad:controller:connected"
    @gamepad.on "mousedown", (data) =>
      @scene.fire "engine:gamepad:mouse:down", data unless not @config.trackMouse
    @gamepad.on "mouseup", (data) =>
      @scene.fire "engine:gamepad:mouse:up", data unless not @config.trackMouse

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:press:#{button}"

  onButtonRelease: (button) ->
    @scene.fire "engine:gamepad:release:#{button}"

  update: (dt) ->
    @gamepad.update dt

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
    @gamepadAliases = {}
    @previousGamepadState = undefined
    @trackGamepad = false

  trackMouse: () ->
    @state.mouse =
      x: -1
      y: -1
      down: false

    nv.mousedown (event) =>
      @state.mouse.x = event.clientX
      @state.mouse.y = event.clientY
      @state.mouse.down = true
      @send "mousedown", @state.mouse

    nv.mouseup (event) =>
      @state.mouse.x = event.clientX
      @state.mouse.y = event.clientY
      @state.mouse.down = false
      @send "mouseup", @state.mouse

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

  # Alias a button from a plugged in game pad
  aliasGamepadButton: (button, gamepadButton) ->
    @trackGamepad = true
    @gamepadAliases[gamepadButton] = [] unless @gamepadAliases[gamepadButton]
    @gamepadAliases[gamepadButton].push button

  fireButton: (button, state) ->
    @send state, button

  getState: () ->
    @state

  update: (dt) ->
    if @trackGamepad
      gamepad = navigator.webkitGetGamepads()[0]
      if gamepad and @previousGamepadState
        for key of @gamepadAliases
          key = parseInt key
          if gamepad.buttons[key] > 0 and @previousGamepadState.buttons[key] is 0
            @state[button] = true for button in @gamepadAliases[key]
            @fireButton button, "press" for button in @gamepadAliases[key]
          else if gamepad.buttons[key] is 0 and @previousGamepadState.buttons[key] > 0
            @state[button] = false for button in @gamepadAliases[key]
            @fireButton button, "release" for button in @gamepadAliases[key]
        @previousGamepadState = nv.extend {}, gamepad
      else
        @previousGamepadState = nv.extend {}, gamepad
        @send "controller:connected"

nv.gamepad = () ->
  new nv.Gamepad