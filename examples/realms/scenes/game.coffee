class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    rootModel.scenario = realms.gameConfig.scenarios.pvp.two

    super name, game, rootModel

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
