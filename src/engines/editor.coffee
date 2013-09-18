class nv.EditorEngine extends nv.Engine
  initializer: (config, rootModel) ->

  constructor: (scene, config) ->
    super scene, config
    window.addEventListener 'message', nv.bind(this, this.handleMessage)

  "event(game:start)": () ->
    @sendMessage 'load', ''

  handleMessage: (event) ->
    console.log "MESSAGE: ", event
    message = event.data
    
    @scene.fire "engine:editor:#{message.type}", message.data

  sendMessage: (type, message) ->
    console.log 'posting', type, message
    window.parent.postMessage {
      type: type
      message: message
    }, window.location.href
