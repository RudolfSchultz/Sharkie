class MovableObject {
    x = 0;
    y = 180;
    img;
    height = 100;
    width = 100;
    speed = 2;
    world;
    imageCache = {};
    otherDirection = false;
    loopFrom = 0;
    loopFrameMs = 100;
    tick = 0;
    offset = { top: 0, right: 0, bottom: 0, left: 0 };

    hitboxLeft() { return this.x + (this.otherDirection ? this.offset.right : this.offset.left); }
    hitboxRight() { return this.x + this.width - (this.otherDirection ? this.offset.left : this.offset.right); }
    hitboxTop() { return this.y + this.offset.top; }
    hitboxBottom() { return this.y + this.height - this.offset.bottom; }

    energy = 100;
    lastHit = 0;

    hit(damage = 5) {
        this.energy = Math.max(0, this.energy - damage);
        this.lastHit = Date.now();
    }

    isHurt() {
        return Date.now() - this.lastHit < 1000;  
    }

    isDead() {
        return this.energy === 0;
    }

    loadimages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        if (this.x + this.width < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (this instanceof Character) {
            if (this.x > 0) this.x -= this.speed;
            this.otherDirection = true;

        } else if (this instanceof PufferFish) {
            this.x -= this.speed;
            if (this.x + this.width < 0) this.respawn();
        }
    }

    moveUp() {
        if (this.y > 0) this.y -= this.speed;
    }

    moveDown() {
        if (this.y + this.height < this.world.canvas.height) {
            this.y += this.speed;
        }
    }

    /**
 * Resets the enemy's position to the right edge with a new random y.
 */
    respawn() {
        this.x = -this.world.kamera_x + this.world.canvas.width;
        this.y = Math.random() * 400;
        this.onRespawn();
    }



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
     */
    frameIndex() {
        let length = this.currentMovement.length;
        if (this.currentImage < length) return this.currentImage;
        let loopLength = length - this.loopFrom;
        return this.loopFrom + (this.currentImage - this.loopFrom) % loopLength;
    }

    isLooping() {
        return this.currentImage >= this.currentMovement.length;
    }


    randomVariant(variants) {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    setCurrentMovement(images, loopFrom = 0, loopFrameMs = 100) {
        if (this.currentMovement === images) return;
        this.currentMovement = images;
        this.loopFrom = loopFrom;
        this.loopFrameMs = loopFrameMs;
        this.currentImage = 0;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof PufferFish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(...this.getHitboxRect());
            ctx.stroke();
        }
    }

    getHitboxRect() {
        return [
            this.hitboxLeft(),
            this.hitboxTop(),
            this.hitboxRight() - this.hitboxLeft(),
            this.hitboxBottom() - this.hitboxTop()
        ];
    }

    isColliding(mo) {
        return (
            this.hitboxRight() > mo.hitboxLeft() &&
            this.hitboxBottom() > mo.hitboxTop() &&
            this.hitboxLeft() < mo.hitboxRight() &&
            this.hitboxTop() < mo.hitboxBottom()
        );
    }


    //no-op Default
    updateState() { }
    onRespawn() { }  


}