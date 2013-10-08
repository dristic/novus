class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    rootModel.scenario = realms.gameConfig.scenarios.pvp.two

    super name, game, rootModel

    @send "engine:timing:start"

    @on "scene:game:over", (result) =>
      @rootModel.set 'result', result
      @fire "scene:close"
      @game.openScene 'Gameover'

  destroy: () ->
    @send "engine:timing:stop"
    super
