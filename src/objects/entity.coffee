# The base class for all Game Objects
# This holds a set of components and state about the entity in the form of a model
class nv.Entity extends nv.SceneDispatcher
  constructor: (scene, options = {}) ->
    super scene

    @components = []
    @destroyed = false
    @model = new nv.Model options

    @scene.fire "entity:create:#{@constructor.name}"

  # Creates a new component, adds it to this entity, and tells the scene
  addComponent: (klass, options = {}) ->
    if @getComponentByType(klass)?
      nv.log "nv.Entity.addComponent", "Cannot add two components of the same type: ", klass
    else
      component = new klass @scene, @model, options
      @components.push component
      @scene.fire "entity:component:new", component
      component

  # Destroys a component, removes it from this entity, and tells the scene
  removeComponent: (klass) ->
    for component in @components
      if component instanceof klass
        component.destroy()
        @scene.fire "entity:component:destroy", component
        @components.splice @components.indexOf(component), 1

  # Gets a reference to a component by type
  getComponentByType: (klass) ->
    for component in @components
      if component instanceof klass
        return component
    null

  # Placeholder for scene to call
  update: (dt) ->

  # Removes all components and events from this entity
  destroy: () ->
    unless @destroyed
      @destroyed = true
      super

      @removeComponent component.constructor for component in @components

      delete @model
      delete @components
      delete @scene

