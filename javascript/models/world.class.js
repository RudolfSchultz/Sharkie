class World {
    character = new Character();
    enemies =
        [new PufferFish(),
        new PufferFish(),
        new PufferFish()
        ];
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.draw();
        this.runGameLogic();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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