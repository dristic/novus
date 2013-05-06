class models.Map extends nv.Model

  constructor: (options) ->
    super options

    @layers = [ nv.gameConfig.map[@startLocation].tiles.layer0.join(""), nv.gameConfig.map[@startLocation].tiles.layer1.join("") ]

    @mapSize = nv.gameConfig.map[@startLocation].size
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

  addObject: (object, layer = 1) ->
    location = object.location()
    idx = location.y * @mapSize.x + location.x
    @replace idx, object.symbol(), layer

  updateObject: (object, layer = 1) ->
    @findReplace object.symbol(), " ", layer
    @addObject object, layer

  spot: (location, layer = 1) ->
    return null if location.x < 0 || location.x >= @mapSize.x || location.y < 0 || location.y >= @mapSize.y
    idx = location.y * @mapSize.x + location.x
    @layers[layer].charAt(idx)

  shiftMap: (dx, dy) ->
    return false if (dx < 0 && @viewOrigin.x == 0) || (dx > 0 && @viewOrigin.x + @viewSize.x > @mapSize.x - 1) || (dy < 0 && @viewOrigin.y == 0) || (dy > 0 && @viewOrigin.y + @viewSize.y > @mapSize.y - 1)
    @viewOrigin.translate dx, dy
    true