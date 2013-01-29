class AsteroidController extends nv.Controller
  constructor: () ->
    super arguments...

    @speed = 0.3
    @direction = (Math.random() * Math.PI) - (Math.PI / 2)

  update: (dt) ->
    @asset.x += Math.sin(@direction) * @speed
    @asset.y += Math.cos(@direction) * @speed

nv.controllers = nv.controllers ? {}
nv.controllers.AsteroidController = AsteroidController