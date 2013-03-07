@gleam = gleam ? {
  requestFrame: window.requestAnimationFrame ? window.webkitRequestAnimationFrame ? window.mozRequestAnimationFrame ? window.oRequestAnimationFrame ? window.msRequestAnimationFrame ? (callback) -> return setTimeout(callback, 17)
  cancelFrame: window.cancelRequestAnimationFrame ? window.webkitCancelAnimationFrame ? window.webkitCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame ? clearTimeout

  # From http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
  extend: (object, other) ->
    if Object.keys
      Object.keys(other).forEach (property) ->
        Object.defineProperty object, property, Object.getOwnPropertyDescriptor(other, property)
    else
      for key of other
        if other.hasOwnProperty key
          object[key] = other[key]
    object
}