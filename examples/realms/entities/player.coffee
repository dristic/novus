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

  resources: (country) ->
    @model.countries[0].resources()

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

  "event(scene:initialized)": () ->
    @attackText = @scene.getEntityById('attack-text').getPlugin nv.TextUIPlugin

  "event(engine:ui:clicked)": (element) ->
    return unless @active
    if element.id is "create-army-button"
      @scene.fire "game:army:created", 10
    else if element.id is "attack-button"
      @attacking = true
      @attackText.show()

  "event(game:clicked:county)": (county) ->
    return unless @active
    if @attacking is true
      if county isnt 1026
        @attacking = false
        @attackText.hide()
        @scene.fire "game:army:send", Math.min(@resources().current().get('soldiers'), 50)