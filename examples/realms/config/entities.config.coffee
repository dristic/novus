realms.entities =
  tileMap:
    entity: entities.TileMap
    plugins: [ nv.SpriteMapRenderingPlugin ]
    model:
      options:
        speed: 1.5
        x: 0
        y: 0

  imageMap:
    entity: entities.ImageMap
    plugins: [ nv.SpriteRenderingPlugin ]
    model:
      options:
        speed: 1.5
        x: 0
        y: 0
        width: 1600
        height: 1200
        src: '/assets/green_island_map.png'

  splashScreen:
    entity: entities.ImageMap
    plugins: [ nv.SpriteRenderingPlugin ]
    model:
      options:
        speed: 1.5
        x: 0
        y: 0
        width: 1920
        height: 1080
        src: '/assets/splash-screen.jpg'

  player:
    entity: entities.Player
    plugins: []
    model:
      options:
        name: "Player"
        countries: []

  country:
    entity: entities.Country
    plugins: []
    model:
      options:
        name: "Nowhere"

  resourceManager:
    entity: entities.ResourceManager
    plugins: []
    model:
      options:
        population: 0
        food: 0
        gold: 0

  land:
    entity: entities.Land
    plugins: [ nv.AnimatedSpriteRenderingPlugin, nv.AssignedLaborRenderer ]
    model:
      options:
        src: '/assets/terrain_atlas.png'
        frameWidth: 32
        frameHeight: 32
        animations:
          dirt:
            frames: [680]
          field:
            frames: [805]
          grain:
            frames: [832 + 97]
          gold:
            frames: [179]
        currentAnimation: 'dirt'
        playing: false
        width: 32
        height: 32
        x: 576
        y: 320
        clickable: true
        workers: 0
        maxWorkers: 50
        value: 'unused'

  landTwo:
    entity: entities.Land
    plugins: [ nv.AnimatedSpriteRenderingPlugin ]
    model:
      options:
        src: '/assets/terrain_atlas.png'
        frameWidth: 32
        frameHeight: 32
        animations:
          field:
            frames: [805]
          grain:
            frames: [833]
          gold:
            frames: [24]
        currentAnimation: 'field'
        playing: false
        width: 32
        height: 32
        x: 576
        y: 352
        clickable: true
        
  landSelector:
    unused:
      entity: nv.Entity
      plugins: [ nv.ButtonUIPlugin ]
      model:
        options:
          id: "select-none"
          text: "Unused"
          x: 330
          y: 10
          width: 150
          height: 50
    grain:
      entity: nv.Entity
      plugins: [ nv.ButtonUIPlugin ]
      model:
        options:
          id: "select-grain"
          text: "Grain"
          x: 10
          y: 10
          width: 150
          height: 50
    gold:
      entity: nv.Entity
      plugins: [ nv.ButtonUIPlugin ]
      model:
        options:
          id: "select-gold"
          text: "Gold"
          x: 170
          y: 10
          width: 150
          height: 50
