class scenes.Game extends nv.Scene
  constructor: (game, options = {}) ->
    super game, options

    @loadEngine nv.TimingEngine
    @loadEngine nv.GamepadEngine, breakout.config.gamepad
    @loadEngine nv.RenderingEngine, breakout.config.graphics
    @loadEngine nv.PhysicsEngine
    @loadEngine nv.DebugEngine

    @loadMap breakout.maps.game

    # Spawn the level
    @fire "spawn:level", 1

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
