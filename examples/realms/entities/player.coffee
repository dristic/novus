class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @gamepad = scene.get 'gamepad'
    @gameWidth = scene.get('canvas').getSize().width
    @model.countries = []
    @attacking = false

  addCountry: (data) ->
    entityConfigs = @scene.rootModel.config.entities
    @model.countries.push @scene.createEntity entityConfigs.country, data

  resources: (country) ->
    @model.countries[0].resources()

  update: (dt) ->
    mouseX = @gamepad.getState().mouse.x - (@model.width / 2)
    @model.x = mouseX

  beginTurn: () ->
    @resources().prepareProjections()

  endTurn: () ->
    @resources().commitProjections()

  "event(scene:initialized)": () ->
    @attackText = @scene.getEntityById('attack-text').getPlugin nv.TextUIPlugin

  "event(engine:ui:clicked)": (element) ->
    if element.id is "create-army-button"
      @resources().projected().set 'soldiers', @resources().projected().get('soldiers') + 10
      @scene.fire "game:army:created", 10
    else if element.id is "attack-button"
      @attacking = true
      @attackText.show()

  "event(game:clicked:county)": (county) ->
    if @attacking is true
      if county isnt 1026
        @attacking = false
        @attackText.hide()
        @resources().current().set 'soldiers', @resources().current().get('soldiers') - 50
        @scene.fire "game:army:send", 50