class gleam.AnimatedSprite extends gleam.Sprite
  constructor: (options) ->
    super options

    defaults =
      frameWidth: 32
      frameHeight: 32
      framesPerSecond: 60
      animations:
        run:
          frames: [0, 1, 2]
        jump:
          frames: [0, 1, 2, "run"]
          framesPerSecond: 60
      playing: false
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

    # Grab a random animation by default
    for key of @animations
      @play(key)
      break

    @frameTime = 0
    @currentMs = 0

  play: (animation, override = false) ->
    if @currentAnimationName isnt animation or override is true
      @playing = true
      @currentAnimationName = animation
      @currentAnimation = @animations[animation]
      @currentFps = @currentAnimation.framesPerSecond ? @framesPerSecond
      @currentDelta = 1 / @currentFps
      @currentIndex = 0
      @goTo @currentAnimation.frames[0]

  stop: () ->
    @playing = false

  update: (dt) ->
    if @playing
      @frameTime += dt
      if @frameTime > @currentDelta
        @frameTime -= @currentDelta
        @nextFrame()

  nextFrame: () ->
    # Increase the current index
    @currentIndex++
    @currentIndex = 0 unless @currentIndex < @currentAnimation.frames.length

    # Find out what frame we need to be on
    frame = @currentAnimation.frames[@currentIndex]

    # If the frame is a string, it needs to play another animations
    if typeof frame is "string"
      @play frame
    else
      @goTo frame

  goTo: (frame) ->
    # Move our frame rect to the current frame
    framesInARow = @image.width / @frameWidth
    x = (frame % framesInARow) * @frameWidth
    y = Math.floor(frame / framesInARow) * @frameHeight
    @origin =
      x: x
      y: y
      width: @frameWidth
      height: @frameHeight

  draw: (context, canvas) ->
    super
