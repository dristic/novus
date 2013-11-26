class nv.SyncModel extends nv.Model
  constructor: (data, url) ->
    super data

    @url = url
    @fetch()

  fetch: () ->
    url = @url

    nv.ajax url, 'GET', "", (data) =>
      @setMany data

  save: () ->
    # Do save

