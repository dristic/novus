class nv.SoundEngine extends nv.Engine
  constructor: (scene) ->
    super scene
    @plugins = []

    @scene.on "sound:plugin:create", (plugin) =>
      @plugins.push plugin

    @scene.on "sound:plugin:delete", (plugin) =>
      @plugins = @plugins.filter (p) ->
        p.id isnt plugin.id
   
  update: (dt) ->
    plugin.update(dt) for plugin in @plugins


class nv.SoundPlugin extends nv.Plugin
  constructor: (scene, entity, @options) ->
    super scene, entity

    @state = "stopped"
    @sound = new Audio(@options.asset)
    @sound.onended = () ->
      @sound.currentTime = 0
      @state = "stopped"
      @play() if @options.repeat

    self = this
    dispatch = () ->
      switch this.action
        when "play" then self.play()
        when "stop" then self.stop()
        when "pause" then self.pause()

    @scene.on @options.event, dispatch.bind(@options)

    @play() if @options.autoplay

  update: (dt) ->
    return unless @options.maxPlayTime
    @stop() if new Date().getTime() - @playTime > @options.maxPlayTime

  play: () ->
    @rewind() if @state is "playing"
    @playTime = new Date().getTime()
    @sound.currentTime = @options.startTime if @options.startTime
    @sound.play()
    @fadeOut() if @options.fadeOut
    @state = "playing"

  pause: () ->
    @sound.pause()
    @state = "paused"

  rewind: () ->
    @pause()
    @sound.currentTime = 0
    @sound.volume = @options.startVolume ? 1
    @state = "stopped"

  stop: () ->
    @rewind()

  fadeOut: () ->
    fade = () =>
      @sound.volume = Math.max(0, @sound.volume - 0.05)
      # console.log "fade", @sound.volume
      setTimeout(fade, 50) unless @state is "stopped"
    setTimeout(fade, @options.fadeOut)

class nv.SoundFactory
  constructor: () ->

  wire: (@scene, sounds) ->
    @_add sound for name, sound of sounds

  _add: (sound) ->
    @scene.fire 'sound:plugin:create', new nv.SoundPlugin @scene, null, sound
