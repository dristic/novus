nv.gameConfig =
  canvas:
    height: 800
    width: 1010
    fullscreen: false
    css:
      background: '#000'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [
    nv.GamepadEngine,
    nv.PhysicsEngine,
    nv.TimingEngine,
    nv.DebugEngine,
    nv.LiveEditEngine
  ]

  entities:
    map:
      plugins: [ renderers.MapRenderer ] # plugins.MapCollisionDetector
      entity: entities.Map
      model:
        klass: models.Map
        options:
          startMap: "meadow1"
          tileWidth: 101
          tileHeight: 171
          tileVOffset: 84
    player:
      plugins: [ nv.DrawableRenderingPlugin ] # plugins.MapCollisionDetector
      entity: entities.Player
      model:
        options:
          currentLocation: new nv.Point(4,4)
          previousLocation: new nv.Point(4,4)
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

      enginesUsed: [
        nv.GamepadEngine,
        nv.PhysicsEngine,
        nv.TimingEngine,
        nv.DebugEngine,
        nv.LiveEditEngine
      ]

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
    J: 'assets/images/Jump Block.png'

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
    meadow1:
      size: new nv.Point(20,10)
      tiles:
        layer0: [ "dddddddddddddddddddd", 
                  "ggdggggdggggdggggdgg", 
                  "gggggggggggggggggggg",
                  "gggggggggggggggggggg",
                  "Jgggggddgggggggggggg",
                  "Jgdggggdggggdggggdgg", 
                  "gggggggggggggggggggg",
                  "gggggggggggggggggggg",
                  "ggggggddgggggggggggg",
                  "ddddddddddgggggggggg" ]
        layer1: [ "WssssssssssssssssssW", 
                  "s                  s",
                  "s                  s",
                  "s       T  H  U    s",
                  "                   s",
                  "            R      s",
                  "s    E             s",
                  "s                  s",
                  "s                  s",
                  "WssssssssssssssssssW" ]
      paths:
        forest1:
          exits: [ new nv.Point(0,4), new nv.Point(0,5) ],

        garden1:
          exits: []

    forest1:
      size: new nv.Point(30,6)
      tiles:
        layer0: [ "dddddddddddddddddddddddddddddd", 
                  "gggggggggggggggggggggggggggggg",
                  "gggggggggggggggggggggggggggggg",
                  "ggggggddgggggggggggggJ  gggggg",
                  "ggggggddgggggggggggggg   ggggg",
                  "dddddddddddddddddddddd      dd" ]
        layer1: [ "TTHTTHHHTTTTHHTHHTTHTHTHHTTHHH", 
                  "R       R      T T          HT",
                  "R   T            HH U UR     U",
                  "R      T TH             T    T",
                  "R         T          T   HTT T",
                  "THTHHTTTHTTHRTHHTHHTTH      TT" ]
      paths: 
        meadow1:
          exits: [ new nv.Point(21,3) ]





