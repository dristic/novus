class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    # rootModel.scenario = realms.gameConfig.scenarios.pvp.twoByThree

    super name, game, rootModel

    @send "engine:timing:start"

    @on "game:over", (result) =>
      @rootModel.set 'result', result
      @fire "scene:close"
      @game.openScene 'Gameover'

    new nv.SoundFactory().wire this, @rootModel.config.scenes.game.soundfx

  destroy: () ->
    @send "engine:timing:stop"
    super
