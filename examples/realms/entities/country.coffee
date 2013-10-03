class entities.Country extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities

    @model.set 'resourceManager', @scene.createEntity entityConfigs.resourceManager, scenario.resources
    @model.resourceManager.setOwner this

    @model.plots = []
    for position in @model.plotData
      landConfig = nv.extend {}, entityConfigs.land
      landConfig.model.options.x = position.x
      landConfig.model.options.y = position.y
      @model.plots.push @scene.createEntity(landConfig)

  "event(game:land:change)": (land) ->
    unless @model.plots.indexOf(land) is -1
      @resources().updateProjections()

  resources: () ->
    @model.resourceManager

  numberOfPlots: (type) ->
    count = 0
    for plot in @model.plots
      count += 1 if plot.model.value is type
    count

  allocateWorkers: (type, qty) ->
    for plot in @model.plots
      plot.model.set('workers', qty) if plot.model.value is type
