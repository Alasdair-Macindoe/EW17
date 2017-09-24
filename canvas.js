//Configurations for the main canvas
var canvas = document.getElementById('navbarCanvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth * 0.2;
ctx.canvas.height = window.innerHeight * 0.05;

class Line{
  constructor(x, height){
    this.x = x;
    this.height = height;
  }
}

var defaultLineColour = 'rgba(180, 180, 180, 0.1)';
var positions = [];
createLines(defaultLineColour); //when loaded run this

/**
 * Generates the height a line should be
 * @param {Number} pos the x(column) coordinate of this line
 * @return {Number} height of the line from the base (bottom) line
 */
function getHeight(pos){
  //If it is near the centre (where text is) it should be smaller
  res = (posNearCenter(pos, 0.65))?rndRange(0.75, 0.95):rndRange(0.8, 0.2);
  return ctx.canvas.height * res;
}

/**
 * Determines whether or not a position is within a specified range of the center
 * in either direction (left or right) but not up or down
 * @param {Number} pos the x(column) coordinate of where the line would be
 * @param {Number} degree -1 <= degree <= 1 which is how far away from the center it can be
 * to still be considered near by
 * @return {Boolean} True if it is near by, otherwise false
 */
function posNearCenter(pos, degree){
  mid = ctx.canvas.width / 2;
  return (pos > (1 - degree) * mid && pos < (1 + degree) * mid);
}

/**
 * Provides a randomly generated number within the range of (min, max)
 * @param {Number} min the minimum acceptable number
 * @param {Number} max the maximum acceptable number
 * @return {Number} a random number within this range
 */
function rndRange(min, max){
  return Math.random() * (max - min) + min;
}

/**
 * Creates an appropriate amount of space between two lines
 * @param {Number} pos the current x coordinate
 * @return {Number} the new position (x coordinate)
 */
function createSpace(pos){
  return pos + rndRange(3, 8);
}

/**
 * Creates a random assortment of lines of a specific colour
 * @param {Colour} colour the colour the lines should be
 */
function createLines(colour){
  pos = 0; //original offset
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  while(pos < ctx.canvas.width){
    height = getHeight(pos);
    createLine(pos, height, colour);
    positions.push(new Line(pos, height));
    pos = createSpace(pos);
  }
  ctx.closePath();
}

/**
 * Creates a single line from the bottom upwards
 * @param {Number} x the position of the line
 * @param {Number} height the height the line should be
 * @param {Colour} colour the colour of the line
 */
function createLine(x, height, colour){
  ctx.moveTo(x, ctx.canvas.height);
  ctx.lineTo(x, height);
  ctx.strokeStyle = colour;
  ctx.stroke();
}

/**
 * Updates the lines in the positions array
 * @param {Colour} colour the new colour of the lines
 */
function updateLines(colour){
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  mid = Math.round(positions.length / 2);
  //Special case mid
  ctx.clearRect(positions[mid].x - 20, 0, 40, ctx.canvas.height);
  updateLineFromPosition(colour, 0, mid);
}

/**
 * Updates a specific line and performs the transition effect
 * @param {Colour} colour the new line's colour
 * @param {Number} pos the current position in the array.
 * @param {Number} mid the originating position in the array
 */
function updateLineFromPosition(colour, pos, mid){
  setTimeout(function(){
    if(pos >= 0 && pos <= mid){
      position_right = positions[mid + pos].x;
      position_left = positions[mid - pos].x;
      //clear the position immediately infront of it to give it a nice effect
      ctx.clearRect(position_right, 0, 12, ctx.canvas.height);
      ctx.clearRect(position_left - 12, 0, -12, ctx.canvas.height);

      ctx.beginPath();
      createLine(position_right, positions[mid + pos].height, colour);
      createLine(position_left, positions[mid - pos].height, colour);
      updateLineFromPosition(colour, pos + 1, mid);
      ctx.closePath();
    }
  }, 0.06*pos);
}
