class entities.Player extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @gamepad = scene.get 'gamepad'
    @gameWidth = scene.get('canvas').getSize().width
    @model.countries = []
    @attacking = false
    @active = false
    @model.selectedCountry = 0

  onAttacked: (country, amount) ->
    found = false
    for country in @countries()
      if country.model.id is country
        found = true
        country.resources().onAttacked amount

    if found is false
      console.log "Attacked but could not find country with id: ", country

  addCountry: (data) ->
    entityConfigs = @scene.rootModel.config.entities
    @model.countries.push @scene.createEntity entityConfigs.country, data

  country: () ->
    @model.countries[@model.selectedCountry]

  selectCountry: (id) ->
    for idx in [0..@model.countries.length]
      if @model.countries[idx].model.id is id
        @model.selectedCountry = idx
        break

  selectedCountry: () ->
    @model.countries[@model.selectedCountry]

  countries: () ->
    @model.countries

  resources: () ->
    @selectedCountry().resources()

  plots: () ->
    @selectedCountry().plots()

  update: (dt) ->
    mouseX = @gamepad.getState().mouse.x - (@model.width / 2)
    @model.x = mouseX

  beginTurn: () ->
    @active = true
    for country in @countries()
      country.resources().activate(true)
      country.resources().prepareProjections()
      country.resources().updateProjections()

  endTurn: () ->
    for country in @countries()
      country.active = false
      country.resources().commitProjections()
      country.resources().activate(false)
    @active = false
