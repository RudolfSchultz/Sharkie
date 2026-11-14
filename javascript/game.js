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
    fitGame();
    bindTouchButtons();
    showScreen("startScreen");
    updateMuteButton();
    startIntroOnFirstInput();
}

/**
 * Switches all sounds on or off (button in the bottom right corner, visible on every screen).
 * The focus is removed again, so the space key in the game does not press the button.
 */
function toggleMute() {
    GameAudio.setMuted(!GameAudio.muted);
    updateMuteButton();
    document.activeElement.blur();
    playScreenMusic();
}

/**
 * Starts the music that belongs to the current screen: intro on the start screen,
 * background music while playing, nothing on the end screen.
 */
function playScreenMusic() {
    if (isScreenVisible("startScreen")) GameAudio.play("intro");
    else if (!isScreenVisible("endScreen")) GameAudio.play("background");
}

/**
 * @param {string} id - Id of an overlay screen.
 * @returns {boolean} True when the screen is currently shown.
 */
function isScreenVisible(id) {
    return !document.getElementById(id).classList.contains("d-none");
}

/**
 * Shows the current sound state on the mute button.
 */
function updateMuteButton() {
    let icon = document.getElementById("muteIcon");
    icon.src = GameAudio.muted ? "assets/img/6.Botones/mute.png" : "assets/img/6.Botones/volume.png";
    icon.alt = GameAudio.muted ? "Ton aus" : "Ton an";
}

/**
 * Browsers block sound before the first click or key press, so the intro music starts with the first input
 * while the start screen is still visible.
 */
function startIntroOnFirstInput() {
    const playIntro = () => {
        if (!document.getElementById("startScreen").classList.contains("d-none")) GameAudio.play("intro");
        window.removeEventListener("pointerdown", playIntro);
        window.removeEventListener("keydown", playIntro);
    };
    window.addEventListener("pointerdown", playIntro);
    window.addEventListener("keydown", playIntro);
}

/**
 * Opens the instruction dialog over the canvas. It is only reachable from the start screen,
 * which is made inert while the dialog is open (no clicks, no focus).
 */
function showInstructions() {
    document.getElementById("startScreen").inert = true;
    document.getElementById("instructionDialog").show();
}

/**
 * Closes the instruction dialog (X button, click beside the panel, Escape key).
 */
function closeInstructions() {
    document.getElementById("instructionDialog").close();
    document.getElementById("startScreen").inert = false;
}

/**
 * Closes the instruction dialog on a click beside the panel. The dialog covers the whole canvas and the
 * panel sits in its middle, so only a click outside the panel has the dialog itself as target.
 * @param {MouseEvent} event - The click event of the dialog.
 */
function closeOnBackdrop(event) {
    if (event.target === event.currentTarget) closeInstructions();
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
    GameAudio.stopAll();
    GameAudio.play("background");
    world = new World(canvas, keyboard, showEndScreen);
}

/**
 * Shows the end screen: "You win" after the boss is defeated, otherwise "Game over".
 * @param {boolean} won - True when the boss was defeated.
 */
function showEndScreen(won) {
    document.getElementById("endScreen").classList.toggle("win", won);
    showScreen("endScreen");
    GameAudio.stopAll();
    GameAudio.play(won ? "winner" : "loose");
}

/**
 * Stops the game and goes back to the start screen.
 */
function goHome() {
    if (world) world.stop();
    world = null;
    showScreen("startScreen");
    GameAudio.stopAll();
    GameAudio.play("intro");
}

/**
 * Shows one overlay screen and hides all others; the touch buttons are only shown while playing.
 * @param {string|null} id - Id of the screen to show, or null to hide all (while playing).
 */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("d-none", screen.id !== id));
    showTouchControls(id === null);
}

/**
 * Marks the mapped key as pressed when a keydown event fires.
 * @param {KeyboardEvent} event - The triggered keyboard event.
 */
window.onkeydown = function (event) {
    if (event.code === "Escape") closeInstructions();
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