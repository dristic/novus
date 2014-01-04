class scenes.Game extends nv.Scene
  constructor: (game, options = {}) ->
    super game, options

    renderingConfig = nv.clone breakout.config.graphics
    renderingConfig.mouseMove = true

    @loadEngine nv.TimingEngine
    @loadEngine nv.GamepadEngine, breakout.config.gamepad
    @loadEngine nv.RenderingEngine, renderingConfig
    @loadEngine nv.PhysicsEngine
    @loadEngine nv.DebugEngine

    @loadMap breakout.maps.game

    # Spawn the level
    @fire "spawn:level", 'level1'

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
