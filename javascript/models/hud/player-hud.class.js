/**
 * Top-right panel: life + poison bar (mirrored, icons on the right), coin counter below.
 */
class PlayerHud extends HudElement {
    static MARGIN = 16;
    static WIDTH = 236;
    static HEIGHT = 90;
    static BAR_WIDTH = 166;
    static POISON_FRAME_MS = 300;

    /**
     * Poison bottle poses 1, 3 and 5 played as ping-pong (1, 3, 5, 3) without duplicate frames.
     */
    imagesPoison = [
        "../img/4. Marcadores/Posión/Animada/1.png",
        "../img/4. Marcadores/Posión/Animada/3.png",
        "../img/4. Marcadores/Posión/Animada/5.png",
        "../img/4. Marcadores/Posión/Animada/3.png"
    ]

    /**
     * @param {Character} character - Character whose life, poison and coins are shown.
     * @param {number} canvasWidth - Canvas width in px.
     */
    constructor(character, canvasWidth) {
        super();
        this.character = character;
        this.x = canvasWidth - PlayerHud.MARGIN - PlayerHud.WIDTH;
        this.y = PlayerHud.MARGIN;
        this.barX = this.x + 16;
        this.iconX = this.x + PlayerHud.WIDTH - 27;
        this.lifeBar = new AnimatedBar(() => character.energy, 100);
        this.poisonBar = new AnimatedBar(() => character.poison, Character.MAX_POISON);
        this.loadImages();
    }

    /**
     * Loads the poison bottle frames and the coin icon.
     */
    loadImages() {
        this.poisonImages = this.imagesPoison.map(path => {
            let img = new Image();
            img.src = path;
            return img;
        });
        this.coinImage = new Image();
        this.coinImage.src = "../img/4. Marcadores/1. Coins/1.png";
    }

    /**
     * Draws the whole panel: life, poison and coin counter.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    draw(ctx) {
        this.lifeBar.update();
        this.poisonBar.update();
        this.panel(ctx, this.x, this.y, PlayerHud.WIDTH, PlayerHud.HEIGHT);
        this.drawLife(ctx);
        this.drawPoison(ctx);
        this.drawCoins(ctx);
    }

    /**
     * @param {number} pct - Life level from 0 to 1.
     * @returns {string[]} Bar colors [top, bottom]: green, yellow or red.
     */
    lifeColors(pct) {
        if (pct > 0.6) return ["#5cf2c0", "#13b886"];
        if (pct > 0.3) return ["#ffe066", "#f59f1b"];
        return ["#ff7a7a", "#d42d3c"];
    }

    /**
     * @returns {boolean} True when life is low (30 % or less) but not zero.
     */
    isCritical() {
        let pct = this.character.energy / 100;
        return pct <= 0.3 && pct > 0;
    }

    /**
     * Draws life text, name and bar; the heart pulses when life is critical.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawLife(ctx) {
        let y = this.y;
        let critical = this.isCritical();
        let pulse = critical ? (Math.sin(Date.now() / 140) + 1) / 2 : 0;
        this.drawHeart(ctx, this.iconX, y + 26, 12 * (1 + pulse * 0.15));
        this.text(ctx, `${Math.ceil(this.lifeBar.display)} / 100`, this.barX, y + 22, "left", 13, critical ? "#ff8a8a" : undefined);
        this.text(ctx, "SHARKIE", this.barX + PlayerHud.BAR_WIDTH, y + 22, "right");
        this.lifeBar.draw(ctx, { x: this.barX, y: y + 28, w: PlayerHud.BAR_WIDTH, h: 14 }, p => this.lifeColors(p), true);
    }

    /**
     * Draws the heart icon on a round background.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {number} cx - Center x.
     * @param {number} cy - Center y.
     * @param {number} s - Heart size.
     */
    drawHeart(ctx, cx, cy, s) {
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();
        this.drawHeartShape(ctx, cx, cy, s);
    }

    /**
     * Draws the heart shape, colored by the current life level.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {number} cx - Center x.
     * @param {number} cy - Center y.
     * @param {number} s - Heart size.
     */
    drawHeartShape(ctx, cx, cy, s) {
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

    /**
     * @param {number} pct - Poison level from 0 to 1.
     * @returns {string[]} Bar colors [top, bottom], darker the fuller the bar.
     */
    poisonColors(pct) {
        return [this.mixColor("#ecc8ff", "#9d4edd", pct), this.mixColor("#b06ef0", "#3c096c", pct)];
    }

    /**
     * Blends two hex colors.
     * @param {string} from - Start color, e.g. "#ecc8ff".
     * @param {string} to - End color.
     * @param {number} t - Blend factor from 0 to 1.
     * @returns {string} The mixed color as hex string.
     */
    mixColor(from, to, t) {
        let a = from.match(/\w\w/g).map(hex => parseInt(hex, 16));
        let b = to.match(/\w\w/g).map(hex => parseInt(hex, 16));
        return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
    }

    /**
     * Draws poison count, bar and animated bottle icon.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawPoison(ctx) {
        let barY = this.y + 68;
        this.text(ctx, `${this.character.poison} / ${Character.MAX_POISON}`, this.barX, barY - 6, "left");
        this.poisonBar.draw(ctx, { x: this.barX, y: barY, w: PlayerHud.BAR_WIDTH, h: 10 }, p => this.poisonColors(p), true, Character.MAX_POISON);
        this.drawPoisonIcon(ctx, this.iconX, barY - 3);
    }

    /**
     * Draws the current frame of the poison bottle animation.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {number} cx - Center x.
     * @param {number} cy - Center y.
     */
    drawPoisonIcon(ctx, cx, cy) {
        let img = this.poisonImages[Math.floor(Date.now() / PlayerHud.POISON_FRAME_MS) % this.poisonImages.length];
        if (!img.complete || !img.naturalHeight) return;
        let h = 26, w = h * img.naturalWidth / img.naturalHeight;
        ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    }

    /**
     * Draws the coin counter panel below the main panel.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    drawCoins(ctx) {
        let w = 96, h = 34;
        let x = this.x + PlayerHud.WIDTH - w;
        let y = this.y + PlayerHud.HEIGHT + 8;
        this.panel(ctx, x, y, w, h, 12);
        if (this.coinImage.complete) ctx.drawImage(this.coinImage, x + 10, y + 5, 24, 24);
        this.text(ctx, `× ${this.character.coins}`, x + w - 14, y + 24, "right", 16);
    }
}
