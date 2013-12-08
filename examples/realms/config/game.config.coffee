#= require entities.config
#= require levels.config
#= require scenarios.config

uiFont = '16px sans-serif'
version = 'v0.1.0s'

realms.gameConfig =
  canvas:
    id: '#game-canvas'
    width: 960
    height: 640
    #responsive: true
    fullscreen: true
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
          include: "splashScreen"
        scroll:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/paper-scroll-solid.png"
              x: "50%"
              y: 200
              width: 392
              height: 297
        castle:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/castle.png"
              x: "50%"
              y: 250
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
              text: 'Lords of the Hundred'
              x: "50%"
              y: 263
        startText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#444'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: 'How many players?'
              x: "50%"
              y: 395
        twoPlayer:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "twoPlayer"
              text: "2"
              x: "42%"
              y: 400
              width: 45
              height: 40
              fillStyle: false
        threePlayer:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "twoByFour"
              text: "3"
              x: "46%"
              y: 400
              width: 45
              height: 40
              fillStyle: false
        fourPlayer:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "threeByThree"
              text: "4"
              x: "50%"
              y: 400
              width: 45
              height: 40
              fillStyle: false
        fivePlayer:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "threeByThree"
              text: "5"
              x: "54%"
              y: 400
              width: 45
              height: 40
              fillStyle: false
        sixPlayer:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              id: "threeByThree"
              text: "6"
              x: "58%"
              y: 400
              width: 45
              height: 40
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
          include: "imageMap"
        playerStats:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/controls-chrome.png"
              x: 0
              y: 0
              width: 357
              height: 250
        playerActions:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/button-bar.png"
              x: 0
              y: -160
              width: 300
              height: 150
              anchor: "bottomLeft"
        endTurnButton:
          entity: nv.Entity
          plugins: [ nv.SpriteButtonUIPlugin ]
          model:
            options:
              src: "/assets/end-turn-button.png"
              id: "next-turn-button"
              x: -164
              y: 145
              width: 144
              height: 144
              anchor: "topRight"
        endOtherTurnButton:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "End Other Turn"
              id: "next-turn-other-button"
              x: -180
              y: 310
              anchor: "topRight"
        createArmy:
          entity: nv.Entity
          plugins: [ nv.SpriteButtonUIPlugin ]
          model:
            options:
              src: "/assets/train-soldiers.png"
              id: "create-army-button"
              x: 235
              y: -150
              width: 50
              height: 50
              anchor: "bottomLeft"
        attackButton:
          entity: nv.Entity
          plugins: [ nv.SpriteButtonUIPlugin ]
          model:
            options:
              src: "/assets/cannon.png"
              id: "attack-button"
              x: 235
              y: -110
              width: 50
              height: 50
              anchor: "bottomLeft"
        rationsButton:
          entity: nv.Entity
          plugins: [ nv.SpriteButtonUIPlugin ]
          model:
            options:
              src: "/assets/rations.png"
              id: "rations-button"
              x: 235
              y: -70
              width: 50
              height: 50
              anchor: "bottomLeft"
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
        sliderControl:
          entity: nv.Entity
          plugins: [ nv.SliderUIPlugin ]
          model:
            options:
              id: "population-slider"
              leftImage: "/assets/farmer-16.png"
              rightImage: "/assets/miner-16.png"
              font: uiFont
              thumbColor: "#151515"
              x: 75
              y: -50
              anchor: "bottomLeft"
              value: 50
              gap: 3
              height: 20
              lineHeight: 20
        countryName:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: 'bold 18px sans-serif'
              textBaseline: 'bottom'
              text: '{{name}}'
              bind: entities.PlayerManager
              x: 135
              y: 42
        labels:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              lineHeight: 20
              text: [ "Peasants", "Soldiers", "Food", "Gold" ]
              x: 115
              y: -120
              anchor: "bottomLeft"
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: "{{peasants}}"
              bind: entities.PlayerManager
              x: 195
              y: 83
        popIcon:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/peasant-16.png"
              x: 197
              y: 65
              width: 12
              height: 16
        armyText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{soldiers}}'
              bind: entities.PlayerManager
              x: 270
              y: 83
        armyIcon:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/soldier-16.png"
              x: 272
              y: 65
              width: 12
              height: 16
        foodText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{food}}'
              bind: entities.PlayerManager
              x: 195
              y: 125
        foodIcon:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/corn.png"
              x: 195
              y: 106
              width: 18
              height: 18
        goldText:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#111'
              font: uiFont
              textBaseline: 'bottom'
              textAlign: 'right'
              text: '{{gold}}'
              bind: entities.PlayerManager
              x: 272
              y: 125
        goldIcon:
          entity: nv.Entity
          plugins: [ nv.SpriteUIPlugin ]
          model:
            options:
              src: "/assets/gold.png"
              x: 272
              y: 106
              width: 18
              height: 18
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
              x: 170
              y: -120
              anchor: "bottomLeft"
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
              x: 170
              y: -100
              anchor: "bottomLeft"
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
              x: 170
              y: -80
              anchor: "bottomLeft"
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
              x: 170
              y: -60
              anchor: "bottomLeft"
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
              x: -50
              y: 15
              anchor: "topRight"
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
                color: '#111'
              warning:
                style: 'yellow'
                color: '#111'
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
          include: "tileMap"
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
