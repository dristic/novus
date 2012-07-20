window.onload = () ->
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  square = new gl.square
    color: '#0F0'
    y: 30

  glcanvas.draw square

  nv.keydown nv.Key.A, () ->
    glcanvas.context.clear()
    square.x -= 10
    glcanvas.draw square

  nv.keydown nv.Key.S, () ->
    glcanvas.context.clear()
    square.y += 10
    glcanvas.draw square

  nv.keydown nv.Key.D, () ->
    glcanvas.context.clear()
    square.x += 10
    glcanvas.draw square

  nv.keydown nv.Key.W, () ->
    glcanvas.context.clear()
    square.y -= 10
    glcanvas.draw square