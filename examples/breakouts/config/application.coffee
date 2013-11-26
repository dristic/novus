# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}

@breakout = {}

class @Application extends nv.Game
  constructor: () ->
    super breakout.gameConfig

    # Configure global novus settings
    nv.configure
      debug: true

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0

