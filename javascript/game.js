let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.onkeydown = function (event) {
    setKeyState(event, true);
};

window.onkeyup = function (event) {
    setKeyState(event, false);
};

/**
 * Updates the keyboard object based on which key was pressed or released.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 * @param {boolean} state - True on keydown, false on keyup.
 */
function setKeyState(event, state) {
    if (event.key === "ArrowRight") keyboard.RIGHT = state;
    if (event.key === "ArrowLeft") keyboard.LEFT = state;
    if (event.key === "ArrowUp") keyboard.UP = state;
    if (event.key === "ArrowDown") keyboard.DOWN = state;
}