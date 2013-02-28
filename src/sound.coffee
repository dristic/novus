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
    @sound = new Audio(@options.path)
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

    for obj in @options.events
      @scene.on obj.event, dispatch.bind(obj)

    @play() if @options.autoplay

  update: (dt) ->
    return unless @options.maxPlayTime
    @stop() if new Date().getTime() - @playTime > @options.maxPlayTime

  play: () ->
    @rewind() if @state is "playing"
    @playTime = new Date().getTime()
    @sound.currentTime = @options.startTime if @options.startTime
    @sound.play()
    @state = "playing"

  pause: () ->
    @sound.pause()
    @state = "paused"

  rewind: () ->
    @pause()
    @sound.currentTime = 0
    @state = "stopped"

  stop: () ->
    @rewind()


class nv.SoundFactory
  constructor: (@scene) ->

  wire: (sounds) ->
    @_add sound for sound in sounds

  _add: (sound) ->
    @scene.fire 'sound:plugin:create', new nv.SoundPlugin @scene, null, sound
