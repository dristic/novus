#= Require the novus version you are using here.
#= require ../../src/novus

#= Require any other libraries you need here.

#= require_tree config
#= require_tree renderers
#= require_tree models
#= require_tree entities

#= require game.config

class Novus extends nv.Game
  constructor: () ->
    glcanvas = super nv.gameConfig

    @registerScene 'Game', Game
    @registerScene 'GameOver', GameOver

    @openScene 'Main', glcanvas

class scenes.Main extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      gamepad:
        keys:
          start: nv.Key.Spacebar
        trackMouse: true

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

    @glcanvas.camera = nv.camera()
    @updateId = @glcanvas.startDrawUpdate 10, nv.bind(this, @update)

    @on "engine:gamepad:start", () =>
      @game.openScene 'Game', @glcanvas

  update: (dt) ->
    super dt

    @emitter.options.angle += 0.03
    if @emitter.options.angle > Math.PI * 2 then @emitter.options.angle = 0

  destroy: () ->
    @glcanvas.stopDrawUpdate(@updateId)
    super

class scenes.Game extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      keys:
        left: nv.Key.A
        right: nv.Key.D
        up: nv.Key.W
        down: nv.Key.S
        shoot: nv.Key.Spacebar

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

    @glcanvas.camera = nv.camera()
    @glcanvas.camera.follow ship.model, 250, 250
    @glcanvas.camera.zoom 0.5
    @glcanvas.camera.zoom 1, 2000

    @updateId = @glcanvas.startDrawUpdate 60, nv.bind(this, @update)

    @on "entity:destroyed:Ship", () =>
      console.log "ship destroyed"
      remaining = hud.shipDestroyed()
      if remaining
        ship.model.reset()
      else
        console.log "game over"
        @game.openScene 'GameOver', @glcanvas

  destroy: () ->
    @glcanvas.stopDrawUpdate @updateId
    super

class scenes.GameOver extends nv.Scene
  constructor: (game, @glcanvas) ->
    super game,
      canvas: @glcanvas
      keys:
        start: nv.Key.Spacebar
      trackMouse: false

    @addEntities entities.Background,
      entities.Background,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid,
      entities.Asteroid

    @glcanvas.camera = nv.camera()
    @updateId = @glcanvas.startDrawUpdate 10, nv.bind(this, @update)

    @on "engine:gamepad:start", () =>
      @game.openScene 'Game', @glcanvas

  destroy: () ->
    @glcanvas.stopDrawUpdate(@updateId)
    super

$(() ->
  @app = new Novus
)