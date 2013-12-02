class entities.ResourceManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    @projections = new nv.Model {}
      
    @active = false
    @season = 0
    @populationYieldMultiplier = 0.1
    @maxFoodPerSeason = 400
    @maxGoldPerSeason = 40

    @seasonData =
      # summer, fall, winter, spring
      farming: [ 
          base: 2.0
          range: 1.0
        , 
          base: 2.25
          range: 1.75
        , 
          base: 0.2
          range: 0.5
        ,
          base: 0.8
          range: 1.0
      ]
      mining: [ 
          base: 0.9
          range: 1.5
        ,
          base: 0.7
          range: 1.5
        ,
          base: 0.5
          range: 0.5
        , 
          base: 0.6
          range: 1.0
      ]
      attacking: [ 
          base: 0.85
          range: 0.3
        ,
          base: 0.75
          range: 0.3
        ,
          base: 0.3
          range: 0.3
        ,
          base: 0.85
          range: 0.3
      ]

    @prepareProjections()


  "event(game:season:changed)": (season) ->
    console.log "season changed", season
    @season = season
    @calcYields()
    @updateProjections()

  getPopulation: () ->
    @model.get('peasants') + @model.get('soldiers')

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

  onAttacked: (value, countryId) ->
    peasantKills = 0
    soldierKills = 0

    # Randomize the battles a bit
    seasonVars = @seasonData.attacking[ @season ]
    morale = (Math.random() * seasonVars.range) + seasonVars.base
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
      attacker: countryId

  setLaborDistribution: (ratio) ->
    console.log "labor ratio", ratio
    @projections.set 'ratio', ratio
    @updateProjections()

  setFoodRations: (value) ->
    console.log "food rations", value
    @projections.set 'rations', value
    @updateProjections()

  setOwner: (owner) ->
    @owner = owner

  current: () ->
    @model

  projected: () ->
    @projections

  activate: (state) ->
    @active = state

  calcYields: () ->
    @grainYield = (Math.random() * @seasonData.farming[ @season ].range + @seasonData.farming[ @season ].base)
    @goldYield = (Math.random() * @seasonData.mining[ @season ].range + @seasonData.mining[ @season ].base)
    @populationYield = null
    
    console.log "grainYield:", @seasonData.farming[@season].base, @seasonData.farming[ @season ].range, @grainYield
    console.log "goldYield:", @seasonData.mining[@season].base, @seasonData.mining[ @season ].range, @goldYield

  prepareProjections: () ->
    @calcYields()

    @projections.setMany
      peasants: 0 
      soldiers: 0 
      soldiersInTraining: 0
      food: 0 
      gold: 0 
      ratio: @model.ratio
      rations: @model.rations
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
      rations: @projections.rations
    @grainYield = null
    @goldYield = null
    @populationYield = null

  updateProjections: () ->
    @projectFarming()
    @projectMining()
    @projectPopulation()

    console.log "after update", @projections.peasants, @projections.soldiers

  projectFarming: () ->
    food = 0
    laborRatio = 1 - @projections.get('ratio')
    unless @model.plotsEnabled
      food = @model.get('peasants') * laborRatio * @grainYield
    else
      grainPlots = @owner.numberOfPlots('grain')
      if grainPlots > 0
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
    food = Math.min(food, @maxFoodPerSeason)
    console.log "food to grow:", food
    @projections.set 'food', Math.round(food - (( @model.get('peasants') + @model.get('soldiers') ) * @projections.get('rations')))

  goldCalc: (gold) ->
    Math.round((gold * 10)) / 10

  projectMining: () ->
    gold = 0
    laborRatio = @projections.get('ratio')
    unless @model.plotsEnabled
      gold = @model.get('peasants') * laborRatio * @goldYield * .1
    else
      goldPlots = @owner.numberOfPlots('gold')
      if goldPlots > 0
        seasonVars = @seasonData.mining[ @season ]
        console.log "gold yield:", @goldYield
        minersPerPlot = Math.floor(@model.get('peasants') * laborRatio / goldPlots)
        minersPerPlot = Math.min( minersPerPlot, 50 )
        @owner.setPlotData 'gold', minersPerPlot, @goldYield
        console.log "miners per plot:", minersPerPlot
        for i in [1..goldPlots]
          gold += @goldYield * 0.1 * minersPerPlot
    gold = Math.min(gold, @maxGoldPerSeason)
    @projections.set 'gold', @goldCalc(gold)

  projectPopulation: () ->
    peasants = @model.get('peasants')
    soldiers = @model.get('soldiers')
    soldiersInTraining = @projections.get('soldiersInTraining')
    currentPopulation = peasants + soldiers

    console.log "cur pop:", peasants, soldiers, currentPopulation, soldiersInTraining

    @populationYield = @populationYield ? (Math.random() * @populationYieldMultiplier)
    console.log "population yield", @populationYield

    growthTarget = Math.round(currentPopulation * (@populationYield * @projections.get('rations')))
    projectedPopulation = currentPopulation + growthTarget
    foodAvailable = if @projections.get('rations') > 0 then @model.get('food') / @projections.get('rations') else 0 #+ @projections.get('food')

    console.log "growth:", growthTarget, projectedPopulation, foodAvailable

    @projections.set 'soldiers', soldiersInTraining

    if projectedPopulation < foodAvailable
      @projections.set 'peasants', Math.round(growthTarget - soldiersInTraining)
    else if currentPopulation <= foodAvailable
      @projections.set 'peasants', Math.round(foodAvailable - currentPopulation - soldiersInTraining)
    else
      deaths = Math.min(Math.round(currentPopulation * .1), currentPopulation - foodAvailable)
      deaths = 1 if deaths is 0

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

