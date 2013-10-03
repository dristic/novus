class entities.Land extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.set 'value', 'field'
    @renderer = @getPlugin nv.AnimatedSpriteRenderingPlugin

  changeType: (type) ->
    switch type
      when 'grain' then @model.set 'value', 'grain'
      when 'field' then @model.set 'value', 'field'
      when 'gold' then @model.set 'value', 'gold'
      when 'unused' then @model.set 'value', 'dirt'
    @model.set 'workers', 0
    @renderer.play @model.get('value')
    @renderer.stop()

    @scene.fire "game:land:change", this

  update: (dt) ->
    # Nothing yet
