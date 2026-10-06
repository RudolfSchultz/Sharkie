/**
 * One animated bar (fill, damage trail, hit flash). Reads its value via getValue() every frame.
 */
class AnimatedBar {
    constructor(getValue, max) {
        this.getValue = getValue;
        this.max = max;
        this.lastValue = getValue();
        this.display = this.lastValue;   
        this.trail = this.lastValue;     
        this.trailDelay = 0;
        this.flash = 0;
        this.intro = 1;                  
    }

    update() {
        let value = this.getValue();
        if (value < this.lastValue) {
            this.flash = 1;
            this.trailDelay = 25;
        }
        if (value > this.lastValue) this.trail = value;
        this.lastValue = value;

        this.display += (value - this.display) * 0.25;
        if (Math.abs(value - this.display) < 0.05) this.display = value;
        if (this.trailDelay > 0) this.trailDelay--;
        else this.trail += (this.display - this.trail) * 0.06;
        if (this.trail < this.display) this.trail = this.display;

        this.flash = Math.max(0, this.flash - 0.08);
        this.intro = Math.min(1, this.intro + 0.012);
    }

    percentage() {
        return this.display / this.max * this.intro;
    }

    /**
     * @param colorsFor - function(pct) → [topColor, bottomColor]
     * @param anchorRight - true: bar shrinks towards the right end
     */
    draw(ctx, x, y, w, h, colorsFor, anchorRight = false, segments = 10) {
        let pct = this.percentage();
        let trailPct = this.trail / this.max * this.intro;
        let fill = p => anchorRight ? ctx.fillRect(x + w * (1 - p), y, w * p, h) : ctx.fillRect(x, y, w * p, h);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, h / 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.save();
        ctx.clip();
        ctx.fillStyle = "rgba(255,235,235,0.85)";    // Schadensspur
        fill(trailPct);

        let [c1, c2] = colorsFor(pct);               // Füllung
        let gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;
        fill(pct);

        ctx.fillStyle = "rgba(255,255,255,0.25)";    // Glanz
        anchorRight ? ctx.fillRect(x + w * (1 - pct), y + 1, w * pct, h * 0.38) : ctx.fillRect(x, y + 1, w * pct, h * 0.38);

        ctx.fillStyle = "rgba(0,0,0,0.28)";          // Segment-Striche
        for (let i = 1; i < segments; i++) ctx.fillRect(x + (w / segments) * i - 0.5, y, 1, h);

        ctx.fillStyle = `rgba(255,255,255,${this.flash * 0.6})`;   // Treffer-Blitz
        ctx.fillRect(x, y, w, h);
        ctx.restore();

        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.stroke();
        ctx.restore();
    }
}
