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
    offset = { top: 5, right: 5, bottom: 23, left: 0 };
    currentImage = 0;
    currentMovement;

    constructor(pointA, pointB) {
        super();
        this.loadImage("../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.pointA = pointA;
        this.pointB = pointB;
        this.x = pointA.x;
        this.y = pointA.y;
        this.speed = 1 + Math.random() * 1.5;
        this.loadAllImages();
        this.swimImages = this.randomVariant([this.Images_Green_Swim, this.Images_Orange_Swim, this.Images_Red_Swim]);
        this.animated();
    }

    move() {
        this.patrol();
    }

    loadAllImages() {
        this.loadimages(this.Images_Green_Swim);
        this.loadimages(this.Images_Orange_Swim);
        this.loadimages(this.Images_Red_Swim);
    }

    updateState() {
        this.whichMovement();
    }

    whichMovement() {
        this.setCurrentMovement(this.swimImages);
    }

}