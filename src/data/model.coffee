class nv.Model extends nv.EventDispatcher
  constructor: (data) ->
    super

    @setMany data

  setMany: (object) ->
    for key of object
      @set key, object[key]

  get: (key) ->
    this[key]

  set: (key, value) ->
    this[key] = value
    @send "change", key, value
    @send "change:#{key}", value

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