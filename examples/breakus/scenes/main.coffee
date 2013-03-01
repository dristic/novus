class scenes.Main extends nv.Scene
  constructor: (game, canvas) ->
    super game,
      canvas: canvas
      keys:
        left: nv.Key.A
        right: nv.Key.D