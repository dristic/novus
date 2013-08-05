class nv.PhysicsEngine extends nv.Engine
  constructor: (scene, config) ->
    super scene, config
    @passiveObjects = {}
    @activeObjects = {}
    @physicsObjects = []

  "event(engine:physics:create)": (collidable) ->
    @trackObject collidable

  "event(engine:physics:delete)": (collidable) ->
    @removeObject collidable

  "event(engine:physics:register)": (obj) ->
    @physicsObjects.push obj

  prepare: () ->
    if @config.debug is true
      @canvas = @scene.getEngine(nv.RenderingEngine).canvas
      @scene.fire "engine:timing:register:after", nv.bind(this, @drawObjects)

  drawObjects: () ->
    drawObj = (obj) =>
      @canvas.context.setStrokeStyle "#FF0000"
      @canvas.context.setStrokeWidth 2
      bounds = obj.bounds()
      @canvas.context.strokeRect bounds.x, bounds.y, bounds.x2 - bounds.x, bounds.y2 - bounds.y

    drawObj obj for ida, obj of @activeObjects
    drawObj obj for ida, obj of @passiveObjects

  trackObjects: (array) ->
    self = this
    $.each array, () ->
      self.trackObject this

  trackObject: (obj) ->
    switch obj.type
      when 'passive' then @passiveObjects[obj.id] = obj
      when 'active' then @activeObjects[obj.id] = obj
      when 'both'
        @passiveObjects[obj.id] = obj
        @activeObjects[obj.id] = obj

  removeObject: (obj) ->
    switch obj.type
      when 'passive' then delete @passiveObjects[obj.id]
      when 'active' then delete @activeObjects[obj.id]
      when 'both'
        delete @passiveObjects[obj.id]
        delete @activeObjects[obj.id]

  update: (dt) ->
    for ida, obja of @activeObjects
      objaBounds = obja.bounds()
      for idp, objp of @passiveObjects
        continue if ida is idp
        objpBounds = objp.bounds()
        if objpBounds.intersects(objaBounds)
          ivec = @impactVector objaBounds, objpBounds
          @scene.send "engine:collision:queued",
            actor: obja.entity
            target: objp.entity
          @scene.fire "engine:collision:#{obja.entity.constructor.name}:#{objp.entity.constructor.name}",
            actor: obja.entity
            target: objp.entity
            impactVector: ivec
          break

    for obj in @physicsObjects
      obj.update(dt)

  impactVector: (colliderBounds, collideeBounds) ->
    iVec = new nv.Point(0,0)
    left = (collideeBounds.x - colliderBounds.x2);
    right = (collideeBounds.x2 - colliderBounds.x);
    top = (collideeBounds.y - colliderBounds.y2);
    bottom = (collideeBounds.y2 - colliderBounds.y);

    # // box intersect. work out the mtd on both x and y axes.
    iVec.x = -1 * if Math.abs(left) <= right then left else right
    iVec.y = -1 * if Math.abs(top) <= bottom then top else bottom

    # // 0 the axis with the largest mtd value.
    # if Math.abs(iVec.x) < Math.abs(iVec.y)
    #   iVec.y = 0
    # else
    #   iVec.x = 0  
    # console.log "PECalc", iVec
    iVec

class nv.PhysicsPlugin extends nv.Plugin
  constructor: (scene, entity) ->
    super scene, entity

    @scene.fire "engine:physics:create", this

  destroy: () ->
    @scene.fire "engine:physics:delete", this

    super

__objectId = 0
class nv.PathPhysicsPlugin extends nv.PhysicsPlugin
  constructor: (scene, entity) ->
    @id = __objectId++
    @type = entity.model.physicsObjectType
    @boundingRect = new nv.Rect 0, 0, 0, 0

    super scene, entity

    @updateBounds()

  bounds: () ->
    @updateBounds()
    @boundingRect

  updateBounds: () ->
    x1 = x2 = y1 = y2 = null
    for point in @entity.model.points()
      x1 = point.x if x1 == null || point.x < x1
      x2 = point.x if x2 == null || point.x > x2
      y1 = point.y if y1 == null || point.y < y1
      y2 = point.y if y2 == null || point.y > y2
    @boundingRect.reset x1, y1, x2, y2

class nv.RectanglePhysicsPlugin extends nv.PhysicsPlugin
  constructor: (scene, entity) ->
    @id = __objectId++
    @type = entity.model.physicsObjectType
    @boundingRect = new nv.Rect 0, 0, 0, 0

    super scene, entity

  bounds: () ->
    model = @entity.model
    new nv.Rect model.x, model.y, model.x + model.width, model.y + model.height

class nv.GravityPhysicsPlugin extends nv.PhysicsPlugin
  constructor: (scene, entity) ->
    @gravity = 0.003

    super scene, entity

  update: (dt) ->
    model = @entity.model
    unless model.thrusters
      tx = @gravity * if model.thrustVector.x < 0 then 1 else -1
      ty = @gravity * if model.thrustVector.y < 0 then 1 else -1

      model.thrustVector.translate tx, ty
