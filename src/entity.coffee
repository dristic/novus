class nv.Entity
  constructor: (@scene, pluginClasses, @model) ->
    @plugins = []
    @model = @model ? new nv.Model

    @plugins.push new klass(@scene, this) for klass in pluginClasses

    @scene.fire "entity:create:#{@constructor.name}"

  getPlugin: (type) ->
    for plugin in @plugins
      if plugin instanceof type
        return plugin
    null

  update: (dt) ->

  destroy: () ->
    plugin.destroy() for plugin in @plugins
    delete @model
    delete @plugins
    delete @scene