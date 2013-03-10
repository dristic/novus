class entities.Player extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gleam.Square
        width: 150
        height: 20
        color: "#FFF"
        x: 250
        y: 450
      speed: 3

    scene.on "engine:gamepad:press:left", () =>
      @left = true
    scene.on "engine:gamepad:release:left", () =>
      @left = false
    scene.on "engine:gamepad:press:right", () =>
      @right = true
    scene.on "engine:gamepad:release:right", () =>
      @right = false

  update: (dt) ->
    @model.drawable.x += @model.speed unless not @right
    @model.drawable.x -= @model.speed unless not @left

    @model.drawable.x = 0 unless @model.drawable.x > 0
    @model.drawable.x = 350 unless @model.drawable.x < 350