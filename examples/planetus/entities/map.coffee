class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @canvas = scene.rootModel.canvas
    @renderer = @getPlugin renderers.MapRenderer
    @upateMovementConstraints()
    @adjacentPositions = [ new nv.Point(0,-1), new nv.Point(1,0), new nv.Point(0,1), new nv.Point(-1,0)]

    @openableItems = {}
    for name, item of @model.openableItems
      @openableItems[item.closed] = item

  upateMovementConstraints: () ->
    @viewSizeConstraints = new nv.Rect 0, 0, @model.mapSize.x-1, @model.mapSize.y-1

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
    spot = @model.testSpot data.location
    if spot is null
       data.location.constrain @viewSizeConstraints
       spot = @model.spot data.location

    if spot is "free"
      @model.updateObject @player, 1
      @adjustMap data.location
      @refreshMap()
    else if spot is "collision"
      @scene.send "player:collision"
    else if spot? and spot.length > 1
      # transition to different map
      entryPt = @model.jump(spot)
      @player.moveTo entryPt
      @model.updateObject @player, 1
      @upateMovementConstraints()
      @refreshMap()

  "event(player:open)": () ->
    playerLoc = @player.location()
    somethingOpened = false
    $.each @adjacentPositions, (idx, pos) =>
      testLoc = playerLoc.clone().add(pos)
      spot = @model.spot testLoc
      next unless @openableItems[spot]?
      @model.swapTile testLoc, @openableItems[spot].open
      somethingOpened = true
      false
    @refreshMap() if somethingOpened

    
  adjustMap: (playerLoc) ->
    @model.shiftMap 0, -1 if playerLoc.y - @model.top() is 0
    @model.shiftMap 0, 1  if @model.bottom() - playerLoc.y is 0
    @model.shiftMap -1, 0 if playerLoc.x - @model.left() is 0
    @model.shiftMap 1, 0 if @model.right() - playerLoc.x is 0

  update: (dt) ->
