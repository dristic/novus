class models.Map extends nv.Model

  constructor: (options) ->
    super options

    @changeLocation @startMap if nv.gameConfig.map[@startMap]

    @viewOrigin = new nv.Point(0,0)
    @viewSize = new nv.Point(10,7)

  top: () ->
    @viewOrigin.y
  bottom: () ->
    @viewOrigin.y + @viewSize.y - 1
  left: () ->
    @viewOrigin.x
  right: () ->
    @viewOrigin.x + @viewSize.x - 1

  findReplace: (find, replace, layer = 1) ->
    idx = @layers[layer].indexOf(find)
    @replace idx, replace, layer

  replace: (idx, replace, layer = 1) ->
    @layers[layer] = @layers[layer].substr(0,idx) + replace + @layers[layer].substr(idx+1)

  changeLocation: (location) ->
    @mapName = location
    @layers = [nv.gameConfig.map[location].tiles.layer0.join(""), nv.gameConfig.map[location].tiles.layer1.join("")]
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

  # findPathEntrance: (locName) ->
  #   pathId = @paths.indexOf(locName)
  #   idx = @layers[1].indexOf "#{pathId}"
  #   new nv.Point idx % @mapSize.x, Math.floor(idx / @mapSize.x)

  addObject: (object, layer = 1) ->
    location = object.location()
    idx = location.y * @mapSize.x + location.x
    @replace idx, object.symbol(), layer

  updateObject: (object, layer = 1) ->
    @findReplace object.symbol(), " ", layer
    @addObject object, layer

  locationToExitPointId: (location) ->
    "xp#{location.x}x#{location.y}".replace(/-/g,"N")

  spot: (location, layer = 1) ->
    exitPt = @locationToExitPointId(location)
    if @exitPoints[exitPt] isnt undefined
      return @exitPoints[exitPt]

    return null if location.x < 0 || location.x >= @mapSize.x || location.y < 0 || location.y >= @mapSize.y
    idx = location.y * @mapSize.x + location.x
    if @layers[layer].charAt(idx) is " " then "free" else "collision"

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