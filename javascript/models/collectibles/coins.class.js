/**
 * Collectible coin with a looping spin animation.
 */
class Coin extends MovableObject {
    imagesSpin = [
        "../img/4. Marcadores/1. Coins/1.png",
        "../img/4. Marcadores/1. Coins/2.png",
        "../img/4. Marcadores/1. Coins/3.png",
        "../img/4. Marcadores/1. Coins/4.png"
    ]

    width = 40;
    height = 40;
    loopFrameMs = 200;
    currentImage = 0;
    currentMovement;

    /**
     * @param {number} x - Left edge in the level.
     * @param {number} y - Top edge in the level.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.imagesSpin[0]);
        this.loadImages(this.imagesSpin);
        this.x = x;
        this.y = y;
        this.animated();
    }

    /**
     * Keeps the spin animation running.
     */
    updateState() {
        this.setCurrentMovement(this.imagesSpin, 0, 200);
    }
}
