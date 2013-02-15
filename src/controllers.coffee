class BulletController extends nv.Controller
  constructor: (@ship, @glcanvas) ->
    super arguments...

    @assets = []
    @shotDelay = 10

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.shoot and @shotDelay is 0
      #//console.log @ship.nose(), @ship.rotation
      bullet = new nv.models.Bullet @ship.nose(), @ship.rotation
      @assets.push bullet
      $(document).trigger 'new:bullet',
        asset: bullet
      @shotDelay = 10

    @shotDelay-- if @shotDelay

    $.each @assets, (index, asset) =>
      asset.x += asset.speed * Math.sin(asset.angle) * dt
      asset.y -= asset.speed * Math.cos(asset.angle) * dt

      if asset.x < -100 or asset.x > 900
        if asset.y < -100 or asset.y > 900
          #// fire delete bullet model event unless asset.alive
          asset.alive = false

      asset.life--

      asset.alive = false unless asset.life > 0

      wrap asset, @glcanvas

    @assets = @assets.filter (asset) ->
      asset.alive

wrap = (asset, glcanvas) ->
  # Boundary Wrapping
  dimensions = glcanvas.size()

  if asset.x < 0 then asset.x = dimensions.width
  else if asset.x > dimensions.width then asset.x = 0

  if asset.y < 0 then asset.y = dimensions.height
  else if asset.y > dimensions.height then asset.y = 0

class AsteroidController extends nv.Controller
  constructor: (@assets, @glcanvas) ->
    super arguments...

  update: (dt) ->
    $.each @assets, (index, asset) =>
      asset.rotation += asset.rotationSpeed
      asset.translate Math.sin(asset.direction) * asset.speed, Math.cos(asset.direction) * asset.speed

      wrap asset, @glcanvas

class ShipController extends nv.Controller
  constructor: (asset, @glcanvas) ->
    super arguments...

    @speed = 5
    @shootDelay = 10

  update: (dt, gamepad) ->
    state = gamepad.getState()
    if state.left then @asset.rotate -0.1
    if state.right then @asset.rotate 0.1
    if state.up
      @asset.translate @speed * Math.sin(@asset.rotation), -@speed * Math.cos(@asset.rotation)
    if state.down
      @asset.translate -@speed/2 * Math.sin(@asset.rotation), @speed/2 * Math.cos(@asset.rotation)
    @asset.thrusters = state.up

    wrap @asset, @glcanvas

    # Shooting
    # if state.shoot and @shootDelay is 0
    #   @canvas.addDrawable new nv.models.Bullet @asset.x, @asset.y, @asset.rotation
    #   @shootDelay = 10

    # if @shootDelay then @shootDelay--


class GamePhysicsController extends nv.Controller
  constructor: (@glcanvas) ->
    super arguments...
    @passiveObjects = {}
    @activeObjects = {}

  trackObjects: (array) ->
    self = this
    $.each array, () ->
      self.trackObject this

  trackObject: (obj) ->
    switch obj.type
      when 'passive' then @passiveObjects[obj.id] = obj
      when 'active' then @activeObjects[obj.id] = obj
      when 'both'
        @passiveObjects[obj.id] = obj
        @activeObjects[obj.id] = obj

  update: (dt) ->
    for ida, obja of @activeObjects
      objaBounds = obja.bounds()
      for idp, objp of @passiveObjects
        continue if ida is idp
        console.log "hit" if objp.bounds().intersects(objaBounds)


$(() ->
  nv.controllers =
    ShipController: ShipController
    BulletController: BulletController
    AsteroidController: AsteroidController
    GamePhysicsController: GamePhysicsController
)