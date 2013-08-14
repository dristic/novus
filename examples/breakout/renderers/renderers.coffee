window.renderers = renderers = {}

class renderers.StrokeText extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    @alpha = 1
    @direction = "out"
    super scene, entity

  draw: (context, canvas) ->
    context.save()
    context.setFillStyle @entity.model.color
    context.setStrokeStyle @entity.model.strokeColor ? @entity.model.color
    context.setFont @entity.model.font
    context.setStrokeWidth @entity.model.strokeWidth
    context.shadowColor = @entity.model.strokeColor ? @entity.model.color
    context.shadowBlur = @entity.model.shadowBlur

    x = @entity.model.x
    y = @entity.model.y

    context.setFillStyle "rgba(0, 0, 0, 0)"
    context.globalAlpha = @alpha
    segments = if nv.isArray(@entity.model.text)
      @entity.model.text
    else
      [ @entity.model.text ]

    model = @entity.model
    for segment in segments
      unless typeof(x) is "number"
        size = context.canvas.getSize()
        switch x
          when "left" then x = 0
          when "right", "center" 
            textWidth = context.measureText(segment).width
            switch x
              when "right" then x = size.width - textWidth
              when "center" then x = (size.width * 0.5) - (textWidth * 0.5)
          else
            x = size.width * (parseFloat(x) / 100)

      context.fillText segment, x, y
      context.strokeText segment, x, y
      y += model.lineHeight if model.lineHeight
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

    @camera = scene.getEngine(nv.RenderingEngine).camera

  draw: (context, canvas) ->
    context.save()
    context.shadowColor = @entity.model.color
    context.shadowBlur = 5
    context.setStrokeStyle @entity.model.color
    context.strokeRect @entity.model.x, @entity.model.y, @entity.model.width, @entity.model.height
    context.restore()

    context.save()
    context.translate(-@camera.x, -@camera.y)
    context.setFont @entity.model.font
    context.setStrokeStyle @entity.model.color
    score = @entity.model.score.toString()
    textWidth = context.measureText(score).width
    context.strokeText score, @entity.model.width - textWidth - 20 ,  50

    for ship in @entity.model.ships
      data = []
      self = ship
      points = ship.points('ship')
      for point in points
        data.push point.x + self.x, point.y + self.y
      data.push points[0].x + ship.x, points[0].y + ship.y
      context.setStrokeStyle ship.strokeColor
      context.setStrokeWidth ship.strokeWidth
      context.path.apply(context, data)
    context.restore()

class renderers.Bullet extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    context.fillPath (context) =>
      context.setFillStyle @entity.model.color
      context.arc @entity.model.x, @entity.model.y, @entity.model.radius, 0, Math.PI * 2, true

class renderers.Ship extends nv.PathRenderingPlugin
  constuctor: (scene, entity) ->
    super scene, entity

  #draw: (context, canvas) ->
  #  super context, canvas


class renderers.Background extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @canvas = new gleam.Canvas
    @canvas.setSize 700, 700
    @canvas.width = entity.model.width
    @canvas.height = entity.model.height

    renderingEngine = scene.getEngine(nv.RenderingEngine)
    @rootCanvas = renderingEngine.canvas
    @camera = renderingEngine.camera

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
        context.setFillStyle gradient
        context.arc x, y, radius, 0, Math.PI * 2, true

  draw: (context, canvas) ->
    context.globalCompositeOperation = "lighter"

    camX = -@camera.x
    camY = -@camera.y

    startX = camX + ((@entity.model.x - camX) % @entity.model.width)
    startY = camY + ((@entity.model.y - camY) % @entity.model.height)

    if startX > camX then startX -= @entity.model.width
    if startY > camY then startY -= @entity.model.height

    curX = startX
    curY = startY

    while curX < camX + @rootCanvas.width
      while curY < camY + @rootCanvas.height
        context.drawImage @canvas.source, curX, curY
        curY += @entity.model.height

      curY = startY
      curX += @entity.model.width

    context.globalCompositeOperation = "source-over"
