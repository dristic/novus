class nv.SpriteUIPlugin extends nv.UIPlugin
  constructor: (scene, entity) ->
    super scene, entity

    @sprite = new gleam.Sprite entity.model

  bounds: () ->
    new nv.Rect @sprite.x, @sprite.y, @sprite.x + @sprite.width, @sprite.y + @sprite.height

  draw: (context, canvas) ->
    unless @hidden is true
      if @entity.model.rotate?
        @sprite.x = - @sprite.halfWidth
        @sprite.y = - @sprite.halfHeight

        context.save()
        context.translate @entity.model.x + @sprite.halfWidth, @entity.model.y + @sprite.halfHeight
        context.source.rotate(@entity.model.rotate)
        @sprite.draw context, canvas
        context.restore()
        # context.rotateAround @sprite.x, @sprite.y, @entity.model.rotate, () =>
        #   @sprite.draw context, canvas
      else
        @sprite.x = @xFunc() #@entity.model.x
        @sprite.y = @yFunc() #@entity.model.y
        @sprite.draw context, canvas
