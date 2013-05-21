class nv.EditorEngine extends nv.Engine
  initializer: (config, rootModel) ->
    window.addEventListener 'message', nv.bind(this, this.handleMessage)

  constructor: (scene, config) ->
    console.log 'INIT'

    @sendMessage 'load', ''

  handleMessage: (event) ->
    console.log "MESSAGE: ", event

    if event.data.type is 'load'
      postBack = () =>
        @sendMessage 'hello', 'world'

      setTimeout postBack, 1000
    else if event.data.type is 'update'
      console.log "Map update: ", event.data.map

  sendMessage: (type, message) ->
    console.log 'posting', type, message
    window.parent.postMessage {
      type: type
      message: message
    }, window.location.href
