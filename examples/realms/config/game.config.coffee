#= require entities.config
#= require levels.config

breakout.gameConfig =
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
    'assets/logo.png',
    'assets/tiles.png'
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
        button:
          entity: nv.Entity
          plugins: [ nv.ButtonUIPlugin ]
          model:
            options:
              text: "Next Turn"
              id: "next-turn-button"
              x: 480
              y: 420
        resourceManager:
          entity: entities.ResourceManager
          plugins: []
          model:
            options:
              food: 100
              population: 100
              cows: 10
        population:
          entity: nv.Entity
          plugins: [ nv.TextUIPlugin ]
          model:
            options:
              color: '#CCC'
              font: 'bold 20px sans-serif'
              textBaseline: 'bottom'
              text: "Cows: {{population}}"
              bind: entities.ResourceManager
              x: 36
              y: 36

  levels: breakout.levels
  entities: breakout.entities
