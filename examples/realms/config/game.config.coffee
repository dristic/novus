#= require entities.config
#= require levels.config
#= require scenarios.config

uiFont = 'bold 16px sans-serif'

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
        panel:
          entity: nv.Entity
          plugins: [ nv.PanelUIPlugin ]
          model:
            options:
              color: 'rgba(0, 0, 0, 0.5)'
              width: 200
              height: 400
              x: 0
              y: 0
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
        laborDistributionText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Labor Distribution'
              x: 15
              y: 295
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              leftText: "Miners"
              rightText: "Farmers"
              font: uiFont
              x: 75
              y: 300
        currentText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Current'
              x: 15
              y: 36
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: "Population: {{population}}"
              bind: entities.PlayerManager
              x: 15
              y: 55
        foodText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Food: {{food}}'
              bind: entities.PlayerManager
              x: 15
              y: 75
        goldText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Gold {{gold}}'
              bind: entities.PlayerManager
              x: 15
              y: 95
        armyText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Army {{army}}'
              bind: entities.PlayerManager
              x: 15
              y: 115
        projectedText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'Next Turn'
              x: 15
              y: 180
        populationProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: "Population: {{p_population}}"
              bind: entities.PlayerManager
              x: 15
              y: 200
        foodProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Food: {{p_food}}'
              bind: entities.PlayerManager
              x: 15
              y: 220
        goldProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Gold {{p_gold}}'
              bind: entities.PlayerManager
              x: 15
              y: 240
        attackText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'attack-text'
              color: '#CCC'
              font: uiFont
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
              text: "Current Turn: {{turn}}"
              bind: entities.PlayerManager
              x: 480
              y: 36
        multiplayerController:
          entity: entities.MultiplayerController
          plugins: []
          model:
            options:
              url: 'https://novus-realms.firebaseio.com/'

  levels: realms.levels
  entities: realms.entities
  scenarios: realms.scenarios
