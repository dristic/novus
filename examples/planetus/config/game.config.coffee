nv.gameConfig =
  canvas:
    height: 900
    width: 17*101
    fullscreen: false
    autoRendering: false
    css:
      background: '#222'
      margin: '30px auto 0 auto'
      display: 'block'

  enginesToLoad: [
    nv.GamepadEngine,
    nv.PhysicsEngine,
    nv.TimingEngine,
    nv.RenderingEngine,
    nv.DebugEngine,
    nv.LiveEditEngine,
    nv.EditorEngine
  ]

  entities:
    map:
      plugins: [ renderers.MapRenderer ] # plugins.MapCollisionDetector
      entity: entities.Map
      model:
        klass: models.Map
        options:
          startMap: "house1"
          tileWidth: 101
          tileHeight: 171
          tileVOffset: 84
          emptySpace: " "
          viewOrigin: new nv.Point(0,0)
          viewSize: new nv.Point(17,8)
          openableItems:
            door:
              type: 'door'
              closed: 'c'
              open: ' '
            chest:
              type: 'chest'
              closed: 'C'
              open: 'N'
          fetchableItems:
            key:
              type: 'key'
              tile: 'K'
            heart:
              type: 'heart'
              tile: 'H'
            star:
              type: 'star'
              tile: 'A'
            blueGem:
              type: 'blue'
              tile: 'B'
            greenGem:
              type: 'green'
              tile: 'G'
            orangeGem:
              type: 'orange'
              tile: 'O'

    player:
      plugins: [ ] # plugins.MapCollisionDetector
      entity: entities.Player
      model:
        options:
          currentLocation: new nv.Point(1,1)
          previousLocation: new nv.Point(1,1)
          symbol: 'z'
    statboard:
      plugins: [ renderers.StatBoard ]
      entity: entities.StatBoard
      model:
        klass: models.StatBoard
        options:
          hearts: 4
          keys: 0
          stars: 0
          blueGems: 0
          greenGems: 0
          orangeGems: 0

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
            open: nv.Key.E
            fetch: nv.Key.F
            jump: nv.Key.Space

      enginesUsed: [
        nv.GamepadEngine,
        nv.PhysicsEngine,
        nv.TimingEngine,
        nv.RenderingEngine,
        nv.DebugEngine,
        nv.LiveEditEngine,
        nv.EditorEngine
      ]

      entities:
        map:
          include: "map"
        player:
         include: "player"
        statboard:
          include: "statboard"

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
    t: 'assets/images/Light Wood Block.png'
    J: 'assets/images/Jump Block.png'
    x: 'assets/images/Sill Block.png'

    c: 'assets/images/Door Tall Closed.png'
    e: 'assets/images/Door Tall Open.png'
    f: 'assets/images/Window Tall.png'
    r: 'assets/images/Window.png'
    u: 'assets/images/Bed.png'
    v: 'assets/images/Table.png'

    h: 'assets/images/Roof East.png'
    i: 'assets/images/Roof North East.png'
    j: 'assets/images/Roof North West.png'
    k: 'assets/images/Roof North.png'
    l: 'assets/images/Roof South East.png'
    m: 'assets/images/Roof South West.png'
    n: 'assets/images/Roof South.png'
    q: 'assets/images/Roof West.png'

    C: 'assets/images/Chest Closed.png'
    N: 'assets/images/Chest Open.png'

    B: 'assets/images/Gem Blue.png'
    G: 'assets/images/Gem Green.png'
    O: 'assets/images/Gem Orange.png'

    H: 'assets/images/Heart.png'
    K: 'assets/images/Key.png'
    A: 'assets/images/Star.png'

    Y: 'assets/images/Enemy Bug.png'

    R: 'assets/images/Rock.png'
    E: 'assets/images/Tree Short.png'
    T: 'assets/images/Tree Tall.png'
    U: 'assets/images/Tree Ugly.png'

    z: 'assets/images/Character Boy.png'


  map:
    town1:
      size: new nv.Point(20,10)
      tiles:
        layer0: [ "dddddddddddddddddddd",
                  "dgtggggtgggtggggtggd",
                  "dsxsggsxsgsxsggsxssd",
                  "ddpddddpdddpddddpddd",
                  "dddddddddddddddddddd",
                  "dddgggggdggddddddddd",
                  "dgdddddgdggddddddddd",
                  "dgdddddddgggpggddddd",
                  "dgddpddddddddddddddd",
                  "dddddddddddddddddddd" ]
        layer1: [ "ssssssssssssssssssss",
                  "s  o  o o o o  o   s",
                  "sfcf  fcf fcf  fcfos",
                  "s                  s",
                  "                   s",
                  "           ooooooo s",
                  "s  oooo   Tfcof  o s",
                  "s  fcof        ofo s",
                  "sU                 s",
                  "ssssssssssssssssssss"]
        layer2: [ "                    ",
                  "                  o ",
                  "                    ",
                  "                    ",
                  "                    ",
                  "                    ",
                  "             o      ",
                  "     o         o o  ",
                  "                    ",
                  "                    "]
        layer3: [ "                    ",
                  " kkk  kkk kkk  kkkk ",
                  " nnn  nnn nnn  nnnn ",
                  "                    ",
                  "                    ",
                  "           kkkkkki  ",
                  "   kkkk    nnnnqoh  ",
                  "   nnnn        mnl  ",
                  "                    ",
                  "                    "]
      paths:
        meadow1:
          exits: [ new nv.Point(0,4), new nv.Point(0,5) ]
        house1:
          exits: [ new nv.Point(2,2) ]

    house1:
      size: new nv.Point(5,5)
      tiles: 'assets/maps/house1.json'
      paths:
        town1:
          exits: [ new nv.Point(2,4) ]
      chests:
        chest0:
          location: new nv.Point(3,1)
          tile: 'K'
          reveal: [ new nv.Point(3,1), 2 ]

    meadow1:
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
                  "ddddddddddgggggddggg" ]
        layer1: [ "WssssssssssssssssssW", 
                  "s                  s",
                  "s                  s",
                  "s       T  E  U    s",
                  "                   s",
                  "            R      s",
                  "s    Y             s",
                  "s          Y        ",
                  "s                   ",
                  "WssssssssssssssssssW" ]
      paths:
        town1:
          exits: [ new nv.Point(19,7), new nv.Point(19,8)]

        forest1:
          exits: [ new nv.Point(0,4), new nv.Point(0,5) ]

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
        layer1: [ "TTETTEEETTTTEETEETTETETEETTEEE", 
                  "R       R      T T          ET",
                  "R   T            EE U UR     U",
                  "R      T TE             T    T",
                  "R         T          T   ETT T",
                  "TETEETTTETTERTEETEETTE      TT" ]
      paths: 
        meadow1:
          exits: [ new nv.Point(21,3) ]
