randRange = (min, max) ->
  Math.random() * (max - min) + min

randVariation = (center, variation) ->
  center + variation * randRange(-0.5, 0.5)

class nv.ParticleEngine extends nv.Engine
  constructor: (scene) ->
    super scene

    @canvas = scene.options.canvas
    @context = @canvas.context
    @emitters = []

    scene.on "engine:particle:create_emitter", (options) =>
      emitter = @createEmitter options

      @canvas.addDrawable emitter

    scene.on "engine:particle:destroy_emitter", (id) =>
      @canvas.removeDrawable @getEmitter(id)
      @destroyEmitter id

  createEmitter: (options) ->
    emitter = new nv.ParticleEmitter(options)
    @emitters.push emitter
    emitter

  getEmitter: (id) ->
    for emitter in @emitters
      if emitter.id is id
        return emitter
    null

  destroyEmitter: (id) ->
    for emitter, index in @emitters
      if emitter.id is id
        emitter.destroy()
        @emitters.splice index, 1

  update: (dt) ->
    emitter.update dt for emitter in @emitters

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

  constructor: (options) ->
    @options = nv.clone(@defaults)
    @options = nv.extend(@options, options)
    @particles = []

  draw: (context, canvas) ->
    particle.draw(context, canvas) for particle in @particles

  spawnParticle: (offset) ->
    angle = randVariation @options.angle, @options.angleVariation
    speed = randRange @options.minVelocity, @options.maxVelocity
    life = randVariation @options.particleLife, @options.particleLife * @options.lifeVariation

    velocity = new nv.Point().fromPolar angle, speed

    position = @options.position.clone().add velocity.times(offset)

    @particles.push new nv.Particle(@options, position, velocity, life)

  update: (dt) ->
    particle.update(dt) for particle in @particles

    for i in [0..(@options.particlesPerSecond * dt)]
      @spawnParticle 1.0 + i

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
    context.color color.toCanvasColor()

    context.fillRect @position.x - 1, @position.y - 1, 3, 3

  update: (dt) ->
    @velocity.add @options.gravity.times(dt)
    @position.add @velocity.times(dt)
    @life -= dt