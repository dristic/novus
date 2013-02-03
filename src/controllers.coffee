class ShipController extends nv.Controller
  constructor: (@asset) ->
    super arguments...

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.left then @asset.rotation -= 0.1
    if state.right then @asset.rotation += 0.1
    if state.up
      @asset.y -= @asset.speed * Math.cos(@asset.rotation)
      @asset.x += @asset.speed * Math.sin(@asset.rotation)
    if state.down
      @asset.y += @asset.speed / 2 * Math.cos(@asset.rotation)
      @asset.x -= @asset.speed / 2 * Math.sin(@asset.rotation)


class BulletController extends nv.Controller
  constructor: (@ship) ->
    super arguments...

    @assets = []
    @shotDelay = 10

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.shoot and @shotDelay is 0
      @assets.push new nv.assets.Bullet @ship.x, @ship.y, @ship.rotation
      #// fire new bullet model event
      @shotDelay = 10

    @shotDelay-- if @shotDelay

    $.each @assets, (index, asset) ->
      asset.x += asset.speed * Math.sin(asset.angle) * dt
      asset.y -= asset.speed * Math.cos(asset.angle) * dt

      if asset.x < -100 or asset.x > 900
        if asset.y < -100 or asset.y > 900
          #// fire delete bullet model event unless asset.alive
          asset.alive = false

    @assets = @assets.filter (asset) ->
      asset.alive


class AsteroidController extends nv.Controller
  constructor: (@assets) ->
    super arguments...

  update: (dt) ->
    $.each @assets, (index, asset) ->
      asset.x += Math.sin(asset.direction) * asset.speed
      asset.y += Math.cos(asset.direction) * asset.speed


$(() ->
  nv.controllers =
    ShipController: ShipController
    BulletController: BulletController
    AsteroidController: AsteroidController
)
