class nv.SliderUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @gamepad = scene.get 'gamepad'

    entity.model.value = entity.model.value ? 1
    @value = entity.model.value
    @max = 100

    @upText = new nv.TextUIPlugin scene,
      model:
        text: entity.model.rightText
        font: entity.model.font
        textBaseline: 'bottom'
        x: entity.model.x + 115
        y: entity.model.y + 22

    @downText = new nv.TextUIPlugin scene,
      model:
        text: entity.model.leftText
        font: entity.model.font
        textBaseline: 'bottom'
        x: entity.model.x - 60
        y: entity.model.y + 22

    @box = new gleam.Square
      color: "#FFF"
      width: 10
      height: 30
      x: entity.model.x + 1
      y: entity.model.y

    @minBox = new gleam.Square
      color: "#555"
      width: 1
      height: 30
      x: entity.model.x
      y: entity.model.y

    @maxBox = new gleam.Square
      color: "#555"
      width: 1
      height: 30
      x: entity.model.x + @max + @box.width
      y: entity.model.y

    @line = new gleam.Square
      color: '#555'
      width: @max + @box.width
      height: 1
      x: entity.model.x
      y: entity.model.y + 15

    @entity.model.on 'change:value', nv.bind this, @onValueChange
    @onValueChange(@value)

  onValueChange: (value) ->
    @scene.fire "engine:ui:slider:change", this.entity

  bounds: () ->
    new nv.Rect @minBox.x, @minBox.x, @maxBox.x, @maxBox.y + @box.height

  getBoxBounds: () ->
    new nv.Rect @box.x, @box.y, @box.x + @box.width, @box.y + @box.height

  "event(engine:ui:mouse:down)": (data) ->
    if @getBoxBounds().contains new nv.Point(data.x, data.y)
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
    if @dragging is true
      mouseX = @gamepad.getState().mouse.x
      @value = mouseX - @minBox.x
      @clamp()

    @box.x = @entity.model.x + ((1 * @max) * @getValue())

    @minBox.draw context, canvas
    @maxBox.draw context, canvas
    @line.draw context, canvas
    @box.draw context, canvas
