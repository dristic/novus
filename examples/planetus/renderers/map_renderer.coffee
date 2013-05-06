class renderers.MapRenderer extends nv.RenderingPlugin

  constructor: (scene, entity) ->
    super scene, entity

    @tiles = {}
    @objects = {}

    @scene.fire "asset:loading",
      count: Object.keys(nv.gameConfig.tiles).length
    @loadImage code, tile for code, tile of nv.gameConfig.tiles

    @tileWidth = entity.model.tileWidth
    @tileVOffset = entity.model.tileVOffset

  loadImage: (code, tile) ->
    img = new Image()
    img.onload = () => @scene.fire "asset:loaded", { "count": 1 }
    img.src = tile
    @tiles[code] = img

  draw: (context, canvas) ->
    vo = @entity.model.viewOrigin
    vs = @entity.model.viewSize
    ms = @entity.model.mapSize

    context.clearRect()

    $.each @entity.model.layers, (i, layer) =>
      idx = 0
      width = vs.x

      for row in [vo.y .. vo.y + vs.y - 1]
        for col in [vo.x .. vo.x + vs.x - 1]
          xpos = col - vo.x
          ypos = row - vo.y
          x = (xpos % width) * @tileWidth
          y = (i*-43) + (ypos * @tileVOffset) + 100 

          key = layer[row * ms.x + col]
          context.drawImage @tiles[key], x, y if key isnt " "
          idx++

