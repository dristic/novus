class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @down = false
    @origin =
      x: 0
      y: 0
    @gamepad = scene.get 'gamepad'
    @canvas = scene.get 'canvas'
    @camera = scene.get 'camera'

    @playerData = new nv.SpriteMapRenderingPlugin scene,
      model:
        x: model.x
        y: model.y
        width: model.width
        height: model.height
        tileWidth: model.tileWidth
        tileHeight: model.tileHeight
        data: model.playerData

    cache = () =>
      @getPlugin(nv.SpriteMapRenderingPlugin).cache(@model.width, @model.height)
    setTimeout cache, 1000

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
      @scene.fire "game:clicked:county", tile
