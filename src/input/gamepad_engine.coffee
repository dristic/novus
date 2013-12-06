class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @state =
      mouse:
        x: -1
        y: -1
    @buttons = {}

    for key of @config.keys
      if nv.isArray @config.keys[key]
        for button in @config.keys[key]
          @setButton key, button
      else
        @setButton key, @config.keys[key]

  onMouseDown: (button, x, y, event) ->
    @state.mouse.x = x
    @state.mouse.y = y

    if button is 0
      button = nv.Key.Mouse1
    else
      button = nv.Key.Mouse2

    @onKeyDown(button, event)

  onMouseUp: (button, x, y, event) ->
    @state.mouse.x = x
    @state.mouse.y = y

    if button is 0
      button = nv.Key.Mouse1
    else
      button = nv.Key.Mouse2

    @onKeyUp(button, event)

  onMouseMove: (x, y, event) ->
    @state.mouse.x = x
    @state.mouse.y = y

  onKeyDown: (key, event) ->
    buttons = @buttons[key]
    if buttons?
      for button in buttons
        @state[button] = true
        @scene.fire "engine:gamepad:down:#{button}"

  onKeyUp: (key, event) ->
    buttons = @buttons[key]
    if buttons?
      for button in buttons
        @state[button] = false
        @scene.fire "engine:gamepad:up:#{button}"

  setButton: (button, key) ->
    @buttons[key] = [] unless @buttons[key]
    @buttons[key].push button

  unsetButton: (button, key) ->
    if @buttons[key]?
      @buttons[key].splice @buttons[key].indexOf(button), 1

  getState: () ->
    @state

  update: (dt) ->
    # Do nothing

  destroy: () ->
    super

    delete @state
    delete @buttons

class nv.TouchTargetPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @pressed = false

    @scene.on "engine:gamepad:mouse:down", (event) =>
      if @entity.model.bounds.contains new nv.Point(event.x, event.y)
        @pressed = true
        @scene.fire "engine:gamepad:press:#{@entity.model.action}"

    @scene.on "engine:gamepad:mouse:up", (event) =>
      if @pressed
        @pressed = false
        @scene.fire "engine:gamepad:release:#{@entity.model.action}"

# #######
# Deprecated class
# ########
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
    @origin = document
    @ratio = 1 # Current screen ratio to convert screen units into game units

  setRatio: (ratio) ->
    @ratio = ratio

  # Sets the element that we use to calculate mouse position offset
  setOrigin: (origin) ->
    @origin = origin

  toGameCoords: (x, y) ->
    if @origin.getBoundingClientRect
      rect = @origin.getBoundingClientRect()
      x -= rect.left
      y -= rect.top

    x /= @ratio
    y /= @ratio

    {
      x: x
      y: y
    }

  trackMouse: () ->
    @state.mouse =
      x: -1
      y: -1
      down: false

    nv.mousedown document, (event) =>
      @state.mouse = @toGameCoords event.clientX, event.clientY
      @state.mouse.down = true
      @send "mousedown", @state.mouse

    nv.mouseup document, (event) =>
      @state.mouse = @toGameCoords event.clientX, event.clientY
      @state.mouse.down = false
      @send "mouseup", @state.mouse

    nv.mousemove document, (event) =>
      @state.mouse = @toGameCoords event.clientX, event.clientY

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
