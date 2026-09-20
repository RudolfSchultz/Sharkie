const LEVEL1_BACKGROUND_REPEAT_COUNT = 3;   

const level1_backgroundImages = [
    "../img/3. Background/Dark/1.png",
    "../img/3. Background/Dark/2.png",
];

const level1_backgroundObjects = [];
for (let i = 0; i < LEVEL1_BACKGROUND_REPEAT_COUNT; i++) {
    level1_backgroundImages.forEach((path, j) => {
        const tileIndex = i * level1_backgroundImages.length + j;
        level1_backgroundObjects.push(new BackgroundObjects(path, tileIndex * 719, 0));
    });
}

const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new Endboss(),
    ],
    level1_backgroundObjects)