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