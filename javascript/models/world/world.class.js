/**
 * Runs the game: owns character and level, draws every frame and handles movement and collisions.
 */
class World {
    character = new Character();
    level = createLevel1();
    canvas;
    keyboard;
    bubbles = [];
    cameraX = 0;
    frameId;
    stopped = false;

    /**
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - Current key states.
     */
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
        this.logPositionEvery(10000);
    }

    /**
     * Debug helper: logs the character position at a fixed interval. Remove before hand-in.
     * @param {number} ms - Time between two log lines in ms.
     */
    logPositionEvery(ms) {
        GameIntervals.start(() => console.log(`Character x: ${Math.round(this.character.x)}, y: ${Math.round(this.character.y)}`), ms);
    }

    /**
     * Stops the whole game: all intervals and the draw loop. Call this before showing
     * the end screen or before creating a new World for a restart.
     */
    stop() {
        this.stopped = true;
        GameIntervals.stopAll();
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Draws one frame (world, then HUD) and schedules the next one.
     */
    draw() {
        if (this.stopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawWorld();
        this.drawHud();
        this.frameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws everything that moves with the camera: background, barriers, coins, poison bottles, enemies, character.
     */
    drawWorld() {
        this.ctx.translate(this.cameraX, 0);
        this.level.backgroundObjects.forEach(bgo => this.addToMap(bgo));
        this.level.barriers.forEach(barrier => this.addToMap(barrier));
        this.level.coins.forEach(coin => this.addToMap(coin));
        this.level.poisonBottles.forEach(bottle => this.addToMap(bottle));
        this.level.enemies.forEach(enemy => this.addToMap(enemy));
        this.bubbles.forEach(bubble => this.addToMap(bubble));
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * Draws the fixed HUD; the boss bar appears as soon as the boss is on screen.
     */
    drawHud() {
        if (this.isOnScreen(this.level.boss)) this.bossBar.activate();
        this.playerHud.draw(this.ctx);
        this.bossBar.draw(this.ctx);
    }

    /**
     * @param {MovableObject} mo - Object to check.
     * @returns {boolean} True when the object is at least partly inside the visible area.
     */
    isOnScreen(mo) {
        return mo.x < -this.cameraX + this.canvas.width && mo.x + mo.width > -this.cameraX;
    }

    /**
     * Draws an object, mirrored when it faces the other way.
     * @param {MovableObject} movableObject - Object to draw.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }

        movableObject.draw(this.ctx);

        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
        movableObject.drawFrame(this.ctx);   
    }

    /**
     * Starts the 60 fps loop for movement, coin and poison pickup.
     */
    runGameLogic() {
        GameIntervals.start(() => {
            this.moveCharacter();
            this.moveEnemies();
            this.collectCoins();
            this.collectPoison();
            this.moveBubbles();
            this.removeDeadEnemies();
        }, 1000 / 60);
    }

    /**
     * Moves the character. If the step ends inside a barrier, only the blocked axis is undone,
     * so the character can still slide along a barrier (e.g. swim up while pressing against it).
     */
    moveCharacter() {
        let from = { x: this.character.x, y: this.character.y };
        this.steerCharacter();
        let to = { x: this.character.x, y: this.character.y };
        let free = [to, { x: from.x, y: to.y }, { x: to.x, y: from.y }].find(pos => this.isFree(pos));
        this.placeCharacter(free || from);
        this.character.moveCamera();
    }

    /**
     * @param {{x: number, y: number}} pos - Position to test.
     * @returns {boolean} True when the character would not touch any barrier there.
     */
    isFree(pos) {
        this.placeCharacter(pos);
        return !this.level.barriers.some(barrier => barrier.collidesWith(this.character));
    }

    /**
     * @param {{x: number, y: number}} pos - New position of the character.
     */
    placeCharacter(pos) {
        this.character.x = pos.x;
        this.character.y = pos.y;
    }

    /**
     * Applies the pressed keys to the character, or lets a dead character float up.
     */
    steerCharacter() {
        if (this.character.isDead()) this.character.floatUp();
        else {
            if (this.keyboard.RIGHT) this.character.moveRight();
            if (this.keyboard.UP) this.character.moveUp();
            if (this.keyboard.DOWN) this.character.moveDown();
            if (this.keyboard.LEFT) this.character.moveLeft();
        }
    }

    /**
     * Collects all coins the character touches and removes them from the level.
     */
    collectCoins() {
        if (this.character.isDead()) return;
        let collected = this.level.coins.filter(coin => this.character.isColliding(coin));
        this.character.coins += collected.length;
        this.level.coins = this.level.coins.filter(coin => !collected.includes(coin));
    }

    /**
     * Collects the poison bottles the character touches, as long as the poison is not full.
     * Bottles stay in the level while the poison is full.
     */
    collectPoison() {
        if (this.character.isDead()) return;
        this.level.poisonBottles.forEach(bottle => {
            if (this.character.poison >= Character.MAX_POISON || !this.character.isColliding(bottle)) return;
            this.character.poison++;
            bottle.collected = true;
        });
        this.level.poisonBottles = this.level.poisonBottles.filter(bottle => !bottle.collected);
    }

    /**
     * Moves all bubbles, lets them hit enemies and removes the ones that popped or left the level.
     */
    moveBubbles() {
        this.bubbles.forEach(bubble => {
            bubble.move();
            let enemy = this.level.enemies.find(other => bubble.isColliding(other));
            if (!enemy) return;
            this.damageEnemy(enemy, bubble.type);
            bubble.popped = true;
        });
        this.bubbles = this.bubbles.filter(bubble => !bubble.popped && bubble.x > -bubble.width && bubble.x < this.level.levelEndX);
    }

    /**
     * Hurts all enemies inside an area.
     * @param {{hitboxLeft: function, hitboxRight: function, hitboxTop: function, hitboxBottom: function}} area - Hit area.
     * @param {string} type - Attack type ("slap", "bubble" or "poison").
     */
    attackEnemies(area, type) {
        this.level.enemies.filter(enemy => enemy.isColliding(area)).forEach(enemy => this.damageEnemy(enemy, type));
    }

    /**
     * Applies the damage an attack type does to this enemy; nothing happens if it is immune.
     * @param {MovableObject} enemy - The enemy that was hit.
     * @param {string} type - Attack type ("slap", "bubble" or "poison").
     */
    damageEnemy(enemy, type) {
        let damage = enemy.damageTaken[type];
        if (damage) enemy.hit(damage);
    }

    /**
     * Removes defeated enemies from the level. The boss stays.
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDead() || enemy === this.level.boss);
    }

    /**
     * Moves every enemy one step.
     */
    moveEnemies() {
        this.level.enemies.forEach(enemy => enemy.move());
    }

    /**
     * Gives character and enemies a reference to the world so they can access
     * canvas dimensions and other world data without passing each value manually.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    /**
     * Starts the check for enemy contact (twice per second); each contact hurts the character.
     */
    checkCollisions() {
        GameIntervals.start(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isDead() && this.character.isColliding(enemy)) {
                    this.character.hit(enemy.damage);
                }
            });
        }, 500);
    }
}