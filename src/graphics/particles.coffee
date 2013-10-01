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

  "event(engine:particle:register:emitter)": (emitter) ->
    @emitters.push emitter
    @scene.fire "engine:rendering:create", emitter

  "event(engine:particle:destroy:emitter)": (emitter) ->
    @scene.fire "engine:rendering:destroy", emitter
    @emitters.splice @emitters.indexOf(emitter), 1

  update: (dt) ->
    emitter.update dt for emitter in @emitters
    @emitters = @emitters.filter (emitter) ->
      return !emitter.complete

  destroy: () ->
    for emitter in @emitters
      emitter.destroy

    delete @emitters
    super

class nv.ParticleEmitter
  defaults:
    position: new nv.Point(0, 0)
    particlesPerSecond: 100
    maxParticles: 1024000
    particleLife: 0.5
    lifeVariation: 0.52
    colors: new nv.Gradient([new nv.Color(255, 255, 255, 1), new nv.Color(0, 0, 0, 0)])
    angle: 0
    angleVariation: Math.PI * 2
    minVelocity: 20
    maxVelocity: 50
    gravity: new nv.Point(0, 0)
    collider: null
    bounceDamper: 0.5
    on: false

  constructor: (@scene, options) ->
    @options = nv.clone(@defaults)
    @options = nv.extend(@options, options)
    @particles = []
    @particleCounter = 0
    @complete = false
    @particlesThisFrame = 0
    @scene.fire "engine:particle:register:emitter", this

  destroy: () ->
    @options.on = false
    @scene.fire "engine:particle:destroy:emitter", this
    delete @scene

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
      @particlesThisFrame += @options.particlesPerSecond * dt
      i = 0
      particlesToSpawn = @particlesThisFrame
      while @particlesThisFrame > 1
        i++
        @particlesThisFrame--
        @spawnParticle (1.0 + i) / particlesToSpawn * dt

    if @options.maxParticles isnt undefined and @particleCounter > @options.maxParticles
      @options.on = false
      @complete = @particles.length is 0


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