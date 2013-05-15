class nv.LiveEditEngine extends nv.Engine
  initializer: (config, rootModel) ->
    script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://localhost:8888/socket.io/socket.io.js'

    script.addEventListener 'load', (event) =>
      @connect()

    document.querySelector('head').appendChild script

  constructor: (scene, config) ->
    if not @connected then @connect()

  connect: () ->
    unless not io?
      @socket = io.connect 'http://localhost:8888'
      @socket.on 'change', (data) ->
        window.location.href = window.location.href

      @connected = true
