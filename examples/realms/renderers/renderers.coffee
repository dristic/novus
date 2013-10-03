class nv.AssignedLaborRenderer extends nv.RenderingPlugin
  constructor: (scene, entity) ->
    super scene, entity

  draw: (context, canvas) ->
    return if @entity.model.value is "field" or @entity.model.value is "dirt"
    context.save()
    context.setFillStyle "#f1f1f1"
    context.fillRect @entity.model.x, @entity.model.y, 15, 15
    context.setStrokeStyle "black"
    context.setFont "10px 'Lucida Console'"
    # context.fillText @entity.model.workers, @entity.model.x + 5, @entity.model.y + 15
    context.strokeText @entity.model.workers, @entity.model.x + 3, @entity.model.y + 11
    context.restore()