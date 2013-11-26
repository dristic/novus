class Logger
  constructor: () ->

  log: () ->
    if nv.config.debug is true
      console.log.call console, arguments...

nv.logger = new Logger
nv.log = nv.logger.log

