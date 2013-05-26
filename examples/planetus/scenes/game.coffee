class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    # Start the scene (we use send here because nothing is updating yet)
    @send "engine:timing:start"

    @assetLoadCount = 0

  "event(asset:loading)": (data) ->
    @assetLoadCount += data.count

  "event(asset:loaded)": (data) ->
    @assetLoadCount -= data.count
    console.log "asset: ", @assetLoadCount
    @fire "game:start" if @assetLoadCount is 0

  "event(game:start)": () ->
    console.log "game start"
    # @fire "refresh:map"
    @fire "engine:rendering:draw"

  "event(game:over)": () ->
    console.log "game over"


  "event(entity:create:Map)": () ->

  "event(entity:create:Player)": () ->

  "event(engine:rendering:create)": () ->