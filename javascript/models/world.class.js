class World {
    character = new Character();
    level = createLevel1();
    canvas;
    keyboard;
    kamera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.playerHud = new PlayerHud(this.character, canvas.width);
        this.bossBar = new BossBar(this.level.boss, canvas.width, canvas.height);
        this.setWorld();
        this.draw();
        this.runGameLogic();
        this.checkCollisions();
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

        if (this.isOnScreen(this.level.boss)) this.bossBar.activate();
        this.playerHud.draw(this.ctx);
        this.bossBar.draw(this.ctx);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    isOnScreen(mo) {
        return mo.x < -this.kamera_x + this.canvas.width && mo.x + mo.width > -this.kamera_x;
    }

    addToMap(movableObbject) {
        if (movableObbject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObbject.width, 0);
            this.ctx.scale(-1, 1);
            movableObbject.x = movableObbject.x * -1;
        }

        movableObbject.draw(this.ctx);

        if (movableObbject.otherDirection) {
            movableObbject.x = movableObbject.x * -1;
            this.ctx.restore();
        }
        movableObbject.drawFrame(this.ctx);   
    }

    runGameLogic() {
        setInterval(() => {
            this.moveCharacter();
            this.moveEnemies();
        }, 1000 / 60);
    }

    moveCharacter() {
        if (this.character.isDead()) this.character.floatUp();
        else {
            if (this.keyboard.RIGHT) this.character.moveRight();
            if (this.keyboard.UP) this.character.moveUp();
            if (this.keyboard.DOWN) this.character.moveDown();
            if (this.keyboard.LEFT) this.character.moveLeft();
        }
        this.character.moveCamera();
    }

    moveEnemies() {
        this.level.enemies.forEach(enemy => enemy.move());
    }

    /**
     * Gives the character a reference to the world so it can access
     * canvas dimensions and other world data without passing each value manually.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isDead() && this.character.isColliding(enemy)) {
                    this.character.hit();
                }
            });
        }, 500);
    }
}