/**
 * Final enemy, placed at the end of the level.
 */
class Endboss extends MovableObject {


    imagesIntro = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png"
    ]

    imagesFloating = [
        "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/13.png"
    ]

    imagesAttack = [
        "../img/2.Enemy/3 Final Enemy/Attack/1.png",
        "../img/2.Enemy/3 Final Enemy/Attack/2.png",
        "../img/2.Enemy/3 Final Enemy/Attack/3.png",
        "../img/2.Enemy/3 Final Enemy/Attack/4.png",
        "../img/2.Enemy/3 Final Enemy/Attack/5.png",
        "../img/2.Enemy/3 Final Enemy/Attack/6.png"
    ]

    imagesDead = [
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"
    ]

    imagesHurt = [
        "../img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/4.png"
    ]
    offset = { top: 100, right: 10, bottom: 40, left: 10 };
    damageTaken = { poison: 20 };
    currentImage = 0;
    currentMovement;
    /**
     * Gap in px between boss and level end.
     */
    static SPAWN_GAP = 30;   

    /**
     * @param {number} levelLength - Level length in px, used to place the boss at the end.
     */
    constructor(levelLength) {
        super();
        this.loadImage("../img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
        this.height = 350;
        this.width = 350;
        this.x = levelLength - this.width - Endboss.SPAWN_GAP;
        this.y = (480 - this.height) / 2;
        this.speed = 1.5;
        this.loadAllImages();
        this.setCurrentMovement(this.imagesIntro);
        this.animated();
    }

    /**
     * Preloads all animation frames.
     */
    loadAllImages() {
        this.loadImages(this.imagesIntro);
        this.loadImages(this.imagesFloating);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
    }

    /**
     * Chooses the current animation.
     */
    updateState() {
        this.whichMovement();
    }

    /**
     * Plays the floating animation.
     */
    whichMovement() {
        this.setCurrentMovement(this.imagesFloating);
    }

}
