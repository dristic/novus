class Debug
  html: """
  <div id="debug"></div>
  """

  constructor: () ->

  log: () ->
    messages = arguments
    console.log arguments

$(() ->
  nv.Debug = new Debug
  nv.log = nv.Debug.log
)
