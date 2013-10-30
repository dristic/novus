#= require entities.config
#= require levels.config
#= require scenarios.config

uiFont = 'bold 16px sans-serif'
version = 'v0.0.8'

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

  playerMetadata: [ 
    flag:
      src: "/assets/shield-red-48.png"
      width: 48
      height: 48
    , 
      flag:
        src: "/assets/shield-blue-48.png"
        width: 48
        height: 48
    ,
      flag:
        src: "/assets/shield-yellow-48.png"
        width: 48
        height: 48
  ]

  scenes:
    main:
      config:
        gamepad:
          keys:
            confirm: nv.Key.Spacebar
          trackMouse: true
      engines: [
        nv.RenderingEngine,
        nv.GamepadEngine,
        nv.SoundEngine,
        nv.TimingEngine,
        nv.DebugEngine,
        nv.UIEngine
      ]
      entities:
        map:
          include: "map"
        scroll:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/paper-scroll-solid.png"
              x: 120
              y: 70
              width: 392
              height: 297
        castle:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/castle.png"
              x: 160
              y: 130
              width: 310
              height: 210
              alpha: 0.3
        title:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#000'
              font: 'bold 30px serif'
              textBaseline: 'bottom'
              text: 'Rords of the Lealm'
              x: 190
              y: 140
        startText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#444'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'How many players?'
              x: 215
              y: 220
        twoP2C:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "twoByTwoLG"
              text: "2x2"
              x: 204
              y: 260
              width: 64
              height: 64
              fillStyle: false
        twoP4C:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "twoByFour"
              text: "2x4"
              x: 284
              y: 260
              width: 64
              height: 64
              fillStyle: false
        threeP3C:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "threeByThree"
              text: "3x3"
              x: 364
              y: 260
              width: 64
              height: 64
              fillStyle: false

    game:
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
              width: 250
              height: 150
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
              y: 410
        endOtherTurnButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "End Other Turn"
              id: "next-turn-other-button"
              x: 480
              y: 410
        createArmy:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Train Soldiers"
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
        # rationsButton:
        #   entity: nv.Entity
        #   plugins: [ nv.ButtonUIPlugin ]
        #   model:
        #     options:
        #       text: "Rations"
        #       id: "rations-button"
        #       x: 20
        #       y: 290
        playerManager:
          entity: entities.PlayerManager
          plugins: [ plugins.PlayerViewModel, renderers.PlayerManager, renderers.Seasons ]
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
        laborBoard:
          entity: nv.Entity
          plugins: [ nv.PanelUIPlugin ]
          model:
            options:
              color: 'rgba(0, 0, 0, 0.5)'
              width: 196
              height: 26
              x: 49
              y: 119
        laborDistributionText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: '14px sans-serif'
              textBaseline: 'bottom'
              text: 'Labor'
              x: 54
              y: 140
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              id: "population-slider"
              leftImage: "/assets/farmer-16.wh.png"
              rightImage: "/assets/miner-16.wh.png"
              font: uiFont
              x: 98
              y: 122
              value: 50
              gap: 3
              height: 20
              lineHeight: 20
        countryName:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: '{{name}}'
              bind: entities.PlayerManager
              x: 35
              y: 32
        labels:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              lineHeight: 20
              text: [ "Peasants", "Soldiers", "Food", "Gold" ]
              x: 110
              y: 55
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: "{{peasants}}"
              bind: entities.PlayerManager
              x: 150
              y: 55
        foodText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{food}}'
              bind: entities.PlayerManager
              x: 150
              y: 95
        goldText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{gold}}'
              bind: entities.PlayerManager
              x: 150
              y: 115
        armyText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{soldiers}}'
              bind: entities.PlayerManager
              x: 150
              y: 75
        populationProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'projected-population'
              color: 'red'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: "{{p_peasants}}"
              bind: entities.PlayerManager
              x: 190
              y: 55
        populationArmy:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'projected-soldiers'
              color: 'red'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: "{{p_soldiers}}"
              bind: entities.PlayerManager
              x: 190
              y: 75
        foodProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'projected-food'
              color: 'red'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{p_food}}'
              bind: entities.PlayerManager
              x: 190
              y: 95
        goldProjected:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: 'projected-gold'
              color: 'red'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{p_gold}}'
              bind: entities.PlayerManager
              x: 190
              y: 115
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
        alert:
          entity: nv.Entity
          plugins: [ nv.AlertUIPlugin ]
          model:
            options:
              position: 'center'
              y: 200
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
        armyCreator:
          entity: entities.ArmyCreator
          plugins: []
          model:
            options:
              x: 190
              y: 200
        rationManager:
          entity: entities.RationManager
          plugins: []
          model:
            options:
              x: 190
              y: 200

    gameover:
      config:
        gamepad:
          keys:
            confirm: nv.Key.Spacebar
          trackMouse: true
      engines: [
        nv.RenderingEngine,
        nv.GamepadEngine,
        nv.SoundEngine,
        nv.TimingEngine,
        nv.DebugEngine,
        nv.UIEngine
      ]
      entities:
        map:
          include: "map"
        title:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 30px sans-serif'
              textBaseline: 'bottom'
              text: 'Rords of the Lealm'
              x: 175
              y: 140
        startText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              id: "result-text"
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'You Lose!'
              x: 245
              y: 200

  levels: realms.levels
  entities: realms.entities
  scenarios: realms.scenarios
