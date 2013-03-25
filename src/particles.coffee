randRange = (min, max) ->
  Math.random() * (max - min) + min

randVariation = (center, variation) ->
  center + (variation * randRange(-0.5, 0.5))

class nv.ParticleEngine extends nv.Engine
  initializer: (config, rootModel) ->
    nv.extend config,
      canvas: rootModel.canvas
      width: rootModel.canvas.width
      height: rootModel.canvas.height

  constructor: (scene, config) ->
    super scene

    @canvas = config.canvas
    @context = @canvas.context
    @emitters = []

    scene.on "engine:particle:register_emitter", (emitter) =>
      @emitters.push emitter
      @scene.fire "engine:rendering:create", emitter

    scene.on "engine:particle:destroy_emitter", (id) =>
      @scene.fire "engine:rendering:destroy", @getEmitter(id)
      @destroyEmitter id

  createEmitter: (options) ->
    emitter = new nv.ParticleEmitter(options)
    @emitters.push emitter
    @scene.fire "engine:rendering:create", emitter
    emitter

  getEmitter: (id) ->
    for emitter in @emitters
      if emitter.id is id
        return emitter
    null

  destroyEmitter: (id) ->
    id = id.id if typeof(id) is "object"
    for emitter, index in @emitters
      if emitter.id is id
        emitter.destroy()
        @emitters.splice index, 1
        break

  update: (dt) ->
    emitter.update dt for emitter in @emitters

  destroy: () ->
    for emitter in @emitters
      @scene.fire "engine:rendering:destroy", emitter
      emitter.destroy
    delete @emitters

__particle_emitter_id = 1;
class nv.ParticleEmitter
  defaults:
    position: new nv.Point(0, 0)
    particlesPerSecond: 100
    particleLife: 0.5
    lifeVariation: 0.52
    colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(0, 0, 0, 0)])
    angle: 0
    angleVariation: Math.PI * 2
    minVelocity: 20
    maxVelocity: 50
    gravity: new nv.Point(0, 30.8)
    collider: null
    bounceDamper: 0.5
    on: false

  constructor: (options) ->
    @options = nv.clone(@defaults)
    delete options.id if options.id?
    @options = nv.extend(@options, options)
    @particles = []
    @particleCounter = 0
    @id = __particle_emitter_id++

  destroy: () ->
    @options.on = false

  set: (key, value) ->
    @options[key] = value

  get: (key) ->
    @options[key]

  draw: (context, canvas) ->
    particle.draw(context, canvas) for particle in @particles

  spawnParticle: (offset) ->
    angle = randVariation @options.angle, @options.angleVariation
    speed = randRange @options.minVelocity, @options.maxVelocity
    life = randVariation @options.particleLife, @options.particleLife * @options.lifeVariation
    velocity = new nv.Point().fromPolar angle, speed
    position = @options.position.clone().add velocity.times(offset)
    @particles.push new nv.Particle(@options, position, velocity, life)

    @particleCounter++
    @options.on = false if @particleCounter > @options.maxParticles

  update: (dt) ->
    dead = []
    for particle, index in @particles
      particle.update dt
      if particle.isDead()
        dead.push particle

    for deadParticle in dead
      deadParticle.destroy()
      @particles.splice @particles.indexOf(deadParticle), 1
    dead = undefined

    # Only spawn new particles if on
    if @options.on
      particlesToSpawn = @options.particlesPerSecond * dt
      for i in [0..particlesToSpawn] by 1
        @spawnParticle (1.0 + i) / particlesToSpawn * dt

class nv.Particle
  constructor: (@options, @position, @velocity, @life) ->
    @maxLife = @life

  isDead: () ->
    @life <= 0

  draw: (context, canvas) ->
    if @isDead()
      return

    lifePercent = 1.0 - (@life / @maxLife)
    color = @options.colors.getColor lifePercent

    context.save()
    context.globalAlpha = color.a
    context.setFillStyle color.toCanvasColor()

    context.fillRect @position.x - 1, @position.y - 1, 3, 3
    context.restore()

  update: (dt) ->
    @velocity.add @options.gravity.times(dt)
    @position.add @velocity.times(dt)
    @life -= dt

  destroy: () ->
    delete @options
    delete @position
    delete @velocity
    delete @life
    delete @maxLife