class plugins.PlayerViewModel extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @entity.model.setMany
      peasants: ""
      food: ""
      gold: ""
      soldiers: ""
      p_peasants: ""
      p_soldiers: ""
      p_food: ""
      p_gold: ""
      name: ""

    @resources = null

  "event(scene:initialized)": () ->
    turnControls =
      "attack-button": nv.SpriteButtonUIPlugin
      "create-army-button": nv.SpriteButtonUIPlugin
      "rations-button": nv.SpriteButtonUIPlugin
      "next-turn-button": nv.SpriteButtonUIPlugin
      "projected-population": nv.TextUIPlugin
      "projected-soldiers": nv.TextUIPlugin
      "projected-food": nv.TextUIPlugin
      "projected-gold": nv.TextUIPlugin

    doneControls =
      "next-turn-other-button": nv.ButtonUIPlugin

    @turnControls = []
    for id, type of turnControls
      control = @scene.getEntityById id
      @turnControls.push control.getPlugin(type) if control

    @doneControls = []
    for id, type of doneControls
      control = @scene.getEntityById id
      @doneControls.push control.getPlugin(type) if control

    @entity.model.on 'change:turn', (value) =>
      switch value
        when 1 then @entity.model.set 'turnColor', 'Red'
        when 2 then @entity.model.set 'turnColor', 'Blue'

  resourceChanged: (key, value) =>
    @entity.model.set key, value

  projectionChanged: (key, value) =>
    if value > 0 then value = "+#{value}"
    @entity.model.set "p_#{key}", value

  unbindResources: () ->
    unless @resources is null
      @resources.off 'change', @resourceChanged
      @projections.off 'change', @projectionChanged

  bindResources: () ->
    @unbindResources()

    clientPlayer = @entity.model.get 'clientPlayer'
    @resources = clientPlayer.resources().model
    @projections = clientPlayer.resources().projections

    console.log "BINDING TO PLAYER =", clientPlayer.model.number, clientPlayer.country().name()

    @resources.on 'change', @resourceChanged
    @projections.on 'change', @projectionChanged

    @entity.model.setMany
      peasants: @resources.peasants
      food: @resources.food
      gold: @resources.gold
      soldiers: @resources.soldiers
      rations: @resources.rations
      p_peasants: @projections.peasants
      p_soldiers: @projections.soldiers
      p_food: @projections.food
      p_gold: @projections.gold
      p_rations: @projections.rations
      name: clientPlayer.country().name()

  "event(game:player:assigned)": () ->
    @bindResources()
    @updateTurnButton()

  "event(game:turn:end)": () ->
    @updateTurnButton()

  "event(game:selected:country)": () ->
    @bindResources()


  showControls: (controls, show) ->
    for control in controls
      if show then control.show() else control.hide()

  # Collects data from the current player and county to show in the UI
  updateTurnButton: () ->
    turn = @entity.model.get 'turn'
    playerNumber = @entity.model.get 'playerNumber'

    @showControls @turnControls, (turn is playerNumber)
    @showControls @doneControls, (turn isnt playerNumber)
