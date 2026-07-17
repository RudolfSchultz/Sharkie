let canvas;
let character = new Image();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    character.src = "images/character.png";

    ctx.drawImage(character, 50, 50, 50, 50);
}