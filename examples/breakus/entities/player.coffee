class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @gameWidth = @scene.get('canvas').getSize().width

  "event(engine:gamepad:press:left)": () =>
    @left = true
  "event(engine:gamepad:release:left)": () =>
    @left = false
  "event(engine:gamepad:press:right)": () =>
    @right = true
  "event(engine:gamepad:release:right)": () =>
    @right = false

  update: (dt) ->
    @model.x += @model.speed unless not @right
    @model.x -= @model.speed unless not @left

    @model.x = 0 unless @model.x > 0
    @model.x = @gameWidth - @model.width if @model.x > @gameWidth - @model.width