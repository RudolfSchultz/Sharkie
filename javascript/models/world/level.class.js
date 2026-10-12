/**
 * Holds everything that belongs to one level: length, background, enemies, coins, poison bottles and barriers.
 */
class Level {
    /**
     * Width of one background tile in px. The images are 720 px wide; 1 px overlap avoids gaps.
     */
    static TILE_WIDTH = 719;

    /**
     * @param {Object} config - Level configuration.
     * @param {number} config.length - Level length in px.
     * @param {string[]} config.backgroundImages - Background images, repeated along the level.
     * @param {MovableObject[]} config.enemies - Enemies, must contain the Endboss.
     * @param {Coin[]} [config.coins=[]] - Collectible coins.
     * @param {Barrier[]} [config.barriers=[]] - Obstacles.
     * @param {PoisonBottle[]} [config.poisonBottles=[]] - Collectible poison bottles.
     */
    constructor({ length, backgroundImages, enemies, coins = [], barriers = [], poisonBottles = [] }) {
        this.levelEndX = length;
        this.enemies = enemies;
        this.coins = coins;
        this.poisonBottles = poisonBottles;
        this.barriers = barriers;
        this.backgroundObjects = this.createBackground(backgroundImages);
        this.boss = enemies.find(enemy => enemy instanceof Endboss);
    }

    /**
     * Repeats the background images until the whole level length is covered.
     * @param {string[]} images - Background image paths.
     * @returns {BackgroundObjects[]} The background tiles.
     */
    createBackground(images) {
        let tiles = [];
        let count = Math.ceil(this.levelEndX / Level.TILE_WIDTH);
        for (let i = 0; i < count; i++) {
            let path = images[i % images.length];
            tiles.push(new BackgroundObjects(path, i * Level.TILE_WIDTH, 0));
        }
        return tiles;
    }
}
