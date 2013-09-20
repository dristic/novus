class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.turn = @model.turn ? 1
    @createPlayers()

  createPlayers: () ->
    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities
    
    @model.players = []
    for name of scenario.countries
      player = @scene.createEntity entityConfigs.player
      player.addCountry
        country: name
        resources: scenario.resources
        plotData: scenario.countries[name].plots
      @model.players.push player

  "event(engine:ui:clicked)": (element) ->
    if element.id is "next-turn-button"
      turn = @model.turn + 1
      if turn > @model.players.length
        turn = 1
      @model.set 'turn', turn
