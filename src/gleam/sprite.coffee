class gleam.Sprite
  constructor: (options) ->
    defaults =
      src: ''
      x: 10
      y: 10
      width: null
      height: null
      origin: null
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

    @loaded = false
    @image = gleam.image.get @src, (width, height) =>
      @width = width unless @width
      @height = height unless @height
      @loaded = true

  draw: (context, canvas) ->
    unless not @loaded
      unless @origin
        context.drawImage @image, @x, @y, @width, @height
      else
        context.drawImage @image, @origin.x, @origin.y, @origin.width, @origin.height, @x, @y, @width, @height
