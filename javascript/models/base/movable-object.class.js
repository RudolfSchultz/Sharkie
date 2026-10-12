/**
 * Base class for everything that is drawn in the world: position, image handling,
 * frame animation, hitbox, collision and damage.
 */
class MovableObject {
    x = 0;
    y = 180;
    img;
    height = 100;
    width = 100;
    speed = 10;
    world;
    imageCache = {};
    otherDirection = false;
    loopFrom = 0;
    loopFrameMs = 100;
    tick = 0;
    movingToB = true;
    offset = { top: 0, right: 0, bottom: 0, left: 0 };

    /**
     * @returns {number} Left edge of the hitbox (mirrored when facing the other way).
     */
    hitboxLeft() { return this.x + (this.otherDirection ? this.offset.right : this.offset.left); }
    /**
     * @returns {number} Right edge of the hitbox (mirrored when facing the other way).
     */
    hitboxRight() { return this.x + this.width - (this.otherDirection ? this.offset.left : this.offset.right); }
    /**
     * @returns {number} Top edge of the hitbox.
     */
    hitboxTop() { return this.y + this.offset.top; }
    /**
     * @returns {number} Bottom edge of the hitbox.
     */
    hitboxBottom() { return this.y + this.height - this.offset.bottom; }

    energy = 100;
    /**
     * Damage per attack type ("slap", "bubble", "poison") this object takes; missing types do no damage.
     */
    damageTaken = {};
    lastHit = 0;

    /**
     * Reduces the energy (not below 0) and remembers the time of the hit.
     * @param {number} [damage=5] - Energy to subtract.
     */
    hit(damage = 5) {
        this.energy = Math.max(0, this.energy - damage);
        this.lastHit = Date.now();
    }

    /**
     * @returns {boolean} True for one second after the last hit.
     */
    isHurt() {
        return Date.now() - this.lastHit < 1000;  
    }

    /**
     * @returns {boolean} True when no energy is left.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Preloads several images into the image cache, keyed by their path.
     * @param {string[]} arr - Image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Loads a single image as the current image.
     * @param {string} path - Image path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Moves right by speed, limited by the level end, and faces right.
     */
    moveRight() {
        if (this.x + this.width < this.world.level.levelEndX) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * Moves left by speed, limited by the level start, and faces left.
     */
    moveLeft() {
        if (this.x > 0) this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Moves up by speed, limited by the top canvas edge.
     */
    moveUp() {
        if (this.y > 0) this.y -= this.speed;
    }

    /**
     * Moves down by speed, limited by the bottom canvas edge.
     */
    moveDown() {
        if (this.y + this.height < this.world.canvas.height) {
            this.y += this.speed;
        }
    }

    /**
     * Moves straight towards the current target point and turns around on arrival.
     * The sprites look to the left, so the image is mirrored while swimming to the right.
     */
    patrol() {
        let target = this.movingToB ? this.pointB : this.pointA;
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let distance = Math.hypot(dx, dy);
        if (distance <= this.speed) return this.reachTarget(target);
        this.x += dx / distance * this.speed;
        this.y += dy / distance * this.speed;
        if (dx !== 0) this.otherDirection = dx > 0;
    }



    /**
     * Snaps to the target point and turns around to the other one.
     * @param {{x: number, y: number}} target - The point that was reached.
     */
    reachTarget(target) {
        this.x = target.x;
        this.y = target.y;
        this.movingToB = !this.movingToB;
    }

    /**
     * Starts the animation loop: updates the state and shows the next frame every 100 ms.
     */
    animated() {
        setInterval(() => {
            this.updateState();
            this.tick++;
            if (this.isLooping() && this.tick % (this.loopFrameMs / 100) !== 0) return;
            let path = this.currentMovement[this.frameIndex()];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    /**
     * First pass plays all frames, afterwards only frames from loopFrom on repeat.
     * @returns {number} Index of the frame to show in the current animation.
     */
    frameIndex() {
        let length = this.currentMovement.length;
        if (this.currentImage < length) return this.currentImage;
        let loopLength = length - this.loopFrom;
        return this.loopFrom + (this.currentImage - this.loopFrom) % loopLength;
    }

    /**
     * @returns {boolean} True once the first pass of the current animation is finished.
     */
    isLooping() {
        return this.currentImage >= this.currentMovement.length;
    }


    /**
     * Picks a random entry.
     * @param {Array} variants - Possible values.
     * @returns {*} One random entry of the array.
     */
    randomVariant(variants) {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    /**
     * Switches to another animation; does nothing if it is already playing.
     * @param {string[]} images - Frame paths of the animation.
     * @param {number} [loopFrom=0] - Frame index the loop restarts from after the first pass.
     * @param {number} [loopFrameMs=100] - Duration of one frame while looping, in ms.
     */
    setCurrentMovement(images, loopFrom = 0, loopFrameMs = 100) {
        if (this.currentMovement === images) return;
        this.currentMovement = images;
        this.loopFrom = loopFrom;
        this.loopFrameMs = loopFrameMs;
        this.currentImage = 0;
    }

    /**
     * Draws the current image at the object's position.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Debug helper: outlines the hitbox of characters and enemies.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof PufferFish || this instanceof JellyFish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(...this.getHitboxRect());
            ctx.stroke();
        }
    }

    /**
     * @returns {number[]} Hitbox as [x, y, width, height].
     */
    getHitboxRect() {
        return [
            this.hitboxLeft(),
            this.hitboxTop(),
            this.hitboxRight() - this.hitboxLeft(),
            this.hitboxBottom() - this.hitboxTop()
        ];
    }

    /**
     * Checks whether the hitboxes of two objects overlap.
     * @param {MovableObject} mo - The other object.
     * @returns {boolean} True on overlap.
     */
    isColliding(mo) {
        return (
            this.hitboxRight() > mo.hitboxLeft() &&
            this.hitboxBottom() > mo.hitboxTop() &&
            this.hitboxLeft() < mo.hitboxRight() &&
            this.hitboxTop() < mo.hitboxBottom()
        );
    }


    /**
     * Hook for subclasses: chooses the current animation. No-op by default.
     */
    updateState() { }
    /**
     * Hook for subclasses: moves the object each game tick. No-op by default.
     */
    move() { }  


}