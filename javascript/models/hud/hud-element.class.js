/**
 * Shared drawing helpers for everything drawn on top of the game (fixed to the screen).
 */
class HudElement {
    /**
     * Resolves once the HUD font is available.
     */
    static fontLoaded = document.fonts.load("13px 'Luckiest Guy'");   

    /**
     * Draws a rounded, semi-transparent panel with shadow.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {number} x - Left edge.
     * @param {number} y - Top edge.
     * @param {number} w - Width.
     * @param {number} h - Height.
     * @param {number} [radius=14] - Corner radius.
     * @param {number} [alpha=0.62] - Background opacity.
     */
    panel(ctx, x, y, w, h, radius = 14, alpha = 0.62) {
        ctx.save();
        this.applyShadow(ctx);
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        ctx.fillStyle = `rgba(6, 18, 38, ${alpha})`;
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Sets the soft drop shadow used by panels.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    applyShadow(ctx) {
        ctx.shadowColor = "rgba(0,0,0,0.45)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
    }

    /**
     * Draws HUD text in the game font.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     * @param {string} str - Text to draw.
     * @param {number} x - X position (depends on align).
     * @param {number} y - Baseline y position.
     * @param {CanvasTextAlign} align - Horizontal alignment.
     * @param {number} [size=13] - Font size in px.
     * @param {string} [color] - CSS fill color.
     */
    text(ctx, str, x, y, align, size = 13, color = "rgba(255,255,255,0.92)") {
        ctx.font = `${size}px 'Luckiest Guy', sans-serif`;
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.fillText(str, x, y);
    }
}
