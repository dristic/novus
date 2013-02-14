class BackgroundRenderer extends nv.ObjectRenderer
  constructor: (@glcanvas, asset) ->
    super arguments...

  draw: (context, canvas) ->
    camX = -@glcanvas.camera.x
    camY = -@glcanvas.camera.y

    startX = camX + ((@asset.x - camX) % @asset.width)
    startY = camY + ((@asset.y - camY) % @asset.height)

    if startX > camX then startX -= @asset.width
    if startY > camY then startY -= @asset.height

    curX = startX
    curY = startY

    while curX < camX + @glcanvas.width
      while curY < camY + @glcanvas.height
        context.drawImage @asset.canvas, curX, curY
        curY += @asset.height

      curY = startY
      curX += @asset.width

class BulletRenderer extends nv.ObjectListRenderer
  constructor: (glcanvas, bullets) ->
    super arguments...

    $(document).on 'new:bullet', (event) =>
      @add event.data.asset

  draw: (context) ->
    $.each @assets, (index, asset) ->
      context.fillPath (context) =>
        context.color '#ff7600'
        context.arc asset.x, asset.y, asset.radius, 0, Math.PI * 2, true

    @assets = @assets.filter (asset) ->
      asset.alive

class ShipRenderer extends nv.ObjectRenderer
  constructor: (glcanvas, ship) ->
    super arguments...

    @color = '#FFF'
    @strokeWidth = 2

  draw: (context) ->
    context.strokeColor @color
    context.strokeWidth @strokeWidth

    points = @asset.path()
    context.beginPath()
    context.strokeColor @color
    context.strokeWidth 2
    context.moveTo points[0].x, points[0].y

    $.each points.slice(1), () ->
      context.lineTo this.x, this.y

    context.lineTo points[0].x, points[0].y

    context.stroke()
    context.closePath()

class AsteroidRenderer extends nv.ObjectListRenderer
  constructor: (glcanvas, assets) ->
    super arguments...
    @color = '#FFF'
    @strokeWidth = 2

  draw: (context) ->
    $.each @assets, (index, asset) =>
      context.strokeColor @color
      context.strokeWidth @strokeWidth

      points = asset.path()
      context.beginPath()
      context.strokeColor @color
      context.strokeWidth 2
      context.moveTo points[0].x, points[0].y

      $.each points.slice(1), () ->
        context.lineTo this.x, this.y

      context.lineTo points[0].x, points[0].y

      context.stroke()
      context.closePath()

      context.strokeRect asset.x, asset.y, 2, 2


class HudRenderer extends nv.ObjectRenderer
  constructor: (@glcanvas, hud) ->
    super arguments...

    @ship = new nv.models.Ship
    @shipRenderer = new nv.renderers.ShipRenderer @glcanvas, @ship

  draw: (context) ->
    context.strokeColor @color
    context.strokeRect @asset.x, @asset.y, @asset.width, @asset.height

    context.fillStyle = '#F00'
    context.font = 'italic bold 30px sans-serif'
    context.textBaseline = 'bottom'
    context.fillText "Asteroids", -@glcanvas.camera.x + 20, -@glcanvas.camera.y + 50

    context.fillStyle = '#FFF'
    context.font = 'bold 30px sans-serif'
    context.textBaseline = 'bottom'
    dimensions = @glcanvas.size()
    context.fillText @asset.score, 
      -@glcanvas.camera.x + dimensions.width - 120, 
      -@glcanvas.camera.y + dimensions.height - 10

    # Draw ships for the number of lives.
    num = @asset.lives
    while num--
      @ship.x = -@glcanvas.camera.x + 180 + (num * 30)
      @ship.y = -@glcanvas.camera.y + 25
      @shipRenderer.draw context

    this

$(() ->
  nv.renderers =
    ShipRenderer: ShipRenderer
    BulletRenderer: BulletRenderer
    BackgroundRenderer: BackgroundRenderer
    AsteroidRenderer: AsteroidRenderer
    HudRenderer: HudRenderer
)