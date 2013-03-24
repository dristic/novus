class nv.Entity
  constructor: (@scene, pluginClasses, @model) ->
    @plugins = []
    @listeners = []
    @model = @model ? new nv.Model

    @plugins.push new klass(@scene, this) for klass in pluginClasses

    @scene.fire "entity:create:#{@constructor.name}"

    # If any functions are defined using the prefix "on:"
    # then we auto add it as an event listener
    for key of this
      if /event\(.*\)/.test(key)
        @on key[6..-2], nv.bind(this, this[key])

  on: (name, callback) ->
    @scene.on name, callback
    @listeners.push {
      name: name
      callback: callback
    }

  off: (name, callback) ->
    @scene.off name, callback
    for listener, i in @listeners
      if listener.name is name and listener.callback is callback
        @listeners.splice i, 1
        break

  getPlugin: (type) ->
    for plugin in @plugins
      if plugin instanceof type
        return plugin
    null

  update: (dt) ->

  destroy: () ->
    plugin.destroy() for plugin in @plugins
    i = @listeners.length
    while i--
      listener = @listeners[i]
      @off listener.name, listener.callback
    delete @model
    delete @plugins
    #delete @scene
