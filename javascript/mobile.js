/**
 * Mobile support: scales the game to the window and connects the touch buttons to the keyboard object.
 */

/**
 * Size of the game in px; the canvas always works with this size, only the display is scaled.
 */
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

/**
 * Scales the whole game container (canvas and overlays) to fit the window below the heading and between
 * the side zones of the touch buttons (body padding), keeping the 3:2 ratio. Text, buttons and images scale with it,
 * so the layout looks the same at every size. Outside fullscreen the game is never shown above 100 % (720 x 480).
 */
function fitGame() {
    let body = getComputedStyle(document.body);
    let width = document.documentElement.clientWidth - parseFloat(body.paddingLeft) - parseFloat(body.paddingRight);
    let height = document.documentElement.clientHeight - headingHeight();
    let maxScale = document.fullscreenElement ? Infinity : 1;
    let scale = Math.min(width / GAME_WIDTH, height / GAME_HEIGHT, maxScale);
    document.querySelector(".game-container").style.zoom = scale;
}

/**
 * @returns {number} Height in px the heading takes including its margins, 0 while it is hidden.
 */
function headingHeight() {
    let heading = document.querySelector("h1");
    let style = getComputedStyle(heading);
    if (style.display === "none") return 0;
    return heading.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
}

/**
 * Connects every touch button to the key in its data-key attribute.
 */
function bindTouchButtons() {
    document.querySelectorAll("[data-key]").forEach(button => {
        button.addEventListener("touchstart", event => pressTouchKey(event, button, true), { passive: false });
        button.addEventListener("touchend", event => pressTouchKey(event, button, false));
        button.addEventListener("touchcancel", event => pressTouchKey(event, button, false));
    });
}

/**
 * Sets the key of a touch button in the current keyboard object.
 * @param {TouchEvent} event - The touch event.
 * @param {HTMLElement} button - The touched button with its key in data-key.
 * @param {boolean} state - True while the finger is on the button.
 */
function pressTouchKey(event, button, state) {
    event.preventDefault();
    keyboard[button.dataset.key] = state;
    button.classList.toggle("pressed", state);
}

/**
 * Shows the touch buttons only while a game is running (on touch devices).
 * @param {boolean} playing - True while no overlay screen is shown.
 */
function showTouchControls(playing) {
    document.getElementById("touchControls").classList.toggle("d-none", !playing);
}

/**
 * Blocks the context menu (long press) on the game area of touch devices; other pages are not affected.
 */
function blockGameContextMenu() {
    if (!matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    document.querySelector(".game-container").addEventListener("contextmenu", event => event.preventDefault());
}

window.addEventListener("resize", fitGame);
document.addEventListener("fullscreenchange", fitGame);
