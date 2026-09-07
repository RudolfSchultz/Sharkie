class Character extends MovableObject {

    constructor() {
        super();
        this.loadImage("../img/1.Sharkie/1.IDLE/1.png");
        this.loadimages([
            "../img/1.Sharkie/1.Swim/1.png",
            "../img/1.Sharkie/2.Swim/2.png",
            "../img/1.Sharkie/3.Swim/3.png",
            "../img/1.Sharkie/4.Swim/4.png",
            "../img/1.Sharkie/5.Swim/5.png",
            "../img/1.Sharkie/6.Swim/6.png",
        ]);
    }

    jump() {
        console.log("Character is jumping");
    }

}