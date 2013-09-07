class gleam.ImageLoader
  constructor: () ->
    @images = {}

  get: (src, callback) ->
    unless @images[src]
      image = new Image
      image.onload = () ->
        callback(image.width, image.height) unless not callback
      image.src = src
      @images[src] = image
      image
    else
      image = @images[src]
      callback(image.width, image.height) unless not callback
      image

gleam.image = new gleam.ImageLoader