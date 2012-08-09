pubnub = require 'pubnub'

connection = pubnub.init
  publish_key: 'pub-c54880a5-ba99-4836-a084-08f57b4b5333'
  subscribe_key: 'sub-3129de73-8f26-11e1-94c8-1543525cae6d'
  ssl: false
  origin: 'pubsub.pubnub.com'

connection.subscribe
  channel: 'novus'
  connect: () ->
    console.log 'connected!'

  callback: (message) ->
    console.log message

onUserMessage = (message) ->
  console.log message

# Token management
express = require 'express'

app = express.createServer()
app.use express.bodyParser()

token = 1
app.post '/', (req, res) ->
  token = token++
  connection.subscribe
    channel: "#{token}"
    callback: onUserMessage
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Headers", "X-Requested-With"
  res.send
    token: token

app.listen 3000