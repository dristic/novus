class scenes.GameOver extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    @on "engine:gamepad:press:shoot", () =>
      @game.closeScene "Gameover"
      @game.openScene 'Game'

    @send "engine:timing:start"

  destroy: () ->
    super
