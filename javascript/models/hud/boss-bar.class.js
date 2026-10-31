/**
 * Wide boss bar at the bottom center. Hidden until the boss enters the screen, then fills up.
 */
class BossBar extends HudElement {
    static WIDTH = 460;
    static HEIGHT = 46;
    static MARGIN = 16;
    static NAME = "KILLER WHALE";
    static POISON_COLORS = ["#c58bff", "#7a2cc7"];
    static POISON_FLASH_MS = 1000;
    static POISON_BAR_W = 6;
    static POISON_BAR_H = 4;
    static POISON_BAR_GAP = 2;

    active = false;
    poisonDisplay = 0;

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
     * @returns {string[]} Fill colors [top, bottom]; purple for a moment after the boss took a poison tick.
     */
    colors() {
        if (Date.now() - this.boss.lastPoisonDamage < BossBar.POISON_FLASH_MS) return BossBar.POISON_COLORS;
        return ["#ff5f7e", "#b3123a"];
    }

    /**
     * Draws the five small poison bars as a stack right of the energy bar: the bottom one is flush with the
     * energy bar, the top one with the top of the boss name. One bar fills up per poison stack, bottom first.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawPoisonBars(ctx) {
        this.poisonDisplay += (this.boss.poisonStacks - this.poisonDisplay) * 0.2;
        let left = this.x + BossBar.WIDTH - 14 - BossBar.POISON_BAR_W;
        let step = BossBar.POISON_BAR_H + BossBar.POISON_BAR_GAP;
        for (let i = 0; i < Endboss.MAX_POISON_STACKS; i++) {
            let fill = Math.min(1, Math.max(0, this.poisonDisplay - i));
            this.drawPoisonBar(ctx, left, this.y + 9 + (Endboss.MAX_POISON_STACKS - 1 - i) * step, fill);
        }
    }

    /**
     * Draws the poison damage rate in white above the right end of the energy bar, e.g. "2 Tick/5s".
     * Hidden while the boss is not poisoned.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawTickRate(ctx) {
        if (this.boss.poisonStacks === 0) return;
        let right = this.x + BossBar.WIDTH - 14 - BossBar.POISON_BAR_W - 10;
        let label = `${this.boss.poisonStacks} Tick/${Endboss.POISON_TICK_MS / 1000}s`;
        this.text(ctx, label, right, this.y + 19, "right", 12, "#ffffff");
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {number} x - Left edge of the small bar.
     * @param {number} y - Top edge of the small bar.
     * @param {number} fill - Fill level from 0 to 1.
     */
    drawPoisonBar(ctx, x, y, fill) {
        let rect = { x, y, w: BossBar.POISON_BAR_W, h: BossBar.POISON_BAR_H };
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(rect.x, rect.y, rect.w, rect.h, rect.h / 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.clip();
        ctx.fillStyle = this.bar.gradient(ctx, rect, BossBar.POISON_COLORS);
        ctx.fillRect(rect.x, rect.y, rect.w * fill, rect.h);
        ctx.restore();
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
        this.drawPoisonBars(ctx);
        this.drawTickRate(ctx);
        ctx.restore();
        let rect = { x: this.x + 14, y: this.y + 25, w: BossBar.WIDTH - 28 - BossBar.POISON_BAR_W - 10, h: 12 };
        this.bar.draw(ctx, rect, () => this.colors(), false, 20);
    }
}
