class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(engine:ui:clicked)": (element) ->
    if element.id is "next-turn-button"
      population = @model.get 'population'
      population += 100
      @model.set 'population', population

  "event(game:army:created)": (value) ->
    @model.set 'population', @model.get('population') - value
