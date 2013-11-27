class nv.Map
  constructor: (@data) ->
    # Do nothing
  
  parse: () ->
    objects = []
    console.log @data

    for layer in @data.layers
      for object in layer.objects
        objects.push
          name: object.type
          x: object.x
          y: object.y

    objects

