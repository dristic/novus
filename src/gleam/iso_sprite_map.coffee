class gleam.IsoSpriteMap extends gleam.Sprite
  constructor: (options) ->
    super options

    defaults =
      tileWidth: 10
      tileHeight: 10
      width: 640
      height: 480
      x: 0
      y: 0
      data: [0, 1, 1, 0]
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  getTileFromScreenXY: (x, y) ->
    # Move to tile-based coordinates
    x = x - @x
    y = y - @y

    framesInARow = @width / @tileWidth
    tileX = Math.floor(x / @tileWidth)
    tileY = Math.floor(y / @tileHeight)

    tileIndex = tileX + (tileY * framesInARow)
    tile = @data[tileIndex]
    return tile

  draw: (context, canvas) ->
    unless not @loaded
      x = 0
      y = 0
      index = -1
      framesInARow = @image.width / @tileWidth
      halfWidth = @tileWidth / 2
      halfHeight = @tileHeight / 2

      while y < @height / @tileHeight
        while x < @width / @tileWidth
          cell = @data[++index]
          tileX = ((cell - 1) % framesInARow) * @tileWidth
          tileY = Math.floor((cell - 1) / framesInARow) * @tileHeight
          
          xPos = (@width / 2) + (halfWidth * x) - (halfWidth * y)
          yPos = (halfHeight * y) + (halfHeight * x)

          context.drawImage @image, tileX, tileY, @tileWidth, @tileHeight, Math.floor(xPos + @x), Math.floor(yPos + @y), @tileWidth, @tileHeight

          x++
        y++
        x = 0

