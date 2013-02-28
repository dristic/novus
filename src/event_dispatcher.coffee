class nv.EventDispatcher
  constructor: () ->
    @listeners = []

  on: (event, func) ->
    listeners = @listeners[event]
    if not (listeners instanceof Array)
      listeners = []

    listeners.push func
    @listeners[event] = listeners
    this

  fire: (event, data) ->
    listeners = @listeners[event]
    if listeners instanceof Array
      for listener in listeners
        listener(data ? {})

  send: (event, targets, data) ->
    console.log event, targets, data
    for target in targets
      #console.log "send message", event, target.constructor.name
      target.events[event](data) unless target.events is undefined or target.events[event] is undefined

  off: (event, func) ->
    if not @listeners[event] instanceof Array
      # Do nothing
    else
      if @listeners[event].indexOf func not 0
        @listeners[event].splice @listeners[event].indexOf(func), 1
    this
