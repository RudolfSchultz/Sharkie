/**
 * Top-right panel: life + poison bar (mirrored, icons on the right), coin counter below.
 */
class PlayerHud extends HudElement {
    static MARGIN = 16;
    static WIDTH = 236;
    static HEIGHT = 90;
    static BAR_WIDTH = 166;
    static POISON_FRAME_MS = 300;

    // 3 Posen: 1 (=2), 3 (=4/7/8), 5 (=6) → Ping-Pong ohne Doppelte
    Images_Poison = [
        "../img/4. Marcadores/Posión/Animada/1.png",
        "../img/4. Marcadores/Posión/Animada/3.png",
        "../img/4. Marcadores/Posión/Animada/5.png",
        "../img/4. Marcadores/Posión/Animada/3.png"
    ]

    constructor(character, canvasWidth) {
        super();
        this.character = character;
        this.x = canvasWidth - PlayerHud.MARGIN - PlayerHud.WIDTH;
        this.y = PlayerHud.MARGIN;
        this.barX = this.x + 16;
        this.iconX = this.x + PlayerHud.WIDTH - 27;
        this.lifeBar = new AnimatedBar(() => character.energy, 100);
        this.poisonBar = new AnimatedBar(() => character.poison, Character.MAX_POISON);
        this.poisonImages = this.Images_Poison.map(path => {
            let img = new Image();
            img.src = path;
            return img;
        });
        this.coinImage = new Image();
        this.coinImage.src = "../img/4. Marcadores/1. Coins/1.png";
    }

    draw(ctx) {
        this.lifeBar.update();
        this.poisonBar.update();
        this.panel(ctx, this.x, this.y, PlayerHud.WIDTH, PlayerHud.HEIGHT);
        this.drawLife(ctx);
        this.drawPoison(ctx);
        this.drawCoins(ctx);
    }

    // ---------- Leben ----------
    lifeColors(pct) {
        if (pct > 0.6) return ["#5cf2c0", "#13b886"];
        if (pct > 0.3) return ["#ffe066", "#f59f1b"];
        return ["#ff7a7a", "#d42d3c"];
    }

    isCritical() {
        let pct = this.character.energy / 100;
        return pct <= 0.3 && pct > 0;
    }

    drawLife(ctx) {
        let y = this.y;
        let critical = this.isCritical();
        let pulse = critical ? (Math.sin(Date.now() / 140) + 1) / 2 : 0;
        this.drawHeart(ctx, this.iconX, y + 26, 12 * (1 + pulse * 0.15));
        this.text(ctx, `${Math.ceil(this.lifeBar.display)} / 100`, this.barX, y + 22, "left", 13, critical ? "#ff8a8a" : undefined);
        this.text(ctx, "SHARKIE", this.barX + PlayerHud.BAR_WIDTH, y + 22, "right");
        this.lifeBar.draw(ctx, this.barX, y + 28, PlayerHud.BAR_WIDTH, 14, p => this.lifeColors(p), true);
    }

    drawHeart(ctx, cx, cy, s) {
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();

        let [c1, c2] = this.lifeColors(this.character.energy / 100);
        let gradient = ctx.createLinearGradient(cx, cy - 12, cx, cy + 10);
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        let hy = cy + 3;
        ctx.beginPath();
        ctx.moveTo(cx, hy + s * 0.35);
        ctx.bezierCurveTo(cx - s * 1.1, hy - s * 0.35, cx - s * 0.5, hy - s * 1.05, cx, hy - s * 0.45);
        ctx.bezierCurveTo(cx + s * 0.5, hy - s * 1.05, cx + s * 1.1, hy - s * 0.35, cx, hy + s * 0.35);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // ---------- Gift ----------
    poisonColors(pct) {
        return [this.mixColor("#ecc8ff", "#9d4edd", pct), this.mixColor("#b06ef0", "#3c096c", pct)];
    }

    mixColor(from, to, t) {
        let a = from.match(/\w\w/g).map(hex => parseInt(hex, 16));
        let b = to.match(/\w\w/g).map(hex => parseInt(hex, 16));
        return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
    }

    drawPoison(ctx) {
        let barY = this.y + 68;
        this.text(ctx, `${this.character.poison} / ${Character.MAX_POISON}`, this.barX, barY - 6, "left");
        this.poisonBar.draw(ctx, this.barX, barY, PlayerHud.BAR_WIDTH, 10, p => this.poisonColors(p), true, Character.MAX_POISON);
        this.drawPoisonIcon(ctx, this.iconX, barY - 3);
    }

    drawPoisonIcon(ctx, cx, cy) {
        let img = this.poisonImages[Math.floor(Date.now() / PlayerHud.POISON_FRAME_MS) % this.poisonImages.length];
        if (!img.complete || !img.naturalHeight) return;
        let h = 26, w = h * img.naturalWidth / img.naturalHeight;
        ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    }

    // ---------- Coins ----------
    drawCoins(ctx) {
        let w = 96, h = 34;
        let x = this.x + PlayerHud.WIDTH - w;
        let y = this.y + PlayerHud.HEIGHT + 8;
        this.panel(ctx, x, y, w, h, 12);
        if (this.coinImage.complete) ctx.drawImage(this.coinImage, x + 10, y + 5, 24, 24);
        this.text(ctx, `× ${this.character.coins}`, x + w - 14, y + 24, "right", 16);
    }
}
