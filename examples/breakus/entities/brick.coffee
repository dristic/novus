class entities.Brick extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
    @scene.on "engine:collision:Ball:Brick", (data) =>
      @destroy() unless data.target isnt this