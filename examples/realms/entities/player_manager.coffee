class entities.PlayerManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.turn = 0
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
    @nextPlayersTurn()

  currentPlayer: ()->
    @model.currentPlayer

  nextPlayersTurn: () ->
    turn = @model.turn + 1
    if turn > @model.players.length
      turn = 1

    @currentPlayer().endTurn() if @currentPlayer()

    @model.set 'turn', turn
    @model.set 'currentPlayer', @model.players[turn - 1]
    @currentPlayer().beginTurn()

    @model.set 'resourcesCurrent', @currentPlayer().resources().current()
    @model.set 'resourcesProjected', @currentPlayer().resources().projected()

  "event(engine:ui:slider:change)": (entity) ->
    value = Math.floor(entity.model.value) / 100
    @currentPlayer().resources().setPopulationRatio value
    @currentPlayer().resources().updateProjections()

  "event(game:turn:next)": () ->
    @nextPlayersTurn()

  # event(country:activate)
