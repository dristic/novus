class nv.DialogUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @gamepad = scene.get 'gamepad'

    @panel = new nv.PanelUIPlugin scene,
      model:
        color: 'rgba(0, 0, 0, 0.5)'
        width: 3000
        height: 3000
        x: 0
        y: 0

    @confirm = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        text: "Confirm"
        id: 'confirm'
        x: entity.model.x
        y: entity.model.y + 20

    @cancel = new nv.ButtonUIPlugin scene,
      model: new nv.Model
        text: "Cancel"
        id: 'cancel'
        x: entity.model.x + 160
        y: entity.model.y + 20

  show: () ->
    @panel.show()
    @confirm.show()
    @cancel.show()

  hide: () ->
    @panel.hide()
    @confirm.hide()
    @cancel.hide()

  "event(engine:ui:clicked)": (entity) ->
    if entity is @confirm
      @scene.fire "engine:ui:dialog:confirm", this
    else if entity is @cancel
      @scene.fire "engine:ui:dialog:cancel", this
    @hide()

  destroy: () ->
    @panel.destroy()
    @confirm.destroy()
    @cancel.destroy()
    super
