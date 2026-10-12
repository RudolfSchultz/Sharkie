/**
 * Wide boss bar at the bottom center. Hidden until the boss enters the screen, then fills up.
 */
class BossBar extends HudElement {
    static WIDTH = 460;
    static HEIGHT = 46;
    static MARGIN = 16;
    static NAME = "KILLER WHALE";

    active = false;

    /**
     * @param {Endboss} boss - Boss whose energy is shown.
     * @param {number} canvasWidth - Canvas width in px.
     * @param {number} canvasHeight - Canvas height in px.
     */
    constructor(boss, canvasWidth, canvasHeight) {
        super();
        this.boss = boss;
        this.x = (canvasWidth - BossBar.WIDTH) / 2;
        this.y = canvasHeight - BossBar.MARGIN - BossBar.HEIGHT;
        this.bar = new AnimatedBar(() => boss.energy, 100);
    }

    /**
     * Shows the bar and starts its intro animation (only once).
     */
    activate() {
        if (this.active) return;
        this.active = true;
        this.bar.intro = 0;   
    }

    /**
     * @returns {string[]} Fill colors [top, bottom].
     */
    colors() {
        return ["#ff5f7e", "#b3123a"];
    }

    /**
     * Draws the panel, the boss name and the bar, if active.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    draw(ctx) {
        if (!this.active) return;
        this.bar.update();
        let fade = this.bar.intro;
        this.panel(ctx, this.x, this.y, BossBar.WIDTH, BossBar.HEIGHT, 12, 0.7 * fade);
        ctx.save();
        ctx.globalAlpha = fade;
        this.text(ctx, BossBar.NAME, this.x + BossBar.WIDTH / 2, this.y + 19, "center", 14);
        ctx.restore();
        this.bar.draw(ctx, { x: this.x + 14, y: this.y + 25, w: BossBar.WIDTH - 28, h: 12 }, () => this.colors(), false, 20);
    }
}
