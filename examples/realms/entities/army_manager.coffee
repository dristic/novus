class entities.ArmyManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

  "event(engine:ui:clicked)": (element) ->
    if element.id is "create-army-button"
      army = @model.get 'army'
      army += 10
      @model.set 'army', army