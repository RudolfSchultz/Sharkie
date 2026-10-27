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

    imagesTransitionGreen = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png"
    ]

    imagesTransitionOrange = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png"
    ]

    imagesTransitionRed = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png"
    ]

    imagesBubbleSwimGreen = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/1.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/1.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/1.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/1.bubbleswim4.png"
    ]

    imagesBubbleSwimOrange = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/2.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/2.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/2.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/2.bubbleswim4.png"
    ]

    imagesBubbleSwimRed = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/3.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/3.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/3.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleswim/3.bubbleswim4.png"
    ]

    imagesDeadGreen = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png", 
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png"
    ]

    imagesDeadOrange = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png", 
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"
    ]

    imagesDeadRed = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png", 
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"
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