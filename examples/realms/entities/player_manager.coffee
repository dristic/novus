class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.turn = 1
    @model.playerNumber = 1
    @createPlayers()

  createPlayers: () ->
    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities
    
    @model.players = []
    # Create each player
    for playerNumber in [1..scenario.players]
      playerConfig = nv.extend {}, entityConfigs.player
      playerConfig.model.options.number = playerNumber
      player = @scene.createEntity playerConfig
      @model.players.push player

      if playerNumber is @model.playerNumber
        @model.set 'clientPlayer', player

    # Create each country and add it to a player if it is owned
    for name of scenario.countries
      for player in @model.players
        if player.model.number is scenario.countries[name].owner
          player.addCountry
            country: name
            resources: scenario.resources
            plotData: scenario.countries[name].plots
            ratio: 0.5

    @model.set 'currentPlayer', @model.players[@model.turn - 1]
    @scene.fire "game:ui:update"

  clientPlayer: () ->
    @model.clientPlayer

  currentPlayer: () ->
    @model.currentPlayer

  nextPlayersTurn: () ->
    turn = @model.turn + 1
    if turn > @model.players.length
      turn = 1

    @currentPlayer().endTurn()
    @model.set 'turn', turn
    @model.set 'currentPlayer', @model.players[turn - 1]
    @currentPlayer().beginTurn()

    @scene.fire "game:turn:end"

  "event(engine:ui:slider:change)": (entity) ->
    value = Math.floor(entity.model.value) / 100
    @currentPlayer().resources().setLaborDistribution value

  "event(engine:ui:clicked)": (element) ->
    switch element.id
      when "next-turn-button" then @scene.fire "game:turn:next"
      when "next-turn-other-button" then @scene.fire "game:turn:next"

  "event(game:turn:next)": () ->
    @nextPlayersTurn()

  # event(country:activate)
