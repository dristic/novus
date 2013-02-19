class nv.Plugin
  constructor: (@scene, @entity) ->
    @scene.fire "plugin:create:#{@constructor.name}"