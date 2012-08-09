class Connection
  constructor: () ->
    @connection = @connectToChannel 'novus'

    @connection.on 'connect', () ->
      console.log 'Connected!'

    @connection.on 'join', (user) ->
      console.log user

    @connection.on 'message', (message) =>
      @handleMessage message

  handleMessage: (message) ->
    console.log message

  connectToChannel: (channel) ->
    io.connect 'http://pubsub.pubnub.com',
      channel: channel
      publish_key: 'pub-c54880a5-ba99-4836-a084-08f57b4b5333'
      subscribe_key: 'sub-3129de73-8f26-11e1-94c8-1543525cae6d'
      ssl: false
      # cipher_key: null
      # origin: 'pubsub.pubnub.com'

  auth: (user) ->
    $.post 'http://localhost:3000', { user: user }, (response) =>
      token = JSON.parse(response).token

      @connection = @connectToChannel token

      @connection.send 'Hello server!'

window.nub = () ->
  return new Connection()