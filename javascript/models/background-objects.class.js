class BackgroundObjects extends MovableObject {
height = world.canvas.height;
width = world.canvas.width;
with = 720;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        
    }

}