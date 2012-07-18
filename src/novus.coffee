window.onload = () ->
  glcanvas = gl 'canvas'

  glcanvas.size 200, 200
  glcanvas.background '#000'

  square = new gl.drawable
    color: '#FFF'
    width: 100
    height: 150
    draw: (context) ->
      context.color @color
      context.fillRect 10, 10, @width, @height

  glcanvas.draw square