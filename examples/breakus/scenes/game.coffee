class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    @level = 1
    @createEntities nv.gameConfig.levels["level#{@level}"].entities

    # Start the scene (we use send here because nothing is updating yet)
    @send "engine:timing:start"

  "event(game:over)": () ->
    console.log "game over"
