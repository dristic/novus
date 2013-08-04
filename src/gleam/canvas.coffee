# Canvas decorator class for html canvas element
class gleam.Canvas
  constructor: (canvas) ->
    if typeof canvas is 'string'
      canvas = document.querySelector(canvas)
    @source = canvas ? document.createElement 'canvas'
    @context = new gleam.Context @source.getContext('2d'), this
    @width = @source.width
    @height = @source.height
    @halfWidth = @source.width / 2
    @halfHeight = @source.height / 2
    @fullscreened = false
    @responsive = false

    this

  # Allows setting of style properties through code
  setStyle: (key, value) ->
    @source.style[key] = value

  # Alias for setting the size easily
  setSize: (width, height) ->
    if @maxWidth and width > @maxWidth
      width = @maxWidth
    if @maxHeight and height > @maxHeight
      height = @maxHeight

    console.log @source
    @source.width = width
    @source.height = height

    @width = @source.width
    @height = @source.height
    @halfWidth = @source.width / 2
    @halfHeight = @source.height / 2

  # Sets the max size for the canvas
  setMaxSize: (width, height) ->
    @maxWidth = width
    @maxHeight = height

    @setSize @width, @height

  # Gets the dimensions in one shot
  getSize: () ->
    {
      width: @width
      height: @height
    }

  # If enabled this will watch window resize and fullscreen the canvas
  setFullscreen: (isOn) ->
    if isOn
      @fullscreened = true
      @setSize document.body.clientWidth, document.body.clientHeight

      document.body.style.overflow = "hidden"

      @fullscreenListener = (event) =>
        @setSize document.body.clientWidth, document.body.clientHeight
      window.addEventListener 'resize', @fullscreenListener
    else
      @fullscreened = false
      window.removeEventListener 'resize', @fullscreenListener

  # Responsive body scaling
  setResponsive: (isOn) ->
    if isOn
      @responsive = true
      @calculateResponsive()
      @responsiveListener = (event) =>
        @calculateResponsive()
      window.addEventListener 'resize', @responsiveListener
    else
      @responsive = false
      window.removeEventListener 'resize', @responsiveListener

  # Scale body based on width/height ratio
  calculateResponsive: () ->
    @source.style.webkitTransformOrigin = "top"
    width = document.body.clientWidth
    height = document.body.clientHeight

    if height < @height
      ratio = height / @height
      @source.style.webkitTransform = "scale(#{ratio})"
    else
      @source.style.webkitTransform = ""

  # Draws the objects given with the camera on this canvas
  draw: (objects, camera) ->
    object.draw this.context, this for object in objects

  # Pass through for toDataUrl
  toDataUrl: (args...) ->
    @source.toDataUrl args...

  # Can re-get the canvas if needed
  getContext: (type = "2d") ->
    @context = new gleam.Context @source.getContext(type), this