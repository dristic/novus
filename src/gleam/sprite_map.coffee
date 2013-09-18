class gleam.SpriteMap extends gleam.Sprite
  constructor: (options) ->
    super options

    defaults =
      tileWidth: 10
      tileHeight: 10
      width: 640
      height: 480
      data: [0, 1, 1, 0]
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    unless not @loaded
      x = 0
      y = 0
      index = -1

      while y < @height
        while x < @width
          cell = @data[++index]
          framesInARow = @image.width / @tileWidth
          tileX = (cell % framesInARow) * @tileWidth - @tileWidth
          tileY = Math.floor(cell / framesInARow) * @tileHeight

          context.drawImage @image, tileX, tileY, @tileWidth, @tileHeight, Math.floor(x + @x), Math.floor(y + @y), @tileWidth, @tileHeight

          x += @tileWidth
        y += @tileHeight
        x = 0
