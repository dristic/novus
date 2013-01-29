class AsteroidController extends nv.Controller
  constructor: () ->
    super arguments...

    @speed = 0.3
    @direction = (Math.random() * Math.PI) - (Math.PI / 2)

  update: (dt) ->
    @asset.x += Math.sin(@direction) * @speed
    @asset.y += Math.cos(@direction) * @speed

class ShipController extends nv.Controller
  constructor: (asset, @gamepad, @canvas) ->
    super arguments...

    @speed = 5
    @shootDelay = 10

  update: (dt) ->
    state = @gamepad.getState()
    if state.left then @asset.rotation -= 0.1
    if state.right then @asset.rotation += 0.1
    if state.up
      @asset.y -= @speed * Math.cos(@asset.rotation)
      @asset.x += @speed * Math.sin(@asset.rotation)
    if state.down
      @asset.y += @speed / 2 * Math.cos(@asset.rotation)
      @asset.x -= @speed / 2 * Math.sin(@asset.rotation)

    # Shooting
    if state.shoot and @shootDelay is 0
      @canvas.addDrawable new nv.assets.Bullet @asset.x, @asset.y, @asset.rotation
      @shootDelay = 10

    if @shootDelay then @shootDelay--

nv.controllers = nv.controllers ? {}
nv.controllers.AsteroidController = AsteroidController
nv.controllers.ShipController = ShipController