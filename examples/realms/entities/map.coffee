class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    # load map from player chosen game scenario
    scenario = scene.get('scenario')
    mapModel = nv.extend model, scenario.map
    mapModel.data = scenario.data.map

    super scene, plugins, mapModel

    @down = false
    @origin =
      x: 0
      y: 0
    @gamepad = scene.get 'gamepad'
    @canvas = scene.get 'canvas'
    @camera = scene.get 'camera'
    @camera.x = -160
    @camera.y = -230

    if scenario.data.accessories?
      accessoryiesModel = nv.extend model, scenario.map
      accessoryiesModel.data = scenario.data.accessories
      @playerData = new nv.SpriteMapRenderingPlugin scene,
        model: accessoryiesModel

    playerAllocModel = nv.extend model, scenario.map
    playerAllocModel.data = scenario.data.playerData
    @playerData = new nv.SpriteMapRenderingPlugin scene,
      model: playerAllocModel


    cache = () =>
      @getPlugin(nv.SpriteMapRenderingPlugin).cache(@model.width, @model.height)
    @timeout = setTimeout cache, 2000

  update: (dt) ->
    super dt

    if @down is true
      @camera.x -= (@origin.x - @gamepad.state.mouse.x) / @model.speed
      @camera.y -= (@origin.y - @gamepad.state.mouse.y) / @model.speed

      @origin.x = @gamepad.state.mouse.x
      @origin.y = @gamepad.state.mouse.y

      if @camera.x > 0 then @camera.x = 0
      else if @camera.x < -(@model.width - @canvas.width) then @camera.x = -(@model.width - @canvas.width)

      if @camera.y > 0 then @camera.y = 0
      else if @camera.y < -(@model.height - @canvas.height) then @camera.y = -(@model.height - @canvas.height)

  "event(engine:gamepad:mouse:down)": (data) ->
    @down = true
    @origin =
      x: data.x
      y: data.y

  "event(engine:gamepad:mouse:up)": (data) ->
    @down = false

    tile = @playerData.getTileFromScreenXY(data.x - @camera.x, data.y - @camera.y)
    if tile isnt 0
      @scene.fire "game:clicked:country", tile

  destroy: () ->
    clearTimeout @timeout
