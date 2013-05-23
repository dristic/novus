class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @scene.fire "player:created",
      player: this

  # enableKeyRepeat: (enabled) ->
  #   @scene.get('rootModel').gamepad.track

  "event(engine:gamepad:press:up)": () ->
    @move 0, -1

  "event(engine:gamepad:repeat:up)": () ->
    # @move 0, -1

  "event(engine:gamepad:press:left)": () ->    
    @move -1, 0
    
  "event(engine:gamepad:press:right)": () ->
    @move 1, 0
    
  "event(engine:gamepad:press:down)": () ->
    @move 0, 1

  "event(engine:gamepad:press:open)": () ->
    @scene.fire "player:open"

  "event(player:collision)": (data) ->
    @model.currentLocation = @model.previousLocation.clone()

  location: () ->
    @model.currentLocation

  previousLocation: () ->
    @model.previousLocation

  symbol: () ->
    @model.symbol

  move: (dx, dy) ->
    @model.previousLocation = @model.currentLocation.clone()  
    @model.currentLocation.translate dx, dy
    @scene.fire "player:moved",
      location: @model.currentLocation

  moveTo: (pt) ->
    @model.currentLocation = pt.clone()
    @model.previousLocation = pt.clone()

  update: (dt) ->
