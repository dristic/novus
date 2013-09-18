class gleam.ImageLoader
  constructor: () ->
    @images = {}
    @callbacks = {}

  onLoad: (src) ->
    image = @images[src]
    for callback in @callbacks[src]
      callback(image.width, image.height)

  get: (src, callback) ->
    unless @images[src]
      image = new Image
      image.loaded = false
      @callbacks[src] = @callbacks[src] ? []
      @callbacks[src].push callback unless not callback
      image.onload = () =>
        image.loaded = true
        @onLoad src
      image.src = src
      @images[src] = image
      image
    else
      image = @images[src]
      unless not callback
        if image.loaded is true
          callback(image.width, image.height)
        else
          @callbacks[src].push callback
      image

gleam.image = new gleam.ImageLoader