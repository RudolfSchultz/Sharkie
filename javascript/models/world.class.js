class World {
    character = new Character();
    enemies =
        [new PufferFish(),
        new PufferFish(),
        new PufferFish()
        ];
    canvas;
    keyboard;
    backgroundObjects = [
        new BackgroundObjects("../img/3. Background/Dark/1.png")
    ];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.draw();
        this.runGameLogic();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);

        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.backgroundObjects.forEach(bgo => {
            this.addToMap(bgo);
        });

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(movableObbject){
        this.ctx.drawImage(movableObbject.img, movableObbject.x, movableObbject.y, movableObbject.width, movableObbject.height);
    }

    runGameLogic() {
        setInterval(() => {
            this.moveCharacter();
            this.moveEnemies();
        }, 1000 / 60);
    }

    moveCharacter() {
        if (this.keyboard.RIGHT) this.character.moveRight();
        if (this.keyboard.UP) this.character.moveUp();
        if (this.keyboard.DOWN) this.character.moveDown();
        if (this.keyboard.LEFT) this.character.moveLeft();
    }

    moveEnemies() {
        this.enemies.forEach(enemy => enemy.moveLeft());
    }
}