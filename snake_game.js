const LOOP_INTERVAL = 70;
var score = document.getElementById('score_snake');
var keyboard = [];
var gameState = 'start';

var canvas = document.getElementById('snake_game');
var context = canvas.getContext('2d');

var fieldColor = '#eaeaea';

const SECTIONS = 20;
const PIXELS_IN_SECTION = 16;

//<----------- Объекты игры ----------->

var snake = {
    head: [4,4],
    body: [[2,4],[3,4]],
    speed: 1,
    direction: 'right'
};

var apple = {
    sectionX: 4,
    sectionY: 4,
    eaten: false
};

//<----------- Функции отображения ----------->

function drawSnake() {
    context.fillStyle = 'green';

    context.fillRect(snake.head[0] * PIXELS_IN_SECTION, snake.head[1] * PIXELS_IN_SECTION,
        PIXELS_IN_SECTION - 1, PIXELS_IN_SECTION - 1);

    var t_body = snake.body;
    for(var i = snake.body.length - 1; i >= 0; i--) {
        context.fillStyle = 'blue';
        context.fillRect(t_body[i][0] * PIXELS_IN_SECTION, t_body[i][1] * PIXELS_IN_SECTION,
            PIXELS_IN_SECTION - 1, PIXELS_IN_SECTION - 1);
    }
}

function drawField() {
    context.fillStyle = fieldColor;
    context.fillRect(0,0,canvas.width, canvas.height);
}

function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(apple.sectionX * PIXELS_IN_SECTION, apple.sectionY * PIXELS_IN_SECTION,
        PIXELS_IN_SECTION - 1, PIXELS_IN_SECTION - 1);
}

function drawOverlay() {
    if(gameState === 'over') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        context.font = 'bold 18px Arial';
        context.fillText('Game Over', 125, 175);
        context.fillText('Нажмите Enter чтобы играть заново', 25, 200);
    }

    if(gameState === 'start') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        context.font = 'bold 18px Arial';
        context.fillText('Нажмите Enter чтобы играть', 40, 175);
    }
}

//<----------- Процедуры для обновления состояния объектов ----------->

function updateSnake() {
    //DOWN + RIGHT
    if(keyboard[40] && keyboard[39]) {
        if(snake.direction === 'up')
            snake.direction = 'right';
        else if(snake.direction = 'left')
            snake.direction = 'down';
        else if(snake.direction === 'right')
            snake.direction = 'down';
        else if(snake.direction === 'down')
            snake.direction = 'right';

        keyboard[40] = false;
        keyboard[39] = false;
    }

    //DOWN + LEFT
    else if(keyboard[40] && keyboard[37]) {
        if(snake.direction === 'up')
            snake.direction = 'left';
        else if(snake.direction = 'left')
            snake.direction = 'down';
        else if(snake.direction === 'left')
            snake.direction = 'down';
        else if(snake.direction === 'down')
            snake.direction = 'left';

        keyboard[40] = false;
        keyboard[37] = false;
    }

    //UP + RIGHT
    else if(keyboard[38] && keyboard[39]) {
        if(snake.direction === 'down')
            snake.direction = 'right';
        else if(snake.direction = 'right')
            snake.direction = 'up';
        else if(snake.direction === 'left')
            snake.direction = 'up';
        else if(snake.direction === 'up')
            snake.direction = 'right';

        keyboard[38] = false;
        keyboard[39] = false;
    }

    //UP + LEFT
    else if(keyboard[38] && keyboard[37]) {
        if(snake.direction === 'down')
            snake.direction = 'left';
        else if(snake.direction = 'right')
            snake.direction = 'up';
        else if(snake.direction === 'left')
            snake.direction = 'up';
        else if(snake.direction === 'up')
            snake.direction = 'right';

        keyboard[38] = false;
        keyboard[37] = false;
    }

    //LEFT
    else if(keyboard[37]) {
        if(snake.direction === 'right'){}
        else snake.direction = 'left';
        keyboard[37] = false;
    }
    //UP
    else if(keyboard[38]) {
        if(snake.direction === 'down'){}
        else snake.direction = 'up';
        keyboard[38] = false
    }
    //RIGHT
    else if(keyboard[39]) {
        if(snake.direction === 'left'){}
        else snake.direction = 'right';
        keyboard[39] = false
    }
    //DOWN
    else if(keyboard[40]) {
        if(snake.direction === 'up'){}
        else snake.direction = 'down';
        keyboard[40] = false
    }


    var temp_headX = snake.head[0];
    var temp_headY = snake.head[1];
    var tX, tY;

    switch (snake.direction) {
        case 'right':
            snake.head[0] += snake.speed;

            for(var i = snake.body.length - 1; i >= 0; i--) {
                tX = snake.body[i][0];
                tY = snake.body[i][1];

                snake.body[i][0] = temp_headX;
                snake.body[i][1] = temp_headY;

                temp_headX = tX;
                temp_headY = tY;
            }
            break;
        case 'left':
            snake.head[0] -= snake.speed;

            for(var i = snake.body.length - 1; i >= 0; i--) {
                tX = snake.body[i][0];
                tY = snake.body[i][1];

                snake.body[i][0] = temp_headX;
                snake.body[i][1] = temp_headY;

                temp_headX = tX;
                temp_headY = tY;
            }
            break;
        case 'up':
            snake.head[1] -= snake.speed;

            for(var i = snake.body.length - 1; i >= 0; i--) {
                tX = snake.body[i][0];
                tY = snake.body[i][1];

                snake.body[i][0] = temp_headX;
                snake.body[i][1] = temp_headY;

                temp_headX = tX;
                temp_headY = tY;
            }
            break;
        case 'down':
            snake.head[1] += snake.speed;

            for(var i = snake.body.length - 1; i >= 0; i--) {
                tX = snake.body[i][0];
                tY = snake.body[i][1];

                snake.body[i][0] = temp_headX;
                snake.body[i][1] = temp_headY;

                temp_headX = tX;
                temp_headY = tY;
            }
            break;
    }

}

