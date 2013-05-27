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

  "event(engine:editor:map:create)": (data) ->

  "event(engine:editor:map:update)": (data) ->

  "event(engine:editor:map:delete)": (data) ->

  getCurrentMapEntity: () ->
    @getEntity(entities.Map)

  getCurrentMapRenderer: () ->
    @getCurrentMapEntity().renderer

  getCurrentMapModel: () ->
    @getCurrentMapEntity().model

  "event(engine:editor:map:get)": () ->
    @getEngine(nv.EditorEngine).sendMessage 'map:name', @getCurrentMapModel().currentMapName()

  "event(engine:editor:tile:put)": (data) ->
    location = @getCurrentMapRenderer().mapCoordsToLocation data.x, data.y, data.layer
    @getCurrentMapModel().swapTile location, data.tile, data.layer
