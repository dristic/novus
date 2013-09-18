class models.StatBoard extends nv.Model

  constructor: (options) ->
    super options

    @items =
      H: "hearts"
      K: "keys"
      A: "stars"
      B: "blueGems"
      G: "greenGems"
      O: "orangeGems"

  acquireItem: (itemCode) ->
    @[ @items[itemCode] ] += 1

  useItem: (itemCode) ->
    @[ @items[itemCode] ] -= 1    

