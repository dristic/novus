class nv.SliderUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @upButton = new nv.ButtonUIPlugin scene,
      model:
        text: "Up"
        x: entity.model.x + 150
        y: entity.model.y

    @downButton = new nv.ButtonUIPlugin scene,
      model:
        text: "Down"
        x: entity.model.x - 150
        y: entity.model.y

    @value = new nv.TextUIPlugin scene,
      model:
        color: "#CCC"
        text: "{{value}}"
        bind: entity
        x: entity.model.x
        y: entity.model.y
        textAlign: 'center'

    entity.model.value = entity.model.value ? 1
    @value = entity.model.value
    @max = 100

  "event(engine:ui:clicked)": (element) ->
    if element is @upButton
      @value += 1
      @value = Math.min(@value, @max)
    else if element is @downButton
      @value -= 1
      @value = Math.max(@value, 0)
    @entity.model.set 'value', @value

  getValue: () ->
    @value / @max