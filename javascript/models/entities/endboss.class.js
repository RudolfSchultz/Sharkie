/**
 * Final enemy, placed at the end of the level. It stays hidden until the character reaches the boss arena,
 * then plays its intro, guards its place and lunges at the character from time to time (more often when enraged).
 * Only poisoned bubbles hurt it.
 */
class Endboss extends MovableObject {


    imagesIntro = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png"
    ]

    imagesFloating = [
        "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/13.png"
    ]

    imagesAttack = [
        "../img/2.Enemy/3 Final Enemy/Attack/1.png",
        "../img/2.Enemy/3 Final Enemy/Attack/2.png",
        "../img/2.Enemy/3 Final Enemy/Attack/3.png",
        "../img/2.Enemy/3 Final Enemy/Attack/4.png",
        "../img/2.Enemy/3 Final Enemy/Attack/5.png",
        "../img/2.Enemy/3 Final Enemy/Attack/6.png"
    ]

    imagesDead = [
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"
    ]

    imagesHurt = [
        "../img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/4.png"
    ]
    /**
     * Hitbox of 260 x 110 px: the body without the dorsal fin.
     */
    offset = { top: 150, right: 30, bottom: 55, left: 25 };
    /**
     * Direct damage per attack type. A poisoned bubble also adds a poison stack (damage over time, see reactTo).
     */
    damageTaken = { slap: 10, bubble: 5, poison: 5 };
    damage = 10;
    /**
     * "hidden" before the boss fight, then "intro", "floating" (guarding its place),
     * "attack" (lunge) and "returning" (back to its place after a lunge).
     */
    state = "hidden";
    lastAttack = 0;
    lungeDirection = { x: -1, y: 0 };
    poisonStacks = 0;
    lastPoisonTick = 0;
    lastPoisonDamage = 0;
    currentImage = 0;
    currentMovement;
    /**
     * Width and height in px.
     */
    static SIZE = 315;
    /**
     * Gap in px between boss and level end.
     */
    static SPAWN_GAP = 30;
    /**
     * Distance in px (center to center) from which the boss starts a lunge; covers the whole arena from its place.
     */
    static ATTACK_RANGE = 520;
    /**
     * Minimum time in ms between two lunges, normally and while enraged.
     */
    static ATTACK_COOLDOWN_MS = 2500;
    static RAGE_ATTACK_COOLDOWN_MS = 1200;
    /**
     * Speed in px per game tick while lunging and while swimming back to its place.
     */
    static ATTACK_SPEED = 6;
    static RETURN_SPEED = 2;
    /**
     * At or below this energy the boss is enraged and lunges more often (RAGE_ATTACK_COOLDOWN_MS).
     */
    static RAGE_ENERGY = 50;
    /**
     * Poison: 1 damage every POISON_TICK_MS per stack count, e.g. 1 stack = every 5 s, 5 stacks = every second.
     */
    static MAX_POISON_STACKS = 5;
    static POISON_TICK_MS = 5000;
    /**
     * Speed in px per game tick of the dead boss floating up.
     */
    static DEAD_FLOAT_SPEED = 0.6;

    /**
     * @param {number} levelLength - Level length in px, used to place the boss at the end.
     */
    constructor(levelLength) {
        super();
        this.loadImage("../img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
        this.width = Endboss.SIZE;
        this.height = Endboss.SIZE;
        this.home = { x: levelLength - this.width - Endboss.SPAWN_GAP, y: (480 - this.height) / 2 };
        this.x = this.home.x;
        this.y = this.home.y;
        this.loadAllImages();
        this.setCurrentMovement(this.imagesIntro);
        this.animated();
    }

    /**
     * Preloads all animation frames.
     */
    loadAllImages() {
        this.loadImages(this.imagesIntro);
        this.loadImages(this.imagesFloating);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
    }

    /**
     * Starts the boss fight: the boss shows up with its intro animation (only once).
     */
    appear() {
        if (this.state !== "hidden") return;
        this.state = "intro";
        this.lastAttack = Date.now();
    }

    /**
     * @returns {boolean} True once the boss fight has started.
     */
    hasAppeared() {
        return this.state !== "hidden";
    }

    /**
     * @returns {boolean} True when the boss can hurt and be hurt: after its intro and while alive.
     */
    isActive() {
        return !this.isDead() && this.state !== "hidden" && this.state !== "intro";
    }

    /**
     * @returns {boolean} True while enraged (energy at or below RAGE_ENERGY).
     */
    isEnraged() {
        return this.energy <= Endboss.RAGE_ENERGY;
    }

    /**
     * Draws the boss only after it has appeared.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    draw(ctx) {
        if (this.hasAppeared()) super.draw(ctx);
    }

    /**
     * Chooses the current animation.
     */
    updateState() {
        this.whichMovement();
    }

    /**
     * Picks the animation: death, then intro or attack (never interrupted), then hurt, otherwise floating.
     * The dead boss keeps its last frame.
     */
    whichMovement() {
        if (this.isDead()) this.setCurrentMovement(this.imagesDead, this.imagesDead.length - 1);
        else if (this.state === "intro") this.playOnce(this.imagesIntro);
        else if (this.state === "attack") this.playOnce(this.imagesAttack);
        else if (this.isHurt()) this.setCurrentMovement(this.imagesHurt);
        else this.setCurrentMovement(this.imagesFloating);
    }

    /**
     * Plays intro or attack once, then continues with the next state.
     * @param {string[]} images - Frames of the animation.
     */
    playOnce(images) {
        this.setCurrentMovement(images, images.length - 1);
        if (this.isLooping()) this.endAction();
    }

    /**
     * After a lunge the boss swims back to its place, after the intro it floats. The attack cooldown starts now.
     */
    endAction() {
        this.state = this.state === "attack" ? "returning" : "floating";
        this.lastAttack = Date.now();
    }

    /**
     * Called by the world for every attack that hits the boss: a poisoned bubble adds a poison stack.
     * @param {string} type - Attack type ("slap", "bubble" or "poison").
     */
    reactTo(type) {
        if (type !== "poison" || this.isDead()) return;
        if (this.poisonStacks === 0) this.lastPoisonTick = Date.now();
        this.poisonStacks = Math.min(Endboss.MAX_POISON_STACKS, this.poisonStacks + 1);
    }

    /**
     * Takes 1 poison damage once the tick time (POISON_TICK_MS divided by the stacks) has passed.
     * Poison damage does not play the hurt animation.
     */
    applyPoison() {
        if (this.poisonStacks === 0) return;
        if (Date.now() - this.lastPoisonTick < Endboss.POISON_TICK_MS / this.poisonStacks) return;
        this.lastPoisonTick = Date.now();
        this.lastPoisonDamage = this.lastPoisonTick;
        this.loseEnergy(1);
    }

    /**
     * Moves the boss each game tick: it guards its place and lunges at the character; after death it floats up.
     */
    move() {
        if (this.isDead()) return this.floatUp();
        this.applyPoison();
        if (this.state === "attack") this.lunge();
        else if (this.state === "returning") this.returnHome();
        else if (this.state === "floating") this.attackIfReady(this.faceCharacter());
    }

    /**
     * Lets the dead boss float up until its hitbox touches the top edge.
     */
    floatUp() {
        this.y = Math.max(-this.offset.top, this.y - Endboss.DEAD_FLOAT_SPEED);
    }

    /**
     * Turns towards the character.
     * @returns {{dx: number, dy: number, distance: number}} Vector and distance to the character (center to center).
     */
    faceCharacter() {
        let dx = this.world.character.centerX() - this.centerX();
        let dy = this.world.character.centerY() - this.centerY();
        this.otherDirection = dx > 0;
        return { dx, dy, distance: Math.hypot(dx, dy) };
    }

    /**
     * @returns {number} Minimum time in ms between two lunges; shorter while enraged.
     */
    attackCooldown() {
        return this.isEnraged() ? Endboss.RAGE_ATTACK_COOLDOWN_MS : Endboss.ATTACK_COOLDOWN_MS;
    }

    /**
     * Starts a lunge towards the character when it is in range and the cooldown is over.
     * @param {{dx: number, dy: number, distance: number}} target - Result of faceCharacter.
     */
    attackIfReady(target) {
        if (target.distance === 0 || target.distance >= Endboss.ATTACK_RANGE) return;
        if (Date.now() - this.lastAttack < this.attackCooldown()) return;
        this.lungeDirection = { x: target.dx / target.distance, y: target.dy / target.distance };
        this.state = "attack";
    }

    /**
     * Shoots towards the point where the character was when the attack started.
     */
    lunge() {
        this.moveBy(this.lungeDirection.x * Endboss.ATTACK_SPEED, this.lungeDirection.y * Endboss.ATTACK_SPEED);
    }

    /**
     * Swims back to its place after a lunge.
     */
    returnHome() {
        let dx = this.home.x - this.x;
        let dy = this.home.y - this.y;
        let distance = Math.hypot(dx, dy);
        if (distance <= Endboss.RETURN_SPEED) return this.arriveHome();
        this.otherDirection = dx > 0;
        this.moveBy(dx / distance * Endboss.RETURN_SPEED, dy / distance * Endboss.RETURN_SPEED);
    }

    /**
     * Ends the way back: snaps to the place and floats again.
     */
    arriveHome() {
        this.x = this.home.x;
        this.y = this.home.y;
        this.state = "floating";
    }

    /**
     * Moves by a step and keeps the boss inside the arena.
     * @param {number} dx - Step in x.
     * @param {number} dy - Step in y.
     */
    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.stayInArena();
    }

    /**
     * Keeps the boss inside the arena (from the arena start to the level end) and inside the canvas height.
     */
    stayInArena() {
        let minX = this.world.leftBoundary() - this.offset.left;
        let maxX = this.world.level.levelEndX - this.width;
        let maxY = this.world.canvas.height - this.height + this.offset.bottom;
        this.x = Math.min(Math.max(this.x, minX), maxX);
        this.y = Math.min(Math.max(this.y, -this.offset.top), maxY);
    }
}
