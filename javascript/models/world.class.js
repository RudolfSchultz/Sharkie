class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    kamera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.runGameLogic();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.kamera_x, 0);

        this.level.backgroundObjects.forEach(bgo => {
            this.addToMap(bgo);
        });

        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.addToMap(this.character);

        this.ctx.translate(-this.kamera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(movableObbject) {
        if (movableObbject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObbject.width, 0);
            this.ctx.scale(-1, 1);
            movableObbject.x = movableObbject.x * -1;
        }
        this.ctx.drawImage(movableObbject.img, movableObbject.x, movableObbject.y, movableObbject.width, movableObbject.height);
        if (movableObbject.otherDirection) {
            movableObbject.x = movableObbject.x * -1;
            this.ctx.restore();
        }
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
        this.character.moveCamera();
    }

    moveEnemies() {
        this.level.enemies.forEach(enemy => enemy.moveLeft());
    }

    /**
     * Gives the character a reference to the world so it can access
     * canvas dimensions and other world data without passing each value manually.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }
}