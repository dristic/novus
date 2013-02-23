class nv.Game
  constructor: () ->
    @currentScene = null
    @sceneClasses = {}
    @engines = []

  registerEngine: (klass) ->
    @engines.push klass

  registerScene: (name, klass) ->
    @sceneClasses[name] = klass

  openScene: (name, args...) ->
    @closeScene()
    @currentScene = new @sceneClasses[name] this, args...

  closeScene: () ->
    @currentScene.destroy() unless not @currentScene
    