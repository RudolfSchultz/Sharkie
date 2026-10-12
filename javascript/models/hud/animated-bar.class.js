/**
 * One animated bar (fill, damage trail, hit flash). Reads its value via getValue() every frame.
 */
class AnimatedBar {
    /**
     * @param {function(): number} getValue - Returns the current value of the bar.
     * @param {number} max - Value at which the bar is full.
     */
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

    /**
     * Advances the animation one frame: eases the fill, fades the damage trail and the hit flash.
     */
    update() {
        let value = this.getValue();
        if (value < this.lastValue) {
            this.flash = 1;
            this.trailDelay = 25;
        }
        if (value > this.lastValue) this.trail = value;
        this.lastValue = value;
        this.easeDisplay(value);
        this.fadeTrail();
        this.flash = Math.max(0, this.flash - 0.08);
        this.intro = Math.min(1, this.intro + 0.012);
    }

    /**
     * Lets the displayed fill level catch up with the real value.
     * @param {number} value - Current value.
     */
    easeDisplay(value) {
        this.display += (value - this.display) * 0.25;
        if (Math.abs(value - this.display) < 0.05) this.display = value;
    }

    /**
     * Lets the damage trail follow the fill after a short delay.
     */
    fadeTrail() {
        if (this.trailDelay > 0) this.trailDelay--;
        else this.trail += (this.display - this.trail) * 0.06;
        if (this.trail < this.display) this.trail = this.display;
    }

    /**
     * @returns {number} Fill level from 0 to 1, including the intro animation.
     */
    percentage() {
        return this.display / this.max * this.intro;
    }

    /**
     * Draws the bar.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {{x: number, y: number, w: number, h: number}} rect - Position and size.
     * @param {function(number): string[]} colorsFor - Gets the fill level, returns [topColor, bottomColor].
     * @param {boolean} [anchorRight=false] - True: the bar shrinks towards the right end.
     * @param {number} [segments=10] - Number of segment dividers.
     */
    draw(ctx, rect, colorsFor, anchorRight = false, segments = 10) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(rect.x, rect.y, rect.w, rect.h, rect.h / 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        this.drawContent(ctx, rect, colorsFor, anchorRight, segments);
        ctx.strokeStyle = "rgba(255,255,255,0.22)";
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Draws trail, fill, gloss, segment dividers and hit flash, clipped to the bar shape.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {{x: number, y: number, w: number, h: number}} rect - Position and size.
     * @param {function(number): string[]} colorsFor - Gets the fill level, returns [topColor, bottomColor].
     * @param {boolean} anchorRight - True: the bar shrinks towards the right end.
     * @param {number} segments - Number of segment dividers.
     */
    drawContent(ctx, rect, colorsFor, anchorRight, segments) {
        let pct = this.percentage();
        ctx.save();
        ctx.clip();
        this.fillPart(ctx, rect, anchorRight, this.trail / this.max * this.intro, "rgba(255,235,235,0.85)");
        this.fillPart(ctx, rect, anchorRight, pct, this.gradient(ctx, rect, colorsFor(pct)));
        this.fillPart(ctx, rect, anchorRight, pct, "rgba(255,255,255,0.25)", rect.h * 0.38, 1);
        this.drawSegments(ctx, rect, segments);
        ctx.fillStyle = `rgba(255,255,255,${this.flash * 0.6})`;
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        ctx.restore();
    }

    /**
     * Fills the given share of the bar, growing from the left or from the right.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {{x: number, y: number, w: number, h: number}} rect - Position and size.
     * @param {boolean} anchorRight - True: grow from the right end.
     * @param {number} p - Share of the bar from 0 to 1.
     * @param {string|CanvasGradient} style - Fill style.
     * @param {number} [height=rect.h] - Height of the filled part.
     * @param {number} [offsetY=0] - Distance from the top edge.
     */
    fillPart(ctx, rect, anchorRight, p, style, height = rect.h, offsetY = 0) {
        ctx.fillStyle = style;
        let x = anchorRight ? rect.x + rect.w * (1 - p) : rect.x;
        ctx.fillRect(x, rect.y + offsetY, rect.w * p, height);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {{x: number, y: number, w: number, h: number}} rect - Position and size.
     * @param {string[]} colors - [topColor, bottomColor].
     * @returns {CanvasGradient} Vertical gradient over the bar height.
     */
    gradient(ctx, rect, colors) {
        let gradient = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.h);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        return gradient;
    }

    /**
     * Draws the thin dividers that split the bar into segments.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {{x: number, y: number, w: number, h: number}} rect - Position and size.
     * @param {number} segments - Number of segments.
     */
    drawSegments(ctx, rect, segments) {
        ctx.fillStyle = "rgba(0,0,0,0.28)";
        for (let i = 1; i < segments; i++) ctx.fillRect(rect.x + (rect.w / segments) * i - 0.5, rect.y, 1, rect.h);
    }
}
