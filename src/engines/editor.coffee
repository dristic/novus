class nv.EditorEngine extends nv.Engine
  initializer: (config, rootModel) ->
    window.addEventListener 'message', nv.bind(this, this.handleMessage)

    document.querySelector('canvas').addEventListener 'click', (event) =>
      @sendMessage 

  constructor: (scene, config) ->
    console.log 'INIT'

  handleMessage: (event) ->
    console.log "MESSAGE: ", event

    if event.data.type is 'load'
      postBack = () =>
        @sendMessage 'hello', 'world'

      setTimeout postBack, 1000
    else if event.data.type is 'update'
      console.log "Map update: ", event.data.map

  sendMessage: (type, message) ->
    window.parent.postMessage {
      type: type
      message: message
    }, window.location.href