function updateGame() {

    if(snake.head[0] * PIXELS_IN_SECTION > canvas.width - 1)
        gameState = 'over';
    if(snake.head[0] * PIXELS_IN_SECTION < 0)
        gameState = 'over';
    if(snake.head[1] * PIXELS_IN_SECTION > canvas.height - 1)
        gameState = 'over';
    if(snake.head[1] * PIXELS_IN_SECTION < -1)
        gameState = 'over';

    for(var i = 0; i < snake.body.length; i++) {
        if(snake.head[0] === snake.body[i][0] && snake.head[1] === snake.body[i][1])
            gameState = 'over';
    }

    if(gameState === 'over' || gameState === 'start') {
        snake.head = [4,4];
        snake.body = [[2,4],[3,4]];
        snake.direction = 'right';

        if(keyboard[13]) {gameState = 'in_game'; score.innerHTML = 0;}

    }
}

function updateField() {
    if(snake.head[0] === apple.sectionX && snake.head[1] === apple.sectionY) {
        var tX = snake.body[snake.body.length - 1][0];
        var tY = snake.body[snake.body.length - 1][1];
        snake.body.push([tX,tY]);
        updateSnake();
        apple.eaten = true;
        score.innerHTML = Number(score.innerHTML) + 1;
        updateApple();
    }

    updateSnake();
}

function updateApple() {
    if(apple.eaten) {
        apple.sectionY = random();
        apple.sectionX = random();

        for (var i = 0; i < snake.body.length; i++) {
            if (apple.sectionX === snake.body[i][0] && apple.sectionY === snake.body[i][1]) {
                apple.sectionY = random();
                apple.sectionX = random();
                i = 0;
            }
        }

    }

    apple.eaten = false;
}

//<----------- Ввод с клавиатуры ----------->

function attachEvent(node,name,func) {
    if(node.addEventListener) {
        node.addEventListener(name,func,false);
    } else if(node.attachEvent) {
        node.attachEvent(name,func);
    }
}

function setup() {
    attachEvent(document, "keydown", function(e) {
        keyboard[e.keyCode] = true;
    });
    attachEvent(document, "keyup", function(e) {
        keyboard[e.keyCode] = false;
    });
    attachEvent(document, "kepress", function(e) {
        keyboard[e.keyCode] = true;
    });


}

//<----------- Другие процедуры ----------->

function mainLoop() {
    updateGame();
    updateField();


    drawField();
    drawSnake();
    drawApple();
    drawOverlay();
}

function random() {
    return Math.floor(Math.random() * SECTIONS);
}


setup();
setInterval(mainLoop, LOOP_INTERVAL);