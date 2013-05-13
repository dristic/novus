class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @canvas = scene.rootModel.canvas
    @renderer = @getPlugin renderers.MapRenderer

  refreshMap: () ->
    @renderer.draw @canvas.context, @canvas

  "event(asset:loaded)": (data) ->
    @renderer.assetsLoadingComplete()

  "event(refresh:map)": () ->
    @refreshMap()

  "event(player:created)": (data) ->
    @player = data.player
    @model.addObject data.player, 1
    @refreshMap()

  "event(player:moved)": (data) ->
    spot = @model.spot data.location
    if spot is "free"
      @model.updateObject @player, 1
      @adjustMap data.location
      @refreshMap()
    else if spot is "collision"
      @scene.fire "player:collision"
    else
      # transition to different map
      entryPt = @model.jump(spot)
      @player.moveTo entryPt
      @refreshMap()

  # "event(engine:gamepad:release:up)": () ->    
  #   @refreshMap() if @model.shiftMap 0, -1

  # "event(engine:gamepad:release:left)": () ->    
  #   @refreshMap() if @model.shiftMap -1, 0
    
  # "event(engine:gamepad:release:right)": () ->
  #   @refreshMap() if @model.shiftMap 1, 0
    
  # "event(engine:gamepad:release:down)": () ->
  #   @refreshMap() if @model.shiftMap 0, 1
    
  adjustMap: (playerLoc) ->
    @model.shiftMap 0, -1 if playerLoc.y - @model.top() is 0
    @model.shiftMap 0, 1  if @model.bottom() - playerLoc.y is 0
    @model.shiftMap -1, 0 if playerLoc.x - @model.left() is 0
    @model.shiftMap 1, 0 if @model.right() - playerLoc.x is 0

  update: (dt) ->
