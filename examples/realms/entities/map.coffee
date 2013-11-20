class entities.MapBase extends nv.Entity
  constructor: (scene, plugins, model) ->
    # load map from player chosen game scenario
    scenario = scene.get('scenario')
    @mapWidth = scenario.map.width
    @mapHeight = scenario.map.height
    # mapModel = nv.extend model, scenario.map
    # mapModel.data = scenario.data.layer0

    super scene, plugins, model

    @down = false
    @origin =
      x: 0
      y: 0
    @gamepad = scene.get 'gamepad'
    @canvas = scene.get 'canvas'
    @camera = scene.get 'camera'
    @camera.x = -160
    @camera.y = -230

    window.addEventListener 'resize', @scaleLayers

  scaleLayers: () =>
    @scale = window.innerWidth / @mapWidth
    @origin.x = 0
    @origin.y = 0
    @camera.x = 0 #(@mapWidth - window.innerWidth) / -2
    @camera.y =  (@mapHeight * @scale - window.innerHeight) / -2

  update: (dt) ->
    super dt

    if @down is true
      return if @model.width * @scale < @canvas.width && @model.height * @scale < @canvas.height

      unless @model.width * @scale < @canvas.width
        @camera.x -= (@origin.x - @gamepad.state.mouse.x) / @model.speed
        @origin.x = @gamepad.state.mouse.x

      unless @model.height * @scale < @canvas.height
        @camera.y -= (@origin.y - @gamepad.state.mouse.y) / @model.speed
        @origin.y = @gamepad.state.mouse.y

      if @camera.x >= 0
        @camera.x = 0
      else if @camera.x < -(@model.width * @scale - @canvas.width)
        @camera.x = -(@model.width * @scale - @canvas.width)

      if @camera.y >= 0
        @camera.y = 0
      else if @camera.y < -(@model.height * @scale - @canvas.height)
        @camera.y = -(@model.height * @scale - @canvas.height)

  "event(engine:gamepad:mouse:down)": (data) ->
    @down = true
    @origin =
      x: data.x
      y: data.y

    # tile = @playerData.getTileFromScreenXY(data.x - @camera.x, data.y - @camera.y)
    # if tile isnt 0
    #   @scene.fire "game:clicked:country", tile

  "event(engine:gamepad:mouse:up)": (data) ->
    @down = false

  destroy: () ->
    clearTimeout @timeout



class entities.TileMap extends entities.MapBase
  constructor: (scene, plugins, model) ->
    # load map from player chosen game scenario
    scenario = scene.get('scenario')
    mapModel = nv.extend model, scenario.map
    mapModel.data = scenario.data.layer0

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

    @layers = [ @getPlugin(nv.SpriteMapRenderingPlugin) ]
    for level in [1..4]
      if scenario.data["layer" + level]?
        layerModel = nv.extend model, scenario.map
        layerModel.data = scenario.data["layer" + level]
        @layers.push new nv.SpriteMapRenderingPlugin scene,
          model: layerModel

    playerAllocModel = nv.extend model, scenario.map
    playerAllocModel.data = scenario.data.playerData
    @playerData = new nv.SpriteMapRenderingPlugin scene,
      model: playerAllocModel

    #@timeout = setTimeout @cache, 5000
    @scaleLayers()

  cache: () =>
    @getPlugin(nv.SpriteMapRenderingPlugin).cache(@model.width, @model.height)

  scaleLayers: () ->
    super
    for layer in @layers
      layer.sprite.scale = @scale


class entities.ImageMap extends entities.MapBase
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @image = @getPlugin(nv.SpriteRenderingPlugin)
    @scaleLayers()

  scaleLayers: () ->
    super
    @image.sprite.scale = @scale


