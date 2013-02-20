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

# class BackgroundRenderer extends nv.ObjectRenderer
#   constructor: (@glcanvas, asset) ->
#     super arguments...

#     @zIndex = @nextZIndex()

#     @canvas = gl().size 700, 700

#     @asset.width = @canvas.width
#     @asset.height = @canvas.height

#     i = 0
#     until i > 100
#       i++
#       x = Math.random() * 700
#       y = Math.random() * 700
#       radius = (Math.random() * 2) + 1
#       @canvas.context.fillPath (context) ->
#         gradient = context.createRadialGradient x, y, 0, x, y, radius
#         gradient.addColorStop 0, "white"
#         gradient.addColorStop 0.4, "white"
#         gradient.addColorStop 0.4, "white"
#         gradient.addColorStop 1, "black"
#         context.color gradient
#         context.arc x, y, radius, 0, Math.PI * 2, true

#   draw: (context, canvas) ->
#     context.globalCompositeOperation = "lighter"

#     camX = -@glcanvas.camera.x
#     camY = -@glcanvas.camera.y

#     startX = camX + ((@asset.x - camX) % @asset.width)
#     startY = camY + ((@asset.y - camY) % @asset.height)

#     if startX > camX then startX -= @asset.width
#     if startY > camY then startY -= @asset.height

#     curX = startX
#     curY = startY

#     while curX < camX + @glcanvas.width
#       while curY < camY + @glcanvas.height
#         context.drawImage @canvas, curX, curY
#         curY += @asset.height

#       curY = startY
#       curX += @asset.width

#     context.globalCompositeOperation = "source-over"

# class BulletRenderer extends nv.ObjectListRenderer
#   constructor: (@scene, @glcanvas) ->
#     super @glcanvas, []

#     @scene.dispatcher.on 'new:Bullet', (event) =>
#       @add event.asset

#     @scene.dispatcher.on 'delete:Bullet', (event) =>
#       @remove event.asset

#   draw: (context) ->
#     $.each @assets, (index, asset) ->
#       context.fillPath (context) =>
#         context.color '#ff7600'
#         context.arc asset.x, asset.y, asset.radius, 0, Math.PI * 2, true

#     @assets = @assets.filter (asset) ->
#       asset.alive

# class ShipRenderer extends nv.ObjectRenderer
#   constructor: (glcanvas, ship) ->
#     super arguments...

#     @color = '#FFF'
#     @strokeWidth = 2

#   draw: (context) ->
#     context.strokeColor @color
#     context.strokeWidth @strokeWidth

#     points = @asset.path()
#     context.beginPath()
#     context.strokeColor @color
#     context.strokeWidth 2
#     context.moveTo points[0].x, points[0].y

#     $.each points.slice(1), () ->
#       context.lineTo this.x, this.y

#     context.lineTo points[0].x, points[0].y

#     context.stroke()
#     context.closePath()

# class AsteroidRenderer extends nv.ObjectListRenderer
#   constructor: (@scene, @glcanvas) ->
#     super @glcanvas, @scene.getModel('asteroids').items
#     @color = '#FFF'
#     @strokeWidth = 2

#     @scene.dispatcher.on 'delete:Asteroid', (data) =>
#       @remove data.asset

#   draw: (context) ->
#     $.each @assets, (index, asset) =>
#       context.strokeColor @color
#       context.strokeWidth @strokeWidth

#       points = asset.path()
#       context.beginPath()
#       context.strokeColor @color
#       context.strokeWidth 2
#       context.moveTo points[0].x, points[0].y

#       $.each points.slice(1), () ->
#         context.lineTo this.x, this.y

#       context.lineTo points[0].x, points[0].y

#       context.stroke()
#       context.closePath()

#       context.strokeRect asset.x, asset.y, 2, 2

#       bounds = asset.bounds()
#       context.beginPath()
#       context.strokeColor "yellow"
#       context.strokeWidth 1
#       context.moveTo bounds.x, bounds.y
#       context.lineTo bounds.x, bounds.y2
#       context.lineTo bounds.x2, bounds.y2
#       context.lineTo bounds.x2, bounds.y
#       context.lineTo bounds.x, bounds.y
#       context.stroke()
#       context.closePath()


# class HudRenderer extends nv.ObjectRenderer
#   constructor: (@glcanvas, hud) ->
#     super arguments...

#     @ship = new nv.models.Ship
#     @shipRenderer = new nv.renderers.ShipRenderer @glcanvas, @ship

#   draw: (context) ->
#     context.strokeColor @color
#     context.strokeRect @asset.x, @asset.y, @asset.width, @asset.height

#     context.fillStyle = '#F00'
#     context.font = 'italic bold 30px sans-serif'
#     context.textBaseline = 'bottom'
#     context.fillText "Asteroids", -@glcanvas.camera.x + 20, -@glcanvas.camera.y + 50

#     context.fillStyle = '#FFF'
#     context.font = 'bold 30px sans-serif'
#     context.textBaseline = 'bottom'
#     dimensions = @glcanvas.size()
#     context.fillText @asset.score, 
#       -@glcanvas.camera.x + dimensions.width - 120, 
#       -@glcanvas.camera.y + dimensions.height - 10

#     # Draw ships for the number of lives.
#     num = @asset.lives
#     while num--
#       @ship.x = -@glcanvas.camera.x + 180 + (num * 30)
#       @ship.y = -@glcanvas.camera.y + 25
#       @shipRenderer.draw context

#     this

# class MainRenderer extends nv.ObjectRenderer
#   constructor: (@glcanvas, @model) ->
#     super arguments...

#     @title = new gl.text
#       color: "#F00"
#       x: 200
#       y: 200
#       font: "bold 20px sans-serif"
#       text: @model.title

#     @actionText = new gl.text
#       color: "#F00"
#       x: 200
#       y: 300
#       font: "bold 20px sans-serif"
#       text: @model.actionText

#   draw: (context) ->
#     @title.draw context
#     @actionText.draw context

# $(() ->
#   nv.renderers =
#     ShipRenderer: ShipRenderer
#     BulletRenderer: BulletRenderer
#     BackgroundRenderer: BackgroundRenderer
#     AsteroidRenderer: AsteroidRenderer
#     HudRenderer: HudRenderer
#     MainRenderer: MainRenderer
# )