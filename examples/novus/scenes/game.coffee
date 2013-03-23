class scenes.Game extends nv.Scene
  constructor: (name, game, rootModel) ->
    super name, game, rootModel

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

    ship = @getEntity(entities.Ship)
    hud = @getEntity(entities.Hud)
    ###
    @camera = @getEngine(nv.RenderingEngine).camera
    @camera.follow ship.model, 250, 250
    @camera.zoom 0.5
    @camera.zoom 1, 2000
    ###
    @on "entity:destroyed:Ship", (ship) =>
      remaining = hud.shipDestroyed()
      if remaining
        @createEntity nv.gameConfig.scenes.game.entities.ship
      else
        @game.closeScene "Game"
        @game.openScene 'Gameover', @canvas

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    super