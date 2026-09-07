class MovableObject {
    x = 0;
    y = 180;
    img;
    height = 100;
    width = 100;
    speed = 2;
    world;
    imageCache = {};

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
        }
    }

    moveLeft() {
        if (this instanceof Character) {
            if (this.x > 0) this.x -= this.speed;
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
    }
}