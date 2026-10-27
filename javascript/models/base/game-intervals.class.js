/**
 * Central registry for every interval in the game.
 * All loops must be started through GameIntervals.start, never with setInterval directly,
 * so the whole game can be stopped at once (end screen, restart, back to home).
 */
class GameIntervals {
    static ids = [];

    /**
     * Starts an interval and remembers its id.
     * @param {function} callback - Function to run on every tick.
     * @param {number} ms - Time between two ticks in ms.
     * @returns {number} Id of the interval, can be passed to GameIntervals.stop.
     */
    static start(callback, ms) {
        let id = setInterval(callback, ms);
        GameIntervals.ids.push(id);
        return id;
    }

    /**
     * Stops a single interval, e.g. a loop that is only needed for a while.
     * @param {number} id - Id returned by GameIntervals.start.
     */
    static stop(id) {
        clearInterval(id);
        GameIntervals.ids = GameIntervals.ids.filter(other => other !== id);
    }

    /**
     * Stops every interval that was started through GameIntervals.
     */
    static stopAll() {
        GameIntervals.ids.forEach(id => clearInterval(id));
        GameIntervals.ids = [];
    }
}
