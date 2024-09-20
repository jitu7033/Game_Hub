window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // Set the canvas dimensions
    canvas.width = 1500;  // Set the width
    canvas.height = 680; // Set the height (you might want to set this as well)
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler{
        constructor(){
            this. keys = [];
            window.addEventListener("keydown", e =>{
                if((e.key === 'ArrowDown'|| 
                    e.key === 'ArrowUp' ||
                    e.key === ' ' || 
                    e.key === 'ArrowLeft'||
                    e.key === 'ArrowRight' )
                     && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                if(gameOver && e.key === ' '){
                   this.restartGame();

                }
            })
            window.addEventListener("keyup", e =>{
                if((e.key === 'ArrowUp'|| 
                    e.key === ' ' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft'||
                    e.key === 'ArrowRight' ))
                    {
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
            })
        }
        
        restartGame(){
            canvas.width = 1500;
            canvas.height = 680;
            gameOver = false;
            enemies = [];
            score = 0;
            enemyTime = 0; // Reset enemy spawn timer
            animate(0); // Restart the animation loop
        }
    
    }

   
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.maxFrame = 8;
            this.framTimer = 0;
            this.fps = 20;
            this.framInterval = 1000/this.fps;


        }
        draw(context){
           
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }
        update(input,deltaTime,enemies){
            // collision detection 
            enemies.forEach(enemy =>{
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            })
            // sprite animation 
            if(this.framTimer >= this.framInterval){
                if(this.frameX >= this.maxFrame){
                    this.frameX = 0;
                }
                else{
                    this.frameX++;
                }
                this.framTimer = 0;
            }
            else{
                this.framTimer += deltaTime;
            }
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }
            else if(input.keys.indexOf("ArrowLeft") > -1){
                this.speed = -5;
            }
            else if((input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf(" ") > -1 )&& this.onGround()){
                this.vy -= 32;
            }
            else{
                this.speed = 0;
            }
            // horizontal movement 
            this.x += this.speed;
            if(this.x < 0)this.x = 0;
            if(this.x > this.gameWidth - this.width)this.x = this.gameWidth - this.width;

            // vertical movement 

            this.y += this.vy;
            if(!this.onGround()){
                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;
            }
            else{
                this.vy = 0;
                this.maxFrame = 8;
                this.frameY = 0;
            }
            if(this.y > this.gameHeight - this.height)this.y = this.gameHeight - this.height; 
            

        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
            
        }
    }

    class Background{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById("backgroundImage");
            this.x = 0;
            this.y = 0;
            this.height = 700
            this.width = 2400;
            this.speed = 7;
        }
        draw(context){
            context.drawImage(this.image,this.x, this.y,this.width,this.height);
            context.drawImage(this.image,this.x+this.width - this.speed, this.y,this.width,this.height);
        }
        update(){
            this.x -= this.speed;
            if(this.x < 0 - this.width){
                this.x = 0;
            }
        }
    }

    class Enemy{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById("enemyImage");
            this.x = this.gameWidth - this.width;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.framTimer = 0;
            this.framInterval = 1000/this.fps;
            this.speed = 8;
            this.markForDeletion = false;
        }
        draw(context){

            context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x, this.y,this.width,this.height);
            
        }
        update(deltaTime){

            if(this.framTimer > this.framInterval){
                if(this.frameX >= this.maxFrame){
                    this.frameX = 0;
                }
                else{
                    this.frameX++;
                }
                this.framTimer = 0;
            }
            else{
                this.framTimer += deltaTime;
            }
            
            this.x -= this.speed;

            if(this.x < 0 - this.width){
                this.markForDeletion = true;
                score+=10;
            }

        }
    }


    function handleEnemies(deltaTime){

        if(enemyTime > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width,canvas.height));
            console.log(enemies);
            enemyTime = 0;
        }
        else{
            enemyTime += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })

        enemies = enemies.filter(enemy => !enemy.markForDeletion);
    }

    function displayStatusText(context){
        context.fillStyle = 'Black'
        context.font = '40px Helvetica';
        context.fillText('Score :' + score,20,50);
        if(gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'Black';
            context.fillText("Game Over Please Try Again ! ",canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText("Score : "+score,canvas.width/2+2, 250);
        }
    }

    const input = new InputHandler();
    console.log(input);
    const player = new Player(canvas.width,canvas.height);
    const background = new Background(canvas.width,canvas.height);
    
    player.draw(ctx);
    console.log(player);

    let lastTime = 0;
    let enemyTime = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random()* 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.draw(ctx)
        background.update();
        player.update(input,deltaTime,enemies);
        player.draw(ctx);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if(!gameOver)requestAnimationFrame(animate);

    }
    animate(0);
});

