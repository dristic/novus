breakout.entities =
  background:
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
        data: [457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 453, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 297, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 328, 329, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 455, 456, 457, 457, 457, 296, 424, 424, 424, 424, 424, 424, 297, 452, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 550, 552, 184, 184, 182, 183, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 424, 424, 424, 424, 424, 424, 425, 614, 616, 184, 650, 650, 184, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 119, 182, 119, 184, 182, 183, 184, 182, 801, 182, 650, 184, 375, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 119, 119, 184, 183, 184, 184, 801, 184, 182, 183, 184, 184, 184, 391, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 296, 297, 457, 457, 328, 361, 374, 184, 650, 184, 184, 184, 184, 184, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 328, 329, 457, 457, 457, 393, 184, 182, 650, 184, 184, 184, 389, 389, 389, 389, 389, 389, 390, 457, 324, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 182, 184, 184, 184, 389, 389, 389, 389, 650, 650, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 182, 184, 184, 389, 389, 389, 389, 389, 389, 650, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 393, 184, 184, 184, 389, 389, 389, 389, 389, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 328, 360, 360, 360, 421, 294, 389, 650, 650, 389, 389, 389, 389, 390, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 457, 455, 457, 457, 388, 389, 389, 389, 389, 389, 293, 421, 422, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 455, 456, 457, 457, 388, 389, 389, 389, 389, 389, 390, 457, 457, 324, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 420, 421, 421, 421, 421, 421, 422, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 455, 456, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 454, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 452, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457, 457]
  land:
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
        currentAnimation: 'field'
        playing: false
        width: 32
        height: 32
        x: 576
        y: 320
        clickable: true
