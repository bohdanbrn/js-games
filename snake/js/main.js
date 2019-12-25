(function() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const groundImg = new Image();
    groundImg.src = "img/ground.png ";

    const foodImg = new Image();
    foodImg.src = "img/carrot.png";

    const box = 32; // box size
    const speed = 125;
    const snake = [];
    let score = 0;
    let direction = null;
    let foodCoord = generateFoodCoord();
    let game = null;

    /**
     * Draw game
     */
    function drawGame() {
        ctx.drawImage(groundImg, 0, 0);
        ctx.drawImage(foodImg, foodCoord.x, foodCoord.y);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "red";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(score, box * 2.5, box * 1.65);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // if the snake ate the food
        if (snakeX === foodCoord.x && snakeY === foodCoord.y) {
            score++;
            foodCoord = generateFoodCoord();
        } else {
            snake.pop();
        }

        // if the snake went beyond the playing field
        if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
            gameOver(game);
        }

        // move the snake's head by the direction
        if (direction === "right") snakeX += box;
        else if (direction === "left") snakeX -= box;
        else if (direction === "up") snakeY -= box;
        else if (direction === "down") snakeY += box;

        const newHead = {
            x: snakeX,
            y: snakeY,
        };

        // chack if the snake eats itself
        eatTail(newHead, snake);

        snake.unshift(newHead);
    }

    /**
     * Get new snake direction by keywords
     * @param {object} event
     */
    function getDirection(event) {
        if (event.keyCode === 37 && direction !== "right") direction = "left";
        else if (event.keyCode === 38 && direction !== "down") direction = "up";
        else if (event.keyCode === 39 && direction !== "left") direction = "right";
        else if (event.keyCode === 40 && direction !== "up") direction = "down";
    }

    /**
     * Generate new food coordinates
     */
    function generateFoodCoord() {
        return {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    }

    /**
     * Chack if the snake eats itself
     * @param {object} head
     * @param {object} snakeChain
     */
    function eatTail(head, snakeChain) {
        for (let i = 0; i < snakeChain.length; i++) {
            if (head.x === snakeChain[i].x && head.y === snakeChain[i].y) {
                gameOver(game);
            }
        }
    }

    /**
     * End game
     * @param {object} game
     */
    function gameOver(game) {
        clearInterval(game);

        alert("Game over!");
    }

    /**
     * Start game
     */
    function startGame() {
        snake[0] = {
            x: 9 * box,
            y: 10 * box,
        };

        document.addEventListener("keydown", getDirection);

        game = setInterval(drawGame, speed);
    }

    // run game
    startGame();
})();
