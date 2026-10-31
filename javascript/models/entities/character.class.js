/**
 * The player (Sharkie): animations, swimming, camera follow, death and collected items.
 */
class Character extends MovableObject {

    imagesIdle = MovableObject.framePaths("../img/1.Sharkie/1.IDLE/", 18);

    imagesLongIdle = [
        "../img/1.Sharkie/2.Long_IDLE/i1.png",
        "../img/1.Sharkie/2.Long_IDLE/I2.png",
        "../img/1.Sharkie/2.Long_IDLE/I3.png",
        "../img/1.Sharkie/2.Long_IDLE/I4.png",
        "../img/1.Sharkie/2.Long_IDLE/I5.png",
        "../img/1.Sharkie/2.Long_IDLE/I6.png",
        "../img/1.Sharkie/2.Long_IDLE/I7.png",
        "../img/1.Sharkie/2.Long_IDLE/I8.png",
        "../img/1.Sharkie/2.Long_IDLE/I9.png",
        "../img/1.Sharkie/2.Long_IDLE/I10.png",
        "../img/1.Sharkie/2.Long_IDLE/I11.png",
        "../img/1.Sharkie/2.Long_IDLE/I12.png",
        "../img/1.Sharkie/2.Long_IDLE/I13.png",
        "../img/1.Sharkie/2.Long_IDLE/I14.png"
    ]
    longIdleLoopFrom = 10;
    longIdleLoopFrameMs = 300;

    imagesSwimming = MovableObject.framePaths("../img/1.Sharkie/3.Swim/", 6);

    imagesAttackSlap = MovableObject.framePaths("../img/1.Sharkie/4.Attack/Fin slap/", 8);

    imagesHurtPoisoned = MovableObject.framePaths("../img/1.Sharkie/5.Hurt/1.Poisoned/", 5);

    imagesHurtShocked = MovableObject.framePaths("../img/1.Sharkie/5.Hurt/2.Electric_shock/", 3);

    imagesDeadByPoison = MovableObject.framePaths("../img/1.Sharkie/6.dead/1.Poisoned/", 12);
    deadByPoisonLoopFrom = this.imagesDeadByPoison.length - 1;

    imagesDeadByShock = MovableObject.framePaths("../img/1.Sharkie/6.dead/2.Electro_shock/", 10);
    deadByShockLoopFrom = this.imagesDeadByShock.length - 1;

    imagesAttackBubble = MovableObject.framePaths("../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/", 8);

    offset = { top: 33, right: 10, bottom: 10, left: 10 };
    /**
     * Type of the last hit, "poison" or "shock"; decides hurt and death animation.
     */
    lastHitType = "poison";
    /**
     * Speed in px per game tick of the sinking after an electric shock death.
     */
    static SINK_SPEED = 2;
    /**
     * Current knockback speed in px per game tick (negative = to the left); 0 when not knocked back.
     */
    knockX = 0;
    /**
     * Start speed of the knockback after a hit and the share of it that is kept per game tick.
     */
    static KNOCKBACK_SPEED = 10;
    static KNOCKBACK_DECAY = 0.85;
    currentImage = 0;
    currentMovement;
    world;
    idleSince = null;
    /**
     * Idle time in ms before the long idle animation starts.
     */
    static LONG_IDLE_DELAY_MS = 15 * 1000;
    surfaced = false;
    bobStart = 0;
    /**
     * Height in px of the bobbing after death.
     */
    static BOB_AMPLITUDE = 4;
    /**
     * Maximum number of poison bottles.
     */
    static MAX_POISON = 5;
    poison = 0;
    /**
     * Running attack, "slap" or "bubble"; null when the character is not attacking.
     */
    currentAttack = null;
    /**
     * Distance in px in front of the character that a fin slap reaches.
     */
    static SLAP_RANGE = 70;
    /**
     * Animation frame in which the fin slap hits.
     */
    static SLAP_HIT_FRAME = 4;
    /**
     * Animation frame in which the bubble leaves the mouth.
     */
    static BUBBLE_RELEASE_FRAME = 6;
    coins = 0;
    /**
     * Distance in px the character swims freely before the camera follows.
     */
    static CAMERA_LEAD_X = 150;
    /**
     * Share of the distance the camera catches up per frame.
     */
    static CAMERA_SMOOTHING = 0.2;



