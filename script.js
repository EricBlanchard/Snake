var canvas = document.getElementById("board")
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext("2d")
ctx.fillStyle = "green"
var snake;
var counter = 0;
var counterMax = 5;
var state = {
  x: (width / 2),
  y: (height / 2),
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  },
  size: 1,
  isPowerup: false
}
var timer;
var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down',
  27: 'escape',
  32: 'space',
  13: 'enter'
}

function Snake(){
	this.width = 2;
	this.height = 2;
	this.speed = 2;
	this.body = [{x: width / 2, y: height / 2}];
	this.direction = 0;
	this.isAboutToGrow = false;
	this.Draw = function() {
		var length = this.body.length;
		for (var i = 0; i < length; i++){
			ctx.fillRect(this.body[i].x - this.width / 2, this.body[i].y - this.height / 2, this.width, this.height)
		}
	};
	this.Move = function(direction) {
		var temp;
		if (this.isAboutToGrow){
			temp = {x: this.body[this.body.length-1].x, y: this.body[this.body.length-1].y};
		}
		for (var i = this.body.length-1; i > 0; i--){
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		switch (direction){
			case 0:
				this.body[0].y -= snake.speed;
				this.direction = direction;
				break;
			case 1:
				this.body[0].x += snake.speed;
				this.direction = direction;
				break;
			case 2:
				this.body[0].y += snake.speed;
				this.direction = direction;
				break;
			case 3:
				this.body[0].x -= snake.speed;
				this.direction = direction;
				break;
			default:
				break;
		}
		if (this.isAboutToGrow){
			this.body[this.body.length] = {x: temp.x, y: temp.y};	
			this.isAboutToGrow = false;
		}
	};
};

function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}

function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}


function Initialize(){
	snake = new Snake();
}

function Update(){
	counter++;
	var moved = false;
	if (counter > counterMax){
		counter = 0;
		snake.isAboutToGrow = true;;
	}
	if (state.pressedKeys.left) {
    	snake.Move(3);
    	moved = true;
  	}
  	if (state.pressedKeys.right) {
    	snake.Move(1);
    	moved = true;
  	}
	if (state.pressedKeys.up) {
	    snake.Move(0);
	    moved = true;
	  }
	if (state.pressedKeys.down) {
	    snake.Move(2);
	    moved = true;
	  }
	//Move the snake even if a new direction isn't entered
	if (moved == false){
		snake.Move(snake.direction);
	}
	//Check for edge collisions
	if (snake.body[0].x < 0){
		Initialize();
	}
	else if (snake.body[0].x > width){
		Initialize();
	}
	else if (snake.body[0].y < 0){
		Initialize();
	}
	else if (snake.body[0].y > height){
		Initialize();
	}
	//Check for snake collisions
	for (var i = 1; i < snake.body.length; i++){
		if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y){
			Initialize();
		}
	}
};

function Draw(){
	ctx.clearRect(0, 0, width, height)
	snake.Draw();		
};

function Loop(){
	Update();
	Draw();
};

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
snake = new Snake();
timer = setInterval(Loop, 50);