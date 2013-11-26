# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}

@breakout = {}

# Configure global engine settings
nv.configure
  debug: true

class @Application extends nv.Game
  constructor: () ->
    super breakout.gameConfig

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0

