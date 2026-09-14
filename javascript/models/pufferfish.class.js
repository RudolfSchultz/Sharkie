class PufferFish extends MovableObject {


    Images_Green_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]

    Images_Orange_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png"
    ]

    Images_Red_Swim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png"
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
        this.onRespawn();
        this.animated();
    }

    loadAllImages() {
        this.loadimages(this.Images_Green_Swim);
        this.loadimages(this.Images_Orange_Swim);
        this.loadimages(this.Images_Red_Swim);
    }

    onRespawn() {
        this.swimImages = this.randomVariant([this.Images_Green_Swim, this.Images_Orange_Swim, this.Images_Red_Swim]);
    }

    updateState() {
        this.whichMovement();
    }

    whichMovement() {
        this.setCurrentMovement(this.swimImages);
    }

}