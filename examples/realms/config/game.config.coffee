#= require entities.config
#= require levels.config

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
        background:
          include: "background"
        land:
          include: "land"
        landTwo:
          include: "landTwo"
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
              text: "Next Turn"
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
        turnManager:
          entity: entities.TurnManager
          plugins: []
          model:
            options:
              players: 2
              turn: 1
        resourceManager:
          entity: entities.ResourceManager
          plugins: []
          model:
            options:
              food: 100
              population: 50
              gold: 0
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              x: 460
              y: 200
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Population: {{population}}"
              bind: entities.ResourceManager
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
              text: 'Food {{food}}'
              bind: entities.ResourceManager
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
              text: 'Gold {{gold}}'
              bind: entities.ResourceManager
              x: 36
              y: 96
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
        turn:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Player: {{turn}}"
              bind: entities.TurnManager
              x: 500
              y: 36

  levels: realms.levels
  entities: realms.entities
