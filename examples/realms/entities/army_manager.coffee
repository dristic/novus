class entities.ArmyManager extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @attacking = false
  
  "event(scene:initialized)": () ->
    @attackText = @scene.getEntityById('attack-text').getPlugin nv.TextUIPlugin

  "event(engine:ui:clicked)": (element) ->
    if element.id is "create-army-button"
      army = @model.get 'army'
      army += 10
      @model.set 'army', army
      @scene.fire "game:army:created", 10
    else if element.id is "attack-button"
      @attacking = true
      @attackText.show()

  "event(game:clicked:county)": (county) ->
    if @attacking is true
      if county isnt 1026
        @attacking = false
        @attackText.hide()
        @model.set 'army', @model.get('army') - 50
