class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @down = false
    @origin =
      x: 0
      y: 0
    @gamepad = scene.get 'gamepad'
    @canvas = scene.get 'canvas'

    cache = () =>
      @getPlugin(nv.SpriteMapRenderingPlugin).cache(@model.width, @model.height)
    setTimeout cache, 1000

  update: (dt) ->
    super dt

    if @down is true
      @model.x -= (@origin.x - @gamepad.state.mouse.x) / @model.speed
      @model.y -= (@origin.y - @gamepad.state.mouse.y) / @model.speed

      @origin.x = @gamepad.state.mouse.x
      @origin.y = @gamepad.state.mouse.y

      if @model.x > 0 then @model.x = 0
      else if @model.x < -(@model.width - @canvas.width) then @model.x = -(@model.width - @canvas.width)

      if @model.y > 0 then @model.y = 0
      else if @model.y < -(@model.height - @canvas.height) then @model.y = -(@model.height - @canvas.height)

  "event(engine:gamepad:mouse:down)": (data) ->
    @down = true
    @origin =
      x: data.x
      y: data.y

  "event(engine:gamepad:mouse:up)": (data) ->
    @down = false