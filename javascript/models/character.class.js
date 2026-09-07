class Character extends MovableObject {

    Images_Swimming = [
            "../img/1.Sharkie/3.Swim/1.png",
            "../img/1.Sharkie/3.Swim/2.png",
            "../img/1.Sharkie/3.Swim/3.png",
            "../img/1.Sharkie/3.Swim/4.png",
            "../img/1.Sharkie/3.Swim/5.png",
            "../img/1.Sharkie/3.Swim/6.png",
        ]

    constructor() {
        super().loadImage("../img/1.Sharkie/1.IDLE/1.png");
        this.loadimages(this.Images_Swimming);
    }

    animated() {
        setInterval(() => {
            this.playAnimation();
        }, 100);
    }
    
        let i = this.currentImage % this.Images_Swimming.length;
        let path = this.Images_Swimming[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        console.log("Character is jumping");
    }

}