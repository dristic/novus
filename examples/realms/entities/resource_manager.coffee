class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @projections = new nv.Model {}
      
    @prepareProjections()
    @active = false

  calculateResources: (lands) ->
    # Calculate food

  createArmy: (value) ->
    # peasants = @model.get('peasants')
    gold = @model.get('gold')
    soldiers = Math.min gold, value
    console.log 'soldiers', gold, value, soldiers
    return unless soldiers > 0
    @model.set 'gold', gold - soldiers
    @projections.set 'soldiers', @projections.get('soldiers') + soldiers
    @updateProjections()

    # unless soldiers <= 0
    #   console.log 'creating soldiers', soldiers
    #   @model.set 'gold', gold - soldiers
    #   @model.set 'soldiers', @model.get('soldiers') + soldiers
    #   @updateProjections()

  "event(game:army:send)": (value) ->
    unless @active is true
      @model.set 'soldiers', ( @model.get('soldiers') - value )

  onAttacked: (value) ->
    soldiers = @model.get('soldiers') - value
    @model.set 'soldiers', Math.max(soldiers, 0)
    @model.set('peasants', @model.get('peasants') - Math.abs(soldiers)) if soldiers < 0

  setLaborDistribution: (ratio) ->
    console.log "labor ratio", ratio
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
      peasants: 0 #@model.peasants
      soldiers: 0 #@model.soldiers
      food: 0 #@model.food
      gold: 0 #@model.gold
      ratio: @model.ratio

  commitProjections: () ->
    peasants = @model.get('peasants')
    @model.setMany
      peasants: peasants + @projections.peasants
      soldiers: @model.get('soldiers') + @projections.soldiers
      gold: @model.get('gold') + @projections.gold
      food: Math.max(@model.get('food') + @projections.food, 0)
      ratio: @projections.ratio
    @grainYield = null
    @goldYield = null

  updateProjections: () ->
    @projectFarming()
    @projectMining()
    @projectPopulation()

    console.log "after update", @projections.peasants, @projections.soldiers

  projectFarming: () ->
    food = 0
    grainPlots = @owner.numberOfPlots('grain')
    if grainPlots > 0
      @grainYield = @grainYield ? (Math.random() * 1.5 + 0.7)
      laborRatio = 1 - @projections.get('ratio')
      console.log "grain yield:", @grainYield
      console.log "ratio: ", laborRatio
      # spread peasants out across fields with 50 per plot max
      farmersPerPlot = Math.round(@model.get('peasants') * laborRatio / grainPlots)
      farmersPerPlot = Math.min( farmersPerPlot, 50 )
      console.log "farmers per plot:", farmersPerPlot
      for i in [1..grainPlots]
        qty =  @grainYield * farmersPerPlot
        food += qty
    # cap food production at 300 mouths
    food = Math.min(food, 300) #+ @model.get 'food'
    console.log "food to grow:", food
    @projections.set 'food', Math.round(food) - @model.get('peasants') - @model.get('soldiers')

  projectMining: () ->
    gold = 0
    goldPlots = @owner.numberOfPlots('gold')
    if goldPlots > 0
      @goldYield = @goldYield ? (Math.random() * 1.5 + 0.7)
      laborRatio = @projections.get('ratio')
      console.log "gold yield:", @goldYield
      minersPerPlot = Math.round(@model.get('peasants') * laborRatio / goldPlots)
      minersPerPlot = Math.min( minersPerPlot, 50 )
      console.log "miners per plot:", minersPerPlot
      for i in [1..goldPlots]
        gold += @goldYield * 0.1 * minersPerPlot
    gold = Math.min(gold, 30) #+ @model.get 'gold'
    @projections.set 'gold', Math.round(gold)

  projectPopulation: () ->
    peasants = @model.get('peasants')
    soldiers = @model.get('soldiers')
    currentPopulation = peasants + soldiers

    growthTarget = Math.round(currentPopulation * 0.05)
    projectedPopulation = currentPopulation + growthTarget
    foodAvailable = @model.get('food') + @projections.get('food')

    if projectedPopulation < foodAvailable
      @projections.set 'peasants', growthTarget - @projections.get('soldiers')
    else if currentPopulation <= foodAvailable
      @projections.set 'peasants', foodAvailable - currentPopulation - @projections.get('soldiers')
    else
      deaths = Math.min(Math.round(currentPopulation * .1), currentPopulation - @model.get('food'))

      peasantDeaths = Math.round(deaths / 2)
      soldierDeaths = deaths - peasantDeaths
      projectedSoldiers = @projections.get('soldiers')

      if soldierDeaths > soldiers
        if soldiers > 0
          @projections.set 'soldiers', @projections.get('soldiers') - soldiers
        peasantDeaths += soldierDeaths - soldiers
      else
        @projections.set 'soldiers', @projections.get('soldiers') - soldierDeaths

      @projections.set 'peasants', - projectedSoldiers - peasantDeaths
