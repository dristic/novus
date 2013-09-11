class entities.Map extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @down = false
    @origin =
      x: 0
      y: 0
    @gamepad = scene.get 'gamepad'

  update: (dt) ->
    super dt

    if @down is true
      @model.x -= (@origin.x - @gamepad.state.mouse.x) / 3
      @model.y -= (@origin.y - @gamepad.state.mouse.y) / 3

      @origin.x = @gamepad.state.mouse.x
      @origin.y = @gamepad.state.mouse.y

  "event(engine:gamepad:mouse:down)": (data) ->
    @down = true
    @origin =
      x: data.x
      y: data.y

  "event(engine:gamepad:mouse:up)": (data) ->
    @down = false