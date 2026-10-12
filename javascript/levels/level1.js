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
 * Layout (5 zones): 1 start 0–1800, 2 jellyfish gates 1800–4000, 3 rock tunnel 4000–6400,
 * 4 deep sea 6400–8800, 5 boss arena 8800–10000.
 * @returns {Level} A new level with enemies, coins, poison bottles and barriers.
 */
function createLevel1() {
    return new Level({
        length: LEVEL1_LENGTH,
        backgroundImages: level1BackgroundImages,
        enemies: createLevel1Enemies(),
        coins: createLevel1Coins(),
        poisonBottles: createLevel1PoisonBottles(),
        barriers: createLevel1Barriers(),
    });
}

/**
 * Pufferfish and jellyfish patrol horizontally, vertically or diagonally between two points.
 * @returns {MovableObject[]} Pufferfish, jellyfish and the Endboss of level 1.
 */
function createLevel1Enemies() {
    return [
        ...createLevel1EasyEnemies(),
        ...createLevel1HardEnemies(),
        new Endboss(LEVEL1_LENGTH),
    ];
}

/**
 * @returns {MovableObject[]} Enemies of zone 1 and 2 (start and jellyfish gates).
 */
function createLevel1EasyEnemies() {
    return [
        new PufferFish({ x: 600, y: 200 }, { x: 900, y: 200 }),
        new PufferFish({ x: 1250, y: 300 }, { x: 1550, y: 300 }),
        new JellyFish({ x: 1950, y: 80 }, { x: 1950, y: 330 }, "Lila"),
        new PufferFish({ x: 2300, y: 110 }, { x: 2600, y: 110 }),
        new JellyFish({ x: 2750, y: 330 }, { x: 2750, y: 80 }, "Yellow"),
        new JellyFish({ x: 3300, y: 100 }, { x: 3600, y: 300 }, "Lila"),
    ];
}

/**
 * @returns {MovableObject[]} Enemies of zone 3 and 4 (rock tunnel and deep sea, dangerous jellyfish).
 */
function createLevel1HardEnemies() {
    return [
        new PufferFish({ x: 4150, y: 230 }, { x: 4580, y: 230 }),
        new JellyFish({ x: 5100, y: 80 }, { x: 5100, y: 330 }, "Yellow"),
        new PufferFish({ x: 5400, y: 300 }, { x: 5700, y: 100 }),
        new JellyFish({ x: 6600, y: 60 }, { x: 6600, y: 340 }, "Green"),
        new JellyFish({ x: 6850, y: 340 }, { x: 6850, y: 60 }, "Pink"),
        new PufferFish({ x: 7450, y: 120 }, { x: 7800, y: 320 }),
        new JellyFish({ x: 8000, y: 100 }, { x: 8300, y: 300 }, "Green"),
    ];
}

/**
 * Coin groups as [x, y] points, from left to right.
 */
const level1CoinPositions = [
    [300, 260], [350, 230], [400, 215], [450, 230], [500, 260],
    [1050, 290], [1110, 270], [1170, 260], [1230, 270],
    [2150, 230], [2200, 230], [2250, 230],
    [2980, 150], [3040, 130], [3100, 150],
    [4100, 270], [4200, 270], [4300, 270], [4400, 270], [4500, 270], [4600, 270], [4700, 270],
    [5250, 120], [5250, 180], [5250, 240],
    [5980, 220], [6080, 195], [6180, 195], [6280, 220],
    [7080, 40], [7150, 30], [7220, 30], [7290, 40],
    [8600, 240], [8650, 240], [8700, 240],
];

/**
 * @returns {Coin[]} The coins of level 1.
 */
function createLevel1Coins() {
    return level1CoinPositions.map(([x, y]) => new Coin(x, y));
}

/**
 * @returns {PoisonBottle[]} The poison bottles of level 1 (the Endboss can only be killed with poison).
 */
function createLevel1PoisonBottles() {
    return [
        new PoisonBottle(1700, 380),
        new PoisonBottle(3480, 390),
        new PoisonBottle(4880, 380),
        new PoisonBottle(6128, 120),
        new PoisonBottle(7620, 400),
        new PoisonBottle(8313, 410),
        new PoisonBottle(8850, 180),
    ];
}

/**
 * @returns {Barrier[]} The barriers of level 1.
 */
function createLevel1Barriers() {
    return [
        new Barrier(1000, 342, 2),
        new Barrier(3000, 203, 3, 1.5),
        new Barrier(4000, 0, 1, 3),
        new Barrier(5900, 273, 2, 1.5),
        new Barrier(7100, 110, 3, 2),
        new Barrier(8450, 342, 2),
    ];
}
