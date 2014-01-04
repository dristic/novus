#= require entities.config
#= require levels.config

breakout.config =
  debug: false

  graphics:
    id: '#game-canvas'
    width: 320
    height: 410
    scaled: true
    css:
      backgrund: '#000'
      margin: '0 auto'
      display: 'block'
    preload: [
      'assets/logo.png',
      'assets/tiles.png'
    ]

  gamepad:
    keys:
      left: nv.Key.A
      right: nv.Key.D
      activate: [nv.Key.Spacebar, nv.Key.Mouse1]

  preload: [
    'assets/logo.png',
    'assets/tiles.png'
  ]

breakout.maps = {}

breakout.maps.main =
  layers: [{
    name: "UI",
    objects: [{
      type: "Background",
      x: 0
      y: 0
    }, {
      type: "Title"
      x: 85
      y: 350
    }, {
      type: "Logo"
      x: 94.5
      y: 50
    }]
  }]

breakout.maps.game =
  layers: [{
    name: "Background"
    objects: [{
      type: "Background"
      x: 0,
      y: 0
    }]
  }, {
    name: "Physics"
    objects: [{
      type: "Wall"
      x: 0
      y: 0
    }, {
      type: "Wall"
      x: 20
      y: 0
      properties:
        width: 30 * 18
        height: 20
    }, {
      type: "Wall"
      x: 300
      y: 0
    }]
  }, {
    name: "Objects",
    objects: [{
      type: "Player"
      x: 100
      y: 368
    }, {
      type: "Ball"
      x: 150
      y: 250
    }, {
      type: "LevelSpawner"
      x: 0
      y: 0
    }]
  }]

breakout.gameConfig =
  scenes:
    main:
      config:
        gamepad:
          keys:
            shoot: nv.Key.Spacebar
          trackMouse: true
      engines: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]
      entities:
        background:
          include: "backgroundTiled"
        logo:
          entity: nv.Entity
          plugins: [ nv.SpriteRenderingPlugin ]
          model:
            options:
              src: 'assets/logo.png'
              width: 131
              height: 200
              x: 94.5
              y: 50
        start_button:
          entity: nv.Entity
          plugins: [ nv.TouchTargetPlugin ]
          model:
            initializers:
              bounds: () -> new nv.Rect 10, 10, 100, 100
            options:
              action: "shoot"

    game:
      config:
        gamepad:
          keys:
            left: nv.Key.A
            right: nv.Key.D
          trackMouse: true

      engines: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

      soundfx:
        brick_collision:
          asset: "/assets/sfx/brickDeath.wav"
          event: "engine:collision:Ball:Brick"
          action: "play"

      entities:
        background:
          include: "background"
        leftwall:
          include: "leftwall"
        topwall:
          include: "topwall"
        rightwall:
          include: "rightwall"
        player:
          include: "player"
        ball:
          include: "ball"
        scoreboard:
          include: "scoreboard"
        lives:
          include: "lives"
        countdown:
          include: "countdown"

  levels: breakout.levels
  entities: breakout.entities
