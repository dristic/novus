# The beginnings of a dynamic army creation UI. Hiding for now.
class entities.RationManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @max = 100
    @value = 0
    @buttons = {}
    @ration = 1

    @dialog = new nv.DialogUIPlugin scene,
      model: new nv.Model
        x: @model.get('x')
        y: @model.get('y')

    @buttons['ration-0'] = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        id: 'ration-0'
        ration: 0
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: '0x'
        x: 200
        y: 162
        width: 50

    @buttons['ration-0_5'] = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        id: 'ration-0_5'
        ration: 0.5
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: '0.5x'
        x: 260
        y: 162
        width: 50

    @buttons['ration-1'] = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        id: 'ration-1'
        ration: 1
        color: '#CCC'
        fillStyle: 'green'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: '1x'
        x: 320
        y: 162
        width: 50

    @buttons['ration-2'] = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        id: 'ration-2'
        ration: 2
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: '2x'
        x: 380
        y: 162
        width: 50

    @buttons['ration-3'] = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        id: 'ration-3'
        ration: 3
        color: '#CCC'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: '3x'
        x: 440
        y: 162
        width: 50

    @label = new nv.TextUIPlugin scene,
      model: new nv.Model
        color: '#eee'
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        text: 'Ration food at what rate?'
        x: 190
        y: 160

    @hide()

  show: () ->
    @dialog.show()
    for id, button of @buttons
      button.show()
    @label.show()

  hide: () ->
    @dialog.hide()
    for id, button of @buttons
      button.hide()
    @label.hide()

  "event(game:rationmanager:show)": (rations) ->
    @show()

  "event(engine:ui:clicked)": (element) ->
    return if @buttons[element.id] is undefined
    for id, button of @buttons
      button.fillStyle null
    @buttons[element.id].fillStyle 'green'
    @ration = @buttons[element.id].entity.model.ration

  "event(engine:ui:dialog:confirm)": (element) ->
    if element is @dialog
      @scene.fire "game:rations:set", @ration
      @hide()

  "event(engine:ui:dialog:cancel)": (element) ->
    if element is @dialog
      @hide()

  "event(engine:ui:dialog:show)": (id) ->
    if id is @model.get 'id'
      @show()
