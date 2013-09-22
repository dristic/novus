class nv.Model extends nv.EventDispatcher
  constructor: (data) ->
    super

    @setMany data

  setMany: (object) ->
    for key of object
      this[key] = object[key]

  get: (key) ->
    this[key]

  set: (key, value) ->
    this[key] = value
    @send "change:#{key}", value

  reset: () ->
    # specific classes must implement

  clone: () ->
    clone = new nv.Model {}
    for key of this
      continue if typeof this[key] is "function"
      clone[key] = this[key]
    clone

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