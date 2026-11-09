/**
 * Central place for all game sounds. Other classes only call GameAudio.play / stop with a sound name,
 * so loading, looping and volume are defined here once.
 */
class GameAudio {
    /**
     * Sound definitions: file, volume (0 to 1) and whether the sound repeats until it is stopped.
     */
    static sounds = {
        intro: { src: "audio/intro.mp3", volume: 0.5, loop: true },
        background: { src: "audio/background.mp3", volume: 0.35, loop: true },
        snoring: { src: "audio/snoring.mp3", volume: 0.7, loop: true },
        bossIntro: { src: "audio/boss-intro.mp3", volume: 0.7, loop: false },
        winner: { src: "audio/winner.mp3", volume: 0.5, loop: true },
        loose: { src: "audio/loose.mp3", volume: 0.5, loop: true },
        coin: { src: "audio/coin.mp3", volume: 0.6, loop: false },
        getDmg: { src: "audio/get-dmg.mp3", volume: 0.7, loop: false },
        electricShock: { src: "audio/electric-shock.mp3", volume: 0.7, loop: false },
        finSlap: { src: "audio/fin-slap.mp3", volume: 0.6, loop: false },
        bubbleShot: { src: "audio/bubble-shot.mp3", volume: 0.5, loop: false },
        poisonBubble: { src: "audio/poison-bubble.mp3", volume: 0.5, loop: false },
        catchJellyfish: { src: "audio/catch-jellyfish.mp3", volume: 0.6, loop: false },
        pufferfishDead: { src: "audio/pufferfish-dead.mp3", volume: 0.6, loop: false },
        bossBite: { src: "audio/boss-bite.mp3", volume: 0.7, loop: false },
        bossDmg: { src: "audio/boss-dmg.mp3", volume: 0.6, loop: false },
        bossDead: { src: "audio/boss-dead.mp3", volume: 0.8, loop: false },
    };

    /**
     * Audio elements that were already created, keyed by sound name.
     */
    static cache = {};

    /**
     * Key under which the mute state is stored in the localStorage.
     */
    static STORAGE_KEY = "sharkieMuted";

    /**
     * True while all sounds are switched off; restored from the localStorage.
     */
    static muted = GameAudio.loadMuted();

    /**
     * @returns {boolean} The stored mute state; false when nothing is stored or the storage is not available.
     */
    static loadMuted() {
        try {
            return localStorage.getItem(GameAudio.STORAGE_KEY) === "true";
        } catch {
            return false;
        }
    }

    /**
     * Switches all sounds on or off and stores the choice. Muting stops everything that is playing.
     * @param {boolean} muted - True to mute.
     */
    static setMuted(muted) {
        GameAudio.muted = muted;
        try {
            localStorage.setItem(GameAudio.STORAGE_KEY, String(muted));
        } catch { }
        if (muted) GameAudio.stopAll();
    }

    /**
     * @param {string} name - Key of GameAudio.sounds.
     * @returns {HTMLAudioElement} The audio element of the sound (created on first use).
     */
    static get(name) {
        if (!GameAudio.cache[name]) GameAudio.cache[name] = GameAudio.create(GameAudio.sounds[name]);
        return GameAudio.cache[name];
    }

    /**
     * @param {{src: string, volume: number, loop: boolean}} definition - Entry of GameAudio.sounds.
     * @returns {HTMLAudioElement} A configured audio element.
     */
    static create(definition) {
        let audio = new Audio(definition.src);
        audio.volume = definition.volume;
        audio.loop = definition.loop;
        return audio;
    }

    /**
     * Starts a sound from the beginning; does nothing while it is already playing.
     * The browser may refuse sound before the first click or key press, this is ignored on purpose.
     * @param {string} name - Key of GameAudio.sounds.
     */
    static play(name) {
        if (GameAudio.muted) return;
        let audio = GameAudio.get(name);
        if (!audio.paused) return;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }

    /**
     * Plays a short effect once on a fresh audio element, so the same effect can overlap itself
     * (e.g. several coins in a row). It is not cached, so it cannot be stopped afterwards.
     * Unknown or empty names are ignored.
     * @param {string} name - Key of GameAudio.sounds.
     */
    static playOverlapping(name) {
        if (GameAudio.muted || !GameAudio.sounds[name]) return;
        GameAudio.create(GameAudio.sounds[name]).play().catch(() => { });
    }

    /**
     * Stops one sound and rewinds it.
     * @param {string} name - Key of GameAudio.sounds.
     */
    static stop(name) {
        let audio = GameAudio.cache[name];
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    }

    /**
     * Stops every sound (restart, back to home, end screen).
     */
    static stopAll() {
        Object.keys(GameAudio.cache).forEach(name => GameAudio.stop(name));
    }
}
