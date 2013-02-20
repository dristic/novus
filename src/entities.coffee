window.entities = entities = {}

class entities.Background extends nv.Entity
  constructor: (scene, @follow, @variance) ->
    super scene, [renderers.Background], new models.Background

  update: (dt) ->
    unless not @follow
      @model.x = @follow.model.x * @variance
      @model.y = @follow.model.y * @variance

class entities.Title extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.TextRenderingPlugin],
      color: "#0F0"
      x: 200
      y: 200
      font: "bold 20px sans-serif"
      text: "Asteroids"

class entities.ActionText extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.TextRenderingPlugin],
      color: "#0F0"
      x: 200
      y: 400
      font: "bold 20px sans-serif"
      text: "Press <Space> to Start"

class entities.Cursor extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gl.square

    @gamepad = @scene.gamepad

  update: (dt) ->
    state = @gamepad.getState()

    @model.drawable.x = state.mouse.x
    @model.drawable.y = state.mouse.y

class WrappingEntity extends nv.Entity
  constructor: (args...) ->
    super args...

  wrap: () ->
    # Boundary Wrapping
    dimensions = @scene.get('canvas').size()

    if @model.x < 0 then @model.x = dimensions.width
    else if @model.x > dimensions.width then @model.x = 0

    if @model.y < 0 then @model.y = dimensions.height
    else if @model.y > dimensions.height then @model.y = 0

class entities.Ship extends WrappingEntity
  constructor: (scene) ->
    super scene, [nv.PathRenderingPlugin], new models.Ship

    @scene.on 'collision:Ship:Asteroid', (data) =>
      console.log "ship hit asteroid"
      @scene.dispatcher.fire 'delete:Ship',
        asset: data.actor

    @scene.on 'engine:gamepad:shoot', () =>
      @fireBullet.call this

  fireBullet: () ->
    @scene.addEntity entities.Bullet, @model.path()[0], @model.rotation

  update: (dt) ->
    state = @scene.gamepad.getState()
    if state.left then @model.rotate -0.1
    if state.right then @model.rotate 0.1
    if state.up
      @model.translate @model.speed * Math.sin(@model.rotation), -@model.speed * Math.cos(@model.rotation)
    if state.down
      @model.translate -@model.speed/2 * Math.sin(@model.rotation), @model.speed/2 * Math.cos(@model.rotation)
    @model.thrusters = state.up

    @wrap()

class entities.Asteroid extends WrappingEntity
  constructor: (scene) ->
    super scene, [nv.PathRenderingPlugin], new models.Asteroid 500, 500

    @scene.on 'collision:Ship:Asteroid', (data) =>
      console.log "asteroid hit by ship"
      @destoryAsteroid data.target

    @scene.on 'collision:Bullet:Asteroid', (data) =>
      console.log "asteroid hit by bullet"
      @destoryAsteroid data.target

  update: (dt) ->
    @model.rotation += @model.rotationSpeed
    @model.translate Math.sin(@model.direction) * @model.speed, Math.cos(@model.direction) * @model.speed

    @wrap()

class entities.Bullet extends WrappingEntity
  constructor: (scene, point, rotation) ->
    super scene, [renderers.Bullet], new models.Bullet point, rotation

    @scene.on 'collision:Bullet:Asteroid', (data) =>
      console.log "bullet hit asteroid"
      @scene.dispatcher.fire 'delete:Bullet',
        asset: data.actor

  update: (dt) ->
    @model.translate @model.speed * Math.sin(@model.angle) * dt, -1 * @model.speed * Math.cos(@model.angle) * dt

    if @model.x < -100 or @model.x > 900
      if @model.y < -100 or @model.y > 900
        @model.alive = false

    @model.life--
    if @model.life is 0
      @model.alive = false

      @scene.fire "entity:remove", this
    else
      @wrap()

class entities.Hud extends nv.Entity
  constructor: (scene) ->
    canvas = scene.get('canvas')

    super scene, [renderers.Hud],
      color: '#FFF'
      x: 0
      y: 0
      width: canvas.width
      height: canvas.height