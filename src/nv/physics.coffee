class nv.PhysicsEngine extends nv.Engine
  constructor: (scene) ->
    super scene
    @passiveObjects = {}
    @activeObjects = {}

    @scene.on "engine:physics:create", (collidable) =>
      @trackObject collidable

    @scene.on "engine:physics:delete", (collidable) =>
      @removeObject collidable

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
        if objp.bounds().intersects(objaBounds)
          @scene.send "engine:collision:#{obja.entity.constructor.name}:#{objp.entity.constructor.name}", [obja.entity, objp.entity],
            actor: obja.entity
            target: objp.entity

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
    @type = entity.model.type
    @boundingRect = new nv.Rect 0, 0, 0, 0

    super scene, entity

    @updateBounds()

  bounds: () ->
    @updateBounds()
    @boundingRect

  updateBounds: () ->
    x1 = x2 = y1 = y2 = null
    $.each @entity.model.path(), () ->
      x1 = this.x if x1 == null || this.x < x1
      x2 = this.x if x2 == null || this.x > x2
      y1 = this.y if y1 == null || this.y < y1
      y2 = this.y if y2 == null || this.y > y2
    @boundingRect.reset x1, y1, x2, y2