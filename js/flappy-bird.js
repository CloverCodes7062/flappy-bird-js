import Bird from '../js/bird.js';
import Floor from '../js/floor.js';
import Pipe from '../js/pipe.js';

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const BACKGROUND = new Image();
    BACKGROUND.src = '../images/bg.png';
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const FPS = 60;
    const velX = 2;
    let score = 0;

    setTimeout (() => {
        const player = new Bird(WIDTH, HEIGHT);
        const floor = new Floor(WIDTH, HEIGHT, velX);
        const pipes = [new Pipe(WIDTH, HEIGHT, velX, Math.round(WIDTH))];
        const animationID = requestAnimationFrame(gameLoop);

        let gameOverValue = false;
        let lastJumpTime = 0;

        let restartBtnCreated = false;

        document.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                const currentTime = Date.now();
                
                if (currentTime - lastJumpTime >= 100) {
                    player.jump();
                    lastJumpTime = currentTime;
                }
            }
        });

        function gameOver(){
            if (floor.y - player.y - player.img.height * 2 <= 0) {
                return true;
            }
        }

        function isCollide(player, pipe) {
            const birdBoundingBox = {
                x: player.x,
                y: player.y,
                width: player.img.width * 2,
                height: player.img.height * 2
            };

            const pipeBoundingBoxTop = {
                x: pipe.pipeX,
                y: pipe.topY,
                width: pipe.width * 2,
                height: pipe.imgTop.height * 2
            };
            
            const pipeBoundingBoxBottom = {
                x: pipe.pipeX,
                y: pipe.bottomY,
                width: pipe.width * 2,
                height: pipe.imgButtom.height * 2
            };

            const collidesWithTop = isCollideWithRect(birdBoundingBox, pipeBoundingBoxTop);
            const collidesWithBottom = isCollideWithRect(birdBoundingBox, pipeBoundingBoxBottom);

            return collidesWithTop || collidesWithBottom;
        }

        function isCollideWithRect(rect1, rect2) {
            const rect1Left = rect1.x;
            const rect1Right = rect1.x + rect1.width;
            const rect1Top = rect1.y;
            const rect1Bottom = rect1.y + rect1.height;

            const rect2Left = rect2.x;
            const rect2Right = rect2.x + rect2.width;
            const rect2Top = rect2.y;
            const rect2Bottom = rect2.y + rect2.height;

            return rect1Left < rect2Right && rect1Right > rect2Left && rect1Top < rect2Bottom && rect1Bottom > rect2Top;
        };

        function drawScore() {
            ctx.fillStyle = '#000000';
            ctx.font = '40px Arial';
            ctx.fillText(`Score: ${score}`, WIDTH - ctx.measureText(`Score: ${score}`).width - 10, 35);
        }

        function drawGameOver() {
            ctx.fillStyle = '#000000';
            ctx.font = '60px Arial';
            ctx.fillText('Game Over', WIDTH / 2 - ctx.measureText('Game Over').width / 2, HEIGHT / 2);
        };

        function createRestartBtn() {
            const restartBtn = document.createElement('button');
            restartBtn.innerText = 'Restart';
            restartBtn.className = 'btn btn-primary';
            restartBtn.style.display = 'block';
            restartBtn.style.marginTop = '20px';
            restartBtn.style.marginLeft = 'auto';
            restartBtn.style.marginRight = 'auto';

            restartBtn.addEventListener('click', function () {
                window.location.reload();
            });

            if (!restartBtnCreated) {
                restartBtnCreated = true;
                document.body.appendChild(restartBtn);
            }
        };

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(BACKGROUND, 0, 0, WIDTH, HEIGHT);
            
            if (pipes.length < 2) {
                pipes.push(new Pipe(WIDTH, HEIGHT, velX, pipes[0].pipeX + (350 + Math.round(Math.random() * 300))));
            }

            for (const pipe of pipes){
                pipe.draw(ctx);
                
                if (isCollide(player, pipe) && !gameOverValue) {
                    console.log('Game Over');
                    gameOverValue = true;
                }

                if (!pipe.passed && pipe.pipeX + pipe.width * 2 < player.x) {
                    score += 1;
                    pipe.passed = true;
                }
            }

            if (pipes[0].pipeX + pipes[0].width * 2 <= 0) {
                pipes.shift();
            }

            floor.draw(ctx);
            drawScore();
            player.draw(ctx);

            if (gameOver() && !gameOverValue) {
                console.log('Game Over');
                gameOverValue = true;
            }
            
            setTimeout(() => {
                if (gameOverValue) {
                    drawGameOver();
                    createRestartBtn();
                    cancelAnimationFrame(animationID);
                } else {
                    requestAnimationFrame(gameLoop);
                }
            }, 1000 / FPS);
        }
    
        gameLoop();
    }, 250);
});
