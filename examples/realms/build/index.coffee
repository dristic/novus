express = require 'express'
port = process.env.PORT ? 8000

app = express()
app.use express.static __dirname

app.listen port
console.log "Listening on port #{port}"