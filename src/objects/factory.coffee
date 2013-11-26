class nv.Factory
  constructor: () ->
    @objects = {}

  registerClass: (name, klass) ->
    @objects[name] = klass

  deregisterClass: (name) ->
    delete @Objects[name]

  getClass: (name) ->
    @objects[name]

  create: (name, args...) ->
    new @objects[name] args...

