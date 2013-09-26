class plugins.PlayerViewModel extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @endTurnButton = @scene.getEntityById("next-turn-button")
    @endTurnButton = @endTurnButton.getPlugin(nv.ButtonUIPlugin)
    @endOtherTurnButton = @scene.getEntityById("next-turn-other-button")
    @endOtherTurnButton = @endOtherTurnButton.getPlugin(nv.ButtonUIPlugin)

  "event(game:ui:update)": () ->
    @updateData()

  "event(game:turn:end)": () ->
    @updateData()

  "event(game:land:change)": (land) ->
    @updateData()

  "event(engine:ui:slider:change)": (entity) ->
    @updateData()

  # Collects data from the current player and county to show in the UI
  updateData: () ->
    clientPlayer = @entity.model.get 'clientPlayer'
    resources = clientPlayer.resources().model
    projections = clientPlayer.resources().projections

    @entity.model.setMany
      peasants: resources.peasants
      food: resources.food
      gold: resources.gold
      soldiers: resources.soldiers
      p_peasants: projections.peasants
      p_soldiers: projections.soldiers
      p_food: projections.food
      p_gold: projections.gold

    turn = @entity.model.get 'turn'
    playerNumber = @entity.model.get 'playerNumber'
    if turn is playerNumber
      @endTurnButton.show()
      @endOtherTurnButton.hide()
    else
      @endTurnButton.hide()
      @endOtherTurnButton.show()
