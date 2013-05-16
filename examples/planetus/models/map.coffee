class models.Map extends nv.Model

  constructor: (options) ->
    super options

    @changeLocation @startMap if nv.gameConfig.map[@startMap]

    @viewOrigin = new nv.Point(0,0)
    @viewSize = new nv.Point(10,7)
    @objects = {}

  top: () ->
    @viewOrigin.y
  bottom: () ->
    @viewOrigin.y + @viewSize.y - 1
  left: () ->
    @viewOrigin.x
  right: () ->
    @viewOrigin.x + @viewSize.x - 1

  # findReplace: (find, replace, layer = 1) ->
  #   fr = -1
  #   fc = -1
  #   for row, i in @layers[layer]
  #     break unless fc is -1
  #     for col, j in row
  #       break unless fc is -1
  #       if col is find
  #         fr = i
  #         fc = j

  #   @replace fr, fc, replace, layer

  #   idx = @layers[layer].indexOf(find)
  #   @replace idx, replace, layer

  # replace: (row, col, replace, layer = 1) ->
  #   @layers[layer][row][col] = replace
  #   @layers[layer] = @layers[layer].substr(0,idx) + replace + @layers[layer].substr(idx+1)

  changeLocation: (location) ->
    @mapName = location

    @layers = []
    $.each ["layer0","layer1"], (layer) =>
      grid = []
      $.each nv.gameConfig.map[location].tiles["layer#{layer}"], (idx, row) ->
        grid.push row.split("")
      @layers.push grid

    #@layers = [nv.gameConfig.map[location].tiles.layer0.join(""), nv.gameConfig.map[location].tiles.layer1.join("")]
    @mapSize = nv.gameConfig.map[location].size

    @exitPoints = {}
    self = this
    for name, path of nv.gameConfig.map[location].paths
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
    # start = @findPathEntrance next
    @shiftMapTo start
    start

  placeObject: (object, layer) ->
    location = object.location()
    @layers[layer][location.y][location.x] = object.symbol()
    @objects[object.symbol()].location = location.clone()

  moveObject: (object, layer) ->
    oldLocation = @objects[object.symbol()].location
    @layers[layer][oldLocation.y][oldLocation.x] = @emptySpace
    @placeObject object, layer

  addObject: (object, layer = 1) ->
    @objects[object.symbol()] = 
      object: object
    @placeObject object, layer

  updateObject: (object, layer = 1) ->
    @moveObject object, layer

  locationToExitPointId: (location) ->
    "xp#{location.x}x#{location.y}".replace(/-/g,"N")

  spot: (location, layer = 1) ->
    exitPt = @locationToExitPointId(location)
    if @exitPoints[exitPt] isnt undefined
      return @exitPoints[exitPt]

    return null if location.x < 0 || location.x >= @mapSize.x || location.y < 0 || location.y >= @mapSize.y
    # idx = location.y * @mapSize.x + location.x
    # if @layers[layer].charAt(idx) is " " then "free" else "collision"
    if @layers[layer][location.y][location.x] is " " then "free" else "collision"

  shiftMap: (dx, dy) ->
    return false if (dx < 0 && @viewOrigin.x == 0) || (dx > 0 && @viewOrigin.x + @viewSize.x > @mapSize.x - 1) || (dy < 0 && @viewOrigin.y == 0) || (dy > 0 && @viewOrigin.y + @viewSize.y > @mapSize.y - 1)
    @viewOrigin.translate dx, dy
    true

  shiftMapTo: (pt) ->
    x = pt.x - @viewSize.x
    y = pt.y - @viewSize.y

    x = 0 if x < 0
    y = 0 if y < 0

    @viewOrigin = new nv.Point x,y