nv =
  extend: (object, other) ->
    object[key] = other[key] for key in other