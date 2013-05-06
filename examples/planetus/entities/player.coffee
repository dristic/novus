class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @scene.fire "player:created",
      player: this

  "event(engine:gamepad:press:up)": () ->
    @move 0, -1

  "event(engine:gamepad:press:left)": () ->    
    @move -1, 0
    
  "event(engine:gamepad:press:right)": () ->
    @move 1, 0
    
  "event(engine:gamepad:press:down)": () ->
    @move 0, 1

  "event(player:collision)": (data) ->
    @model.currentLocation = @model.previousLocation.clone()

  location: () ->
    @model.currentLocation

  symbol: () ->
    @model.symbol

  move: (dx, dy) ->
    @model.previousLocation = @model.currentLocation.clone()  
    @model.currentLocation.translate dx, dy
    @scene.fire "player:moved",
      location: @model.currentLocation


  update: (dt) ->
