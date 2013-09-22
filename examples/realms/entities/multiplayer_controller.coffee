class entities.MultiplayerController extends nv.Entity
  constructor: (scene, plugins, model) ->
    super scene, plugins, model

    @guid = nv.guid()

    myRootRef = new Firebase @model.url
    @ref = myRootRef.child 'game'
    @ref.child('turn').set 2

    @ref.child('players').once 'value', (snapshot) =>
      if snapshot.val() is 0
        @scene.fire "game:mp:player", 1
        @ref.child('players').set 1
      else
        @scene.fire "game:mp:player", 2
        @ref.child('players').set 2

    @ref.child('attacks').on 'child_added', (snapshot) =>
      data = snapshot.val()
      if data.guid isnt @guid
        @scene.fire "game:army:attacked", data.amount

  "event(game:army:send)": (amount) ->
    @ref.child('attacks').push
      guid: @guid
      amount: amount
