class gleam.SpriteMap extends gleam.Sprite
  constructor: (options) ->
    super options

    defaults =
      tileWidth: 10
      tileHeight: 10
      data: [
        [0, 1, 1, 0]
      ]
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    unless not @loaded
      x = @x
      y = @y

      for row in @data
        for cell in row
          framesInARow = @image.width / @tileWidth
          tileX = (cell % framesInARow) * @tileWidth
          tileY = Math.floor(cell / framesInARow) * @tileHeight

          context.drawImage @image, tileX, tileY, @tileWidth, @tileHeight, x, y, @tileWidth, @tileHeight

          x += @tileWidth
        y += @tileHeight
        x = @x
