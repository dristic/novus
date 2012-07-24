#= require key.coffee

nv.extend = (other) ->
  this[key] = other[key] for key of other

nv.extend
  log: () ->
    console.log message for message in arguments

  keydown: (key, callback) ->
    $(document).on 'keydown', (event) ->
      if event.keyCode is key then callback()

  keyup: (key, callback) ->
    $(document).on 'keyup', (event) ->
      if event.keyCode is key then callback()