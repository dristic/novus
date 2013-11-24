class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.set 'turn', 1
    @model.playerNumber = 1
    @attacking = false
    @model.season = null

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
              @scene.fire "game:army:send", 
                amount: Math.min(@clientPlayer().resources().current().get('soldiers'), 50)
                country: id
          else
            @clientPlayer().selectCountry id
            @scene.fire "game:selected:country", id
    
  "event(game:mp:player)": (number) ->
    @model.playerNumber = number
    @createPlayers()

  "event(game:army:attacked)": (data) ->
    @clientPlayer().onAttacked data.country, data.amount, data.player

  "event(game:army:send)": (data) ->
    unless data.amount <= 0
      @clientPlayer().resources().sendSoldiers data.amount

      @scene.fire 'game:ui:alert',
        type: 'info'
        message: "#{data.amount} soldiers attack #{@getCountryNameById(data.country)}!"

    else
      @scene.fire 'game:ui:alert',
        type: 'warning'
        message: "You must create an army before attacking"

  "event(game:army:battle)": (data) ->
    attacker = @getCountryNameById(data.attacker)
    @scene.fire 'game:ui:alert',
      type: 'alert'
      message: "#{attacker} attacked! #{data.kills.soldiers} soldiers and #{data.kills.peasants} peasants died in battle!"

  createPlayers: () ->
    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities
    
    @model.set 'clientPlayer', null
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
          flag.width = 16
          flag.height = 16

          data = nv.extend {}, scenario.countries[name]
          data = nv.extend data,
            country: name
            resources: scenario.resources
            ratio: 0.5
            flag: flag

          player.createCountry data

    @countries = @scene.getEntities(entities.Country)

    # @model.set 'currentPlayer', @model.players[@model.turn - 1]
    # console.log "PLAYER =", @model.currentPlayer.model.number
    # console.log "TURN =", @model.turn
    @scene.fire "game:player:assigned"
    # @currentPlayer().beginTurn()

    @model.set 'currentPlayer', null
    @model.set 'turn', 0
    @nextPlayersTurn()

  getPlayerByNumber: (number) ->
    for player in @model.players
      if player.model.get('number') is number
        return player
    null

  getCountryById: (id) ->
    for country in @countries
      if country.model.get('id') is id
        return country

  getCountryNameById: (id) ->
    @getCountryById(id).model.country

  clientPlayer: () ->
    @model.clientPlayer

  currentPlayer: () ->
    @model.currentPlayer

  nextPlayersTurn: () ->
    turn = @model.turn + 1
    if turn > @model.players.length
      turn = 1

    @currentPlayer().endTurn() if @currentPlayer()
    @model.set 'turn', turn
    @model.set 'currentPlayer', @model.players[turn - 1]
    console.log "PLAYER =", @model.currentPlayer.model.number
    console.log "TURN =", @model.turn

    if @clientPlayer().model.number is turn
      @clientPlayer().beginTurn()

    @advanceSeason()
    @scene.fire "game:turn:end", turn

  advanceSeason: () ->
    # udpdate seasons on player one's turn only
    return unless @model.turn is 1 && @clientPlayer().model.number is 1
    if @model.season is null
      @model.season = -1
      console.log "[INIT] player #{@clientPlayer().model.number} initing season"
    season = (@model.get('season') + 1) % 4 # seasons are 0 - 3 (SFWS)

    console.log "SEASON CHANGE: #{season}"
    @scene.fire "game:change:season", season

  "event(game:season:changed)": (season) ->
    @model.set 'season', season

  "event(engine:ui:slider:change)": (entity) ->
    if @currentPlayer() and entity.model.id is "population-slider"
      value = Math.floor(entity.model.value) / 100
      @currentPlayer().resources().setLaborDistribution value

  "event(game:rations:set)": (value) ->
      @currentPlayer().resources().setFoodRations value

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
          gold = @clientPlayer().resources().model.get 'gold'
          unless gold is 0
            @scene.fire "game:armycreator:show", gold
          else
            @scene.fire 'game:ui:alert',
                type: 'info'
                message: "Training peasants requires gold. Mine some."

      when "attack-button"
        if currentTurn is @model.playerNumber
          @attacking = true
          @attackText.show()

      when "rations-button"
        @scene.fire "game:rationmanager:show", 1 #@clientPlayer().model.rations

  "event(game:turn:next)": () ->
    @nextPlayersTurn()

  "event(game:country:captured)": (data) ->
    country = @getCountryById data.country
    @getPlayerByNumber(data.defeated).removeCountry(country)
    @getPlayerByNumber(data.victor).addCountry(country)

