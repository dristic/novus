class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @sprite = @getPlugin nv.AnimatedSpriteRenderingPlugin

  "event(engine:gamepad:press:attack)": () ->
    @sprite.play 'attack'