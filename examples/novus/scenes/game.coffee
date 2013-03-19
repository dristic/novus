class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

    ###
    @useEngine "TimingEngine"
    @useEngine "RenderingEngine"
    @useEngine "GamepadEngine"
    @useEngine "SoundEngine"
    @useEngine "ParticleEngine"
    @useEngine "DebugEngine"
    @useEngine "PhysicsEngine"

    @canvas = @getEngine(nv.RenderingEngine).canvas

    ship = @addEntity entities.Ship
    @addEntity entities.Background, ship, 0.05
    @addEntity entities.Background, ship, 0.01

    hud = @addEntity entities.Hud
    @addEntities entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid

    sdoc = []
    sdoc.push
      path: "/assets/sounds/pew_pew.wav"
      events: [ { event: "engine:gamepad:shoot", action: "play" } ]
    sdoc.push
      path: "/assets/sounds/depth_charge.wav"
      events: [ { event: "engine:collision:Bullet:Asteroid", action: "play" } ]
    sdoc.push
      path: "/assets/sounds/bullet_whizzing.wav"
      events: [ { event: "entity:thrust:Ship", action: "play" } ]
      maxPlayTime: 350
      startTime: 0.15

    new nv.SoundFactory(this).wire sdoc

    @camera = @getEngine(nv.RenderingEngine).camera
    @camera.follow ship.model, 250, 250
    @camera.zoom 0.5
    @camera.zoom 1, 2000

    ###

    @on "entity:destroyed:Ship", () =>
      # remaining = hud.shipDestroyed()
      # if remaining
      #   ship.model.reset()
      # else
      #   @game.closeScene "Game"
      #   @game.openScene 'GameOver', @canvas

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    super