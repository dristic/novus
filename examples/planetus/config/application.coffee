# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}

class @Application extends nv.Game
  constructor: () ->
    super nv.gameConfig

    # Configure global novus settings
    nv.configure
      debug: true

    # Start the game on a new thread
    start = () =>
      @start('Game')
    setTimeout start, 0