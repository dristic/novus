class entities.Brick extends nv.Entity
  constructor: (scene, options = {}) ->
    super scene, options

    @model.set 'width', 32
    @model.set 'height', 16
    @model.set 'physicsObjectType', 'passive'
    
    @addComponent nv.AnimatedSpriteRenderingComponent,
      src: 'assets/tiles.png'
      frameWidth: 16
      frameHeight: 16
      animations: options.animations
      currentAnimation: 'move'
      framesPerSecond: 10
      width: 32
      height: 16
      playing: true

    @model.set 'value', 50

    @addComponent nv.RectanglePhysicsComponent,
      width: options.width ? 32
      height: options.height ? 16
      name: 'Brick'
    
  "event(engine:collision:Ball:Brick)": (data) ->
    return unless data.target is @model
    @scene.fire "game:score",
      score: data.target.get('value')

    @removeComponent nv.RectanglePhysicsComponent

    @model.set 'currentAnimation', 'die'
    kill = () =>
      @destroy()
    setTimeout kill, 500

nv.factory.register 'Brick', (scene, options = {}) ->
  options.animations =
    die:
      frames: [0, 1, 2, 3, 4, "dead"]
    dead:
      frames: [4]
    spawn:
      frames: [4, 3, 2, 1, 0, "idle"]
    idle:
      frames: [0]

  new entities.Brick scene, options

