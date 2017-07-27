var canvas = document.getElementById("board");
var players = 2;
var btn1Player = document.getElementById("1PlayerBTN");
var btn2Player = document.getElementById("2PlayerBTN");
var btnStart = document.getElementById("Start");
var txtMessage = document.getElementById("Message");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
var snakes = [];
var counterMax = 5;

var state = {
  x: (width / 2),
  y: (height / 2),
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false,
    left2: false,
    right2: false,
    up2: false,
    down2: false
  }
};
var timer;
var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down',
  27: 'escape',
  32: 'space',
  13: 'enter',
  38: 'up2',
  39: 'right2',
  40: 'down2',
  37: 'left2'
};
var startSpots = [
	{x: width / 4, y: height / 4 * 3},
	{x: width / 4 * 3, y: height / 4 * 3}
];

function Snake(playerNum){
	this.width = 2;
	this.counter = 0;
	this.height = 2;
	this.speed = 2;
	this.player = playerNum;
	var copy = JSON.parse(JSON.stringify(startSpots));
	this.body = [copy[playerNum]]
	this.direction = 0;
	this.isAboutToGrow = false;
	this.Draw = function() {
		var length = this.body.length;
		if (this.player == 0){
			ctx.fillStyle = "green"
		}
		else if(this.player == 1){
			ctx.fillStyle = "blue"
		}
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
				this.body[0].y -= this.speed;
				this.direction = direction;
				break;
			case 1:
				this.body[0].x += this.speed;
				this.direction = direction;
				break;
			case 2:
				this.body[0].y += this.speed;
				this.direction = direction;
				break;
			case 3:
				this.body[0].x -= this.speed;
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

function SetPlayers(numPlayers){
	players = numPlayers;
	txtMessage.innerHTML = "Game has been set to " + (numPlayers) + " player(s).";
	ClearScreen();
};

function Initialize(){
	snakes = [];
	for (var i = 0; i < players; i++){
		snakes[i] = new Snake(i);
	}
}

function Update(){	
	for (var i = 0; i < snakes.length; i++){
		snakes[i].counter++;
		var moved = [false, false];
		if (snakes[i].counter > counterMax){
			snakes[i].counter = 0;
			snakes[i].isAboutToGrow = true;;
		}
		if (state.pressedKeys.left) {
	    	snakes[0].Move(3);
	    	moved[0] = true;
	  	}
	  	if (state.pressedKeys.right) {
	    	snakes[0].Move(1);
	    	moved[0] = true;
	  	}
		if (state.pressedKeys.up) {
		    snakes[0].Move(0);
		    moved[0] = true;
		}
		if (state.pressedKeys.down) {
		    snakes[0].Move(2);
		    moved[0] = true;
		}
		if (state.pressedKeys.left2) {
	    	snakes[1].Move(3);
	    	moved[1] = true;
	  	}
	  	if (state.pressedKeys.right2) {
	    	snakes[1].Move(1);
	    	moved[1] = true;
	  	}
		if (state.pressedKeys.up2) {
		    snakes[1].Move(0);
		    moved[1] = true;
		}
		if (state.pressedKeys.down2) {
		    snakes[1].Move(2);
		    moved[1] = true;
		}
		//Move the snake even if a new direction isn't entered
		if (moved[i] == false){
			snakes[i].Move(snakes[i].direction);
		}
		//Check for edge collisions
		if (snakes[i].body[0].x < 0){
			EndGame(i);
		}
		else if (snakes[i].body[0].x > width){
			EndGame(i);
		}
		else if (snakes[i].body[0].y < 0){
			EndGame(i);
		}
		else if (snakes[i].body[0].y > height){
			EndGame(i);
		}
		//Check for snake collisions
		for (var j = 1; j < snakes[0].body.length; j++){
			if (snakes[i].body[0].x == snakes[0].body[j].x && snakes[i].body[0].y == snakes[0].body[j].y){
				EndGame(i);
			}
		}
		if (players == 2){
			for (var j = 1; j < snakes[1].body.length; j++){
				if (snakes[i].body[0].x == snakes[1].body[j].x && snakes[i].body[0].y == snakes[1].body[j].y){
					EndGame(i);
				}
			}
		}
	}
};

function Draw(){
	ctx.clearRect(0, 0, width, height)
	for (var i = 0; i < snakes.length; i++){
		snakes[i].Draw();	
	}		
};

function Loop(){
	Update();
	Draw();
};

function ClearScreen(){
	ctx.clearRect(0, 0, width, height)
}

function EndGame(playerDied){
	txtMessage.innerHTML = ("Player " + (playerDied+1) + " has lost.");
	clearInterval(timer);
}

function StartGame(){
	Initialize();
	timer = setInterval(Loop, 50);
	txtMessage.innerHTML = ("Begin!");
}
btn1Player.addEventListener("click", function() {SetPlayers(1)});
btn2Player.addEventListener("click", function() {SetPlayers(2)});
btnStart.addEventListener("click", function() {StartGame()});
window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);