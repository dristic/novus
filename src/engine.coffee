class nv.Engine
  initializer: () ->

  constructor: (@scene, @config) ->
    @config = @config ? {}
    @listeners = []

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

  prepare: () ->

  update: (dt) ->

  destroy: () ->
    i = @listeners.length
    while i--
      listener = @listeners[i]
      @off listener.name, listener.callback
      
    delete @listeners
    delete @scene
    delete @config