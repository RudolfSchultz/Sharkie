/**
 * Enemy that swims back and forth between two points. Color variant is random.
 */
class PufferFish extends MovableObject {


    imagesGreenSwim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"
    ]

    imagesOrangeSwim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png"
    ]

    imagesRedSwim = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png"
    ]
    offset = { top: 5, right: 5, bottom: 23, left: 0 };
    damageTaken = { slap: 100, bubble: 100, poison: 100 };
    currentImage = 0;
    currentMovement;

    /**
     * @param {{x: number, y: number}} pointA - Start of the patrol path.
     * @param {{x: number, y: number}} pointB - End of the patrol path.
     */
    constructor(pointA, pointB) {
        super();
        this.loadImage("../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.pointA = pointA;
        this.pointB = pointB;
        this.x = pointA.x;
        this.y = pointA.y;
        this.speed = 1 + Math.random() * 1.5;
        this.loadAllImages();
        this.swimImages = this.randomVariant([this.imagesGreenSwim, this.imagesOrangeSwim, this.imagesRedSwim]);
        this.animated();
    }

    /**
     * Patrols between the two points.
     */
    move() {
        this.patrol();
    }

    /**
     * Preloads the swim frames of all color variants.
     */
    loadAllImages() {
        this.loadImages(this.imagesGreenSwim);
        this.loadImages(this.imagesOrangeSwim);
        this.loadImages(this.imagesRedSwim);
    }

    /**
     * Chooses the current animation.
     */
    updateState() {
        this.whichMovement();
    }

    /**
     * Plays the swim animation of the chosen color variant.
     */
    whichMovement() {
        this.setCurrentMovement(this.swimImages);
    }

}