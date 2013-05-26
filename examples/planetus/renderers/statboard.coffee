class renderers.StatBoard extends nv.RenderingPlugin

  constructor: (scene, entity) ->
    super scene, entity

    @items = entity.model.items
    @tiles = {}
    @assetsLoaded = false

    for code of @items
      @loadImage code, nv.gameConfig.tiles[code]

  loadImage: (code, tile) ->
    img = new Image()
    img.onload = () => @scene.fire "asset:loaded", { "count": 1 }
    img.onerror = () => console.log img.src
    img.src = tile
    @tiles[code] = img

  draw: (context, canvas) ->
    context.save()
    context.setFont "bold 40px courier"
    context.setStrokeStyle "white"
    context.setFillStyle "white"
    context.setStrokeWidth "5px"
    offset = 10
    for key,tile of @tiles
      if key is "H"
        for i in [1 .. @entity.model[@items[key]]]
          context.drawImage tile, offset, -10, tile.width/2, tile.height/2
          offset += tile.width/2
        offset += 300
      else
        context.drawImage tile, offset, -10, tile.width/2, tile.height/2
        offset += (tile.width/2) + 10
        context.strokeText @entity.model[@items[key]], offset, (tile.height/2) - 30
        offset += 150
    context.restore()