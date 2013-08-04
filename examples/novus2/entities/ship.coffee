class entities.Ship extends entities.WrappingEntity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @maxVelocity = 3

    @emitter = new nv.ParticleEmitter @scene,
      position: new nv.Point(-100,-100)
      particlesPerSecond: 100
      colors: new nv.Gradient([
        new nv.Color(255, 100, 100, 1),
        new nv.Color(170, 50, 50, 1),
        new nv.Color(0, 0, 0, 0)
      ])
      particleLife: 0.3
      lifeVariance: 0.4
      angleVariation: 0.75
      minVelocity: 1
      maxVelocity: 1

  "event(engine:gamepad:press:shoot)": () ->
    options =
      entity: "bullet"
      x: this.model.points()[0].x
      y: this.model.points()[0].y
      angle: this.model.rotation
    this.scene.fire "entity:create", options

  "event(engine:collision:Ship:Asteroid)": (data) ->
    @scene.fire "entity:destroyed:Ship", this
    @scene.fire "entity:remove", this

  update: (dt) ->
    state = @scene.get('gamepad').getState()
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

    anchor = @model.points("thrusters")[0]
    @emitter.set 'position', new nv.Point(anchor.x, anchor.y)
    if @model.thrusters
      @emitter.set 'on', true
      @emitter.set 'angle', @model.rotation + (Math.PI * 0.5)
    else
      @emitter.set 'on', false

    @wrap()

  destroy: () ->
    @emitter.destroy()
    super
