# nv.SceneDispatcher
# ---
# This class dispatches events through a passed in scene to create
# a centralized event system
class nv.SceneDispatcher
  constructor: (@scene) ->
    @listeners = []

    # If any functions are defined using the prefix "on:"
    # then we auto add it as an event listener
    for key of this
      if /event\(.*\)/.test(key)
        @on key[6..-2], nv.bind(this, this[key])

  # Listens for an event in the scene scope
  on: (name, callback) ->
    @scene.on name, callback
    @listeners.push {
      name: name
      callback: callback
    }

  # Unlistens for an event in the scene scope
  off: (name, callback) ->
    @scene.off name, callback
    for listener, i in @listeners
      if listener.name is name and listener.callback is callback
        @listeners.splice i, 1
        break

  # Removes all listeners and destroys the listeners list
  destroy: () ->
    i = @listeners.length
    while i--
      listener = @listeners[i]
      @off listener.name, listener.callback
      
    delete @listeners

