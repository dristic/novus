window.renderers = renderers = {}

class renderers.Hud extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    context.strokeColor @entity.model.color
    context.strokeRect @entity.model.x, @entity.model.y, @entity.model.width, @entity.model.height

class renderers.Bullet extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    context.fillPath (context) =>
      context.color @entity.model.color
      context.arc @entity.model.x, @entity.model.y, @entity.model.radius, 0, Math.PI * 2, true

class renderers.Background extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @canvas = gl().size 700, 700
    @canvas.width = entity.model.width
    @canvas.height = entity.model.height

    @glcanvas = scene.get 'canvas'

    i = 0
    until i > 100
      i++
      x = Math.random() * 700
      y = Math.random() * 700
      radius = (Math.random() * 2) + 1
      @canvas.context.fillPath (context) ->
        gradient = context.createRadialGradient x, y, 0, x, y, radius
        gradient.addColorStop 0, "white"
        gradient.addColorStop 0.4, "white"
        gradient.addColorStop 0.4, "white"
        gradient.addColorStop 1, "black"
        context.color gradient
        context.arc x, y, radius, 0, Math.PI * 2, true

  draw: (context, canvas) ->
    context.globalCompositeOperation = "lighter"

    camX = -@glcanvas.camera.x
    camY = -@glcanvas.camera.y

    startX = camX + ((@entity.model.x - camX) % @entity.model.width)
    startY = camY + ((@entity.model.y - camY) % @entity.model.height)

    if startX > camX then startX -= @entity.model.width
    if startY > camY then startY -= @entity.model.height

    curX = startX
    curY = startY

    while curX < camX + @glcanvas.width
      while curY < camY + @glcanvas.height
        context.drawImage @canvas, curX, curY
        curY += @entity.model.height

      curY = startY
      curX += @entity.model.width

    context.globalCompositeOperation = "source-over"
