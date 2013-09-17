nv.ajax = (url, method, data, callback) ->
  callback = callback ? method

  if typeof method is "function"
    method = 'GET'

  data = data ? ""

  if typeof XMLHttpRequest isnt 'undefined'
    xhr = new XMLHttpRequest()
  else
    versions = ["Microsoft.XmlHttp",
      "MSXML2.XmlHttp",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.5.0"]

    for version in versions
      try
        xhr = new ActiveXObject(version)
      catch e
        # Nothing

  onReadyStateChange = () ->
    if xhr.readyState < 4
      return

    if xhr.status isnt 200
      return

    if xhr.readyState is 4
      callback xhr.responseText

  xhr.onreadystatechange = onReadyStateChange
  xhr.open method, url, false # should be true after we implement pre-loader
  xhr.send data
