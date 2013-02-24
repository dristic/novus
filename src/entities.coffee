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
    super scene, [nv.PathRenderingPlugin, nv.PathPhysicsPlugin], new models.Ship

    @scene.on 'engine:collision:Ship:Asteroid', (data) =>
      #@scene.fire "entity:remove", this

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
  constructor: (scene, options = {}) ->
    scale = options.scale ? Math.ceil(Math.random() * 4)
    super scene, [nv.PathRenderingPlugin, nv.PathPhysicsPlugin], new models.Asteroid options.x || 500 * Math.random(), options.y || 500 * Math.random(), scale, options.direction

    @scene.on 'engine:collision:Ship:Asteroid', (data) =>
      @handleCollision data if data.target is this
    @scene.on 'engine:collision:Bullet:Asteroid', (data) =>
      @handleCollision data if data.target is this

  handleCollision: (data) ->
    @scene.fire "entity:remove", data.target

    size = data.target.model.get('size') - 1 
    unless size is 0
      options = 
        entity: entities.Asteroid
        x: data.target.model.get('x')
        y: data.target.model.get('y')
        scale: size
        direction: data.target.model.get('direction') - 0.3
      @scene.fire 'entity:add', options
      options.direction += 0.6
      @scene.fire 'entity:add', options

  update: (dt) ->
    @model.rotation += @model.rotationSpeed
    @model.translate Math.sin(@model.direction) * @model.speed, Math.cos(@model.direction) * @model.speed

    @wrap()

class entities.Bullet extends WrappingEntity
  constructor: (scene, point, rotation) ->
    super scene, [renderers.Bullet, nv.PathPhysicsPlugin], new models.Bullet point, rotation

    @scene.on 'engine:collision:Bullet:Asteroid', (data) =>
      @scene.fire "entity:remove", data.actor if data.actor is this


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