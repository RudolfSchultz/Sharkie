class MovableObject {
    x = 0;
    y = 180;
    img;
    height = 100;
    width = 100;
    speed = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        if (this.world.height > 0) this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }
}