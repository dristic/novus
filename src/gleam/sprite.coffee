class gleam.Sprite
  constructor: (options) ->
    defaults =
      src: ''
      x: 10
      y: 10
      width: null
      height: null
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

    @loaded = false
    @image = new Image
    @image.onload = () =>
      @width = @image.width unless @width
      @height = @image.height unless @height
      @loaded = true
    @image.src = @src

  draw: (context, canvas) ->
    context.drawImage @image, @x, @y, @width, @height unless not @loaded