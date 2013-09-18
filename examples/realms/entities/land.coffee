class entities.Land extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @renderer = @getPlugin nv.AnimatedSpriteRenderingPlugin

  changeType: (type) ->
    if type is 'grain'
      @renderer.play 'grain'
    else if type is 'field'
      @renderer.play 'field'
    else if type is 'gold'
      @renderer.play 'gold'
    @renderer.stop()

    @scene.fire "game:land:change", this

  update: (dt) ->
    # Nothing yet
