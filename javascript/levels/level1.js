const LEVEL1_LENGTH = 4314;   // Levellänge in px – hier änderbar

const level1_backgroundImages = [
    "../img/3. Background/Dark/1.png",
    "../img/3. Background/Dark/2.png",
];

/**
 * Builds level 1 fresh, so every start has the same fixed positions.
 */
function createLevel1() {
    return new Level({
        length: LEVEL1_LENGTH,
        backgroundImages: level1_backgroundImages,
        enemies: [
            new PufferFish({ x: 500, y: 100 }, { x: 800, y: 100 }),    // waagrecht
            new PufferFish({ x: 1200, y: 50 }, { x: 1200, y: 350 }),   // senkrecht
            new PufferFish({ x: 1800, y: 80 }, { x: 2300, y: 350 }),   // diagonal
            new Endboss(LEVEL1_LENGTH),
        ],
        coins: [],      // später: new Coin(x, y), ...
        barriers: [],   // später: new Barrier(x, y), ...
    });
}
