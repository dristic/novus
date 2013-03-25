nv.gameConfig =
  # Configure global engines
  canvas:
    height: 500
    width: 500
    fullscreen: true
    css:
      background: '#000'
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

      # entities:
        # Include your scene entities here

  # entities:
    # Create your entities here