class nv.SliderUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @gamepad = scene.get 'gamepad'

    entity.model.value = entity.model.value ? 1
    @value = entity.model.value
    @max = 100

    @upButton = new nv.ButtonUIPlugin scene,
      model:
        text: "Up"
        x: entity.model.x + 110
        y: entity.model.y
        width: 50
        height: 30

    @downButton = new nv.ButtonUIPlugin scene,
      model:
        text: "Down"
        x: entity.model.x - 60
        y: entity.model.y
        width: 50
        height: 30

    @box = new gleam.Square
      color: "#CCC"
      width: 5
      height: 30
      x: entity.model.x + 1
      y: entity.model.y

    @minBox = new gleam.Square
      color: "#000"
      width: 1
      height: 30
      x: entity.model.x
      y: entity.model.y

    @maxBox = new gleam.Square
      color: "#000"
      width: 1
      height: 30
      x: entity.model.x + @max + 5
      y: entity.model.y

  getBoxBounds: () ->
    new nv.Rect @box.x, @box.y, @box.x + @box.width, @box.y + @box.height

  "event(engine:gamepad:mouse:down)": (data) ->
    if @getBoxBounds().contains new nv.Point(data.x, data.y)
      @dragging = true

  "event(engine:gamepad:mouse:up)": (data) ->
    @dragging = false

  "event(engine:ui:clicked)": (element) ->
    if element is @upButton
      @value += 1
    else if element is @downButton
      @value -= 1
    @clamp()
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

    @box.draw context, canvas
    @minBox.draw context, canvas
    @maxBox.draw context, canvas
