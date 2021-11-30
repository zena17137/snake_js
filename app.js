/* Переменные */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const colorSnakeHead = '#C81069';
const color = ['#FF0000', '#F0A403', '#F0FF03', '#0EFF03', '#55E3FF', '#0E00FF', '#FF00FF'];

const arrowLeft = document.getElementById('button-left');
const arrowRight = document.getElementById('button-right');
const arrowUp = document.getElementById('button-up');
const arrowDown = document.getElementById('button-down');

const s_x = document.getElementById("x");
const s_y = document.getElementById("y");

const h_c_x = document.getElementById("c_x");
const h_c_y = document.getElementById("c_y");

const c_x = "288";
const c_y = "320";

const snakeHead = new Image();
snakeHead.src = "snakeHead.png";

const ground = new Image();
ground.src = "ground.png";

const foodImg1 = new Image();
foodImg1.src = "food1.png";

const foodImg2 = new Image();
foodImg2.src = "food2.png"
//foodImg2.src = "food2.jpg";

const foodImg3 = new Image();
foodImg3.src = "food3.png";

const foodImg4 = new Image();
foodImg4.src = "food4.png";

const foodImg5 = new Image();
foodImg5.src = "food5.png";

const foodImg6 = new Image();
foodImg6.src = "food6.png";

const foodImg7 = new Image();
foodImg7.src = "food7.png";

const foodImg8 = new Image();
foodImg8.src = "food8.png";

const foodImg9 = new Image();
foodImg9.src = "food9.png";

const foodImg10 = new Image();
foodImg10.src = "food10.png";

const foodImg11 = new Image();
foodImg11.src = "food11.png";

const foodImg12 = new Image();
foodImg12.src = "food12.png";

const foodImg13 = new Image();
foodImg13.src = "food13.png";

const foodImg14 = new Image();
foodImg14.src = "food14.png";

const foodImg15 = new Image();
foodImg15.src = "food15.png";

const foodImg16 = new Image();
foodImg16.src = "food16.png";

const foodImg17 = new Image();
foodImg17.src = "food17.png";

let foodArr = [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6, foodImg7, foodImg8, foodImg9, foodImg10, foodImg11, foodImg12, foodImg13, foodImg14, foodImg15, foodImg16, foodImg17];

let foodId = Math.floor(Math.random() * foodArr.length);

let dir;

let pause = 0;

let box = 32;

let foodY = 0;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box,
};


/* Основной код */
document.addEventListener("keydown", direction);
arrowLeft.addEventListener("click", clickLeft);
arrowRight.addEventListener("click", clickRight);
arrowUp.addEventListener("click", clickUp);
arrowDown.addEventListener("click", clickDown);

function clickLeft () {
	dir = "left";
}

function clickRight () {
	dir = "right";
}

function clickUp () {
	dir = "up";
}

function clickDown () {
	dir = "down";
}

function direction(e) {
	if (e.keyCode == 37 && dir != "right") {
		dir = "left";
	} else if (e.keyCode == 38 && dir != "down") {
		dir = "up";
	} else if (e.keyCode == 39 && dir != "left") {
		dir = "right";
	} else if (e.keyCode == 40 && dir != "up") {
		dir = "down";
	} else if (e.keyCode == 32) {
		pause++;
		drawGame();
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	foodY += 1;

	if (foodY == 10) {
		food.y += 32;
		foodY = 0;
	}

	if (food.y >= 576) {
		foodId = Math.floor(Math.random() * foodArr.length);
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	}

	ctx.drawImage(foodArr[foodId], food.x, food.y);

	if (pause == 1) {
		clearInterval(game);
	} else if (pause == 2) {
		pause = 0;
		game = setInterval(drawGame, 100);
	}

	let j = -2;
	for (let i = 0; i < snake.length; i++) {
		j++;
		ctx.fillStyle = color[j];
		if (j > color.length - 2) {
			j = -1;
		}

		//colorId = Math.floor(Math.random() * color.length);

		if (i == 0) {
			ctx.fillStyle = colorSnakeHead;
			ctx.fillRect(snake[i].x, snake[i].y, box, box);
		} else {
			ctx.fillRect(snake[i].x, snake[i].y, box, box);
		}

		h_c_x.innerHTML = "Координаты центра x: " + c_x;
		h_c_y.innerHTML = "Координаты центра y: " + c_y;

		s_x.innerHTML = "x: " + snake[0].x;
		s_y.innerHTML = "y: " + snake[0].y;
	}

	ctx.fillStyle = "#FFFF00";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7)

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;

		foodId = Math.floor(Math.random() * foodArr.length);
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else {
		snake.pop();
	}

	if (dir == "left") snakeX -= box;
	if (dir == "right") snakeX += box;
	if (dir == "up") snakeY -= box;
	if (dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY,
	}

	snake.unshift(newHead);
};

let game = setInterval(drawGame, 100);