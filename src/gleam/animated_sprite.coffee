class gleam.AnimatedSprite extends gleam.Sprite
  constructor: (options) ->
    super options

    defaults =
      frameWidth: 32
      frameHeight: 32
      animations:
        run: 
          frames: [0, 1, 2]
        jump:
          frames: [0, 1, 2, "run"]
          framesPerSecond: 60
      playing: false
    gleam.extend defaults, options unless not options
    gleam.extend this, defaults

    @currentAnimation = @animations[0]
    @frameTime = 0
    @currentMs = 0

  play: (animation) ->
    @playing = true
    @currentAnimation = @animations[animation]
    @currentFps = @currentAnimation.framesPerSecond ? 60
    @currentDelta = 1 / @currentFps
    @currentIndex = 0
    console.log animation, this

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

    # Move our frame rect to the current frame
    framesInARow = @image.width / @frameWidth
    x = (frame % framesInARow) * @frameWidth
    y = Math.floor(frame / framesInARow) * @frameHeight
    @frame =
      x: x
      y: y
      width: @frameWidth
      height: @frameHeight

  draw: (context, canvas) ->
    super