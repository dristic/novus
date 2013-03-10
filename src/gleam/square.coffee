class gleam.Square
  constructor: (options) ->
    defaults =
      color: '#CCC'
      width: 10
      height: 10
      x: 10
      y: 10
    options = options ? {}
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    context.setFillStyle @color
    context.fillRect @x, @y, @width, @height
