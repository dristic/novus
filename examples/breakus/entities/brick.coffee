class entities.Brick extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
  "event(engine:collision:Ball:Brick)": (data) ->
    return unless data.target is this
    @scene.fire "game:score",
      score: data.target.model.get('value')
    @destroy() 