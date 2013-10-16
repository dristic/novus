# The beginnings of a dynamic army creation UI. Hiding for now.
class entities.ArmyCreator extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @max = 100
    @value = 0

    @dialog = new nv.DialogUIPlugin scene,
      model: new nv.Model
        x: @model.get('x')
        y: @model.get('y')

    @slider = new nv.SliderUIPlugin scene,
      model: new nv.Model
        leftImage: "/assets/farmer-16.wh.png"
        rightImage: "/assets/miner-16.wh.png"
        x: 190
        y: 190
        value: 50
        gap: 3
        height: 20
        lineHeight: 20

    @text = new nv.TextUIPlugin scene,
      model: new nv.Model
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: 'Soldiers: 0'
        x: 190
        y: 185

    @label = new nv.TextUIPlugin scene,
      model: new nv.Model
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: 'Create How Many?'
        x: 190
        y: 165

    @slider.entity.model.on 'change:value', (value) =>
      @setValue value
    value = @slider.entity.model.get 'value'
    @setValue value

    @hide()

  setValue: (value) ->
    # Figure out value / 100 in relation to max soldiers player can create
    value = Math.floor((value * @max) / 100)
    @value = value
    @text.entity.model.set 'text', "Soldiers: #{@value}"

  show: () ->
    @dialog.show()
    @slider.show()
    @text.show()
    @label.show()

  hide: () ->
    @dialog.hide()
    @slider.hide()
    @text.hide()
    @label.hide()

  "event(game:armycreator:show)": (max) ->
    @max = max
    @setValue @slider.entity.model.get('value')
    @show()

  "event(engine:ui:dialog:confirm)": (element) ->
    if element is @dialog
      @scene.fire "game:army:created", @value
      @hide()

  "event(engine:ui:dialog:cancel)": (element) ->
    if element is @dialog
      @hide()

  "event(engine:ui:dialog:show)": (id) ->
    if id is @model.get 'id'
      @show()
