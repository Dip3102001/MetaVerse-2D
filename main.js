const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameImage = new Image();
gameImage.src = './Meta_verse.png';

const spriteImage = new Image();
spriteImage.src = './SpriteMovement/down.png';


let initX = -336;
let initY = -432;


const spriteX = 0;
const spriteY = 0;
const spriteSpeed = 5;



const collision2D = [];

const num_cols = 70;

for(let i = 0; i < collision.length;i += num_cols)
    collision2D.push(collision.slice(i, i + num_cols));


gameImage.onload = function(){
    ctx.drawImage(gameImage, initX, initY);    
}

const spriteDimension = {};

spriteImage.onload = function(){

    spriteDimension.name = "me";

    spriteDimension.x = 336;
    spriteDimension.y = 480;

    spriteDimension.spriteSpeed = 3;

    spriteDimension.imageX = spriteImage.height/2;
    spriteDimension.imageY = spriteImage.width/2;

    spriteDimension.originalWidth = spriteImage.width;
    spriteDimension.originalHeight = spriteImage.height;

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


    ctx.drawImage(spriteImage,
        spriteDimension.imageX,spriteDimension.imageY,
        spriteDimension.originalWidth/2,
        spriteDimension.originalHeight/2,
        spriteDimension.x, spriteDimension.y,
        spriteDimension.scaledWidth/2, 
        spriteDimension.scaledHeigth/2
    );

    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";

    ctx.fillText(
        spriteDimension.name,
        spriteDimension.x + spriteDimension.originalWidth,
        spriteDimension.y + 5
    );
}

function convertPixelToGird(initX, initY){
    return {x: Math.floor(-initX/48), y: Math.floor(-initY/48)};
}


function isLegalMove(){
    let isLegal = false;

    const xx = 7+1;
    const yy = 10+1;


    const{x,y} = convertPixelToGird(initX, initY);
    console.log((x+xx)+" "+(y+yy));

    if(keys.ArrowUp){
        initY += spriteDimension.spriteSpeed;
        const{x,y} = convertPixelToGird(initX, initY);
        isLegal = (collision2D[y+yy][x+xx] == 0); 
        initY -= spriteDimension.spriteSpeed;
    }else if(keys.ArrowDown){
        initY -= spriteDimension.spriteSpeed;
        const{x,y} = convertPixelToGird(initX, initY);
        isLegal = (collision2D[y+yy][x+xx] == 0); 
        initY += spriteDimension.spriteSpeed;
    }else if(keys.ArrowLeft){
        initX += spriteDimension.spriteSpeed;
        const{x,y} = convertPixelToGird(initX, initY);
        isLegal = (collision2D[y+yy][x+xx] == 0);
        initX -= spriteDimension.spriteSpeed;
    }else if(keys.ArrowRight){
        initX -= spriteDimension.spriteSpeed;
        const{x,y} = convertPixelToGird(initX, initY);
        isLegal = (collision2D[y+yy][x+xx] == 0);
        initX += spriteDimension.spriteSpeed;
    }

    return isLegal;
}

function gameLoop() {
    if(keys.ArrowUp){
        if(isLegalMove()){
            initY += spriteDimension.spriteSpeed;
            spriteDimension.direction = "up";
            spriteDimension.movementCount++;
        }
    }else if(keys.ArrowDown){
        if(isLegalMove()){
            initY -= spriteDimension.spriteSpeed;
            spriteDimension.direction = "down";
            spriteDimension.movementCount++;
        }
    }else if(keys.ArrowLeft){
        if(isLegalMove()){
            initX += spriteDimension.spriteSpeed;
            spriteDimension.direction = "left";
            spriteDimension.movementCount++;
        }
    }else if(keys.ArrowRight){
        if(isLegalMove()){
            initX -= spriteDimension.spriteSpeed;
            spriteDimension.direction = "right";
            spriteDimension.movementCount++;
        }
    } 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameImage, initX, initY);
    drawSprite();

    requestAnimationFrame(gameLoop);
}

gameLoop();