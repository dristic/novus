class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @gamepad = scene.get 'gamepad'
    @gameWidth = scene.get('canvas').getSize().width
    @model.countries = []
    @attacking = false
    @active = false

  addCountry: (data) ->
    entityConfigs = @scene.rootModel.config.entities
    @model.countries.push @scene.createEntity entityConfigs.country, data

  country: (ignore) ->
    @model.countries[0]

  resources: (country) ->
    @model.countries[0].resources()

  plots: () ->
    @model.countries[0].plots()

  update: (dt) ->
    mouseX = @gamepad.getState().mouse.x - (@model.width / 2)
    @model.x = mouseX

  beginTurn: () ->
    @active = true
    @resources().activate(true)
    @resources().prepareProjections()
    @resources().updateProjections()

  endTurn: () ->
    @active = false
    @resources().commitProjections()
    @resources().activate(false)
