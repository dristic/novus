class EventDispatcher
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
    data = data ? {}
    data.data = data
    data.type = event

    listeners = @listeners[event]

    if listeners instanceof Array
      for listener in listeners
        listener(data)

  off: (event, func) ->
    if not @listeners[event] instanceof Array
      # Do nothing
    else
      if @listeners[event].indexOf func not 0
        @listeners[event].splice @listeners[event].indexOf(func), 1
    this

window.EventDispatcher = EventDispatcher