    /**
     * Creates the character in idle state and starts its animation.
     */
    constructor() {
        super().loadImage("../img/1.Sharkie/1.IDLE/1.png");
        this.loadAllImages();
        this.setCurrentMovement(this.imagesIdle);
        this.animated();
    }

    /**
     * Preloads all animation frames.
     */
    loadAllImages() {
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesSwimming);
        this.loadImages(this.imagesAttackSlap);
        this.loadImages(this.imagesAttackBubble);
        this.loadImages(this.imagesHurtPoisoned);
        this.loadImages(this.imagesHurtShocked);
        this.loadImages(this.imagesDeadByPoison);
        this.loadImages(this.imagesDeadByShock);
    }

    /**
     * Chooses the current animation.
     */
    updateState() {
        this.whichMovement();
    }

    /**
     * Picks the animation from death, attack, hurt, pressed keys and idle time.
     * An attack wins over the hurt animation, so the character can still fight back right after a hit.
     */
    whichMovement() {
        this.finishAttack();
        if (this.isDead()) this.playDeath();
        else if (this.currentAttack || this.wantsAttack()) this.runAttack();
        else if (this.isHurt()) this.playHurt();
        else if (this.isMoving()) {
            this.idleSince = null;
            this.setCurrentMovement(this.imagesSwimming);
        }
        else this.chooseIdleAnimation();
    }

    /**
     * Takes the damage of an enemy contact, remembers how it hurt (poison or electric shock)
     * and gets pushed away from the enemy. While hurt (1 s after a hit) further contacts do nothing.
     * @param {MovableObject} enemy - The enemy the character touched.
     */
    takeHitFrom(enemy) {
        if (this.isHurt()) return;
        this.lastHitType = enemy.hurtType;
        this.hit(enemy.damage);
        this.knockX = (this.centerX() < enemy.centerX() ? -1 : 1) * Character.KNOCKBACK_SPEED;
    }

    /**
     * Moves the character by the fading knockback, limited to the allowed area of the level.
     */
    applyKnockback() {
        if (Math.abs(this.knockX) < 0.5) {
            this.knockX = 0;
            return;
        }
        let maxX = this.world.level.levelEndX - this.width;
        this.x = Math.min(Math.max(this.world.leftBoundary(), this.x + this.knockX), maxX);
        this.knockX *= Character.KNOCKBACK_DECAY;
    }

    /**
     * Plays the hurt animation that matches the last hit.
     */
    playHurt() {
        this.idleSince = null;
        this.setCurrentMovement(this.lastHitType === "shock" ? this.imagesHurtShocked : this.imagesHurtPoisoned);
    }

    /**
     * Plays the death animation that matches the last hit once and keeps its last frame.
     */
    playDeath() {
        if (this.lastHitType === "shock") this.setCurrentMovement(this.imagesDeadByShock, this.deadByShockLoopFrom);
        else this.setCurrentMovement(this.imagesDeadByPoison, this.deadByPoisonLoopFrom);
    }

    /**
     * Movement after death: poisoned it floats up, shocked it sinks to the ground.
     */
    afterDeath() {
        if (this.lastHitType === "shock") this.sinkDown();
        else this.floatUp();
    }

    /**
     * Waits for the electric shock death animation, then sinks slowly down to the bottom edge.
     */
    sinkDown() {
        if (this.currentMovement !== this.imagesDeadByShock || !this.isLooping()) return;
        let floorY = this.world.canvas.height - this.height;
        this.y = Math.min(floorY, this.y + Character.SINK_SPEED);
    }

    /**
     * @returns {boolean} True while SPACE (fin slap) or A (bubble) is pressed.
     */
    wantsAttack() {
        return this.world.keyboard.SPACE || this.world.keyboard.A;
    }

    /**
     * Ends the running attack once its animation has been played completely.
     */
    finishAttack() {
        if (this.currentAttack && this.isLooping()) this.currentAttack = null;
    }

    /**
     * Starts a new attack when none is running (SPACE has priority over A) and plays its animation once.
     */
    runAttack() {
        if (!this.currentAttack) {
            this.currentAttack = this.world.keyboard.SPACE ? "slap" : "bubble";
            this.currentMovement = null;
        }
        this.idleSince = null;
        this.setCurrentMovement(this.currentAttack === "slap" ? this.imagesAttackSlap : this.imagesAttackBubble);
        this.triggerAttackFrame();
    }

    /**
     * Fires the effect of the attack in its key frame: the slap hits or the bubble is released.
     */
    triggerAttackFrame() {
        let slap = this.currentAttack === "slap";
        if (slap && this.currentImage === Character.SLAP_HIT_FRAME) this.world.attackEnemies(this.slapBox(), "slap");
        if (!slap && this.currentImage === Character.BUBBLE_RELEASE_FRAME) this.shootBubble();
    }

    /**
     * @returns {{hitboxLeft: function, hitboxRight: function, hitboxTop: function, hitboxBottom: function}}
     * Area in front of the character that the fin slap reaches (same shape as a hitbox).
     */
    slapBox() {
        let left = this.otherDirection ? this.hitboxLeft() - Character.SLAP_RANGE : this.hitboxLeft();
        let right = this.otherDirection ? this.hitboxRight() : this.hitboxRight() + Character.SLAP_RANGE;
        return {
            hitboxLeft: () => left,
            hitboxRight: () => right,
            hitboxTop: () => this.hitboxTop(),
            hitboxBottom: () => this.hitboxBottom()
        };
    }

    /**
     * Shoots a bubble in the facing direction. The bubble is poisoned and uses up one poison if available.
     */
    shootBubble() {
        let poisoned = this.poison > 0;
        if (poisoned) this.poison--;
        let direction = this.otherDirection ? -1 : 1;
        let x = direction === 1 ? this.hitboxRight() : this.hitboxLeft() - Bubble.SIZE;
        this.world.bubbles.push(new Bubble(x, this.y + this.height / 2, direction, poisoned));
    }

    /**
     * Moves left by speed and faces left. Stops at the level start, or at the arena start during the boss fight.
     */
    moveLeft() {
        this.x = Math.max(this.world.leftBoundary(), this.x - this.speed);
        this.otherDirection = true;
    }

    /**
     * @returns {boolean} True while a direction key is pressed.
     */
    isMoving() {
        let keyboard = this.world.keyboard;
        return keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN;
    }

    /**
     * Plays the idle animation, or the long idle one after LONG_IDLE_DELAY_MS without input.
     */
    chooseIdleAnimation() {
        if (this.idleSince !== null && Date.now() - this.idleSince >= Character.LONG_IDLE_DELAY_MS) {
            this.setCurrentMovement(this.imagesLongIdle, this.longIdleLoopFrom, this.longIdleLoopFrameMs);
            return;
        }
        if (this.idleSince === null) this.idleSince = Date.now();
        this.setCurrentMovement(this.imagesIdle);
    }

    /**
     * Camera stays put for the first CAMERA_LEAD_X px, then glides after the character.
     * Clamped to the level start and end; during the boss fight it stays on the arena.
     */
    moveCamera() {
        let maxCamera = this.world.level.levelEndX - this.world.canvas.width;
        let minCamera = this.world.bossFight ? maxCamera : 0;
        let target = Math.min(Math.max(minCamera, this.x - Character.CAMERA_LEAD_X), maxCamera);
        this.world.cameraX += (-target - this.world.cameraX) * Character.CAMERA_SMOOTHING;
    }

    /**
     * Waits for the death animation, then floats up to the top edge and bobs gently.
     * The surface is reached when the top of the hitbox touches the top canvas edge;
     * from above the character also sinks down slowly to that point.
     */
    floatUp() {
        if (this.currentMovement !== this.imagesDeadByPoison || !this.isLooping()) return;
        let surfaceY = -this.offset.top;
        if (!this.surfaced) {
            if (Math.abs(this.y - surfaceY) > 0.6) this.y += Math.sign(surfaceY - this.y) * 0.6;
            else {
                this.y = surfaceY;
                this.surfaced = true;
                this.bobStart = Date.now();
            }
        }
        else this.y = surfaceY + (1 - Math.cos((Date.now() - this.bobStart) / 600)) * Character.BOB_AMPLITUDE;
    }
}