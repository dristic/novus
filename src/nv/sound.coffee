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

    @scene.on @options.event, () ->
      switch @options.action
        when "start" then @play()
        when "stop" then @stop()
        when "pause" then @pause()

  play: () ->
    @rewind() if @state is "playing"
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
