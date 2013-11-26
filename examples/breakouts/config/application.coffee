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
    super
      engines: breakout.gameConfig.engines
      scenes: [ scenes.Main, scenes.Game, scenes.GameOver ]

    # Start the game on a new thread
    start = () =>
      @openScene scenes.Main
    setTimeout start, 0

