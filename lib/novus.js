
window.onload = function() {
  var glcanvas, square;
  glcanvas = gl('canvas');
  glcanvas.size(200, 200);
  glcanvas.background('#000');
  square = new gl.drawable({
    color: '#FFF',
    width: 100,
    height: 150,
    draw: function(context) {
      context.color(this.color);
      return context.fillRect(10, 10, this.width, this.height);
    }
  });
  return glcanvas.draw(square);
};
