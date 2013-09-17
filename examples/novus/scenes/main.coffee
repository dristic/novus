class scenes.Main extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    # @send "engine:particle:create_emitter",
    #   position: new nv.Point(450, 350)
    #   particlesPerSecond: 100
    #   colors: new nv.Gradient([
    #     new nv.Color(255, 255, 255, 1),
    #     new nv.Color(0, 255, 0, 1),
    #     new nv.Color(0, 0, 0, 0)
    #   ])
    #   particleLife: 2
    #   angleVariation: 1
    #   minVelocity: 50
    #   maxVelocity: 100
    #   id: 1

    # @emitter = @getEngine(nv.ParticleEngine).getEmitter(1)

    @on "engine:gamepad:press:shoot", () =>
      @fire "scene:close"
      @game.openScene 'Game'

    @send "engine:timing:start"

  update: (dt) ->
    super dt

    # @emitter.options.angle += 0.03
    # if @emitter.options.angle > Math.PI * 2 then @emitter.options.angle = 0

  destroy: () ->
    @send "engine:timing:stop"
    super