class models.Map extends nv.Model

  constructor: (options) ->
    super options

    @changeLocation @startMap if nv.gameConfig.map[@startMap]

    # @viewOrigin = new nv.Point(0,0)
    # @viewSize = new nv.Point(10,7)
    @objects = {}

  top: () ->
    @viewOrigin.y
  bottom: () ->
    @viewOrigin.y + @viewSize.y - 1
  left: () ->
    @viewOrigin.x
  right: () ->
    @viewOrigin.x + @viewSize.x - 1

  currentMapName: () ->
    @mapName

  changeLocation: (location) ->
    @mapName = location
    @mapConfig = nv.gameConfig.map[location]

    if typeof @mapConfig.tiles is 'string'
      nv.ajax @mapConfig.tiles, (data) =>
        @mapConfig.tiles = JSON.parse(data).tiles
        nv.gameConfig.map[location] = JSON.parse(data).tiles

    @layers = []
    $.each ["layer0","layer1","layer2","layer3"], (layer) =>
      layerRows = @mapConfig.tiles["layer#{layer}"]
      return unless layerRows?
      grid = []
      $.each layerRows, (idx, row) ->
        grid.push row.split("")
      @layers.push grid

    @mapSize = @mapConfig.size

    @exitPoints = {}
    self = this
    for name, path of @mapConfig.paths
      $.each path.exits, (idx, exit) ->
        self.exitPoints[ self.locationToExitPointId(exit) ] = name

  createLocation: (location, size) ->  
    nv.gameConfig.map[location] = 
      name: location
      size: size
      layer0: []
      layer1: []
      paths: []

  jump: (toMap) ->
    start = nv.gameConfig.map[toMap].paths[@mapName].exits[0]
    @changeLocation toMap
    @shiftMapTo start
    start

  placeObject: (object, layer) ->
    location = object.location()
    @layers[layer][location.y][location.x] = object.symbol()
    # @objects[object.symbol()].location = location.clone()

  moveObject: (object, layer) ->
    oldLocation = object.previousLocation()
    @layers[layer][oldLocation.y][oldLocation.x] = @emptySpace
    @placeObject object, layer

  addObject: (object, layer = 1) ->
    @objects[object.symbol()] = object
    # object: object
    @placeObject object, layer

  updateObject: (object, layer = 1) ->
    @moveObject object, layer

  swapTile: (location, tile, layer = 1) ->
    @layers[layer][location.y][location.x] = tile

  locationToExitPointId: (location) ->
    "xp#{location.x}x#{location.y}".replace(/-/g,"N")

  testSpot: (location, layer = 1) ->
    exitPt = @locationToExitPointId(location)
    if @exitPoints[exitPt] isnt undefined
      return @exitPoints[exitPt]

    return null if location.x < 0 || location.x >= @mapSize.x || location.y < 0 || location.y >= @mapSize.y
    # idx = location.y * @mapSize.x + location.x
    # if @layers[layer].charAt(idx) is " " then "free" else "collision"
    if @layers[layer][location.y][location.x] is " " then "free" else "collision"

  spot: (location, layer = 1) ->
    @layers[layer][location.y][location.x]

  shiftMap: (dx, dy) ->
    return false if (dx < 0 && @viewOrigin.x == 0) || (dx > 0 && @viewOrigin.x + @viewSize.x > @mapSize.x - 1) || (dy < 0 && @viewOrigin.y == 0) || (dy > 0 && @viewOrigin.y + @viewSize.y > @mapSize.y - 1)
    @viewOrigin.translate dx, dy
    true

  shiftMapTo: (pt) ->
    x = pt.x - @viewSize.x + 1
    y = pt.y - @viewSize.y + 1

    x = 0 if x < 0
    y = 0 if y < 0

    @viewOrigin = new nv.Point x,y