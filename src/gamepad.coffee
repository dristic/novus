class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @gamepad = scene.get 'gamepad'
    @options = scene.options
    @options.setMany config

    @gamepad.trackMouse() if @options.trackMouse?
    @gamepad.keyRepeatEvents = true if @options.keyRepeatEvents

    for key of @options.keys
      @gamepad.aliasKey key, @options.keys[key]

    for key of @config.controller
      @gamepad.aliasGamepadButton key, @config.controller[key]

    @buttonPressFunction = nv.bind(this, @onButtonPress)
    @buttonReleaseFunction = nv.bind(this, @onButtonRelease)
    @buttonRepeatFunction = nv.bind(this, @onButtonRepeat)
    @mouseDownFunction = nv.bind(this, @onMouseDown)
    @mouseUpFunction = nv.bind(this, @onMouseUp)

    @gamepad.on "press", @buttonPressFunction
    @gamepad.on "release", @buttonReleaseFunction
    @gamepad.on "repeat", @buttonRepeatFunction
    @gamepad.on "gamepad:connected", () =>
      @scene.fire "engine:gamepad:controller:connected"
    @gamepad.on "mousedown", @mouseDownFunction
    @gamepad.on "mouseup", @mouseUpFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:press:#{button}"

  onButtonRelease: (button) ->
    @scene.fire "engine:gamepad:release:#{button}"

  onButtonRepeat: (button) ->
    @scene.fire "engine:gamepad:repeat:#{button}"

  onMouseDown: (data) ->
    @scene.fire "engine:gamepad:mouse:down", data unless not @config.trackMouse

  onMouseUp: (data) ->
    @scene.fire "engine:gamepad:mouse:up", data unless not @config.trackMouse

  update: (dt) ->
    @gamepad.update dt

  destroy: () ->
    @gamepad.off "press", @buttonPressFunction
    @gamepad.off "release", @buttonReleaseFunction
    @gamepad.off "repeat", @buttonRepeatFunction
    @gamepad.off "mousedown", @mouseDownFunction
    @gamepad.off "mouseup", @mouseUpFunction
    delete @buttonPressFunction
    delete @buttonReleaseFunction
    delete @buttonRepeatFunction
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
    @keyRepeatEvents = false

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
    if @keyRepeatEvents
      @trackers[button].push nv.keypress key + 32, () =>
        return unless @state[button]
        @fireButton(button, "repeat")
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

  destroy: () ->
    # Nothing Yet

nv.gamepad = () ->
  new nv.Gamepad