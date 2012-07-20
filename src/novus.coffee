window.onload = () ->
  glcanvas = gl 'canvas'

  glcanvas.size 500, 500
  glcanvas.background '#000'

  square = new gl.square
    color: '#0F0'
    y: 30

  glcanvas.draw square