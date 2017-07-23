var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var canvasSize = 400;
var direction;
var snake;


/*
0- UP
1- RIGHT
2- DOWN
3- LEFT
*/
function Snake(){
	this.x = Math.floor((Math.random() * (canvasSize - 1)) + 1);
	this.y = Math.floor((Math.random() * (canvasSize - 1)) + 1);
	this.size = 1;
	this.positions = [];
	this.positions.push({x: this.x, y:this.y});
	this.direction = 1;
	context.lineWidth = 10;
	context.moveTo(this.x, this.y);
	this.Move = function() {
		if (this.direction == 0){
			this.y += 1;
		}
		else if (this.direction == 1){
			this.x += 1;
		}
		else if (this.direction == 2){
			this.y -= 1;
		}
		else if (this.direction == 3){
			this.x -= 1;
		}
	};
	this.Draw = function() {
		for (var i = this.positions.length; i > this.positions.length - this.size; i--){
			context.lineTo(positions[i-1].x, this.positions[i-1].y);
		}
		context.stroke();
	};
}

function ClearBoard(){
	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,400,400);
};

function DrawSnake(x, y){
	context.fillStyle = "#000000";
	context.lineWidth = 10;
	context.lineTo(x, y);
	context.stroke();
};

function Game(){
	this.snake = new Snake();
	this.playing = true;
	this.Play = function() {
		if (this.playing){
			this.Play();
		}
	};
};

ClearBoard();

game = new Game();
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // code for "down arrow" key press.
      break;
    case "ArrowUp":
      // code for "up arrow" key press.
      break;
    case "ArrowLeft":
      // code for "left arrow" key press.
      break;
    case "ArrowRight":
      game.playing = false;
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window

game.Play();
