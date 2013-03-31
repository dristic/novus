@nv = @nv ? {}

@renderers = @renderers ? {}
@entities = @entities ? {}
@scenes = @scenes ? {}

@getClass = (name) ->
  klass = window
  $.each name.split("."), () ->
    klass = klass[this]
  klass

@shallowClone = (obj) ->
  newObj = {}
  for key of obj
    if typeof key isnt "object"
      newObj[key] = obj[key]
  newObj