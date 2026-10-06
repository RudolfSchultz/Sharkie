/**
 * Draws the character's health bar in the top-left corner (fixed to the screen).
 * Reads character.energy each frame and animates changes.
 */
class HealthBar {
    x = 16;
    y = 16;
    width = 236;
    height = 52;
    barX = this.x + 54;
    barY = this.y + 28;
    barWidth = 166;
    barHeight = 14;

    constructor(character) {
        this.character = character;
        this.maxHp = character.energy;
        this.lastHp = character.energy;
        this.displayHp = character.energy;   
        this.trailHp = character.energy;     
        this.trailDelay = 0;
        this.flash = 0;
        document.fonts.load("13px 'Luckiest Guy'");  
    }

    draw(ctx) {
        this.update();
        ctx.save();
        this.drawPanel(ctx);
        this.drawHeart(ctx);
        this.drawLabels(ctx);
        this.drawBar(ctx);
        ctx.restore();
    }

    update() {
        let hp = this.character.energy;
        if (hp < this.lastHp) {
            this.flash = 1;
            this.trailDelay = 25;
        }
        if (hp > this.lastHp) this.trailHp = hp;
        this.lastHp = hp;

        this.displayHp += (hp - this.displayHp) * 0.25;
        if (Math.abs(hp - this.displayHp) < 0.05) this.displayHp = hp;

        if (this.trailDelay > 0) this.trailDelay--;
        else this.trailHp += (this.displayHp - this.trailHp) * 0.06;
        if (this.trailHp < this.displayHp) this.trailHp = this.displayHp;

        this.flash = Math.max(0, this.flash - 0.08);
    }

    isCritical() {
        let pct = this.character.energy / this.maxHp;
        return pct <= 0.3 && pct > 0;
    }

    pulse() {
        return this.isCritical() ? (Math.sin(Date.now() / 140) + 1) / 2 : 0;
    }

    colorsFor(pct) {
        if (pct > 0.6) return ["#5cf2c0", "#13b886"];
        if (pct > 0.3) return ["#ffe066", "#f59f1b"];
        return ["#ff7a7a", "#d42d3c"];
    }

    drawPanel(ctx) {
        ctx.shadowColor = "rgba(0,0,0,0.45)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 14);
        ctx.fillStyle = "rgba(6, 18, 38, 0.62)";
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.isCritical()
            ? `rgba(255,90,90,${0.35 + this.pulse() * 0.5})`
            : "rgba(255,255,255,0.14)";
        ctx.stroke();
    }

    drawHeart(ctx) {
        let cx = this.x + 27, cy = this.y + 26;
        let s = 12 * (1 + this.pulse() * 0.15);

        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();

        let [c1, c2] = this.colorsFor(this.character.energy / this.maxHp);
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

    drawLabels(ctx) {
        ctx.font = "13px 'Luckiest Guy', sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.fillText("SHARKIE", this.barX, this.y + 22);

        ctx.textAlign = "right";
        ctx.fillStyle = this.isCritical() ? "#ff8a8a" : "rgba(255,255,255,0.92)";
        ctx.fillText(`${Math.ceil(this.displayHp)} / ${this.maxHp}`, this.barX + this.barWidth, this.y + 22);
    }

    drawBar(ctx) {
        let { barX: x, barY: y, barWidth: w, barHeight: h } = this;
        let pct = this.displayHp / this.maxHp;
        let trailPct = this.trailHp / this.maxHp;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, h / 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.save();
        ctx.clip();                                 

        ctx.fillStyle = "rgba(255,235,235,0.85)";     
        ctx.fillRect(x, y, w * trailPct, h);

        let [c1, c2] = this.colorsFor(pct);          
        let gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w * pct, h);

        ctx.fillStyle = "rgba(255,255,255,0.25)";     
        ctx.fillRect(x, y + 1, w * pct, h * 0.38);

        ctx.fillStyle = "rgba(0,0,0,0.28)";          
        for (let i = 1; i < 10; i++) ctx.fillRect(x + (w / 10) * i - 0.5, y, 1, h);

        ctx.fillStyle = `rgba(255,255,255,${this.flash * 0.6})`;   
        ctx.fillRect(x, y, w, h);
        ctx.restore();

        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.stroke();
    }
}
