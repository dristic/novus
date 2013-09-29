class entities.MultiplayerController extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @guid = nv.guid()
    @quiet = false
    @first = true

    if Firebase?
      myRootRef = new Firebase @model.url
      @ref = myRootRef.child 'game'

      @ref.child('players').once 'value', (snapshot) =>
        if snapshot.val() is 0
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
        unless @first
          @quiet = true
          @scene.fire "game:turn:next"
        else
          @first = false

  "event(game:turn:next)": (newTurn) ->
    unless @quiet is true
      @ref.child('turn').set newTurn
    else
      @quiet = false

  "event(game:army:send)": (amount) ->
    @ref.child('attacks').push
      guid: @guid
      amount: amount
