class entities.Brick extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
  "event(engine:collision:Ball:Brick)": (data) ->
    return unless data.target is this
    @scene.fire "game:score",
      score: data.target.model.get('value')

    physicsPlugin = @getPlugin(nv.RectanglePhysicsPlugin)
    physicsPlugin.destroy()
    @plugins.splice(@plugins.indexOf(physicsPlugin), 1)
    @getPlugin(nv.AnimatedSpriteRenderingPlugin).play('die')
    kill = () =>
      @destroy()
    setTimeout kill, 500