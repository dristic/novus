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
      clickable: true

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

class entities.WrappingEntity extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @canvas = @scene.getEngine(nv.RenderingEngine).canvas

  wrap: () ->
    # Boundary Wrapping
    dimensions = @canvas.getSize()

    if @model.x < 0 then @model.x = dimensions.width
    else if @model.x > dimensions.width then @model.x = 0

    if @model.y < 0 then @model.y = dimensions.height
    else if @model.y > dimensions.height then @model.y = 0

class entities.Asteroid extends entities.WrappingEntity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(engine:collision:Ship:Asteroid)": (data) =>
    @handleCollision data if data.target is this

  "event(engine:collision:Bullet:Asteroid)": (data) =>
    @handleCollision data if data.target is this

  handleCollision: (data) ->
    unless data.target.model.get("dead") is true
      @scene.fire "entity:destroyed:Asteroid", data.target
      @scene.fire "entity:remove", data.target

      @emitter = new nv.ParticleEmitter @scene,
        position: new nv.Point(data.target.model.get('x'), data.target.model.get('y'))
        particlesPerSecond: 100
        maxParticles: 20
        colors: new nv.Gradient([
          new nv.Color(255, 255, 255, 1),
          new nv.Color(125, 125, 125, 0.7),
          new nv.Color(0, 0, 0, 0)
        ])
        particleLife: 3
        angleVariation: 6.28
        minVelocity: 10
        maxVelocity: 50
        on: true

      size = data.target.model.get('size') - 1
      unless size is 0
        bounds = data.target.model.bounds()
        offset = (bounds.x2 - bounds.x) / (6 - data.target.model.get('size'))
        options = 
          entity: "asteroid"
          x: data.target.model.get('x') - offset
          y: data.target.model.get('y')
          scale: size
          direction: data.target.model.get('direction') - 0.3
        @scene.fire 'entity:create', options
        options = $.extend {}, options
        options.x += offset * 2
        options.direction += 0.6
        @scene.fire 'entity:create', options
    data.target.model.set('dead', true)

  update: (dt) ->
    @model.rotation += @model.rotationSpeed
    @model.translate Math.sin(@model.direction) * @model.speed, Math.cos(@model.direction) * @model.speed
    @wrap()

class entities.Bullet extends entities.WrappingEntity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(engine:collision:Bullet:Asteroid)": (data) =>
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
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(entity:destroyed:Asteroid)": (data) =>
    @model.score += [500, 300, 200, 100][data.model.size - 1] unless not data.model

  shipDestroyed: () ->
    @model.ships.pop()
    @model.lives--
    @model.lives
