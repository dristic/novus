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
        image:
          entity: nv.Entity
          plugins: [ nv.AnimatedSpriteRenderingPlugin ]
          model:
            options:
              width: 64
              height: 64
              currentAnimation: 'run'
              frameWidth: 64
              frameHeight: 64
              animations:
                run:
                  frames: [8, 9, 10, 11, 12]
                  framesPerSecond: 10
              src: '/assets/player.png'
              frame:
                x: 0
                y: 0
                width: 64
                height: 64

  # entities:
    # Create your entities here