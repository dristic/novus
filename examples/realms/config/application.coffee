# Do any preliminary setup before everything else loads
@scenes = {}
@entities = {}
@models = {}
@renderers = {}

@realms = {}

class @Application extends nv.Game
  constructor: () ->
    super realms.gameConfig

    # Configure global novus settings
    nv.configure
      debug: true

    # Start the game on a new thread
    start = () =>
      @start('Main')
    setTimeout start, 0
