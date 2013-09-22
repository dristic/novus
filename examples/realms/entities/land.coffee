class entities.Land extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.set 'value', 'field'
    @renderer = @getPlugin nv.AnimatedSpriteRenderingPlugin

  changeType: (type) ->
    if type is 'grain'
      @model.set 'value', 'grain'
    else if type is 'field'
      @model.set 'value', 'field'
    else if type is 'gold'
      @model.set 'value', 'gold'
    @renderer.play @model.get('value')
    @renderer.stop()

    @scene.fire "game:land:change", this

  update: (dt) ->
    # Nothing yet
