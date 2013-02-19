class nv.Game
  constructor: () ->
    @currentScene = null
    @sceneClasses = {}

  registerScene: (name, klass) ->
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @currentScene = new @sceneClasses[name] this, args...