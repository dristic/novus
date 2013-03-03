class nv.GamepadEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config

    @gamepad = config.gamepad

    @gamepad.trackMouse() unless not @config.trackMouse

    for key of @config.keys
      @gamepad.aliasKey key, @config.keys[key]
      @updateFunction = nv.bind(this, @onButtonPress)
      @gamepad.onButtonPress key, @updateFunction

  onButtonPress: (button) ->
    @scene.fire "engine:gamepad:#{button}"

  destroy: () ->
    for key of @config.keys
      @gamepad.offButtonPress key, @updateFunction
    delete @gamepad
    delete @config

    super