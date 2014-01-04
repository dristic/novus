class entities.Country extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    rootModel = @scene.rootModel
    scenario = rootModel.get 'scenario'
    entityConfigs = rootModel.config.entities

    @model.set 'resourceManager', @scene.createEntity entityConfigs.resourceManager, scenario.resources
    @model.resourceManager.setOwner this

    plots = []
    for position in @model.plots
      landConfig = nv.extend {}, entityConfigs.land
      landConfig.model.options.x = position.x
      landConfig.model.options.y = position.y
      plots.push @scene.createEntity(landConfig)

    @model.plots = plots

  "event(game:land:change)": (land) ->
    unless @model.plots.indexOf(land) is -1
      @resources().updateProjections()

  name: () ->
    @model.get 'country'

  resources: () ->
    @model.resourceManager

  population: () ->
    @model.resourceManager.getPopulation()

  plots: () ->
    @model.plots

  numberOfPlots: (type) ->
    count = 0
    for plot in @model.plots
      count += 1 if plot.model.value is type
    count

  # allocateWorkers: (type, qty) ->
  #   for plot in @model.plots
  #     plot.model.set('workers', qty) if plot.model.value is type

  setPlotData: (type, workers, harvest) ->
    for plot in @model.plots
      if plot.model.value is type
        plot.model.set('workers', workers) 
        plot.model.set('yield', harvest)
