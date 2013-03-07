class scenes.GameOver extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      keys:
        start: nv.Key.Spacebar
      trackMouse: false

    @addEntities entities.Background,
      entities.Background,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid

    @glcanvas.camera = nv.camera()
    @updateId = @glcanvas.startDrawUpdate 10, nv.bind(this, @update)

    @on "engine:gamepad:start", () =>
      @game.openScene 'Game', @glcanvas

  destroy: () ->
    @glcanvas.stopDrawUpdate(@updateId)
    super