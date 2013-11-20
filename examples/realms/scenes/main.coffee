class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    # load the 2x2 game model for background only
    rootModel.scenario = realms.gameConfig.scenarios.pvp.twoBy2

    super name, game, rootModel

    @send "engine:timing:start"

  "event(engine:ui:clicked)": (btn) ->
    if realms.gameConfig.scenarios.pvp[btn.id]?
      @rootModel.scenario = realms.gameConfig.scenarios.pvp[btn.id]
      @fire "scene:close"
      @game.openScene 'Game'

  destroy: () ->
    @send "engine:timing:stop"
    super
