class Level {
    enemies;
    backgroundObjects;
    level_end_x;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        const last = backgroundObjects[backgroundObjects.length - 1];
        this.level_end_x = last.x + last.width;
    }
}