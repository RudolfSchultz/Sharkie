class Character extends MovableObject {

    Images_Idle = [
        "../img/1.Sharkie/1.IDLE/1.png",
        "../img/1.Sharkie/1.IDLE/2.png",
        "../img/1.Sharkie/1.IDLE/3.png",
        "../img/1.Sharkie/1.IDLE/4.png",
        "../img/1.Sharkie/1.IDLE/5.png",
        "../img/1.Sharkie/1.IDLE/6.png",
        "../img/1.Sharkie/1.IDLE/7.png",
        "../img/1.Sharkie/1.IDLE/8.png",
        "../img/1.Sharkie/1.IDLE/9.png",
        "../img/1.Sharkie/1.IDLE/10.png",
        "../img/1.Sharkie/1.IDLE/11.png",
        "../img/1.Sharkie/1.IDLE/12.png",
        "../img/1.Sharkie/1.IDLE/13.png",
        "../img/1.Sharkie/1.IDLE/14.png",
        "../img/1.Sharkie/1.IDLE/15.png",
        "../img/1.Sharkie/1.IDLE/16.png",
        "../img/1.Sharkie/1.IDLE/17.png",
        "../img/1.Sharkie/1.IDLE/18.png"
    ]

    Images_Long_Idle = [
        "../img/1.Sharkie/2.Long_IDLE/i1.png",
        "../img/1.Sharkie/2.Long_IDLE/I2.png",
        "../img/1.Sharkie/2.Long_IDLE/I3.png",
        "../img/1.Sharkie/2.Long_IDLE/I4.png",
        "../img/1.Sharkie/2.Long_IDLE/I5.png",
        "../img/1.Sharkie/2.Long_IDLE/I6.png",
        "../img/1.Sharkie/2.Long_IDLE/I7.png",
        "../img/1.Sharkie/2.Long_IDLE/I8.png",
        "../img/1.Sharkie/2.Long_IDLE/I9.png",
        "../img/1.Sharkie/2.Long_IDLE/I10.png",
        "../img/1.Sharkie/2.Long_IDLE/I11.png",
        "../img/1.Sharkie/2.Long_IDLE/I12.png",
        "../img/1.Sharkie/2.Long_IDLE/I13.png",
        "../img/1.Sharkie/2.Long_IDLE/I14.png"
    ]
    Long_Idle_Loop_From = 10;
    Long_Idle_Loop_Frame_Ms = 300;

    Images_Swimming = [
        "../img/1.Sharkie/3.Swim/1.png",
        "../img/1.Sharkie/3.Swim/2.png",
        "../img/1.Sharkie/3.Swim/3.png",
        "../img/1.Sharkie/3.Swim/4.png",
        "../img/1.Sharkie/3.Swim/5.png",
        "../img/1.Sharkie/3.Swim/6.png"
    ]

    Images_Attack_Slap = [
        "../img/1.Sharkie/4.Attack/Fin Slap/1.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/2.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/3.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/4.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/5.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/6.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/7.png",
        "../img/1.Sharkie/4.Attack/Fin Slap/8.png"
    ]

    Images_Hurt_Poisoned = [
        "../img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
        "../img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
        "../img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
        "../img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
        "../img/1.Sharkie/5.Hurt/1.Poisoned/5.png"
    ]

    Images_Hurt_Shocked = [
        "../img/1.Sharkie/5.Hurt/2.Electric_shock/1.png",
        "../img/1.Sharkie/5.Hurt/2.Electric_shock/2.png",
        "../img/1.Sharkie/5.Hurt/2.Electric_shock/3.png"
    ]

    Images_Dead_by_Poison = [
        "../img/1.Sharkie/6.dead/1.Poisoned/1.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/2.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/3.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/4.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/5.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/6.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/7.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/8.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/9.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/10.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/11.png",
        "../img/1.Sharkie/6.dead/1.Poisoned/12.png"
    ]
    Dead_by_Poison_Loop_From = this.Images_Dead_by_Poison.length - 1;

    Images_Dead_by_Shock = [
        "../img/1.Sharkie/6.dead/2.Electro_shock/1.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/2.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/3.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/4.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/5.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/6.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/7.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/8.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/9.png",
        "../img/1.Sharkie/6.dead/2.Electro_shock/10.png"
    ]
    Dead_by_Shock_Loop_From = this.Images_Dead_by_Shock.length - 1;

    offset = { top: 33, right: 10, bottom: 10, left: 10 };
    currentImage = 0;
    currentMovement;
    world;
    idleSince = null;
    static LONG_IDLE_DELAY_MS = 2 * 60 * 1000;
    surfaced = false;
    bobStart = 0;
    static BOB_AMPLITUDE = 4;
    static MAX_POISON = 5;
    poison = 0;
    coins = 0;
    static CAMERA_LEAD_X = 150;    // so weit schwimmt Sharkie frei, bevor die Kamera mitgeht
    static CAMERA_SMOOTHING = 0.2; // Anteil des Abstands, den die Kamera pro Frame aufholt



    constructor() {
        super().loadImage("../img/1.Sharkie/1.IDLE/1.png");
        this.loadAllImages();
        this.setCurrentMovement(this.Images_Idle);
        this.animated();
    }

    loadAllImages() {
        this.loadimages(this.Images_Idle);
        this.loadimages(this.Images_Long_Idle);
        this.loadimages(this.Images_Swimming);
        this.loadimages(this.Images_Attack_Slap);
        this.loadimages(this.Images_Hurt_Poisoned);
        this.loadimages(this.Images_Hurt_Shocked);
        this.loadimages(this.Images_Dead_by_Poison);
        this.loadimages(this.Images_Dead_by_Shock);
    }

    updateState() {
        this.whichMovement();
    }

    whichMovement() {
        if (this.isDead()) {
            this.setCurrentMovement(this.Images_Dead_by_Poison, this.Dead_by_Poison_Loop_From);
        }
        else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.idleSince = null;
                this.setCurrentMovement(this.Images_Swimming);
            }
            else if (this.world.keyboard.A) {
                this.idleSince = null;
                this.setCurrentMovement(this.Images_Attack_Slap);
            }
            else if (this.idleSince !== null && Date.now() - this.idleSince >= Character.LONG_IDLE_DELAY_MS) {
                this.setCurrentMovement(this.Images_Long_Idle, this.Long_Idle_Loop_From, this.Long_Idle_Loop_Frame_Ms);
            }
            else {
                if (this.idleSince === null) this.idleSince = Date.now();
                this.setCurrentMovement(this.Images_Idle);
            }
        }
    }

    /**
     * Camera stays put for the first CAMERA_LEAD_X px, then glides after the character.
     * Clamped to the level start and end.
     */
    moveCamera() {
        let maxCamera = this.world.level.level_end_x - this.world.canvas.width;
        let target = Math.min(Math.max(0, this.x - Character.CAMERA_LEAD_X), maxCamera);
        this.world.kamera_x += (-target - this.world.kamera_x) * Character.CAMERA_SMOOTHING;
    }

    /**
     * After the death animation has finished, float up to the top edge and bob gently.
     */
    floatUp() {
        if (this.currentMovement !== this.Images_Dead_by_Poison || !this.isLooping()) return;   // erst Todesanimation abwarten
        let surfaceY = -this.offset.top;   // Hitbox-Oberkante = oberer Canvas-Rand
        if (!this.surfaced) {
            if (Math.abs(this.y - surfaceY) > 0.6) this.y += Math.sign(surfaceY - this.y) * 0.6;   // auch von oben sanft hin
            else {
                this.y = surfaceY;
                this.surfaced = true;
                this.bobStart = Date.now();
            }
        }
        else this.y = surfaceY + (1 - Math.cos((Date.now() - this.bobStart) / 600)) * Character.BOB_AMPLITUDE;
    }
}