class nv.PanelUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @background = new gleam.Square
      color: entity.model.color
      width: entity.model.width
      height: entity.model.height
      x: entity.model.x
      y: entity.model.y

  draw: (context, canvas) ->
    @background.x = @entity.model.x
    @background.y = @entity.model.y

    @background.draw context, canvas