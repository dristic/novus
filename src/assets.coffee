class Bg
  constructor: () ->
    @canvas = gl().size 700, 700
    @x = 0
    @y = 0

    i = 0
    until i > 100
      i++
      x = Math.random() * 700
      y = Math.random() * 700
      radius = (Math.random() * 2) + 0.5
      @canvas.context.fillPath (context) ->
        context.color '#FFFFFF'
        context.arc x, y, radius, 0, Math.PI * 2, true

  draw: (context, canvas) ->
    context.drawImage @canvas, @x, @y

class Bullet
  constructor: (x, y, angle) ->
    @drawable = new gl.drawable
    @x = x
    @y = y
    @angle = angle
    @speed = 400
    @radius = 3

  update: (dt) ->
    @x += @speed * Math.sin(@angle) * dt
    @y -= @speed * Math.cos(@angle) * dt

    if @x < -100 or @x > 900
      if @y < -100 or @y > 900
        @delete = true

  draw: (context) ->
    context.fillPath (context) =>
      context.color '#ff7600'
      context.arc @x, @y, @radius, 0, Math.PI * 2, true

class Ship
  constructor: () ->
    @drawable = new gl.square
    @color = '#0F0'
    @x = 0
    @y = 30
    @width = 12
    @height = 18
    @rotation = 0
    @strokeWidth = 2

  draw: (context) ->
    context.strokeColor '#FFF'
    context.strokeWidth @strokeWidth

    context.rotateAround @x + (@width / 2), @y + (@height / 2), @rotation, () =>
      context.line @x, @y + @height,
        @x + (@width / 2), @y,
        @x + @width, @y + @height,
        @x, @y + @height

$(() ->
  nv.assets =
    Ship: Ship
    Bullet: Bullet
    Bg: Bg
)