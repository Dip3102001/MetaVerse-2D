const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameImage = new Image();
gameImage.src = './Meta_verse.png';

const spriteImage = new Image();
spriteImage.src = './SpriteMovement/down.png';


let initX = -350;
let initY = -450;


const spriteX = 0;
const spriteY = 0;
const spriteSpeed = 5;

gameImage.onload = function(){
    ctx.drawImage(gameImage, initX, initY);    
}

const spriteDimension = {};

spriteImage.onload = function(){

    spriteDimension.x = 320;
    spriteDimension.y = 450;

    spriteDimension.spriteSpeed = 5;

    spriteDimension.imageX = spriteImage.height/2;
    spriteDimension.imageY = spriteImage.width/2;

    spriteDimension.originalWidth = spriteImage.width;
    spriteDimension.originalHeight = spriteImage.height;

    console.log(spriteDimension.imageX+" "+spriteDimension.imageY);

    spriteDimension.scaleRatio = 4;

    spriteDimension.scaledWidth = spriteDimension.scaleRatio * spriteDimension.originalWidth;
    spriteDimension.scaledHeigth = spriteDimension.scaleRatio * spriteDimension.originalHeight;
    spriteDimension.direction = "down";
    spriteDimension.movementCount = 0;

    spriteImage.onload = null;    
}


const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
};

window.addEventListener('keydown', (e)=>{
    if(keys.hasOwnProperty(e.key))
        keys[e.key] = true;
});

window.addEventListener('keyup', (e)=>{
    if(keys.hasOwnProperty(e.key))
        keys[e.key] = false;
});


function getImageFromDirection(direction){
    if(direction === "up"){ 
        return "./SpriteMovement/up.png";
    }else if(direction === "down"){
        return "./SpriteMovement/down.png";
    }else if(direction === "left"){
        return "./SpriteMovement/left.png";
    }else{
        return "./SpriteMovement/right.png";
    }
}

function drawSprite(){
    
    spriteImage.src = getImageFromDirection(spriteDimension.direction);

    spriteDimension.movementCount %= 4;

    let i = Math.floor(spriteDimension.movementCount / 2);
    let j = spriteDimension.movementCount % 2;

    spriteDimension.imageX = i * spriteDimension.originalWidth/2;
    spriteDimension.imageY = j * spriteDimension.originalHeight/2;

    // console.log(spriteDimension.imageX+" "+spriteDimension.imageY);

    ctx.drawImage(spriteImage,
        spriteDimension.imageX,spriteDimension.imageY,
        spriteDimension.originalWidth/2,
        spriteDimension.originalHeight/2,
        spriteDimension.x, spriteDimension.y,
        spriteDimension.scaledWidth/2, 
        spriteDimension.scaledHeigth/2
    );
}

function gameLoop() {
    if(keys.ArrowUp){
        initY += spriteDimension.spriteSpeed;
        spriteDimension.direction = "up";
        spriteDimension.movementCount++;
    }else if(keys.ArrowDown){
        initY -= spriteDimension.spriteSpeed;
        spriteDimension.direction = "down";
        spriteDimension.movementCount++;
    }else if(keys.ArrowLeft){
        initX += spriteDimension.spriteSpeed;
        spriteDimension.direction = "left";
        spriteDimension.movementCount++;
    }else if(keys.ArrowRight){
        initX -= spriteDimension.spriteSpeed;
        spriteDimension.direction = "right";
        spriteDimension.movementCount++;
    } 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameImage, initX, initY);
    drawSprite();

    requestAnimationFrame(gameLoop);
}


gameLoop();


