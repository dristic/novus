#= require entities.config
#= require levels.config
#= require scenarios.config

uiFont = 'bold 16px sans-serif'
version = 'v0.0.3'

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
              width: 265
              height: 480
              x: 0
              y: 0
        endTurnButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "End Turn"
              id: "next-turn-button"
              x: 480
              y: 420
        endOtherTurnButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "End Other Turn"
              id: "next-turn-other-button"
              x: 480
              y: 360
        createArmy:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Create Army"
              id: "create-army-button"
              x: 20
              y: 410
        attackButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Attack"
              id: "attack-button"
              x: 20
              y: 350
        playerManager:
          entity: entities.PlayerManager
          plugins: [ plugins.PlayerViewModel, renderers.PlayerManager ]
          model:
            options:
              version: version
              playerColor: '...'
              turn: 1
              players: []
        landSelectionScreen:
          entity: entities.LandSelector
          plugins: [ ]
          model:
            options:
              x: 70
              y: 200
        laborDistributionText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: '14px sans-serif'
              textBaseline: 'bottom'
              text: 'Labor Distribution'
              x: 15
              y: 295
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              #leftText: "Farmers"
              #rightText: "Miners"
              leftImage: "/assets/farmer-16.wh.png"              
              rightImage: "/assets/miner-16.wh.png"              
              font: uiFont
              x: 15
              y: 300
              value: 50
              gap: 3
              height: 20
              lineHeight: 20
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
              text: "Peasants: {{peasants}}"
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
              y: 95
        goldText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Gold: {{gold}}'
              bind: entities.PlayerManager
              x: 15
              y: 115
        armyText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Soldiers: {{soldiers}}'
              bind: entities.PlayerManager
              x: 15
              y: 75
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
              y: 170
        populationProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: "Peasants: {{p_peasants}}"
              bind: entities.PlayerManager
              x: 15
              y: 190
        populationArmy:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: "Soldiers: {{p_soldiers}}"
              bind: entities.PlayerManager
              x: 15
              y: 210
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
              y: 230
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
              y: 250
        attackText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'attack-text'
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              text: 'Send Troops Where?'
              x: 250
              y: 250
              hidden: true
        turn:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Turn: {{turnColor}}"
              bind: entities.PlayerManager
              x: 480
              y: 36
        playerColorText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "{{playerColor}}"
              bind: entities.PlayerManager
              x: 350
              y: 36
        multiplayerController:
          entity: entities.MultiplayerController
          plugins: []
          model:
            options:
              url: 'https://novus-realms.firebaseio.com'
        versionText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#999'
              font: '12px console'
              textBaseline: 'bottom'
              text: "{{version}}"
              bind: entities.PlayerManager
              x: 3
              y: 480
        # dialogTest:
        #   entity: nv.Entity
        #   plugins: [ nv.DialogUIPlugin ]
        #   model:
        #     options:
        #       x: 200
        #       y: 200
        alert:
          entity: nv.Entity
          plugins: [ nv.AlertUIPlugin ]
          model:
            options:
              position: 'center'
              y: 10
              width: 300
              height: 25
              lineHeight: 18
              viewTime: 4
              fadeTime: 2
              font: '16px san-serif'
              info:
                style: '#7FFF2B'
                color: '#222'
              warning:
                style: 'yellow'
                color: '#222'
              alert:
                style: '#D40000'
                color: '#fff'
              

  levels: realms.levels
  entities: realms.entities
  scenarios: realms.scenarios
