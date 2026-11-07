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
     * True once the character has reached the boss arena; from then on it cannot swim back.
     */
    bossFight = false;
    /**
     * Time in ms between the death of the character or the boss and the end screen.
     */
    static END_DELAY_MS = 2500;

    /**
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - Current key states.
     * @param {function(boolean): void} onEnd - Called once when the game is over, with true on a win.
     */
    constructor(canvas, keyboard, onEnd) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.onEnd = onEnd;
        this.playerHud = new PlayerHud(this.character, canvas.width);
        this.bossBar = new BossBar(this.level.boss, canvas.width, canvas.height);
        this.setWorld();
        this.draw();
        this.runGameLogic();
        this.checkCollisions();
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
     * Draws the fixed HUD; the boss bar appears together with the boss.
     */
    drawHud() {
        if (this.level.boss.hasAppeared()) this.bossBar.activate();
        this.playerHud.draw(this.ctx);
        this.bossBar.draw(this.ctx);
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
            this.checkBossFight();
            this.checkGameEnd();
        }, 1000 / 60);
    }

    /**
     * Starts the boss fight once the camera has reached the arena at the level end.
     */
    checkBossFight() {
        let arenaTriggerX = this.level.levelEndX - this.canvas.width + Character.CAMERA_LEAD_X;
        if (this.bossFight || this.character.x < arenaTriggerX) return;
        this.bossFight = true;
        this.level.boss.appear();
        GameAudio.play("bossIntro");
    }

    /**
     * @returns {number} Smallest x the character may swim to: the level start, or the arena start during the boss fight.
     */
    leftBoundary() {
        return this.bossFight ? this.level.levelEndX - this.canvas.width : 0;
    }

    /**
     * Ends the game a moment after the character (lost) or the boss (won) has died.
     */
    checkGameEnd() {
        if (this.isDeadFor(this.character, World.END_DELAY_MS)) this.end(false);
        else if (this.isDeadFor(this.level.boss, World.END_DELAY_MS)) this.end(true);
    }

    /**
     * @param {MovableObject} mo - Character or boss.
     * @param {number} ms - Time in ms.
     * @returns {boolean} True when the object died at least ms ago.
     */
    isDeadFor(mo, ms) {
        return mo.isDead() && Date.now() - mo.diedAt >= ms;
    }

    /**
     * Stops the game and reports the result (only once).
     * @param {boolean} won - True when the boss was defeated.
     */
    end(won) {
        if (this.stopped) return;
        this.stop();
        this.onEnd(won);
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
     * Applies the knockback and the pressed keys to the character, or lets a dead character float up or sink down.
     */
    steerCharacter() {
        if (this.character.isDead()) this.character.afterDeath();
        else {
            this.character.applyKnockback();
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
        collected.forEach(() => GameAudio.playOverlapping("coin"));
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
            let enemy = this.level.enemies.find(other => other.isActive() && bubble.isColliding(other));
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
        this.level.enemies
            .filter(enemy => enemy.isActive() && enemy.isColliding(area))
            .forEach(enemy => this.damageEnemy(enemy, type));
    }

    /**
     * Applies the damage an attack type does to this enemy (nothing if it is immune) and lets the enemy react to it.
     * @param {MovableObject} enemy - The enemy that was hit.
     * @param {string} type - Attack type ("slap", "bubble" or "poison").
     */
    damageEnemy(enemy, type) {
        let damage = enemy.damageTaken[type];
        if (damage) enemy.hit(damage);
        if (enemy.reactTo) enemy.reactTo(type);
    }

    /**
     * Removes defeated enemies from the level once their death animation is over. The boss is never removable.
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.removable);
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
     * Starts the check for enemy contact (twice per second); each contact with an active enemy hurts the character.
     */
    checkCollisions() {
        GameIntervals.start(() => {
            this.level.enemies.forEach(enemy => {
                if (!this.character.isDead() && enemy.isActive() && this.character.isColliding(enemy)) {
                    this.character.takeHitFrom(enemy);
                }
            });
        }, 500);
    }
}