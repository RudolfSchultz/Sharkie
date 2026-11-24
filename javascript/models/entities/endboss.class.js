/**
 * Final enemy, placed at the end of the level. It stays hidden until the character reaches the boss arena,
 * then plays its intro, guards its place and lunges at the character from time to time (more often when enraged).
 * It takes damage from the fin slap, bubbles and poison.
 */
class Endboss extends MovableObject {

    imagesIntro = MovableObject.framePaths("../assets/img/2.Enemy/3 Final Enemy/1.Introduce/", 10);

    imagesFloating = MovableObject.framePaths("../assets/img/2.Enemy/3 Final Enemy/2.floating/", 13);

    imagesAttack = MovableObject.framePaths("../assets/img/2.Enemy/3 Final Enemy/Attack/", 6);

    imagesDead = [
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"
    ]

    imagesHurt = MovableObject.framePaths("../assets/img/2.Enemy/3 Final Enemy/Hurt/", 4);
    /**
     * Hitbox of 260 x 110 px: the body without the dorsal fin. Left and right are equal.
     */
    offset = { top: 150, right: 27.5, bottom: 55, left: 27.5 };
    /**
     * Direct damage per attack type. A poisoned bubble also adds a poison stack (damage over time, see reactTo).
     */
    damageTaken = { slap: 10, bubble: 5, poison: 5 };
    /**
     * Sound names (GameAudio.sounds) played when an attack hurts or defeats the boss.
     */
    hurtSound = "bossDmg";
    deathSound = "bossDead";
    damage = 10;
    /**
     * "hidden" before the boss fight, then "intro", "floating" (guarding its place),
     * "charge" (swimming towards the character), "attack" (bite on the last part of the way)
     * and "returning" (back to its place).
     */
    state = "hidden";
    lastAttack = 0;
    lungeDirection = { x: -1, y: 0 };
    lungeStart = { x: 0, y: 0 };
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
     * Length in px of the whole lunge from the boss's place (swimming, then biting) and maximum distance
     * to the character (center to center) at which a lunge starts.
     */
    static ATTACK_RANGE = 520;
    /**
     * Length in px of the last part of the lunge in which the bite animation is shown.
     * The swimming part is ATTACK_RANGE - BITE_DISTANCE; the boss does not swim if BITE_DISTANCE is at least ATTACK_RANGE.
     */
    static BITE_DISTANCE = 340;
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
        this.loadImage("../assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
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
        this.setCurrentMovement(this.imagesIntro, this.imagesIntro.length - 1);
        this.img = this.imageCache[this.imagesIntro[0]];
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
     * Picks the animation: death, intro, attack, hurt, otherwise floating.
     * Death and attack play once and keep their last frame.
     */
    whichMovement() {
        if (this.isDead()) this.setCurrentMovement(this.imagesDead, this.imagesDead.length - 1);
        else if (this.state === "intro") this.playOnce(this.imagesIntro);
        else if (this.state === "attack") this.setCurrentMovement(this.imagesAttack, this.imagesAttack.length - 1);
        else if (this.isHurt()) this.setCurrentMovement(this.imagesHurt);
        else this.setCurrentMovement(this.imagesFloating);
    }

    /**
     * Plays the intro once, then the boss starts floating.
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
        this.state = this.state === "intro" ? "floating" : "returning";
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
     * The boss only hurts the character through the front half of its hitbox (mouth), not through the rear half (tail fin).
     * @param {MovableObject} character - The character that touches the boss.
     * @returns {boolean} True when the boss is active and the character reaches into the front half of its hitbox.
     */
    hurtsCharacter(character) {
        return this.isActive() && this.overlapsFront(character);
    }

    /**
     * The front is the left half of the hitbox, or the right half when otherDirection is set.
     * @param {MovableObject} mo - Object to test, its hitbox is used.
     * @returns {boolean} True when the hitbox of the object overlaps the front half of the boss hitbox.
     */
    overlapsFront(mo) {
        let left = this.otherDirection ? this.centerX() : this.hitboxLeft();
        let right = this.otherDirection ? this.hitboxRight() : this.centerX();
        return mo.hitboxRight() > left && mo.hitboxLeft() < right
            && mo.hitboxBottom() > this.hitboxTop() && mo.hitboxTop() < this.hitboxBottom();
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
        if (this.isDead()) GameAudio.playOverlapping(this.deathSound);
    }

    /**
     * Moves the boss each game tick: it guards its place and lunges at the character; after death it floats up.
     */
    move() {
        if (this.isDead()) return this.floatUp();
        this.applyPoison();
        if (this.isLunging()) this.lunge();
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
        this.lungeStart = { x: this.x, y: this.y };
        if (Endboss.ATTACK_RANGE > this.attackDistance()) this.state = "charge";
        else this.startBite();
    }

    /**
     * Switches from swimming to biting: plays the attack animation and the bite sound.
     */
    startBite() {
        this.state = "attack";
        this.setCurrentMovement(this.imagesAttack, this.imagesAttack.length - 1);
        this.img = this.imageCache[this.imagesAttack[0]];
        GameAudio.playOverlapping("bossBite");
    }

    /**
     * @returns {boolean} True while the boss swims towards the character or bites.
     */
    isLunging() {
        return this.state === "charge" || this.state === "attack";
    }

    /**
     * @returns {number} Length in px of the biting part at the end of the lunge (BITE_DISTANCE).
     */
    attackDistance() {
        return Endboss.BITE_DISTANCE;
    }

    /**
     * Moves one step along the lunge direction without sliding along edges or barriers.
     * Swimming turns into biting after ATTACK_RANGE - attackDistance px or when the boss is blocked.
     * The bite ends after ATTACK_RANGE px, or when the boss is blocked and the bite animation has played once.
     */
    lunge() {
        let before = { x: this.x, y: this.y };
        this.moveBy(this.lungeDirection.x * Endboss.ATTACK_SPEED, this.lungeDirection.y * Endboss.ATTACK_SPEED, false);
        let stuck = Math.hypot(this.x - before.x, this.y - before.y) < Endboss.ATTACK_SPEED - 0.01;
        let distance = this.lungeDistance();
        if (this.state === "charge" && (stuck || distance >= Endboss.ATTACK_RANGE - this.attackDistance())) this.startBite();
        else if (this.state === "attack" && (distance >= Endboss.ATTACK_RANGE || (stuck && this.isLooping()))) this.endAction();
    }

    /**
     * @returns {number} Straight distance in px between the boss and the point where the lunge started (its place).
     */
    lungeDistance() {
        return Math.hypot(this.x - this.lungeStart.x, this.y - this.lungeStart.y);
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
     * Moves by a step inside the arena; a step into a barrier is not made.
     * With slide the single axes are tried when the whole step is blocked.
     * @param {number} dx - Step in x.
     * @param {number} dy - Step in y.
     * @param {boolean} [slide=true] - True to try the single axes when the whole step is blocked.
     */
    moveBy(dx, dy, slide = true) {
        let from = { x: this.x, y: this.y };
        let steps = slide ? [[dx, dy], [0, dy], [dx, 0]] : [[dx, dy]];
        let moved = steps.some(([stepX, stepY]) => this.tryStep(from, stepX, stepY));
        if (moved) return;
        this.x = from.x;
        this.y = from.y;
    }

    /**
     * Tries one step from a start position.
     * @param {{x: number, y: number}} from - Position before the step.
     * @param {number} dx - Step in x.
     * @param {number} dy - Step in y.
     * @returns {boolean} True when the new position does not overlap a barrier.
     */
    tryStep(from, dx, dy) {
        this.x = from.x + dx;
        this.y = from.y + dy;
        this.stayInArena();
        return !this.touchesBarrier();
    }

    /**
     * @returns {boolean} True when the hitbox of the boss overlaps a barrier.
     */
    touchesBarrier() {
        return this.world.level.barriers.some(barrier => barrier.collidesWith(this));
    }

    /**
     * Keeps the boss image between the left camera edge and the level end, and the hitbox inside the canvas height.
     */
    stayInArena() {
        let minX = this.world.leftBoundary();
        let maxX = this.world.level.levelEndX - this.width;
        let maxY = this.world.canvas.height - this.height + this.offset.bottom;
        this.x = Math.min(Math.max(this.x, minX), maxX);
        this.y = Math.min(Math.max(this.y, -this.offset.top), maxY);
    }
}
