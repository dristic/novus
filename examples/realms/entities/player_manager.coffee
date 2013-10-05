class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.set 'turn', 1
    @model.playerNumber = 1
    @attacking = false

  "event(scene:initialized)": () ->
    @attackText = @scene.getEntityById('attack-text').getPlugin nv.TextUIPlugin

  "event(game:army:created)": (value) ->
    @clientPlayer().resources().createArmy value

  "event(game:clicked:county)": (county) ->
    if @model.turn is @model.playerNumber
      if @attacking is true
        if county is 1027 and @model.playerNumber is 1
          @attacking = false
          @attackText.hide()
          @scene.fire "game:army:send", Math.min(@clientPlayer().resources().current().get('soldiers'), 50)
        if county is 1026 and @model.playerNumber is 2
          @attacking = false
          @attackText.hide()
          @scene.fire "game:army:send", Math.min(@clientPlayer().resources().current().get('soldiers'), 50)
    
  "event(game:mp:player)": (number) ->
    @model.playerNumber = number
    @createPlayers()

  "event(game:army:attacked)": (value) ->
    @clientPlayer().resources().onAttacked value

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
        switch playerNumber
          when 1 then @model.set 'playerColor', 'Red'
          when 2 then @model.set 'playerColor', 'Blue'

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
    @scene.fire "game:player:assigned"
    @currentPlayer().beginTurn()

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

    @scene.fire "game:turn:end", turn

  "event(engine:ui:slider:change)": (entity) ->
    if @currentPlayer()
      value = Math.floor(entity.model.value) / 100
      @currentPlayer().resources().setLaborDistribution value

  "event(engine:ui:clicked)": (element) ->
    turn = @model.turn + 1
    if turn > @model.players.length
      turn = 1

    switch element.id
      when "next-turn-button" then @scene.fire "game:turn:next", turn
      when "next-turn-other-button" then @scene.fire "game:turn:next", turn
      when "create-army-button"
        if turn is @model.playerNumber
          @scene.fire "game:army:created", 10
      when "attack-button"
        if turn is @model.playerNumber
          @attacking = true
          @attackText.show()

  "event(game:turn:next)": () ->
    @nextPlayersTurn()

  # event(country:activate)
