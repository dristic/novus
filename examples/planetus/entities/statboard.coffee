class entities.StatBoard extends nv.Entity
  
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(player:acquired)": (data) ->
    @model.acquireItem data.itemCode
