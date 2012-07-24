window.onload = () ->
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  square = new gl.square
    color: '#0F0'
    y: 30
    width: 50
    height: 50

  square.draw = (context) ->
    context.strokeColor '#FFF'
    context.strokeWidth 4
    context.beginPath()
    context.moveTo @x, @y
    context.lineTo @x + (@width / 2), @y - @height
    context.lineTo @x + @width, @y
    context.lineTo @x, @y
    context.stroke()
    context.closePath()

  glcanvas.draw square

  up = down = left = right = false

  update = () ->
    if left then square.x -= 10
    if right then square.x += 10
    if up then square.y -= 10
    if down then square.y += 10

    glcanvas.context.clear()
    glcanvas.draw square

  setInterval update, (1 / 60) * 1000

  nv.keydown nv.Key.A, () ->
    left = true

  nv.keyup nv.Key.A, () ->
    left = false

  nv.keydown nv.Key.S, () ->
    down = true

  nv.keyup nv.Key.S, () ->
    down = false

  nv.keydown nv.Key.D, () ->
    right = true

  nv.keyup nv.Key.D, () ->
    right = false

  nv.keydown nv.Key.W, () ->
    up = true

  nv.keyup nv.Key.W, () ->
    up = false