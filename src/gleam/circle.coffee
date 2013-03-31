# Gleam.Circle
gleam.Circle = (options) ->
  defaults =
    color: '#CCC'
    width: 10
    height: 10
    x: 10
    y: 10
  options = options ? {}
  gleam.extend defaults, options
  gleam.extend this, defaults
  this

gleam.extend gleam.Circle.prototype,
  draw: (context, canvas) ->
    context.beginPath()
    context.arc(@x + @width/2, @y + @height/2, @width/2, 0, 2 * Math.PI, false)
    context.fillStyle = @color
    context.fill()
    context.closePath()