@nv = @nv ? {}

@getClass = (name) ->
  klass = window
  for part in name.split(".")
    klass = klass[part]
  klass

@shallowClone = (obj) ->
  newObj = {}
  for key of obj
    if typeof key isnt "object"
      newObj[key] = obj[key]
  newObj