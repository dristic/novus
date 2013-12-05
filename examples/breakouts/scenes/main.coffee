class scenes.Main extends nv.Scene
  constructor: (name, game) ->
    super name, game
    
    @loadEngine nv.TimingEngine
    @loadEngine nv.GamepadEngine, breakout.config.gamepad
    @loadEngine nv.RenderingEngine, breakout.config.graphics
    @loadEngine nv.DebugEngine

    @loadMap breakout.maps.main

    @on "engine:gamepad:down:activate", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
