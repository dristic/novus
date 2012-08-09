#<< common
#<< nub
#<< gleam

window.onload = () ->
  # Setup network connection
  # connection = nub()

  # id = Math.random()
  # connection.auth 'Dan#{id}'

  # Setup gl canvas
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  bg = new gl.drawable
    draw: (context, canvas) ->
      context.drawImage bg.canvas.canvas, @x, @y

  bg.canvas = gl().size 700, 700
  bg.x = 0
  bg.y = 0

  i = 0
  until i > 100
    i++
    x = Math.random() * 700
    y = Math.random() * 700
    radius = (Math.random() * 2) + 0.5
    bg.canvas.context.fillPath (context) ->
      context.color '#FFFFFF'
      context.arc x, y, radius, 0, Math.PI * 2, true

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
  speed = 5

  update = () ->
    if left then square.rotation -= 0.1
    if right then square.rotation += 0.1
    if up
      square.y -= speed * Math.cos(square.rotation)
      square.x += speed * Math.sin(square.rotation)
    if down
      square.y += speed / 2 * Math.cos(square.rotation)
      square.x -= speed / 2 * Math.sin(square.rotation)

    # Boundary Wrapping
    dimensions = glcanvas.size()
    if square.x < 0 then square.x = dimensions.height
    else if square.x > dimensions.height then square.x = 0

    if square.y < 0 then square.y = dimensions.height
    else if square.y > dimensions.height then square.y = 0

    bg.x = -square.x * 0.05
    bg.y = -square.y * 0.05

    glcanvas.context.clear()
    glcanvas.draw bg
    glcanvas.draw square

  nv.animationUpdate 60, update

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