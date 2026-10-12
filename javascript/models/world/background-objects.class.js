/**
 * One background tile of the level.
 */
class BackgroundObjects extends MovableObject {
    width = 720;
    height = 480;

    /**
     * @param {string} imagePath - Image of the tile.
     * @param {number} x - Left edge in the level.
     * @param {number} y - Top edge in the level.
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}