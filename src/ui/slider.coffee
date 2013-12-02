class nv.SliderUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @gamepad = scene.get 'gamepad'

    entity.model.value = entity.model.value ? 1
    @value = entity.model.value
    @max = 100
    @gap = entity.model.gap ? 10
    @height = entity.model.height ? 30
    @offset = 0

    entity.model.x = @xFunc()
    entity.model.y = @yFunc()

    if @entity.model.leftText
      @down = new nv.TextUIPlugin scene,
        model:
          text: entity.model.leftText
          font: entity.model.font
          textBaseline: 'bottom'
          x: entity.model.x
          y: entity.model.y + @entity.model.lineHeight + (@height - entity.model.lineHeight)/2
    else
      @down = new gleam.Sprite
        src: entity.model.leftImage
        x: entity.model.x
        y: entity.model.y

    @entity.model.on 'change:value', nv.bind this, @onValueChange
    @onValueChange(@value)

  createControls: () ->
    return unless @down.width

    model = @entity.model

    x = @entity.model.x + @down.width + @gap

    if @down.onLoad?
      @down.y += (@height - @down.height)/2

    @minBox = new gleam.Square
      color: "#555"
      width: 1
      height: @height
      x: x
      y: @entity.model.y

    @boxLeftX = x + 1
    @box = new gleam.Square
      color: @entity.model.thumbColor || "#FFF"
      width: 10
      height: @height
      x: @boxLeftX
      y: @entity.model.y

    lineWidth = @max + @box.width
    @line = new gleam.Square
      color: '#555'
      width: lineWidth
      height: 1
      x: x
      y: @entity.model.y + @height/2

    @maxBox = new gleam.Square
      color: "#555"
      width: 1
      height: @height
      x: x + lineWidth
      y: @entity.model.y

    if @entity.model.rightText
      @up = new nv.TextUIPlugin @scene,
        model:
          text: @entity.model.rightText
          font: @entity.model.font
          textBaseline: 'bottom'
          x: x + lineWidth + @gap
          y: @entity.model.y + @entity.model.lineHeight + (@height - @entity.model.lineHeight)/2
    else
      @up = new gleam.Sprite
        src: @entity.model.rightImage
        x: x + lineWidth + @gap
        y: -100 #@entity.model.y + (@height - @down.height)/2


  onValueChange: (value) ->
    @scene.fire "engine:ui:slider:change", this.entity

  bounds: () ->
    new nv.Rect @minBox.x, @minBox.y, @maxBox.x, @maxBox.y + @box.height

  getBoxBounds: () ->
    new nv.Rect @box.x, @box.y, @box.x + @box.width, @box.y + @box.height

  "event(engine:ui:mouse:down)": (data) ->
    if @getBoxBounds().contains new nv.Point(data.x, data.y)
      @offset = data.x - @box.x
      @dragging = true

  "event(engine:ui:mouse:up)": (data) ->
    if @dragging is true
      @dragging = false
      @entity.model.set 'value', @value

  "event(engine:gamepad:mouse:up)": (data) ->
    if @dragging is true
      @dragging = false
      @entity.model.set 'value', @value

  getValue: () ->
    @value / @max

  clamp: () ->
    @value = Math.min(@value, @max)
    @value = Math.max(@value, 0)

  draw: (context, canvas) ->
    @createControls() unless @up
    return unless @up

    return unless not @hidden

    if @up.y < 0 and @up.loaded
      @up.y = @entity.model.y + (@height - @up.height)/2

    if @dragging is true
      mouseX = @gamepad.getState().mouse.x
      @value = mouseX - @minBox.x - @offset
      @clamp()

    @box.x = @minBox.x + @value

    @down.draw context, canvas
    @up.draw context, canvas
    @minBox.draw context, canvas
    @maxBox.draw context, canvas
    @line.draw context, canvas
    @box.draw context, canvas

  destroy: () ->
    @up.destroy()
    @down.destroy()
    @box.destroy()
    @line.destroy()
    @minBox.destroy()
    @maxBox.destroy()
    super
