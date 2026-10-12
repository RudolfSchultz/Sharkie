/**
 * Total length of level 1 in px. Change it here to make the level longer or shorter.
 */
const LEVEL1_LENGTH = 10000;

/**
 * Background tiles of level 1, repeated until the level length is covered.
 */
const level1BackgroundImages = [
    "../img/3. Background/Dark/1.png",
    "../img/3. Background/Dark/2.png",
];

/**
 * Builds level 1 fresh, so every start has the same fixed positions.
 * @returns {Level} A new level with enemies, coins and barriers.
 */
function createLevel1() {
    return new Level({
        length: LEVEL1_LENGTH,
        backgroundImages: level1BackgroundImages,
        enemies: createLevel1Enemies(),
        coins: createLevel1Coins(),
        barriers: createLevel1Barriers(),
    });
}

/**
 * Pufferfish and jellyfish patrol horizontally, vertically or diagonally between two points.
 * @returns {MovableObject[]} Pufferfish, jellyfish and the Endboss of level 1.
 */
function createLevel1Enemies() {
    return [
        new PufferFish({ x: 500, y: 100 }, { x: 800, y: 100 }),
        new JellyFish({ x: 900, y: 120 }, { x: 900, y: 330 }),
        new PufferFish({ x: 1900, y: 50 }, { x: 1900, y: 350 }),
        new PufferFish({ x: 2100, y: 80 }, { x: 2300, y: 350 }),
        new JellyFish({ x: 2000, y: 300 }, { x: 2400, y: 100 }),
        new JellyFish({ x: 2900, y: 120 }, { x: 3000, y: 330 }),
        new Endboss(LEVEL1_LENGTH),
    ];
}

/**
 * @returns {Coin[]} The coins of level 1.
 */
function createLevel1Coins() {
    return [
        new Coin(650, 220), new Coin(700, 200), new Coin(750, 220),
        new Coin(1500, 220), new Coin(1550, 240), new Coin(1600, 220),
    ];
}

/**
 * @returns {Barrier[]} The barriers of level 1.
 */
function createLevel1Barriers() {
    return [
        new Barrier(1000, 0, 1, 3),
        new Barrier(2600, 105, 3, 2),
        new Barrier(3200, 342, 2),
    ];
}
