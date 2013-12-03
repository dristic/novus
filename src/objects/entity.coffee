# The base class for all Game Objects
# This holds a set of components and state about the entity in the form of a model
class nv.Entity extends nv.SceneDispatcher
  constructor: (scene, options = {}) ->
    super scene

    @components = []
    @destroyed = false
    @model = new nv.Model options

    @scene.fire "entity:create:#{@constructor.name}"

  addComponent: (klass, options = {}) ->
    if @getComponentByType(klass)?
      nv.log "nv.Entity.addComponent", "Cannot add two components of the same type: ", klass
    else
      component = new klass @scene, @model, options
      @components.push component
      @scene.fire "entity:component:new", component
      component

  removeComponent: (klass) ->
    for component in @components
      if component instanceof klass
        component.destroy()
        @scene.fire "entity:component:destroy", component
        components.splice components.indexOf(component), 1

  getComponentByType: (klass) ->
    for component in @components
      if component instanceof klass
        return component
    null

  update: (dt) ->

  destroy: () ->
    unless @destroyed
      @destroyed = true
      super

      @removeComponent component.constructor for component in @components

      delete @model
      delete @components
      delete @scene
