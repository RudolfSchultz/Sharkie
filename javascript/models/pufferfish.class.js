class PufferFish extends MovableObject {


    Images_Green_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]

        Images_Orange_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]

        Images_Red_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]

    currentImage = 0;
    currentMovement;

    constructor() {
        super();
        this.loadImage("../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.x = 640;
        this.y = 0 + Math.random() * 400; // Random y position between 0 and 400
        this.speed = 1 + Math.random() * 2; // Random speed between 1 and 3
        this.loadAllImages();
        this.setCurrentMovement(this.Images_Green_Swim);
        this.animated();
    }

    loadAllImages() {
        this.loadimages(this.Images_Green_Swim);
        this.loadimages(this.Images_Orange_Swim);
        this.loadimages(this.Images_Red_Swim);
    }

    jump() {
        console.log("Puffer fish is jumping");
    }

}