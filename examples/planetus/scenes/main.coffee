class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    # Start the scene (we use send here because nothing is updating yet)
    @send "engine:timing:start"