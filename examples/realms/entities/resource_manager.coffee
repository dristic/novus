class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @model.setMany
      farmers: 0
      miners: 0
      soldiers: 0

  calculateResources: (lands) ->
    # Calculate food

  "event(engine:ui:clicked)": (element) ->
    if element.id is "next-turn-button"
      population = @model.get 'population'
      population += 100
      @model.set 'population', population

  "event(game:army:created)": (value) ->
    @model.set 'population', @model.get('population') - value

  setOwner: (owner) ->
    @owner = owner

  current: () ->
    @model

  projections: () ->
    @model.get 'projections'

  prepareProjections: () ->
    @projections = @model.clone()

  commitProjections: () ->
    @model.setMany
      population: @projections.population
      gold: @projections.gold
      food: @projections.food
      farmers: @projections.farmers
      miners: @projections.miners
      soldiers: @projections.soldiers
    @projections = null

  updateProjections: () ->
    @projectFarming()
    @projectMining()
    @projectPopulation()

  projectFarming: () ->
    food = 0
    for i in [0..@owner.numberOfPlots('grain')]
      food += (Math.random() * 1.5 + 0.7) * @projection.get('farmers')
    food = Math.min(food, 300) + @model.get 'food'
    @projections.set 'food', food

  projectMining: () ->
    gold = 0
    for i in [0..@owneer.numberOfPlots('gold')]
      gold += (Math.random() * 1.5 + 0.7) * 0.1 * @projection.get('miners')
    gold = Math.min(gold, 30) + @model.get 'gold'
    @projections.set 'gold', gold

  projectPopulation: () ->
    currentPopulation = @model.get 'population'
    growthTarget = currentPopulation * 1.05

    supportablePopulation = @projections.get 'food'

    if growthTarget < supportablePopulation
      @projections.set 'population', growthTarget
    else if currentPopulation < supportablePopulation
      @projections.set 'population', supportablePopulation
    else
      deathTarget = currentPopulation * .1

      employedWorkers = @projections.get('farmers') + @projections.get('miners') + @projections.get('soldiers')

      newPopulation = currentPopulation - deathTarget
      @projections.set 'population', newPopulation

      workerImbalance = newPopulation - employedWorkers
      while workerImbalance < 0
        soldiers = @projections.get 'soldiers'
        miners = @projections.get 'miners'
        farmers = @projections.get 'farmers'

        if soldiers > 0
          workerImbalance += soldiers
          @projections.set 'soldiers', Math.max(0, workerImbalance)
        else if miners > 0
          workerImbalance += miners
          @projections.set 'soldiers', Math.max(0, workerImbalance)
        else if farmers > 0
          workerImbalance += farmers
          @projections.set 'soldiers', Math.max(0, workerImbalance)

    food = @projections.get 'food'
    food -= @projections.get 'population'
    @projections.set 'food', food
