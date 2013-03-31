class entities.Brick extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
  "event(engine:collision:Ball:Brick)": (data) =>
    @destroy() unless data.target isnt this