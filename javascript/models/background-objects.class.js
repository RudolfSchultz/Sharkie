class BackgroundObjects extends MovableObject {
    constructor(imagePath, x, y, width, height) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        console.log (`Background object created at x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`);
    }
}