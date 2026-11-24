/**
 * Mobile support: scales the game to the window and connects the touch buttons to the keyboard object.
 */

/**
 * Size of the game in px; the canvas always works with this size, only the display is scaled.
 * GAME_WIDTH is the default width; on smartphones the width grows up to MAX_PHONE_GAME_WIDTH
 * so the wider screen shows more of the sea instead of empty side bars (the height stays fixed).
 */
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
const MAX_PHONE_GAME_WIDTH = 1080;

/**
 * Smartphone in landscape: touch device with a low screen height (same query as in style.css).
 */
const PHONE_QUERY = matchMedia("(hover: none) and (pointer: coarse) and (max-height: 500px)");

/**
 * Touch device (smartphone, tablet): there is no keyboard, so the actions are named after the touch buttons.
 */
const TOUCH_QUERY = matchMedia("(hover: none) and (pointer: coarse)");

/**
 * Scales the whole game container (canvas and overlays) to fit the window below the heading and between
 * the side zones of the touch buttons (body padding). Text, buttons and images scale with it,
 * so the layout looks the same at every size. Outside fullscreen the game is never shown above 100 % (height 480).
 */
function fitGame() {
    if (!canvas) return;
    let body = getComputedStyle(document.body);
    let width = document.documentElement.clientWidth - parseFloat(body.paddingLeft) - parseFloat(body.paddingRight);
    let height = document.documentElement.clientHeight - headingHeight();
    let gameWidth = applyGameWidth(width, height);
    let maxScale = document.fullscreenElement ? Infinity : 1;
    let scale = Math.min(width / gameWidth, height / GAME_HEIGHT, maxScale);
    scale = Math.floor(scale * 1000) / 1000;
    document.querySelector(".game-container").style.zoom = scale;
    setGameEdges(body, width, height, scale, gameWidth);
}

/**
 * Sets the width of canvas and game container: on smartphones it matches the screen ratio (between GAME_WIDTH
 * and MAX_PHONE_GAME_WIDTH), otherwise it is GAME_WIDTH. The width is not changed while a game is running,
 * because HUD and boss arena are laid out for the width the game started with.
 * @param {number} width - Available width in px.
 * @param {number} height - Available height in px.
 * @returns {number} The game width in use.
 */
function applyGameWidth(width, height) {
    if (world && !world.stopped) return canvas.width;
    let wanted = GAME_WIDTH;
    if (PHONE_QUERY.matches) wanted = Math.round(Math.min(Math.max(GAME_HEIGHT * width / height, GAME_WIDTH), MAX_PHONE_GAME_WIDTH));
    if (canvas.width !== wanted) {
        canvas.width = wanted;
        document.querySelector(".game-container").style.width = `${wanted}px`;
    }
    return wanted;
}

/**
 * Stores the distance in px from each screen edge to the game as CSS variables (--game-left, --game-right,
 * --game-bottom), so the touch buttons can be placed on the game area on small phones.
 * @param {CSSStyleDeclaration} body - Computed style of the body (side paddings).
 * @param {number} width - Available width in px between the body paddings.
 * @param {number} height - Available height in px below the heading.
 * @param {number} scale - Current scale of the game.
 * @param {number} gameWidth - Current game width in px.
 */
function setGameEdges(body, width, height, scale, gameWidth) {
    let sideGap = (width - gameWidth * scale) / 2;
    let root = document.documentElement.style;
    root.setProperty("--game-left", `${parseFloat(body.paddingLeft) + sideGap}px`);
    root.setProperty("--game-right", `${parseFloat(body.paddingRight) + sideGap}px`);
    root.setProperty("--game-bottom", `${(height - GAME_HEIGHT * scale) / 2}px`);
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
    if (!TOUCH_QUERY.matches) return;
    document.querySelector(".game-container").addEventListener("contextmenu", event => event.preventDefault());
}

/**
 * Blocks zooming by double tap and pinch on touch devices. iOS Safari ignores user-scalable=no,
 * so the second tap of a quick double tap and Safari's gesture events are cancelled here.
 */
function blockTouchZoom() {
    let lastTouchEnd = 0;
    document.addEventListener("touchend", event => {
        let now = Date.now();
        if (now - lastTouchEnd < 300 && event.cancelable) event.preventDefault();
        lastTouchEnd = now;
    }, { passive: false });
    document.addEventListener("dblclick", event => event.preventDefault());
    document.addEventListener("gesturestart", event => event.preventDefault());
}

blockTouchZoom();
window.addEventListener("resize", fitGame);
document.addEventListener("fullscreenchange", fitGame);
