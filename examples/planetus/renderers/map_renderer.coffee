class renderers.MapRenderer extends nv.RenderingPlugin

  constructor: (scene, entity) ->
    super scene, entity

    @tiles = {}
    @objects = {}
    @assetsLoaded = false

    @scene.fire "asset:loading",
      count: Object.keys(nv.gameConfig.tiles).length
    @loadImage code, tile for code, tile of nv.gameConfig.tiles

    @tileWidth = entity.model.tileWidth
    @tileVOffset = entity.model.tileVOffset

  loadImage: (code, tile) ->
    img = new Image()
    img.onload = () => @scene.fire "asset:loaded", { "count": 1 }
    img.onerror = () => console.log img.src
    img.src = tile
    @tiles[code] = img

  assetsLoadingComplete: () ->
    @assetsLoaded = true

  draw: (context, canvas) ->
    return unless @assetsLoaded
    
    vo = @entity.model.viewOrigin
    vs = @entity.model.viewSize
    ms = @entity.model.mapSize

    # when the map is not as wide/tall as viewport
    dsx = Math.min(vs.x, ms.x)
    dsy = Math.min(vs.y, ms.y)

    context.clearRect()

    $.each @entity.model.layers, (layerIdx, layer) =>
      # idx = 0
      width = vs.x

      for row, i in layer[vo.y .. vo.y + dsy - 1]
        for key, j in row[vo.x .. vo.x + dsx - 1]
          xpos = j - vo.x
          ypos = i - vo.y
          x = (xpos % width) * @tileWidth
          y = (layerIdx * -40) + (ypos * @tileVOffset) + 100 # (i*-43) + 

          # key = layer[i * ms.x + col]
          context.drawImage @tiles[key], x, y if key isnt " "
          # idx++

