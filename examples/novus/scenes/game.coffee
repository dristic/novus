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

    hud = @getEntity(entities.Hud)

    @on "entity:destroyed:Ship", (ship) =>
      remaining = hud.shipDestroyed()
      if remaining > 0
        @fire "entity:create",
          entity: "ship"
      else if remaining is 0
        @game.closeScene "Game"
        @game.openScene 'Gameover', @canvas

    # Start the scene
    @send "engine:timing:start"

  destroy: () ->
    super