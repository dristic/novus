class entities.Wall extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model
    
  "event(engine:collision:Ball:Wall)": (data) =>
    return if data.target isnt this
    @flash = true

  update: (dt) ->
    return unless @flash or @restore

    if @flash and @restore is undefined
      @restore = shallowClone @model.drawable
      @model.drawable.color = 'yellow'
      @flash = false

    else if @restore
      @model.drawable.color = @restore.color
      delete @restore
