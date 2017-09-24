var imgCanvas = document.getElementById('logoCanvas');
var imgCtx = imgCanvas.getContext('2d');
imgCtx.canvas.width  = 0.79*window.innerWidth;
imgCtx.canvas.height = window.innerHeight;
var logo = new Image();
logo.src = 'img/logo.jpeg';
logo.onload = function() {
  x = (imgCtx.canvas.width - 80 - logo.width) / 2
  y = (imgCtx.canvas.height - 0.9*logo.height)
  imgCtx.arc(x + logo.width / 2, y + logo.height / 2, 175, 0, 2*Math.PI);
  imgCtx.clip();
  imgCtx.drawImage(logo, x, y );
  imgCtx.stroke();
};
