/**
 * Collectible poison bottle with a looping wobble animation. Fills up the poison for poisoned bubbles.
 */
class PoisonBottle extends MovableObject {
    imagesWobble = [1, 2, 3, 4, 5, 6, 7, 8].map(i => `../img/4. Marcadores/Posión/Animada/${i}.png`);

    width = 44;
    height = 60;
    offset = { top: 10, right: 6, bottom: 4, left: 6 };
    currentImage = 0;
    currentMovement;

    /**
     * @param {number} x - Left edge in the level.
     * @param {number} y - Top edge in the level.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.imagesWobble[0]);
        this.loadImages(this.imagesWobble);
        this.x = x;
        this.y = y;
        this.animated();
    }

    /**
     * Keeps the wobble animation running.
     */
    updateState() {
        this.setCurrentMovement(this.imagesWobble, 0, 100);
    }
}
