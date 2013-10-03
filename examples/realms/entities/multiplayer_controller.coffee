class entities.MultiplayerController extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @guid = nv.guid()
    @playerManager = scene.getEntity(entities.PlayerManager)
    @hash = location.hash

    if @hash is ''
      @hash = @generateHash()
    else
      @hash = @hash.replace '#', ''

    location.hash = @hash

    if Firebase?
      @ref = new Firebase "#{@model.url}/game/#{@hash}"

      @ref.child('players').once 'value', (snapshot) =>
        if snapshot.val() is 0 or snapshot.val() is 2
          @scene.fire "game:mp:player", 1
          @ref.child('players').set 1
        else if snapshot.val() is 1
          @scene.fire "game:mp:player", 2
          @ref.child('players').set 2
        else
          # Reset the game
          @ref.child('turn').set 1
          @ref.child('players').set 0

      @ref.child('attacks').on 'child_added', (snapshot) =>
        data = snapshot.val()
        if data.guid isnt @guid
          @scene.fire "game:army:attacked", data.amount
          snapshot.ref().remove()

      @ref.child('turn').on 'value', (snapshot) =>
        console.log "FIREBASE ON VALUE", snapshot.val()
        if @playerManager.model.turn isnt snapshot.val()
          @scene.fire "game:turn:next", snapshot.val()

  "event(game:turn:next)": (newTurn) ->
    if @playerManager.model.turn is newTurn
      console.log "FIREBASE SET VALUE", newTurn
      @ref.child('turn').set newTurn

  "event(game:army:send)": (amount) ->
    @ref.child('attacks').push
      guid: @guid
      amount: amount

  generateHash: () ->
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for i in [0..5]
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    text
