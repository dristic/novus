class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    @send "engine:timing:start"

  update: (dt) ->
    super dt

  destroy: () ->
    @send "engine:timing:stop"
    super