class gleam.Sprite
  constructor: (options) ->
    defaults =
      src: ''
      x: 10
      y: 10
      width: null
      height: null
      frame: null
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

    @loaded = false
    @image = new Image
    @image.onload = () =>
      @width = @image.width unless @width
      @height = @image.height unless @height
      @loaded = true
    @image.src = @src

  setFrame: (x, y, width, height) ->
    @frame =
      x: x
      y: y
      width: width
      height: height

  getFrame: () ->
    @frame

  draw: (context, canvas) ->
    unless not @loaded
      if @frame
        context.drawImage @image, @frame.x, @frame.y, @frame.width, @frame.height, @x, @y, @width, @height
      else
        context.drawImage @image, @x, @y, @width, @height