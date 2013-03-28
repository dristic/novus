###
# nv.Model
# The model class is responsible for data storage and also notifying
# listeners when data changes
###
class nv.Model extends nv.EventDispatcher
  constructor: (data) ->
    @setMany data

  fire: (args...) ->
    super args...

    # We do not want async events so just process them syncronously
    @processQueuedEvents()

  setMany: (object) ->
    for key of object
      this[key] = object[key]

  get: (key) ->
    this[key]

  set: (key, value) ->
    unless this[key] is value
      this[key] = value
      @fire "changed:#{key}", value

  reset: () ->
    # specific classes must implement

  persist: () ->
    data = {}
    for key of this
      data[key] = this[key]
    window.localStorage[@constructor.name] = data

  load: () ->
    @setMany window.localStorage[@constructor.name]

class nv.Collection extends nv.Model
  constructor: (arr) ->
    @items = arr ? []