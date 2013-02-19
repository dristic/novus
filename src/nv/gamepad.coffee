class nv.GamepadEngine extends nv.Engine
  constructor: (scene) ->
    super scene

    @gamepad = scene.gamepad
    @options = scene.options

    @gamepad.trackMouse() unless not @options.trackMouse

    for key of @options.keys
      @gamepad.aliasKey key, @options.keys[key]
      @gamepad.onButtonPress key, (button) =>
        @scene.fire "engine:gamepad:#{button}"
