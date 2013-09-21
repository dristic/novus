class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @gamepad = scene.get 'gamepad'
    @gameWidth = scene.get('canvas').getSize().width
    @model.countries = []

  addCountry: (data) ->
    entityConfigs = @scene.rootModel.config.entities
    @model.countries.push @scene.createEntity entityConfigs.country, data

  resources: (country) ->
    @model.countries[0].resources()

  update: (dt) ->
    mouseX = @gamepad.getState().mouse.x - (@model.width / 2)
    @model.x = mouseX
