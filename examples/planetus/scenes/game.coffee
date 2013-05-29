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
    @fire "game:start" if @assetLoadCount is 0

  "event(game:start)": () ->
    console.log "game start"
    @refreshMap()

  "event(game:over)": () ->
    console.log "game over"

  refreshMap: () ->
    @fire "engine:rendering:draw"

  getCurrentMapEntity: () ->
    @getEntity(entities.Map)

  getCurrentMapRenderer: () ->
    @getCurrentMapEntity().renderer

  getCurrentMapModel: () ->
    @getCurrentMapEntity().model

  "event(entity:create:Map)": () ->

  "event(entity:create:Player)": () ->

  "event(engine:rendering:create)": () ->

  "event(engine:editor:map:create)": (data) ->

  "event(engine:editor:map:update)": (data) ->
    model = @getCurrentMapModel()
    data =
      tiles: {}

    for layer, index in model.layers
      name = "layer#{index}"
      layerData = []
      for rowData in layer
        layerData.push rowData.join('')
      data.tiles[name] = layerData

    data = JSON.stringify data

    nv.ajax '/editor/update', 'PUT', data, () ->
      console.log 'Success!'

  "event(engine:editor:map:delete)": (data) ->

  "event(engine:editor:map:get)": () ->
    @getEngine(nv.EditorEngine).sendMessage 'map:name', @getCurrentMapModel().currentMapName()

  "event(engine:editor:tile:put)": (data) ->
    # debugger
    location = @getCurrentMapRenderer().mapCoordsToLocation data.x, data.y, data.layer
    console.log location.x, location.y
    @getCurrentMapModel().swapTile location, data.tile, data.layer
    @refreshMap()

  "event(engine:editor:map:grid": (data) ->
    @getCurrentMapRenderer().showGrid data.grid
    @refreshMap()

  "event(engine:editor:map:limitlevel": (data) ->
    @getCurrentMapRenderer().levelLimit data.level
    @refreshMap()


