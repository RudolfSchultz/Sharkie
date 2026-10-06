/**
 * Shared drawing helpers for everything drawn on top of the game (fixed to the screen).
 */
class HudElement {
    static fontLoaded = document.fonts.load("13px 'Luckiest Guy'");   

    panel(ctx, x, y, w, h, radius = 14, alpha = 0.62) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.45)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
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

    text(ctx, str, x, y, align, size = 13, color = "rgba(255,255,255,0.92)") {
        ctx.font = `${size}px 'Luckiest Guy', sans-serif`;
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.fillText(str, x, y);
    }
}
