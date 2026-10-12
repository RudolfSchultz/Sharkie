let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Maps KeyboardEvent.code values to the property names of the Keyboard object.
 */
const keyMap = {
    ArrowRight: "RIGHT",
    ArrowLeft: "LEFT",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    Space: "SPACE",
    KeyA: "A",
};

/**
 * Initializes the game by grabbing the canvas element and creating the world.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Marks the mapped key as pressed when a keydown event fires.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 */
window.onkeydown = function (event) {
    setKeyState(event, true);
};

/**
 * Marks the mapped key as released when a keyup event fires.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 */
window.onkeyup = function (event) {
    setKeyState(event, false);
};

/**
 * Updates the keyboard object based on which key was pressed or released.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 * @param {boolean} state - True on keydown, false on keyup.
 */
function setKeyState(event, state) {
    const prop = keyMap[event.code];
    if (prop) keyboard[prop] = state;
}