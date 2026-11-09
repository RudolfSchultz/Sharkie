/**
 * Enemy that swims back and forth between two points. The color variant is chosen once at random;
 * it is one object that holds all image lists of that color, so every state uses the right color directly.
 * A bubble does not kill it but inflates it: transition animation once, then the bubble swim loop.
 * A fin slap kills it and knocks it away to the ground; a poisoned bubble kills it and it floats up.
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
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png"
    ]

    imagesBubbleSwimOrange = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png"
    ]

    imagesBubbleSwimRed = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png"
    ]

    imagesFloatingGreen = ["../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png"]
    imagesFloatingOrange = ["../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"]
    imagesFloatingRed = ["../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"]

    imagesSlappedGreen = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png"
    ]

    imagesSlappedOrange = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png"
    ]

    imagesSlappedRed = [
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
        "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png"
    ]

    offset = { top: 5, right: 5, bottom: 23, left: 0 };
    damageTaken = { slap: 100, bubble: 0, poison: 100 };
    /**
     * Sound name (GameAudio.sounds) played when the pufferfish is defeated.
     */
    deathSound = "pufferfishDead";
    inflated = false;
    /**
     * How the fish dies: "floating" (poisoned bubble, floats up) or "slapped" (knocked away, sinks); null while alive.
     */
    deathStyle = null;
    /**
     * 1 when knocked to the right, -1 when knocked to the left.
     */
    knockDirection = 1;
    /**
     * Speed in px per game tick of the dead fish.
     */
    static KNOCK_SPEED = 5;
    static SINK_SPEED = 3;
    static FLOAT_SPEED = 2;
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
        this.variant = this.randomVariant(this.variants());
        this.animated();
    }

    /**
     * Patrols between the two points; after death it drifts out of the screen.
     */
    move() {
        if (this.deathStyle) this.moveDead();
        else this.patrol();
    }

    /**
     * Slapped: flies away from the character and sinks; floating: rises to the surface.
     * Becomes removable as soon as it has left the canvas at the top or bottom.
     */
    moveDead() {
        if (this.deathStyle === "slapped") {
            this.x += this.knockDirection * PufferFish.KNOCK_SPEED;
            this.y += PufferFish.SINK_SPEED;
        }
        else this.y -= PufferFish.FLOAT_SPEED;
        this.removable = this.y > this.world.canvas.height || this.y + this.height < 0;
    }

    /**
     * Preloads every image list of all color variants.
     */
    loadAllImages() {
        this.variants().forEach(variant => Object.values(variant).forEach(images => this.loadImages(images)));
    }

    /**
     * @returns {Object[]} One entry per color with all of its image lists (see variantOf).
     */
    variants() {
        return [
            this.variantOf(this.imagesGreenSwim, this.imagesTransitionGreen, this.imagesBubbleSwimGreen,
                this.imagesFloatingGreen, this.imagesSlappedGreen),
            this.variantOf(this.imagesOrangeSwim, this.imagesTransitionOrange, this.imagesBubbleSwimOrange,
                this.imagesFloatingOrange, this.imagesSlappedOrange),
            this.variantOf(this.imagesRedSwim, this.imagesTransitionRed, this.imagesBubbleSwimRed,
                this.imagesFloatingRed, this.imagesSlappedRed)
        ];
    }

    /**
     * @param {string[]} swim - Normal swim frames.
     * @param {string[]} transition - Frames of the puffing up.
     * @param {string[]} bubbleSwim - Swim frames while inflated.
     * @param {string[]} floating - Death frame when killed by a poisoned bubble (floats up).
     * @param {string[]} slapped - Death frames when killed by a fin slap (knocked away).
     * @returns {Object} All lists of one color; "inflate" is the transition followed by the bubble swim loop.
     */
    variantOf(swim, transition, bubbleSwim, floating, slapped) {
        return { swim, transition, bubbleSwim, floating, slapped, inflate: [...transition, ...bubbleSwim] };
    }

    /**
     * Called by the world for every attack that reaches this enemy, also for types it takes no damage from.
     * @param {string} type - Attack type ("slap", "bubble" or "poison").
     */
    reactTo(type) {
        if (this.isDead()) this.startDeath(type);
        else if (type === "bubble") this.inflated = true;
    }

    /**
     * Chooses the death style from the killing attack and the direction it is knocked to (away from the character).
     * @param {string} type - Attack type that killed the fish.
     */
    startDeath(type) {
        if (this.deathStyle) return;
        this.deathStyle = type === "slap" ? "slapped" : "floating";
        this.knockDirection = this.x >= this.world.character.x ? 1 : -1;
    }

    /**
     * Chooses the current animation.
     */
    updateState() {
        this.whichMovement();
    }

    /**
     * Plays the swim animation of the chosen color; once inflated the transition plays once, then the bubble swim loops.
     * After death the matching death frames play once and the last one stays.
     */
    whichMovement() {
        if (this.deathStyle) {
            let images = this.variant[this.deathStyle];
            this.setCurrentMovement(images, images.length - 1);
        }
        else if (this.inflated) this.setCurrentMovement(this.variant.inflate, this.variant.transition.length);
        else this.setCurrentMovement(this.variant.swim);
    }

}