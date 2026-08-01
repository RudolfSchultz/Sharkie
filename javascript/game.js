let canvas;
let ctx;
let character = new MovableObject();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    console.log('My character is', character);

    character.src = "../img/1.Sharkie/1.IDLE/1.png";

    ctx.drawImage(character, 20, 20, 50, 50);
}