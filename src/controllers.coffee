class BulletController extends nv.Controller
  constructor: (@ship) ->
    super arguments...

    @assets = []
    @shotDelay = 10

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.shoot and @shotDelay is 0
      bullet = new nv.models.Bullet @ship.x, @ship.y, @ship.rotation
      @assets.push bullet
      $(document).trigger 'new:bullet',
        asset: bullet
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

class ShipController extends nv.Controller
  constructor: (asset, @canvas) ->
    super arguments...

    @speed = 5
    @shootDelay = 10

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.left then @asset.rotation -= 0.1
    if state.right then @asset.rotation += 0.1
    if state.up
      @asset.y -= @speed * Math.cos(@asset.rotation)
      @asset.x += @speed * Math.sin(@asset.rotation)
    if state.down
      @asset.y += @speed / 2 * Math.cos(@asset.rotation)
      @asset.x -= @speed / 2 * Math.sin(@asset.rotation)

    # Shooting
    # if state.shoot and @shootDelay is 0
    #   @canvas.addDrawable new nv.models.Bullet @asset.x, @asset.y, @asset.rotation
    #   @shootDelay = 10

    # if @shootDelay then @shootDelay--

$(() ->
  nv.controllers =
    ShipController: ShipController
    BulletController: BulletController
    AsteroidController: AsteroidController
)