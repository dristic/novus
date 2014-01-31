class scenes.Main extends nv.Scene
  constructor: (game, options) ->
    super game, options

    @loadEngine nv.TimingEngine
    @loadEngine nv.GamepadEngine, config.gamepad
    @loadEngine nv.RenderingEngine, config.graphics
    @loadEngine nv.DebugEngine

    @loadMap config.maps.main

    @on "engine:gamepad:press:shoot", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
