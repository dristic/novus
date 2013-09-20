class entities.Country extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities

    data = 
      current: scenario.resources
      future: scenario.resources

    @model.resourceManager = @scene.createEntity entityConfigs.resourceManager, data