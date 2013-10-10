class plugins.PlayerViewModel extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

  "event(scene:initialized)": () ->
    turnControls =
      "next-turn-button": nv.ButtonUIPlugin
      "projected-population": nv.TextUIPlugin
      "projected-soldiers": nv.TextUIPlugin
      "projected-food": nv.TextUIPlugin
      "projected-gold": nv.TextUIPlugin

    doneControls =
      "next-turn-other-button": nv.ButtonUIPlugin

    @turnControls = []
    for id, type of turnControls
      control = @scene.getEntityById id
      @turnControls.push control.getPlugin(type)

    @doneControls = []
    for id, type of doneControls
      control = @scene.getEntityById id
      @doneControls.push control.getPlugin(type)

    # @endTurnButton = @scene.getEntityById("next-turn-button")
    # @endTurnButton = @endTurnButton.getPlugin(nv.ButtonUIPlugin)
    # @endOtherTurnButton = @scene.getEntityById("next-turn-other-button")
    # @endOtherTurnButton = @endOtherTurnButton.getPlugin(nv.ButtonUIPlugin)

    @entity.model.on 'change:turn', (value) =>
      switch value
        when 1 then @entity.model.set 'turnColor', 'Red'
        when 2 then @entity.model.set 'turnColor', 'Blue'

  "event(game:player:assigned)": () ->
    clientPlayer = @entity.model.get 'clientPlayer'
    resources = clientPlayer.resources().model
    projections = clientPlayer.resources().projections

    resources.on 'change', (key, value) =>
      @entity.model.set key, value

    projections.on 'change', (key, value) =>
      if value > 0 then value = "+#{value}"
      @entity.model.set "p_#{key}", value

    @entity.model.setMany
      peasants: resources.peasants
      food: resources.food
      gold: resources.gold
      soldiers: resources.soldiers
      p_peasants: projections.peasants
      p_soldiers: projections.soldiers
      p_food: projections.food
      p_gold: projections.gold
      name: clientPlayer.country(0).model.country

    @updateTurnButton()

  "event(game:turn:end)": () ->
    @updateTurnButton()

  showControls: (controls, show) ->
    for control in controls
      if show then control.show() else control.hide()

  # Collects data from the current player and county to show in the UI
  updateTurnButton: () ->
    turn = @entity.model.get 'turn'
    playerNumber = @entity.model.get 'playerNumber'

    @showControls @turnControls, (turn is playerNumber)
    @showControls @doneControls, (turn isnt playerNumber)
