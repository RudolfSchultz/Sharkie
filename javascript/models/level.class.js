class Level {
    static TILE_WIDTH = 719;   // 720 breite Bilder, 1 px Überlappung gegen Lücken

    constructor({ length, backgroundImages, enemies, coins = [], barriers = [] }) {
        this.level_end_x = length;
        this.enemies = enemies;
        this.coins = coins;
        this.barriers = barriers;
        this.backgroundObjects = this.createBackground(backgroundImages);
        this.boss = enemies.find(enemy => enemy instanceof Endboss);
    }

    /**
     * Repeats the background images until the whole level length is covered.
     */
    createBackground(images) {
        let tiles = [];
        let count = Math.ceil(this.level_end_x / Level.TILE_WIDTH);
        for (let i = 0; i < count; i++) {
            let path = images[i % images.length];
            tiles.push(new BackgroundObjects(path, i * Level.TILE_WIDTH, 0));
        }
        return tiles;
    }
}
