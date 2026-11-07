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
    };

    /**
     * Audio elements that were already created, keyed by sound name.
     */
    static cache = {};

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
        let audio = GameAudio.get(name);
        if (!audio.paused) return;
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }

    /**
     * Plays a short effect once on a fresh audio element, so the same effect can overlap itself
     * (e.g. several coins in a row). It is not cached, so it cannot be stopped afterwards.
     * @param {string} name - Key of GameAudio.sounds.
     */
    static playOverlapping(name) {
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
