class nv.Factory
  constructor: () ->
    @objects = {}
    @classes = {}

  # This should hold factory methods, not classes
  # but privde a shortcut for adding classes
  class: (name, klass) ->
    @register name, (args...) ->
      new klass args...
    @classes[name] = klass

  # Register a new factory method
  register: (name, factory) ->
    @objects[name] = factory

  # Remove a registered factory method
  deregister: (name) ->
    delete @objects[name]

  # Get a factory method defined
  getFactory: (name) ->
    @objects[name]

  # Create a new object returned by a factory method
  create: (name, args...) ->
    @objects[name] args...

  destroy: () ->
    delete @objects

nv.factory = new nv.Factory()

