class entities.Brick extends nv.Entity
  constructor: (scene, x, y) ->
    super scene, [nv.DrawableRenderingPlugin, nv.RectanglePhysicsPlugin],
      drawable: new gleam.Square
        width: 150
        height: 20
        color: "#FFF"
      type: "passive"
      width: 150
      height: 20
      x: x
      y: y

    @scene.on "engine:collision:Ball:Brick", (data) =>
      @destroy() unless data.target isnt this