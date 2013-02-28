class nv.Model
  constructor: (data) ->
    @setMany data

  setMany: (object) ->
    for key of object
      this[key] = object[key]

  get: (key) ->
    this[key]

  set: (key, value) ->
    this[key] = value

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