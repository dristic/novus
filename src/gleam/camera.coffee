class gleam.Camera
  constructor: () ->
    @following = null
    @x = 0
    @y = 0
    @offsetX = 0
    @offsetY = 0
    @zoomValue = 1

  follow: (object, offsetX, offsetY) ->
    @following = object
    @offsetX = offsetX
    @offsetY = offsetY

  zoom: (distance, duration) ->
    if duration
      startTime = Date.now()
      initial = @zoomValue

      @onUpdate = (dt) =>
        now = Date.now()
        diff = now - startTime
        @zoomValue = (distance - initial) * (diff / duration) + initial

        if diff > duration
          @onUpdate = null
          @zoomValue = distance
    else
      @zoomValue = distance

  update: (dt, context, canvas) ->
    if @following
      size = canvas.getSize()
      @offsetX = size.width / 2
      @offsetY = size.height / 2
      @x = -@following.x * @zoomValue + @offsetX
      @y = -@following.y * @zoomValue + @offsetY

    if @onUpdate then @onUpdate dt

    context.translate @x, @y
    context.scale @zoomValue, @zoomValue