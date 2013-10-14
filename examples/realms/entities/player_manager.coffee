class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.set 'turn', 1
    @model.playerNumber = 1
    @attacking = false

  "event(scene:initialized)": () ->
    @attackText = @scene.getEntityById('attack-text').getPlugin nv.TextUIPlugin
    @countries = @scene.getEntities(entities.Country)

  "event(game:army:created)": (value) ->
    @clientPlayer().resources().createArmy value

  "event(game:clicked:country)": (id) ->
    if @model.turn is @model.playerNumber
      for country in @countries
        if country.model.id is id
          unless country.model.owner is @model.playerNumber
            if @attacking is true
              @attacking = false
              @attackText.hide()
              @scene.fire "game:army:send", Math.min(@clientPlayer().resources().current().get('soldiers'), 50)
          else
            @clientPlayer().selectCountry id
            @scene.fire "game:selected:country", id
    
  "event(game:mp:player)": (number) ->
    @model.playerNumber = number
    @createPlayers()

  "event(game:army:attacked)": (enemySoldiers) ->
    @clientPlayer().resources().onAttacked enemySoldiers

  "event(game:army:send)": (soldiers) ->
    @clientPlayer().resources().sendSoldiers soldiers

    @scene.fire 'game:ui:alert',
        type: 'info'
        message: "#{soldiers} soldiers rush into battle!"

  "event(game:army:battle)": (data) ->
    @scene.fire 'game:ui:alert',
      type: 'alert'
      message: "#{data.kills.soldiers} soldiers and #{data.kills.peasants} peasants died in battle!"

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
          flag = nv.extend {}, scenario.countries[name].flag
          flag = nv.extend flag, rootModel.config.playerMetadata[player.model.number - 1].flag

          data = nv.extend {}, scenario.countries[name]
          data = nv.extend data,
            country: name
            resources: scenario.resources
            ratio: 0.5
            flag: flag

          player.addCountry data

    @countries = @scene.getEntities(entities.Country)

    @model.set 'currentPlayer', @model.players[@model.turn - 1]
    console.log "PLAYER =", @model.currentPlayer.model.number
    console.log "TURN =", @model.turn
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
    console.log "PLAYER =", @model.currentPlayer.model.number
    console.log "TURN =", @model.turn
    @currentPlayer().beginTurn()

    @scene.fire "game:turn:end", turn

  "event(engine:ui:slider:change)": (entity) ->
    if @currentPlayer()
      value = Math.floor(entity.model.value) / 100
      @currentPlayer().resources().setLaborDistribution value

  "event(engine:ui:clicked)": (element) ->
    currentTurn = @model.turn
    turn = @model.turn + 1
    if turn > @model.players.length
      turn = 1

    switch element.id
      when "next-turn-button" then @scene.fire "game:turn:next", turn
      when "next-turn-other-button" then @scene.fire "game:turn:next", turn
      when "create-army-button"
        if currentTurn is @model.playerNumber
          @scene.fire "game:army:created", 10
      when "attack-button"
        if currentTurn is @model.playerNumber
          @attacking = true
          @attackText.show()

  "event(game:turn:next)": () ->
    @nextPlayersTurn()

  # event(country:activate)
