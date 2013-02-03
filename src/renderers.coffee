class BackgroundRenderer extends nv.ObjectRenderer
  constructor: (glcanvas, asset) ->
    super arguments...

  draw: (context) ->
    context.drawImage @asset.canvas, @asset.x, @asset.y


class BulletRenderer extends nv.ObjectListRenderer
  constructor: (glcanvas, bullets) ->
    super arguments...

  draw: (context) ->
    $.each @assets, (index, asset) ->
      context.fillPath (context) =>
        context.color '#ff7600'
        context.arc asset.x, asset.y, asset.radius, 0, Math.PI * 2, true


class ShipRenderer extends nv.ObjectRenderer
  constructor: (glcanvas, ship) ->
    super arguments...

    @color = '#FFF'
    @strokeWidth = 2

  draw: (context) ->
    context.strokeColor @color
    context.strokeWidth @strokeWidth

    context.rotateAround @asset.x + (@asset.width / 2), @asset.y + (@asset.height / 2), @asset.rotation, () =>
      context.line @asset.x, @asset.y + @asset.height,
        @asset.x + (@asset.width / 2), @asset.y,
        @asset.x + @asset.width, @asset.y + @asset.height,
        @asset.x, @asset.y + @asset.height


class AsteroidRenderer extends nv.ObjectListRenderer
  constructor: (glcanvas, assets) ->
    super arguments...
    @color = '#FFF'
    @strokeWidth = 2

  draw: (context) ->
    $.each @assets, (index, asset) =>
      context.fillPath (context) =>
        context.color 'rgba(0, 0, 0, 0)'
        context.strokeColor @color
        context.strokeWidth 2
        context.line asset.x, asset.y,
          asset.x + 30, asset.y + 20,
          asset.x + 35, asset.y + 50,
          asset.x + 23, asset.y + 60,
          asset.x - 10, asset.y + 50,
          asset.x - 20, asset.y + 15,
          asset.x, asset.y

$(() ->
  nv.renderers =
    ShipRenderer: ShipRenderer
    BulletRenderer: BulletRenderer
    BackgroundRenderer: BackgroundRenderer
    AsteroidRenderer: AsteroidRenderer
)