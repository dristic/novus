class nv.GamepadEngine extends nv.Engine
  constructor: (scene) ->
    super scene

    @gamepad = scene.gamepad
    @options = scene.options

    @gamepad.trackMouse() unless not @options.trackMouse

    for key of @options.keys
      @gamepad.aliasKey key, @options.keys[key]
      @updateFunction = nv.bind(this, @onButtonPress)
      @gamepad.onButtonPress key, @updateFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:#{button}"

  destroy: () ->
    for key of @options.keys
      @gamepad.offButtonPress key, @updateFunction
    delete @gamepad
    delete @options

    super