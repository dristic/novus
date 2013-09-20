realms.entities =
  map:
    entity: entities.Map
    plugins: [ nv.SpriteMapRenderingPlugin ]
    model:
      options:
        src: '/assets/terrain_atlas.png'
        speed: 1.5
        x: 0
        y: 0
        width: 960
        height: 960
        tileWidth: 32
        tileHeight: 32

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
        food: 100
        population: 50
        gold: 0


  land:
    entity: entities.Land
    plugins: [ nv.AnimatedSpriteRenderingPlugin ]
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
            frames: [833]
          cows:
            frames: [775]
        currentAnimation: 'field'
        playing: false
        width: 32
        height: 32
        x: 576
        y: 320
        clickable: true
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
          cows:
            frames: [775]
        currentAnimation: 'field'
        playing: false
        width: 32
        height: 32
        x: 576
        y: 352
        clickable: true
  landSelector:
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
    field:
      entity: nv.Entity
      plugins: [ nv.ButtonUIPlugin ]
      model:
        options:
          id: "select-field"
          text: "Field"
          x: 170
          y: 10
          width: 150
          height: 50
    cows:
      entity: nv.Entity
      plugins: [ nv.ButtonUIPlugin ]
      model:
        options:
          id: "select-cows"
          text: "Cows"
          x: 330
          y: 10
          width: 150
          height: 50
