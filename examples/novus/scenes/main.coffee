class scenes.Main extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      keys:
        start: nv.Key.Spacebar
        left: nv.Key.A
        right: nv.Key.D
      trackMouse: true

    @useEngine "TimingEngine"
    @useEngine "RenderingEngine"
    @useEngine "GamepadEngine"
    @useEngine "SoundEngine"
    @useEngine "ParticleEngine"

    @addEntities entities.Background,
      entities.Background,
      entities.Title,
      entities.ActionText,
      entities.Cursor,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid

    @send "engine:particle:create_emitter",
      position: new nv.Point(450, 300)
      particlesPerSecond: 100
      colors: new nv.Gradient([
        new nv.Color(255, 255, 255, 1),
        new nv.Color(0, 255, 0, 1),
        new nv.Color(0, 0, 0, 0)
      ])
      particleLife: 2
      angleVariation: 1
      minVelocity: 50
      maxVelocity: 100
      id: 1

    @emitter = @getEngine(nv.ParticleEngine).getEmitter(1)

    @on "engine:gamepad:start", () =>
      @game.openScene 'Game', @glcanvas

    @send "engine:timing:start"

  update: (dt) ->
    super dt

    @emitter.options.angle += 0.03
    if @emitter.options.angle > Math.PI * 2 then @emitter.options.angle = 0

  destroy: () ->
    @glcanvas.stopDrawUpdate(@updateId)
    super