window.onload = () ->
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  square = new gl.square
    color: '#0F0'
    y: 30
    width: 12
    height: 18
    rotation: 0
    strokeWidth: 2

  square.draw = (context) ->
    context.strokeColor '#FFF'
    context.strokeWidth @strokeWidth

    context.rotateAround @x + (@width / 2), @y + (@height / 2), @rotation, () =>
      context.line @x, @y + @height,
        @x + (@width / 2), @y,
        @x + @width, @y + @height,
        @x, @y + @height

  glcanvas.draw square

  up = down = left = right = false
  speed = 3

  update = () ->
    if left then square.rotation -= 0.1
    if right then square.rotation += 0.1
    if up
      square.y -= speed * Math.cos(square.rotation)
      square.x += speed * Math.sin(square.rotation)
    if down
      square.y += speed * Math.cos(square.rotation)
      square.x -= speed * Math.sin(square.rotation)

    # Boundary Wrapping
    dimensions = glcanvas.size()
    if square.x < 0 then square.x = dimensions.height
    else if square.x > dimensions.height then square.x = 0

    if square.y < 0 then square.y = dimensions.height
    else if square.y > dimensions.height then square.y = 0

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