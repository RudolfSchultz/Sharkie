class PufferFish extends MovableObject {

    constructor() {
        super();
        this.loadImage("../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.x = 120;
        this.y = 400;
    }

    jump() {
        console.log("Puffer fish is jumping");
    }

}