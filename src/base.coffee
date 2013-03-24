@nv = @nv ? {}

@renderers = @renderers ? {}
@entities = @entities ? {}
@scenes = @scenes ? {}

@getClass = (name) ->
  klass = window
  $.each name.split("."), () ->
    klass = klass[this]
  klass