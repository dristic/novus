nv.gameConfig =
  # Configure global engines
  canvas:
    height: 500
    width: 500
    fullscreen: false
    css:
      background: '#333'
      margin: '0 auto 0 auto'
      display: 'block'

  # Globally prepare all engines used in this game
  enginesToLoad: [ nv.RenderingEngine, nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine, nv.SoundEngine, nv.ParticleEngine ]

  scenes:
    main:
      config:
        # Create configuration for scene engines
        gamepad:
          keys:
            up: nv.Key.W
            left: nv.Key.A
            down: nv.Key.S
            right: nv.Key.D
            attack: nv.Key.Spacebar

          # Tracking the mouse is expensive
          # Only enable when you need mouse/touch events
          trackMouse: false

      # Include what engines you are using
      enginesUsed: [ nv.RenderingEngine, nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine, nv.ParticleEngine ]

      entities:
        title:
          entity: nv.Entity
          plugins: [ nv.TextRenderingPlugin ]
          model:
            options:
              color: "#FFF"
              x: 200
              y: 250
              font: "30px sans-serif"
              text: "Runnus"
        level:
          entity: nv.Entity
          plugins: []
          model:
            options:
              src: '/assets/plates.png'
              data: [
                [0, 1, 1, 1],
                [1, 3, 2, 2]
              ]
        image:
          entity: entities.Player
          plugins: [ nv.AnimatedSpriteRenderingPlugin ]
          model:
            options:
              x: 200
              y: 300
              speed: 3
              width: 64
              height: 64
              currentAnimation: 'attack'
              frameWidth: 64
              frameHeight: 64
              animations:
                idle:
                  frames: [0, 1, 2, 3]
                  framesPerSecond: 10
                run:
                  frames: [8, 9, 10, 11, 12]
                  framesPerSecond: 10
                attack:
                  frames: [16, 17, 18, 19, 20, 21, "idle"]
                  framesPerSecond: 10
              src: '/assets/player.png'
              frame:
                x: 0
                y: 0
                width: 64
                height: 64

  # entities:
    # Create your entities here