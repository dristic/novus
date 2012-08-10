Gleam
==========
Gleam is a canvas and canvas context decorator. Its purpose is to make the canvas easy to use. It does this by wrapping common functions, such as filling a path or changing the size of the canvas, into easy to use functions.

# gl
## *size* gl.size(width, height)
Changes the size of the canvas to the given width and height. Keep in mind this also clears the canvas so everything has to be redrawn afterwards.

## *draw* gl.draw(object)
Calls the object's draw function given the following structure: `function draw(context, canvas)`. The context and canvas objects are the decorated and not the raw versions.

## *background* gl.background(color)
Sets the background style for the canvas object.