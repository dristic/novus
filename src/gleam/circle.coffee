class gleam.Circle
  constructor: (options) ->
    defaults =
      color: '#CCC'
      width: 10
      height: 10
      x: 10
      y: 10
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

  draw: (context, canvas) ->
    context.beginPath()
    context.arc(@x + @width/2, @y + @height/2, @width/2, 0, 2 * Math.PI, false)
    context.fillStyle = @color
    context.fill()
    context.closePath()

  destroy: () ->
    delete @color
