/**
 * Enemy that moves between two points. Color variant (random) decides the damage.
 * Touching it gives the character an electric shock. Only bubbles kill it: it is trapped in the bubble and floats up.
 */
class JellyFish extends MovableObject {
    /**
     * Folder of the jellyfish images.
     */
    static PATH = "../img/2.Enemy/2 Jelly fish/";
    /**
     * Color variants: image folder, file name prefix, death frame prefix (folder/file) and damage.
     */
    static VARIANTS = [
        { folder: "Regular damage", name: "Lila", dead: "Lila/L", damage: 5 },
        { folder: "Regular damage", name: "Yellow", dead: "Yellow/y", damage: 5 },
        { folder: "Súper dangerous", name: "Green", dead: "green/g", damage: 10 },
        { folder: "Súper dangerous", name: "Pink", dead: "Pink/P", damage: 10 }
    ];
    /**
     * Speed in px per game tick of the dead jellyfish floating up.
     */
    static FLOAT_SPEED = 2;

    width = 70;
    height = 100;
    offset = { top: 10, right: 8, bottom: 25, left: 8 };
    damageTaken = { bubble: 100, poison: 100 };
    hurtType = "shock";
    /**
     * Sound name (GameAudio.sounds) played when the jellyfish is caught by a bubble.
     */
    deathSound = "catchJellyfish";
    currentImage = 0;
    currentMovement;

    /**
     * @param {{x: number, y: number}} pointA - Start of the patrol path.
     * @param {{x: number, y: number}} pointB - End of the patrol path.
     * @param {string} [variantName] - Fixed color variant ("Lila", "Yellow", "Green", "Pink"); random if omitted.
     */
    constructor(pointA, pointB, variantName) {
        super();
        let variant = this.pickVariant(variantName);
        this.swimImages = this.buildSwimImages(variant);
        this.deadImages = this.buildDeadImages(variant);
        this.damage = variant.damage;
        this.pointA = pointA;
        this.pointB = pointB;
        this.x = pointA.x;
        this.y = pointA.y;
        this.speed = 0.5 + Math.random();
        this.loadImage(this.swimImages[0]);
        this.loadImages(this.swimImages);
        this.loadImages(this.deadImages);
        this.animated();
    }

    /**
     * @param {string} [variantName] - Name of the wanted color variant.
     * @returns {{folder: string, name: string, damage: number}} The named variant, or a random one.
     */
    pickVariant(variantName) {
        let named = JellyFish.VARIANTS.find(variant => variant.name === variantName);
        return named || this.randomVariant(JellyFish.VARIANTS);
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
     * Builds the 4 death frame paths (jellyfish trapped in a bubble) of one color variant.
     * @param {{dead: string}} variant - Color variant.
     * @returns {string[]} Frame paths.
     */
    buildDeadImages(variant) {
        return [1, 2, 3, 4].map(i => `${JellyFish.PATH}Dead/${variant.dead}${i}.png`);
    }

    /**
     * Patrols between the two points; after death it floats up and becomes removable above the canvas.
     */
    move() {
        if (!this.isDead()) return this.patrol();
        this.y -= JellyFish.FLOAT_SPEED;
        this.removable = this.y + this.height < 0;
    }

    /**
     * Plays the swim animation, or the death animation in a loop while floating up.
     */
    updateState() {
        this.setCurrentMovement(this.isDead() ? this.deadImages : this.swimImages);
    }
}
