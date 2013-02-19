class nv.Model
  constructor: (data) ->
    @setMany data

  setMany: (object) ->
    for key of object
      this[key] = object[key]

  persist: () ->
    window.localStorage[@name] = this

  load: () ->
    @setMany window.localStorage[@name]

class nv.Collection extends nv.Model
  constructor: (arr) ->
    @items = arr ? []