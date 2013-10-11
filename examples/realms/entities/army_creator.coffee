# The beginnings of a dynamic army creation UI. Hiding for now.
class entities.ArmyCreator extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    # @dialog = new nv.DialogUIPlugin scene,
    #   model: new nv.Model
    #     x: @model.get('x')
    #     y: @model.get('y')

    # @slider = new nv.SliderUIPlugin scene,
    #   model: new nv.Model
    #     leftImage: "/assets/farmer-16.wh.png"
    #     rightImage: "/assets/miner-16.wh.png"
    #     x: 190
    #     y: 160
    #     value: 50
    #     gap: 3
    #     height: 20
    #     lineHeight: 20

    # @text = new nv.TextUIPlugin scene,
    #   model: new nv.Model
    #     color: '#CCC'
    #     font: 'bold 20px sans-serif'
    #     textBaseline: 'bottom'
    #     text: 'Soldiers: 0'
    #     x: 300
    #     y: 160

    # @slider.entity.model.on 'change:value', (value) =>
    #   @text.setText "Soldiers #{value}"
