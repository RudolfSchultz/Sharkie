/**
 * Projectile shot by the character. A bubble flies straight ahead until it hits an enemy or leaves the level.
 * It is poisoned when the character had poison left.
 */
class Bubble extends MovableObject {
    static SIZE = 40;
    static SPEED = 8;
    static IMAGE = "../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
    static IMAGE_POISONED = "../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";

    popped = false;

    /**
     * @param {number} x - Left edge in the level.
     * @param {number} y - Top edge in the level.
     * @param {number} direction - 1 to fly right, -1 to fly left.
     * @param {boolean} poisoned - True for a poisoned bubble.
     */
    constructor(x, y, direction, poisoned) {
        super();
        this.type = poisoned ? "poison" : "bubble";
        this.loadImage(poisoned ? Bubble.IMAGE_POISONED : Bubble.IMAGE);
        this.width = Bubble.SIZE;
        this.height = Bubble.SIZE;
        this.x = x;
        this.y = y;
        this.speed = Bubble.SPEED * direction;
    }

    /**
     * Flies one step in the shooting direction.
     */
    move() {
        this.x += this.speed;
    }
}
