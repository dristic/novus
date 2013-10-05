class nv.DialogUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @gamepad = scene.get 'gamepad'

    @panel = new nv.PanelUIPlugin scene,
      model:
        color: 'black'
        width: 330
        height: 120
        x: entity.model.x - 10
        y: entity.model.y - 30

    @text = new nv.TextUIPlugin scene,
      model:
        text: "Hello World"
        font: 'bold 20px sans-serif'
        textBaseline: 'bottom'
        x: entity.model.x
        y: entity.model.y

    @confirm = new nv.ButtonUIPlugin scene,
      model:
        text: "Confirm"
        id: 'confirm'
        x: entity.model.x
        y: entity.model.y + 20

    @cancel = new nv.ButtonUIPlugin scene,
      model:
        text: "Cancel"
        id: 'cancel'
        x: entity.model.x + 160
        y: entity.model.y + 20

  "event(engine:ui:clicked)": (entity) ->
    if entity is @confirm
      @scene.fire "engine:ui:dialog:confirm", this
      @scene.removeEntity @entity
    else if entity is @cancel
      @scene.fire "engine:ui:dialog:cancel", this
      @scene.removeEntity @entity

  destroy: () ->
    @panel.destroy()
    @text.destroy()
    @confirm.destroy()
    @cancel.destroy()
    super
