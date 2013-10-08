class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    rootModel.scenario = realms.gameConfig.scenarios.pvp.two

    super name, game, rootModel

    @on "engine:gamepad:mouse:up", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
