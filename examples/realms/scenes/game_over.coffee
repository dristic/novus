class scenes.Gameover extends nv.Scene
  constructor: (name, game, rootModel) ->
    rootModel.scenario = realms.gameConfig.scenarios.pvp.twoByTwo

    super name, game, rootModel

    @on "engine:gamepad:mouse:down", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @resultText = @getEntityById 'result-text'
    if rootModel.get('result') is "win"
      @resultText.model.set 'text', "You Win!"
    else
      @resultText.model.set 'text', "You Lose..."

    @send "engine:timing:start"

  destroy: () ->
    @send "engine:timing:stop"
    super
