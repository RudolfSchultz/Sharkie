class Endboss extends MovableObject {


    Images_Intro = [
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

    Images_floating = [
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

    Images_attack = [
        "../img/2.Enemy/3 Final Enemy/Attack/1.png",
        "../img/2.Enemy/3 Final Enemy/Attack/2.png",
        "../img/2.Enemy/3 Final Enemy/Attack/3.png",
        "../img/2.Enemy/3 Final Enemy/Attack/4.png",
        "../img/2.Enemy/3 Final Enemy/Attack/5.png",
        "../img/2.Enemy/3 Final Enemy/Attack/6.png"
    ]

    Images_Dead = [
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"
    ]

    Images_Hurt = [
        "../img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "../img/2.Enemy/3 Final Enemy/Hurt/4.png"
    ]

    currentImage = 0;
    currentMovement;

    constructor() {
        super();
        this.loadImage("../img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
        this.height = 350;
        this.width = 350;
        this.x = 340;
        this.y = (480 - this.height) / 2;
        console.log("Endboss created at x:", this.x, "y:", this.y);
        this.speed = 1.5;
        this.loadAllImages();
        this.setCurrentMovement(this.Images_Intro);
        this.animated();
    }

    loadAllImages() {
        this.loadimages(this.Images_Intro);
        this.loadimages(this.Images_floating);
        this.loadimages(this.Images_attack);
        this.loadimages(this.Images_Dead);
        this.loadimages(this.Images_Hurt);
    }

    updateState() {
        this.whichMovement();
    }

    whichMovement() {
        this.setCurrentMovement(this.Images_floating);
    }

}
