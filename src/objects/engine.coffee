class nv.Engine extends nv.SceneDispatcher
  constructor: (scene, @config) ->
    super scene
    @config = @config ? {}
    
  prepare: () ->

  update: (dt) ->

  destroy: () ->
    super

    delete @scene
    delete @config
