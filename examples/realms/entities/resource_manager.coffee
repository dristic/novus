class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @projections = new nv.Model {}
      
    @prepareProjections()
    @active = false

  calculateResources: (lands) ->
    # Calculate food

  createArmy: (value) ->
    gold = @model.get('gold')
    soldiers = Math.floor( Math.min gold, value, @model.get('peasants') )

    if soldiers > 0
      @model.set 'gold', @goldCalc(gold - soldiers)
      @projections.set 'soldiersInTraining', @projections.get('soldiersInTraining') + soldiers
      @updateProjections()
    else
      @scene.fire 'game:ui:alert',
        type: 'warning'
        message: 'Training soldiers requires gold.'

  sendSoldiers: (value) ->
    @model.set 'soldiers', ( @model.get('soldiers') - value )

  onAttacked: (value) ->
    peasantKills = 0
    soldierKills = 0

    # Randomize the battles a bit
    morale = (Math.random() * 0.3) + 0.85
    value = Math.floor(morale * value)

    soldiers = @model.get('soldiers') - value
    @model.set 'soldiers', Math.max(soldiers, 0)

    # Find how many soldier kills we have
    if soldiers < 0
      soldierKills = value - Math.abs(soldiers)
    else
      soldierKills = value

    # If we don't have enough soldiers kill peasants
    if soldierKills < value
      peasants = @model.get 'peasants'
      peasantKills = value - soldierKills
      peasantKills *= 3
      peasants = peasants - peasantKills
      @model.set 'peasants', peasants

    @scene.fire "game:army:battle",
      kills:
        soldiers: soldierKills
        peasants: peasantKills

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
      peasants: 0 
      soldiers: 0 
      soldiersInTraining: 0
      food: 0 
      gold: 0 
      ratio: @model.ratio
    if @model.food < @model.get('peasants') + @model.get('soldiers')
      @scene.fire 'game:ui:alert',
        type: 'warning'
        message: 'Your population is starving. Grow food.'

  commitProjections: () ->
    peasants = @model.get('peasants')
    @model.setMany
      peasants: peasants + @projections.peasants
      soldiers: Math.max(@model.get('soldiers') + @projections.soldiers, 0)
      gold: @goldCalc( @model.get('gold') + @projections.gold )
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
      farmersPerPlot = Math.floor(@model.get('peasants') * laborRatio / grainPlots)
      farmersPerPlot = Math.min( farmersPerPlot, 50 )
      @owner.setPlotData 'grain', farmersPerPlot, @grainYield
      console.log "farmers per plot:", farmersPerPlot
      for i in [1..grainPlots]
        qty =  @grainYield * farmersPerPlot
        food += qty
    # cap food production at 300 mouths
    food = Math.min(food, 300)
    console.log "food to grow:", food
    @projections.set 'food', Math.round(food) - @model.get('peasants') - @model.get('soldiers')

  goldCalc: (gold) ->
    Math.round((gold * 10)) / 10

  projectMining: () ->
    gold = 0
    goldPlots = @owner.numberOfPlots('gold')
    if goldPlots > 0
      @goldYield = @goldYield ? (Math.random() * 1.5 + 0.7)
      laborRatio = @projections.get('ratio')
      console.log "gold yield:", @goldYield
      minersPerPlot = Math.floor(@model.get('peasants') * laborRatio / goldPlots)
      minersPerPlot = Math.min( minersPerPlot, 50 )
      @owner.setPlotData 'gold', minersPerPlot, @goldYield
      console.log "miners per plot:", minersPerPlot
      for i in [1..goldPlots]
        gold += @goldYield * 0.1 * minersPerPlot
    gold = Math.min(gold, 30)
    @projections.set 'gold', @goldCalc(gold)

  projectPopulation: () ->
    peasants = @model.get('peasants')
    soldiers = @model.get('soldiers')
    soldiersInTraining = @projections.get('soldiersInTraining')
    currentPopulation = peasants + soldiers

    console.log "cur pop:", peasants, soldiers, currentPopulation, soldiersInTraining

    growthTarget = Math.round(currentPopulation * 0.075)
    projectedPopulation = currentPopulation + growthTarget
    foodAvailable = @model.get('food') #+ @projections.get('food')

    console.log "growth:", growthTarget, projectedPopulation, foodAvailable

    @projections.set 'soldiers', soldiersInTraining

    if projectedPopulation < foodAvailable
      @projections.set 'peasants', growthTarget - soldiersInTraining
    else if currentPopulation <= foodAvailable
      @projections.set 'peasants', foodAvailable - currentPopulation - soldiersInTraining
    else
      deaths = Math.min(Math.round(currentPopulation * .1), currentPopulation - foodAvailable)

      peasantDeaths = Math.round(deaths / 2)
      soldierDeaths = deaths - peasantDeaths

      if soldiers is 0 
        peasantDeaths += soldierDeaths
        soldierDeaths = 0
      else if soldierDeaths > soldiers
        diff = soldierDeaths - soldiers
        soldierDeaths = soldiers
        peasantDeaths += diff

      @projections.set 'soldiers', soldiersInTraining - soldierDeaths
      @projections.set 'peasants',  -1 * peasantDeaths

    console.log "pop / soldiers:", @projections.get('peasants'), @projections.get('soldiers')

