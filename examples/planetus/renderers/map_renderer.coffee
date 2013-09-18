class renderers.MapRenderer extends nv.RenderingPlugin

  constructor: (scene, entity) ->
    super scene, entity

    @tiles = {}
    @objects = {}
    @assetsLoaded = false
    @showGrid = false

    @scene.fire "asset:loading",
      count: Object.keys(nv.gameConfig.tiles).length
    @loadImage code, tile for code, tile of nv.gameConfig.tiles

    @tileWidth = entity.model.tileWidth
    @tileHeight = entity.model.tileHeight
    @tileVOffset = entity.model.tileVOffset

  loadImage: (code, tile) ->
    img = new Image()
    img.onload = () => @scene.fire "asset:loaded", { "count": 1 }
    img.onerror = () => console.log img.src
    img.src = tile
    @tiles[code] = img

  assetsLoadingComplete: () ->
    @assetsLoaded = true

  showGrid: (show) ->
    @showGrid = show

  editLayer: (layer) ->
    @editLayer = layer

  mapCoordsToLocation: (x, y, layer) ->
    vo = @entity.model.viewOrigin
    vs = @entity.model.viewSize
    ms = @entity.model.mapSize

    horzOffset = Math.floor((vs.x - ms.x) / 2)
    horzOffset = 0 if horzOffset < 0

    left = Math.floor(x / @tileWidth) - horzOffset
    top = Math.floor((y - 150 - @tileHeight + @tileVOffset) / @tileVOffset)
    console.log "test", x, y, (y-150-@tileHeight+@tileVOffset)/@tileVOffset
    new nv.Point(left,top)

  draw: (context, canvas) ->
    return unless @assetsLoaded
    
    vo = @entity.model.viewOrigin
    vs = @entity.model.viewSize
    ms = @entity.model.mapSize

    # when the map is not as wide/tall as viewport
    dsx = Math.min(vs.x, ms.x)
    dsy = Math.min(vs.y, ms.y)

    context.clearRect()

    horzOffset = Math.floor((vs.x - ms.x) / 2)
    horzOffset = 0 if horzOffset < 0

    $.each @entity.model.layers, (layerIdx, layer) =>
      # idx = 0
      width = vs.x

      for i in [vo.y .. vo.y + dsy - 1]
        row = layer[i]
        for j in [vo.x .. vo.x + dsx - 1]
          key = row[j]
          xpos = j - vo.x + horzOffset
          ypos = i - vo.y
          x = (xpos % width) * @tileWidth
          y = (layerIdx * -40) + (ypos * @tileVOffset) + 150 # (i*-43) + 
          console.log y

          # key = layer[i * ms.x + col]
          context.drawImage @tiles[key], x, y if key isnt " "
          if @showGrid
            context.setStrokeStyle "red"
            context.setStrokeWidth "2px"
            context.strokeRect x, y, @tileWidth, @tileVOffset 
          # idx++
