class nv.PhysicsEngine extends nv.Engine
  constructor: (scene) ->
    super scene
    @passiveObjects = {}
    @activeObjects = {}

    @scene.on 'delete:Bullet', (data) =>
      console.log "[GPC] delete bullet"
      @removeObject data.asset

    @scene.on 'delete:Ship', (data) =>
      console.log "[GPC] delete ship"
      #@removeObject data.asset

    @scene.on 'delete:Asteroid', (data) =>
      console.log "[GPC] delete Asteroid"
      @removeObject data.asset

    @scene.on 'new:Bullet', (data) =>
      console.log '[GPC] track new bullet'
      @trackObject data.asset

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
          @scene.dispatcher.fire "collision:#{obja.constructor.name}:#{objp.constructor.name}",
            actor: obja
            target: objp