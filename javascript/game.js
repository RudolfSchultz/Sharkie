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
 * Grabs the canvas and shows the start screen; the game starts with the start button.
 */
function init() {
    canvas = document.getElementById("canvas");
    showScreen("startScreen");
}

/**
 * Starts a fresh game without reloading the page (start button and "Try again").
 * A running game is stopped first, so no old interval keeps running.
 */
function startGame() {
    if (world) world.stop();
    keyboard = new Keyboard();
    document.activeElement.blur();
    showScreen(null);
    world = new World(canvas, keyboard, showEndScreen);
}

/**
 * Shows the end screen: "You win" after the boss is defeated, otherwise "Game over".
 * @param {boolean} won - True when the boss was defeated.
 */
function showEndScreen(won) {
    document.getElementById("endScreen").classList.toggle("win", won);
    showScreen("endScreen");
}

/**
 * Stops the game and goes back to the start screen.
 */
function goHome() {
    if (world) world.stop();
    world = null;
    showScreen("startScreen");
}

/**
 * Shows one overlay screen and hides all others.
 * @param {string|null} id - Id of the screen to show, or null to hide all (while playing).
 */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("d-none", screen.id !== id));
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
 * Game keys do not scroll the page or press a focused button.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 * @param {boolean} state - True on keydown, false on keyup.
 */
function setKeyState(event, state) {
    const prop = keyMap[event.code];
    if (!prop) return;
    event.preventDefault();
    keyboard[prop] = state;
}