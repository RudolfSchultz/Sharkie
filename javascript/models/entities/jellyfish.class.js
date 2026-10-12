/**
 * Enemy that moves between two points. Color variant (random) decides the damage.
 */
class JellyFish extends MovableObject {
    /**
     * Folder of the jellyfish images.
     */
    static PATH = "../img/2.Enemy/2 Jelly fish/";
    /**
     * Color variants: image folder, file name prefix and damage.
     */
    static VARIANTS = [
        { folder: "Regular damage", name: "Lila", damage: 5 },
        { folder: "Regular damage", name: "Yellow", damage: 5 },
        { folder: "Súper dangerous", name: "Green", damage: 10 },
        { folder: "Súper dangerous", name: "Pink", damage: 10 }
    ];

    width = 70;
    height = 100;
    offset = { top: 10, right: 8, bottom: 25, left: 8 };
    damageTaken = { bubble: 100, poison: 100 };
    currentImage = 0;
    currentMovement;

    /**
     * @param {{x: number, y: number}} pointA - Start of the patrol path.
     * @param {{x: number, y: number}} pointB - End of the patrol path.
     */
    constructor(pointA, pointB) {
        super();
        let variant = this.randomVariant(JellyFish.VARIANTS);
        this.swimImages = this.buildSwimImages(variant);
        this.damage = variant.damage;
        this.pointA = pointA;
        this.pointB = pointB;
        this.x = pointA.x;
        this.y = pointA.y;
        this.speed = 0.5 + Math.random();
        this.loadImage(this.swimImages[0]);
        this.loadImages(this.swimImages);
        this.animated();
    }

    /**
     * Builds the 4 swim frame paths of one color variant.
     * @param {{folder: string, name: string}} variant - Color variant.
     * @returns {string[]} Frame paths.
     */
    buildSwimImages(variant) {
        return [1, 2, 3, 4].map(i => `${JellyFish.PATH}${variant.folder}/${variant.name} ${i}.png`);
    }

    /**
     * Patrols between the two points.
     */
    move() {
        this.patrol();
    }

    /**
     * Plays the swim animation.
     */
    updateState() {
        this.setCurrentMovement(this.swimImages);
    }
}
