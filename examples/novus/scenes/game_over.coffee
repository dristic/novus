class scenes.GameOver extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      keys:
        start: nv.Key.Spacebar
      trackMouse: false

    @useEngine "TimingEngine"
    @useEngine "RenderingEngine"
    @useEngine "GamepadEngine"
    @useEngine "SoundEngine"
    @useEngine "ParticleEngine"
    @useEngine "DebugEngine"

    @addEntities entities.Background,
      entities.Background,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid

    @on "engine:gamepad:press:shoot", () =>
      @game.closeScene "GameOver"
      @game.openScene 'Game', @glcanvas

    @send "engine:timing:start"

  destroy: () ->
    super