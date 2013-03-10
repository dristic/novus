class nv.GamepadEngine extends nv.Engine
  constructor: (scene) ->
    super scene

    @gamepad = scene.gamepad
    @options = scene.options

    @gamepad.trackMouse() unless not @options.gamepad.trackMouse

    for key of @options.gamepad.keys
      @gamepad.aliasKey key, @options.gamepad.keys[key]
      @updateFunction = nv.bind(this, @onButtonPress)
      @gamepad.onButtonPress key, @updateFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:#{button}"

  destroy: () ->
    for key of @options.gamepad.keys
      @gamepad.offButtonPress key, @updateFunction
    delete @gamepad
    delete @options

    super