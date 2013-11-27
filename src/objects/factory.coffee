class nv.Factory
  constructor: () ->
    @objects = {}

  registerClass: (name, klass) ->
    @objects[name] = klass

  deregisterClass: (name) ->
    delete @objects[name]

  getClass: (name) ->
    @objects[name]

  create: (name, args...) ->
    new @objects[name] args...

  destroy: () ->
    delete @objects

nv.factory = new nv.Factory()

