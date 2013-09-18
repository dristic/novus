class entities.LandSelector extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @selecting = false
    @land = null

    @buttons = []
    @buttonConfig = scene.get('config').entities.landSelector
    for button of @buttonConfig
      config = @buttonConfig[button]
      config.model.options.hidden = true
      button = @scene.createEntity config
      button.model.y += @model.y
      button.model.x += @model.x
      @buttons.push button

  show: () ->
    for button in @buttons
      button.getPlugin(nv.ButtonUIPlugin).show()

  hide: () ->
    for button in @buttons
      button.getPlugin(nv.ButtonUIPlugin).hide()

  "event(engine:ui:clicked)": (element) ->
    if @selecting is true
      if @buttons.indexOf(element.entity) isnt -1
        type = element.entity.model.id
        if type is 'select-grain'
          @land.changeType 'grain'
        else if type is 'select-field'
          @land.changeType 'field'
        else if type is 'select-gold'
          @land.changeType 'gold'
        @selecting = false
        @hide()

  "event(engine:rendering:clicked:Land)": (entity) ->
    if @selecting is false
      @land = entity
      @selecting = true
      @show()
