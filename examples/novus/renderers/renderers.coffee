window.renderers = renderers = {}

class renderers.StrokeText extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    @alpha = 1
    @direction = "out"
    super scene, entity

  draw: (context, canvas) ->
    context.save()
    context.color @entity.model.color
    context.strokeColor @entity.model.strokeColor ? @entity.model.color
    context.setFont @entity.model.font
    context.strokeWidth @entity.model.strokeWidth
    context.shadowColor = @entity.model.strokeColor ? @entity.model.color
    context.shadowBlur = @entity.model.shadowBlur

    context.color "#00000000"
    context.globalAlpha = @alpha
    context.fillText @entity.model.text, @entity.model.x, @entity.model.y
    context.strokeText @entity.model.text, @entity.model.x, @entity.model.y
    context.restore()

  update: (dt) ->
    if @entity.model.fade is true
      if @direction is "out"
        @alpha -= @entity.model.fadeSpeed
        @direction = "in" unless @alpha > 0 + @entity.model.fadeSpeed
      else if @direction is "in"
        @alpha += @entity.model.fadeSpeed
        @direction = "out" unless @alpha < 1

class renderers.Hud extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    context.save()
    context.shadowColor = @entity.model.color
    context.shadowBlur = 5
    context.strokeColor @entity.model.color
    context.strokeRect @entity.model.x, @entity.model.y, @entity.model.width, @entity.model.height
    context.restore()

    context.save()
    context.translate(-@scene.glcanvas.camera.x, -@scene.glcanvas.camera.y)
    context.font = @entity.model.font
    context.strokeColor @entity.model.color
    score = @entity.model.score.toString()
    textWidth = context.measureText(score).width
    context.strokeText score, @entity.model.width - textWidth - 20 ,  50

    $.each @entity.model.ships, () ->
      data = []
      points = this.path()
      $.each points, () ->
        data.push this.x, this.y
      data.push points[0].x, points[0].y
      context.strokeColor this.strokeColor
      context.strokeWidth this.strokeWidth
      context.line.apply(context, data)
    context.restore()

class renderers.Bullet extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    context.fillPath (context) =>
      context.color @entity.model.color
      context.arc @entity.model.x, @entity.model.y, @entity.model.radius, 0, Math.PI * 2, true

class renderers.Ship extends nv.PathRenderingPlugin
  constuctor: (scene, entity) ->
    super scene, entity

  #draw: (context, canvas) ->
  #  super context, canvas


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
