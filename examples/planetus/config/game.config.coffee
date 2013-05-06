nv.gameConfig =
  canvas:
    height: 800
    width: 1010
    fullscreen: false
    css:
      background: '#000'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [ nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

  entities:
    map:
      plugins: [ renderers.MapRenderer ] # plugins.MapCollisionDetector
      entity: entities.Map
      model:
        klass: models.Map
        options:
          startLocation: "glade1"
          tileWidth: 101
          tileHeight: 171
          tileVOffset: 84
    player:
      plugins: [ nv.DrawableRenderingPlugin ] # plugins.MapCollisionDetector
      entity: entities.Player
      model:
        options:
          currentLocation: new nv.Point(5,5)
          previousLocation: new nv.Point(5,5)
          symbol: 'z'

  scenes:
    # main:
    #   config:
    #     gamepad:
    #       keys:
    #         shoot: nv.Key.Spacebar
    #       trackMouse: false
    #   enginesUsed: [ nv.GamepadEngine, nv.SoundEngine, nv.TimingEngine, nv.DebugEngine ]

    #   entities: ""


    game:
      config:
        gamepad:
          keys:
            left: nv.Key.A
            right: nv.Key.D
            up: nv.Key.W
            down: nv.Key.S

      enginesUsed: [ nv.GamepadEngine, nv.PhysicsEngine, nv.TimingEngine, nv.DebugEngine]

      entities:
        map:
          include: "map"
        player:
         include: "player"

  tiles:
    b: 'assets/images/Brown Block.png'
    d: 'assets/images/Dirt Block.png'
    g: 'assets/images/Grass Block.png'
    p: 'assets/images/Plain Block.png'
    s: 'assets/images/Stone Block.png'
    S: 'assets/images/Stone Block Tall.png'
    w: 'assets/images/Wall Block.png'
    W: 'assets/images/Wall Block Tall.png'
    a: 'assets/images/Water Block.png'
    o: 'assets/images/Wood Block.png'

    C: 'assets/images/Chest Closed.png'
    N: 'assets/images/Chest Open.png'

    B: 'assets/images/Gem Blue.png'
    G: 'assets/images/Gem Green.png'
    O: 'assets/images/Gem Orange.png'

    H: 'assets/images/Heart.png'
    K: 'assets/images/Key.png'

    E: 'assets/images/Enemy Bug.png'

    R: 'assets/images/Rock.png'
    A: 'assets/images/Star.png'
    H: 'assets/images/Tree Short.png'
    T: 'assets/images/Tree Tall.png'
    U: 'assets/images/Tree Ugly.png'

    z: 'assets/images/Character Boy.png'


  map:
    glade1:
      start: new nv.Point(5,5)
      size: new nv.Point(20,10)
      tiles:
        layer0: [ "dddddddddddddddddddd", 
                  "ggdggggdggggdggggdgg", 
                  "gggggggggggggggggggg",
                  "gggggggggggggggggggg",
                  "ggggggddgggggggggggg",
                  "ggdggggdggggdggggdgg", 
                  "gggggggggggggggggggg",
                  "gggggggggggggggggggg",
                  "ggggggddgggggggggggg",
                  "ddddddddddgggggggggg" ]
        layer1: [ "WssssssssssssssssssW", 
                  "                    ",
                  "                    ",
                  "        T  H  U     ",
                  "                    ",
                  "            R       ",
                  "     E              ",
                  "                    ",
                  "                    ",
                  "WssssssssssssssssssW" ]



