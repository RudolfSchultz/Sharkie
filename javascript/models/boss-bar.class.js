/**
 * Wide boss bar at the bottom center. Hidden until the boss enters the screen, then fills up.
 */
class BossBar extends HudElement {
    static WIDTH = 460;
    static HEIGHT = 46;
    static MARGIN = 16;
    static NAME = "KILLER WHALE";

    active = false;

    constructor(boss, canvasWidth, canvasHeight) {
        super();
        this.boss = boss;
        this.x = (canvasWidth - BossBar.WIDTH) / 2;
        this.y = canvasHeight - BossBar.MARGIN - BossBar.HEIGHT;
        this.bar = new AnimatedBar(() => boss.energy, 100);
    }

    activate() {
        if (this.active) return;
        this.active = true;
        this.bar.intro = 0;   
    }

    colors() {
        return ["#ff5f7e", "#b3123a"];
    }

    draw(ctx) {
        if (!this.active) return;
        this.bar.update();
        let fade = this.bar.intro;
        this.panel(ctx, this.x, this.y, BossBar.WIDTH, BossBar.HEIGHT, 12, 0.7 * fade);
        ctx.save();
        ctx.globalAlpha = fade;
        this.text(ctx, BossBar.NAME, this.x + BossBar.WIDTH / 2, this.y + 19, "center", 14);
        ctx.restore();
        this.bar.draw(ctx, this.x + 14, this.y + 25, BossBar.WIDTH - 28, 12, () => this.colors(), false, 20);
    }
}
