class entities.Player extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      drawable: new gleam.Square
        width: 150
        height: 20
        color: "#FFF"
      type: 'active'
      width: 150
      height: 20
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
    @model.x += @model.speed unless not @right
    @model.x -= @model.speed unless not @left

    @model.x = 0 unless @model.x > 0
    @model.x = 350 unless @model.x < 350