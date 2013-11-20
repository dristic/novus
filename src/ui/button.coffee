class nv.ButtonUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    # Used for telling what is interacted with
    @id = @entity.model.id

    @entity.model.on 'change', (key, value) =>
      if ['x','y','width','height'].indexOf(key) > -1
        @button[key] = value

    @button = new gleam.Rectangle
      strokeStyle: @entity.model.strokeStyle ? "#000"
      strokeWidth: @entity.model.strokeWidth ? 4
      cornerRadius: @entity.model.cornerRadius ? 16
      fillStyle: if typeof @entity.model.fillStyle isnt "undefined" then @entity.model.fillStyle else "#FFF"
      width: @entity.model.width ? 150
      height: @entity.model.height ? 50
      x: @entity.model.x
      y: @entity.model.y

    @text = new gleam.Text
      color: @entity.model.textColor ? "#000"
      text: @entity.model.text
      textAlign: 'center'
      textBaseline: 'middle'
      x: 10
      y: 10

    @down = false

  "event(engine:ui:mouse:down)": (data) ->
    unless @hidden is true
      if @bounds().contains new nv.Point(data.x, data.y)
        @down = true
  
  "event(engine:ui:mouse:up)": (data) ->
    if @down is true
      if @bounds().contains new nv.Point(data.x, data.y)
        @down = false
        @scene.fire "engine:ui:clicked", this

  bounds: () ->
    new nv.Rect @button.x, @button.y, @button.x + @button.width, @button.y + @button.height

  draw: (context, canvas) ->
    return if @hidden is true

    @button.x = @xFunc()
    @button.y = @yFunc()

    # Calculate text position based on button
    @text.x = @button.x + (@button.width / 2)
    @text.y = @button.y + (@button.height / 2)

    @button.draw context, canvas
    @text.draw context, canvas

  fillStyle: (style) ->
    @button.fillStyle = style || "#FFF"