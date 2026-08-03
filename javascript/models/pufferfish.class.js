class PufferFish extends MovableObject {

    constructor() {
        super();
        this.loadImage("../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.x = 640;
        this.y = 0 + Math.random() * 400; // Random y position between 0 and 400
    }

    jump() {
        console.log("Puffer fish is jumping");
    }

}