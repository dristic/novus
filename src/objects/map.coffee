class nv.Map
  constructor: (@data) ->
    # Do nothing
  
  parse: () ->
    objects = []

    for layer in @data.layers
      for object in layer.objects
        objects.push
          name: object.type
          options:
            x: object.x
            y: object.y
        for key, value of object.properties
          objects[objects.length - 1].options[key] = value

    objects

