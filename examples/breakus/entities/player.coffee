class entities.Player extends nv.Entity
  constructor: (scene) ->
    super scene, [nv.DrawableRenderingPlugin],
      drawable: new gleam.Square
        width: 150
        height: 20
        color: "#FFF"
        x: 250
        y: 450