class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @projections = new nv.Model {}
      
    @prepareProjections()
    @active = false

  calculateResources: (lands) ->
    # Calculate food

  "event(game:army:created)": (value) ->
    return unless @active is true
    peasants = @projections.get('peasants')
    value = Math.min(peasants, value)
    @projections.set 'peasants', peasants - value
    @projections.set 'soldiers', @projections.get('soldiers') + value
    @updateProjections()

  "event(game:army:send)": (value) ->
    return unless @active is true
    @model.set 'soldiers', ( @model.get('soldiers') - value )

  "event(game:army:attacked)": (value) ->
    return unless @active is false
    soldiers = @model.get('soldiers') - value
    @model.set 'soldiers', Math.max(soldiers, 0)
    @model.set('peasants', @model.get('peasants') - Math.abs(soldiers)) if soldiers < 0

  setLaborDistribution: (ratio) ->
    @projections.set 'ratio', ratio
    @updateProjections()

  setOwner: (owner) ->
    @owner = owner

  current: () ->
    @model

  projected: () ->
    @projections

  activate: (state) ->
    @active = state

  prepareProjections: () ->
    @projections.setMany
      peasants: @model.peasants
      soldiers: @model.soldiers
      food: @model.food
      gold: @model.gold
      ratio: @model.ratio

  commitProjections: () ->
    @model.setMany
      peasants: @projections.peasants
      soldiers: @projections.soldiers
      gold: @projections.gold
      food: @projections.food
      ratio: @projections.ratio

  updateProjections: () ->
    @projectFarming()
    @projectMining()
    @projectPopulation()

    console.log "after update", @projections.peasants, @projections.soldiers

  projectFarming: () ->
    food = 0
    grainPlots = @owner.numberOfPlots('grain')
    if grainPlots > 0
      for i in [1..grainPlots]
        food += (Math.random() * 1.5 + 0.7) * ( @projections.get('peasants') * (1 - @projections.get('ratio')) )
    food = Math.min(food, 300) + @model.get 'food'
    @projections.set 'food', Math.round(food)

  projectMining: () ->
    gold = 0
    goldPlots = @owner.numberOfPlots('gold')
    if goldPlots > 0
      for i in [1..goldPlots]
        gold += (Math.random() * 1.5 + 0.7) * 0.1 * ( @projections.get('peasants') * @projections.get('ratio') )
    gold = Math.min(gold, 30) + @model.get 'gold'
    @projections.set 'gold', Math.round(gold)

  projectPopulation: () ->
    currentPopulation = @model.get('peasants') + @model.get('soldiers')
    growthTarget = Math.round(currentPopulation * 0.05)
    projectedPopulation = currentPopulation + growthTarget
    foodAvailable = @projections.get 'food'

    # console.log "current pop", @model.get('peasants'), @model.get('soldiers')
    # console.log "project pop", @projections.get('peasants'), @projections.get('soldiers')
    # console.log growthTarget, projectedPopulation, foodAvailable

    if projectedPopulation < foodAvailable
      @projections.set 'peasants', (currentPopulation + growthTarget - @projections.get('soldiers'))
    else if currentPopulation < foodAvailable
      @projections.set 'peasants', Math.round(foodAvailable - @projections.get('soldiers'))
    else
      deaths = Math.round(currentPopulation * .1)
      newPopulation = currentPopulation - deaths

      peasantDeaths = Math.round(deaths / 2)
      soldierDeaths = deaths - peasantDeaths

      soldiers = @projections.get('soldiers') - soldierDeaths
      @projections.set 'soldiers', Math.max(soldiers, 0)
      peasantDeaths += Math.abs(soldierDeaths) if soldiers < 0
      @projections.set('peasants', @projections.get('peasants') - peasantDeaths) if soldiers < 0

    food = @projections.get 'food'
    food -= @projections.get('peasants') + @projections.get('soldiers')
    @projections.set 'food', Math.max(food, 0)
