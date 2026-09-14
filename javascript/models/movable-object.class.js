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
        if (this.x + this.width < this.world.canvas.width) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (this instanceof Character) {
            if (this.x > 0) this.x -= this.speed;
            this.otherDirection = true;

        } else {
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
        this.x = this.world.canvas.width;
        this.y = Math.random() * 400;
        this.onRespawn();
    }

    onRespawn() { }   // no-op Default


    animated() {
        setInterval(() => {
            this.updateState();
            let i = this.currentImage % this.currentMovement.length;
            let path = this.currentMovement[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    updateState() { }   // no-op Default

    randomVariant(variants) {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    setCurrentMovement(images) {
        if (this.currentMovement === images) return;
        this.currentMovement = images;
        this.currentImage = 0;
    }
}