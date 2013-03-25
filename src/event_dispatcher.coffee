class nv.EventDispatcher
  constructor: () ->
    @event_listeners = {}
    @event_async_queue = []

  destroy: () ->
    @processQueuedEvents()

  on: (event, func) ->
    event_listeners = @event_listeners[event]
    if not (event_listeners instanceof Array)
      event_listeners = []

    event_listeners.push func
    @event_listeners[event] = event_listeners
    this

  fire: (event, data) ->
    if @event_listeners[event] instanceof Array
      @event_async_queue.push
        event: event
        data: data ? {}

  send: (event, data) ->
    event_listeners = @event_listeners[event]
    if event_listeners instanceof Array
      for listener in event_listeners
        listener(data ? {})

  off: (event, func) ->
    if not @event_listeners[event] instanceof Array
      # Do nothing
    else
      if @event_listeners[event].indexOf(func) isnt -1
        @event_listeners[event].splice @event_listeners[event].indexOf(func), 1
    this

  update: (dt) ->
    @processQueuedEvents()

  processQueuedEvents: () ->
    while @event_async_queue.length
      events = @event_async_queue.slice(0)
      @event_async_queue = []
      for event in events
        eventListeners = @event_listeners[event.event]
        for listener in eventListeners
          listener event.data
    null

