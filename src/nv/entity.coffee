class nv.Entity
  constructor: (@scene, pluginClasses, @model) ->
    @plugins = []
    @model = @model ? new nv.Model

    @plugins.push new klass(@scene, this) for klass in pluginClasses

    @scene.fire "entity:create:#{@constructor.name}"

  update: (dt) ->