class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    @level = 1
    @createEntities rootModel.config.levels["level#{@level}"].entities

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    super