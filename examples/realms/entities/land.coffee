class entities.Land extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @spritePlugin = @getPlugin(nv.AnimatedSpriteRenderingPlugin)
    @selecting = false
    @plugin = null

  "event(engine:rendering:clicked:Land)": (entity) ->
    if entity is this
      button = @scene.getEntityById 'select-grain-button'
      if button?
        plugin = button.getPlugin nv.ButtonUIPlugin
        if plugin?
          @plugin = plugin
          @selecting = true
          plugin.show()

  "event(engine:ui:clicked)": (element) ->
    if @selecting is true and element is @plugin
      @selecting = false
      @plugin.hide()
      @spritePlugin.play 'grain'
      @spritePlugin.stop()

  update: (dt) ->
    # Nothing yet
