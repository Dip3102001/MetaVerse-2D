const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameImage = new Image();
gameImage.src = './Meta_verse.png';

const spriteImage = new Image();
spriteImage.src = './';


const initX = -350;
const initY = -450;

const spriteX = -50;
const spriteY = -50;
const spriteSpeed = 5;

gameImage.onload = function(){
    ctx.drawImage(gameImage, initX, initY);    
}


// const keys = {
//     ArrowUp : false,
//     ArrowDown : false,

// };


function gameLoop() {

}



