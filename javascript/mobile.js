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
 * the side zones of the touch buttons (body padding), keeping the 3:2 ratio and never above 100 % (720 x 480).
 * clientWidth/clientHeight are used instead of innerWidth/innerHeight,
 * because mobile browsers report a wider innerWidth while the page is still zoomed out.
 */
function fitGame() {
    let body = getComputedStyle(document.body);
    let width = document.documentElement.clientWidth - parseFloat(body.paddingLeft) - parseFloat(body.paddingRight);
    let height = document.documentElement.clientHeight - headingHeight();
    let scale = Math.min(width / GAME_WIDTH, height / GAME_HEIGHT, 1);
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
 * Connects every touch button to the key it stands for; the game cannot tell touch and keyboard apart.
 */
function bindTouchButtons() {
    document.querySelectorAll("[data-key]").forEach(button => {
        button.addEventListener("touchstart", event => pressTouchKey(event, button, true), { passive: false });
        button.addEventListener("touchend", event => pressTouchKey(event, button, false));
        button.addEventListener("touchcancel", event => pressTouchKey(event, button, false));
    });
}

/**
 * Sets the key of a touch button in the current keyboard object. The global keyboard is read here on every touch,
 * because each new game creates a new one.
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
 * Shows the touch buttons only while a game is running (they are only visible on touch devices at all).
 * @param {boolean} playing - True while no overlay screen is shown.
 */
function showTouchControls(playing) {
    document.getElementById("touchControls").classList.toggle("d-none", !playing);
}

window.addEventListener("resize", fitGame);
