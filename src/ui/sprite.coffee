class nv.SpriteUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.Sprite entity.model

  bounds: () ->
    new nv.Rect @sprite.x, @sprite.y, @sprite.x + @sprite.width, @sprite.y + @sprite.height

  draw: (context, canvas) ->
    unless @hidden is true
      @sprite.x = @entity.model.x
      @sprite.y = @entity.model.y

      if @entity.model.rotate?
        context.rotateAround @sprite.x, @sprite.y, @entity.model.rotate, () =>
          @sprite.draw context, canvas
      else
        @sprite.draw context, canvas
