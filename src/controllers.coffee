# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
# wrap = (asset, glcanvas) ->
#   # Boundary Wrapping
#   dimensions = glcanvas.size()

#   if asset.x < 0 then asset.x = dimensions.width
#   else if asset.x > dimensions.width then asset.x = 0

#   if asset.y < 0 then asset.y = dimensions.height
#   else if asset.y > dimensions.height then asset.y = 0

# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
class BulletController extends nv.Controller
  constructor: (@scene) ->
    super null

    @ship = @scene.getModel('ship')
    @assets = []
    @depletedAssets= []
    @shotDelay = 10

    @scene.dispatcher.on 'collision:Bullet:Asteroid', (data) =>
      console.log "bullet hit asteroid"
      @scene.dispatcher.fire 'delete:Bullet',
        asset: data.actor

  update: (dt) ->
    state = @scene.gamepad.getState()
    if state.shoot and @shotDelay is 0
      bullet = new nv.models.Bullet @ship.nose(), @ship.rotation
      @assets.push bullet
      @scene.dispatcher.fire 'new:Bullet',
        asset: bullet
      @shotDelay = 10

    @shotDelay-- if @shotDelay

    $.each @assets, (index, asset) =>
      asset.translate asset.speed * Math.sin(asset.angle) * dt, -1 * asset.speed * Math.cos(asset.angle) * dt
      #asset.x += asset.speed * Math.sin(asset.angle) * dt
      #asset.y -= asset.speed * Math.cos(asset.angle) * dt

      if asset.x < -100 or asset.x > 900
        if asset.y < -100 or asset.y > 900
          asset.alive = false

      asset.life--
      if asset.life is 0
        asset.alive = false
        @depletedAssets.push asset unless asset.alive
      else
        wrap asset, @scene.glcanvas

    @assets = @assets.filter (asset) ->
      asset.alive

    $.each @depletedAssets, (index, asset) =>
      @scene.dispatcher.fire 'delete:Bullet',
        asset: asset
    @depletedAssets = []

# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
# class AsteroidController extends nv.Controller
#   constructor: (@scene) ->
#     super null

#     @assets = @scene.getModel('asteroids').items

#     @scene.dispatcher.on 'collision:Ship:Asteroid', (data) =>
#       console.log "asteroid hit by ship"
#       @destoryAsteroid data.target

#     @scene.dispatcher.on 'collision:Bullet:Asteroid', (data) =>
#       console.log "asteroid hit by bullet"
#       @destoryAsteroid data.target

#   destoryAsteroid: (obj) ->
#     @scene.dispatcher.fire 'delete:Asteroid',
#       asset: obj
#     @assets = @assets.filter (asset) ->
#       asset.id isnt obj.id


#   update: (dt) ->
#     $.each @assets, (index, asset) =>
#       asset.rotation += asset.rotationSpeed
#       asset.translate Math.sin(asset.direction) * asset.speed, Math.cos(asset.direction) * asset.speed

#       wrap asset, @scene.glcanvas

# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
# class ShipController extends nv.Controller
#   constructor: (@scene) ->
#     super @scene.getModel('ship')

#     @speed = 5
#     @shootDelay = 10

#     @scene.dispatcher.on 'collision:Ship:Asteroid', (data) =>
#       console.log "ship hit asteroid"
#       @scene.dispatcher.fire 'delete:Ship',
#         asset: data.actor

#   update: (dt) ->
#     state = @scene.gamepad.getState()
#     if state.left then @asset.rotate -0.1
#     if state.right then @asset.rotate 0.1
#     if state.up
#       @asset.translate @speed * Math.sin(@asset.rotation), -@speed * Math.cos(@asset.rotation)
#     if state.down
#       @asset.translate -@speed/2 * Math.sin(@asset.rotation), @speed/2 * Math.cos(@asset.rotation)
#     @asset.thrusters = state.up

#     wrap @asset, @scene.glcanvas

    # Shooting
    # if state.shoot and @shootDelay is 0
    #   @canvas.addDrawable new nv.models.Bullet @asset.x, @asset.y, @asset.rotation
    #   @shootDelay = 10

    # if @shootDelay then @shootDelay--

# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
# class GamePhysicsController extends nv.Controller
#   constructor: (@scene) ->
#     super null
#     @passiveObjects = {}
#     @activeObjects = {}

#     @scene.dispatcher.on 'delete:Bullet', (data) =>
#       console.log "[GPC] delete bullet"
#       @removeObject data.asset

#     @scene.dispatcher.on 'delete:Ship', (data) =>
#       console.log "[GPC] delete ship"
#       #@removeObject data.asset

#     @scene.dispatcher.on 'delete:Asteroid', (data) =>
#       console.log "[GPC] delete Asteroid"
#       @removeObject data.asset

#     @scene.dispatcher.on 'new:Bullet', (data) =>
#       console.log '[GPC] track new bullet'
#       @trackObject data.asset

#   trackObjects: (array) ->
#     self = this
#     $.each array, () ->
#       self.trackObject this

#   trackObject: (obj) ->
#     switch obj.type
#       when 'passive' then @passiveObjects[obj.id] = obj
#       when 'active' then @activeObjects[obj.id] = obj
#       when 'both'
#         @passiveObjects[obj.id] = obj
#         @activeObjects[obj.id] = obj

#   removeObject: (obj) ->
#     switch obj.type
#       when 'passive' then delete @passiveObjects[obj.id]
#       when 'active' then delete @activeObjects[obj.id]
#       when 'both'
#         delete @passiveObjects[obj.id]
#         delete @activeObjects[obj.id]

#   update: (dt) ->
#     for ida, obja of @activeObjects
#       objaBounds = obja.bounds()
#       for idp, objp of @passiveObjects
#         continue if ida is idp
#         if objp.bounds().intersects(objaBounds)
#           @scene.dispatcher.fire "collision:#{obja.constructor.name}:#{objp.constructor.name}",
#             actor: obja
#             target: objp

# *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
# $(() ->
#   nv.controllers =
#     ShipController: ShipController
#     BulletController: BulletController
#     AsteroidController: AsteroidController
#     GamePhysicsController: GamePhysicsController
# )