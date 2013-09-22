class entities.Country extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities

    @model.set 'resourceManager', @scene.createEntity entityConfigs.resourceManager, scenario.resources
    @model.resourceManager.setOwner this

    @model.plots = []
    for plot in @model.plotData
      data =
        x: plot.x
        y: plot.y
      @model.plots.push @scene.createEntity(entityConfigs.land, data)

  resources: () ->
    @model.resourceManager

  numberOfPlots: (type) ->
    count = 0
    for plot in @model.plots
      count += 1 if plot.model.currentAnimation is type
    count