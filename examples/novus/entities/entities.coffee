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
    super scene, [renderers.StrokeText],
      color: "#000"
      strokeColor: "#0F0"
      x: 200
      y: 320
      font: "bold italic 50px sans-serif"
      text: "Novus"
      strokeWidth: 2
      shadowBlur: 20

    @direction = "out"

  update: (dt) ->
    if @direction is "out"
      @model.shadowBlur -= 0.2
      @direction = "in" unless @model.shadowBlur > 0
    else if @direction is "in"
      @model.shadowBlur += 0.2
      @direction = "out" unless @model.shadowBlur < 20

class entities.ActionText extends nv.Entity
  constructor: (scene) ->
    super scene, [renderers.StrokeText],
      color: "#0F0"
      x: 200
      y: 400
      font: "bold 20px sans-serif"
      text: "Press <Space> to Start"
      strokeWidth: 0
      shadowBlur: 0
      fade: true
      fadeSpeed: 0.02

  update: (dt) ->
    @plugins[0].update dt

class entities.Cursor extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gleam.Square

    @gamepad = @scene.gamepad

  update: (dt) ->
    state = @gamepad.getState()

    @model.drawable.x = state.mouse.x
    @model.drawable.y = state.mouse.y

class WrappingEntity extends nv.Entity
  constructor: (scene, pluginClasses, model) ->
    super scene, pluginClasses, model

    @canvas = @scene.getEngine(nv.RenderingEngine).canvas

  wrap: () ->
    # Boundary Wrapping
    dimensions = @canvas.getSize()

    if @model.x < 0 then @model.x = dimensions.width
    else if @model.x > dimensions.width then @model.x = 0

    if @model.y < 0 then @model.y = dimensions.height
    else if @model.y > dimensions.height then @model.y = 0

class entities.Ship extends WrappingEntity
  constructor: (scene) ->
    super scene, [renderers.Ship, nv.PathPhysicsPlugin, nv.GravityPhysicsPlugin], new models.Ship

    @scene.on 'engine:collision:Ship:Asteroid', (data) =>
      @scene.fire "entity:destroyed:Ship", this
      #@scene.fire "entity:remove", this

    @scene.on 'engine:gamepad:press:shoot', () =>
      @fireBullet.call this

    @maxVelocity = 3

    @scene.send "engine:particle:create_emitter",
      position: new nv.Point(450, 300)
      particlesPerSecond: 200
      colors: new nv.Gradient([
        new nv.Color(255, 100, 100, 1),
        new nv.Color(150, 50, 50, 1),
        new nv.Color(0, 0, 0, 0)
      ])
      gravity: new nv.Point(0, 0)
      particleLife: 0.1
      angleVariation: 0.75
      minVelocity: 700
      maxVelocity: 700
      id: 2

    @emitter = @scene.getEngine(nv.ParticleEngine).getEmitter(2)

  fireBullet: () ->
    @scene.addEntity entities.Bullet, @model.path()[0], @model.rotation

  update: (dt) ->
    state = @scene.gamepad.getState()
    if state.left then @model.rotate -0.1
    if state.right then @model.rotate 0.1
    if state.up
      @model.velocity = Math.min(@model.velocity * 1.01 || 1, @maxVelocity)
      unless @model.velocity >= @maxVelocity
        @model.thrustVector.translate @model.velocity * Math.sin(@model.rotation) * dt * 4, -@model.velocity * Math.cos(@model.rotation) * dt * 4
    @model.thrusters = state.up
    @model.velocity = 0 unless @model.thrusters
    @model.translate @model.thrustVector.x, @model.thrustVector.y
    @scene.fire "entity:thrust:Ship" if @model.thrusters

    anchor = @model.path("thrusters")[0]
    @emitter.set 'position', new nv.Point(anchor.x, anchor.y)
    if @model.thrusters
      @emitter.set 'on', true
      @emitter.set 'angle', @model.rotation + (Math.PI * 0.5)
    else
      @emitter.set 'on', false

    @wrap()

  destroy: () ->
    super

class entities.Asteroid extends WrappingEntity
  constructor: (scene, options = {}) ->
    scale = options.scale ? Math.ceil(Math.random() * 4)
    screen = scene.get('canvas').getSize()
    x = options.x || screen.width * Math.random()
    y = options.y || screen.height * Math.random()
    super scene, [nv.PathRenderingPlugin, nv.PathPhysicsPlugin], new models.Asteroid(x, y, scale, options.direction)

    @scene.on 'engine:collision:Ship:Asteroid', (data) =>
      @handleCollision data if data.target is this
    @scene.on 'engine:collision:Bullet:Asteroid', (data) =>
      @handleCollision data if data.target is this

  handleCollision: (data) ->
    @scene.fire "entity:destroyed:Asteroid", data.target 
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
    canvas = scene.canvas

    ships = [ new models.Ship, (new models.Ship).translate(25,0), (new models.Ship).translate(50,0) ]

    super scene, [renderers.Hud],
      color: '#FFF'
      font: "40px sans-serif"
      x: 0
      y: 0
      width: canvas.width
      height: canvas.height
      ships: ships
      lives: ships.length + 1
      score: 0

    @scene.on "entity:destroyed:Asteroid", (data) =>
      @model.score += [500, 300, 200, 100][data.model.size - 1]

  shipDestroyed: () ->
    @model.ships.pop()
    @model.lives--
    @model.lives
