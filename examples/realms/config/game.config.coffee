#= require entities.config
#= require levels.config
#= require scenarios.config

realms.gameConfig =
  canvas:
    id: '#game-canvas'
    width: 640
    height: 480
    responsive: true
    css:
      background: '000'
      margin: '0 auto 0 auto'
      display: 'block'

  preload: [
    'assets/terrain_atlas.png'
  ]

  engines: [
    nv.RenderingEngine,
    nv.GamepadEngine,
    nv.PhysicsEngine,
    nv.TimingEngine,
    nv.DebugEngine,
    nv.SoundEngine,
    nv.ParticleEngine,
    nv.UIEngine
  ]

  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: true
      engines: [
        nv.RenderingEngine,
        nv.GamepadEngine,
        nv.SoundEngine,
        nv.TimingEngine,
        nv.DebugEngine,
        nv.ParticleEngine,
        nv.UIEngine
      ]
      entities:
        map:
          include: "map"
        landSelectionScreen:
          entity: entities.LandSelector
          plugins: [ ]
          model:
            options:
              x: 70
              y: 200
        button:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "End Turn"
              id: "next-turn-button"
              x: 480
              y: 420
        createArmy:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Create Army"
              id: "create-army-button"
              x: 480
              y: 360
        attackButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Attack"
              id: "attack-button"
              x: 480
              y: 300
        armyManager:
          entity: entities.ArmyManager
          plugins: []
          model:
            options:
              army: 0
        playerManager:
          entity: entities.PlayerManager
          plugins: []
          model:
            options:
              turn: 1
              players: []
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              x: 460
              y: 200
              leftText: "Miners"
              rightText: "Farmers"
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Population: {{resourcesCurrent.population}}"
              bind: entities.PlayerManager
              # bind: (scene) ->
              #   (key) -> (scene.getEntity(entities.PlayerManager).currentPlayer().resources().model[key])
              # binding: 'dynamic'
              x: 36
              y: 36
        foodText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Food: {{resourcesCurrent.food}}'
              bind: entities.PlayerManager
              x: 36
              y: 66
        goldText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Gold {{resourcesCurrent.gold}}'
              bind: entities.PlayerManager
              x: 36
              y: 96
        populationProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Population: {{resourcesProjected.population}}"
              bind: entities.PlayerManager
              x: 36
              y: 180
        foodProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Food: {{resourcesProjected.food}}'
              bind: entities.PlayerManager
              x: 36
              y: 210
        goldProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Gold {{resourcesProjected.gold}}'
              bind: entities.PlayerManager
              x: 36
              y: 240
        armyText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Army {{army}}'
              bind: entities.ArmyManager
              x: 36
              y: 126
        attackText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'attack-text'
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Attack Who?'
              x: 200
              y: 200
              hidden: true
        turn:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Player: {{turn}}"
              bind: entities.PlayerManager
              x: 500
              y: 36

  levels: realms.levels
  entities: realms.entities
  scenarios: realms.scenarios
