/**
 * Static obstacle on the sea floor that the character cannot swim through.
 * Its hitbox is made of one or more polygons that follow the shape of the image.
 */
class Barrier extends MovableObject {
    static PATH = "../assets/img/3. Background/Barrier/";
    /**
     * Per variant: size in the game (at scale 1) and the hitbox polygons.
     * Polygon points are [x, y] in game px, measured from the top left corner of the drawn image.
     * Variant 1 consists of two separate pieces: one hanging from above, one on the floor.
     */
    static VARIANTS = [
        {
            width: 260, height: 167, polygons: [
                [
                    [20, 0], [250, 0], [258, 22], [254, 38], [240, 48], [224, 52], [212, 56], [204, 63], [196, 65], [182, 61],
                    [170, 51], [159, 41], [145, 36], [128, 39], [108, 47], [99, 45], [91, 37], [82, 35], [59, 41], [31, 49],
                    [14, 45], [3, 33], [2, 25], [6, 11]
                ],
                [
                    [0, 156], [6, 147], [20, 140], [46, 133], [77, 128], [108, 124], [139, 121], [170, 124], [193, 125],
                    [224, 127], [241, 131], [250, 142], [255, 152], [256, 159], [254, 167], [0, 167]
                ]
            ]
        },
        {
            width: 300, height: 138, polygons: [
                [
                    [4, 111], [17, 71], [42, 71], [55, 64], [68, 32], [85, 23], [114, 24], [134, 10], [148, 5], [182, 14],
                    [218, 0], [240, 9], [247, 26], [254, 48], [282, 57], [295, 91], [284, 125], [254, 138], [32, 138], [13, 131]
                ]
            ]
        },
        {
            width: 90, height: 185, polygons: [
                [
                    [27, 6], [47, 1], [76, 1], [81, 6], [79, 14], [71, 25], [70, 35], [76, 46], [82, 54], [83, 63], [79, 82],
                    [77, 96], [76, 114], [80, 123], [86, 133], [90, 149], [89, 163], [84, 174], [76, 180], [61, 183], [45, 180],
                    [31, 178], [23, 174], [21, 163], [16, 152], [14, 143], [16, 133], [16, 125], [10, 113], [2, 98], [0, 86],
                    [3, 76], [12, 61], [12, 55], [10, 41], [12, 27], [18, 14]
                ]
            ]
        }
    ];

    /**
     * @param {number} x - Left edge in the level.
     * @param {number} y - Top edge in the level.
     * @param {number} [variant=1] - Image variant from 1 to 3.
     * @param {number} [scale=1] - Size factor: 1 is the default size, 2 doubles width and height.
     */
    constructor(x, y, variant = 1, scale = 1) {
        super();
        let config = Barrier.VARIANTS[variant - 1];
        this.loadImage(`${Barrier.PATH}${variant}.png`);
        this.scale = scale;
        this.width = config.width * scale;
        this.height = config.height * scale;
        this.polygons = config.polygons;
        this.x = x;
        this.y = y;
    }

    /**
     * @returns {number[][][]} The hitbox polygons in level coordinates (scaled and moved to the barrier position).
     */
    worldPolygons() {
        return this.polygons.map(polygon => polygon.map(([px, py]) => [this.x + px * this.scale, this.y + py * this.scale]));
    }

    /**
     * @param {MovableObject} mo - Object to test, its hitbox is used.
     * @returns {boolean} True when the hitbox of the object overlaps any of the polygons.
     */
    collidesWith(mo) {
        let rect = mo.getHitboxRect();
        return this.worldPolygons().some(polygon => Geometry.polygonIntersectsRect(polygon, rect));
    }
}
