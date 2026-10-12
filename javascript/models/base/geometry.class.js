/**
 * Collision helpers for polygons. Points are [x, y] pairs, rectangles are [x, y, width, height].
 */
class Geometry {
    /**
     * Even-odd test: a ray to the right crosses the polygon edges an odd number of times when the point is inside.
     * @param {number[]} point - [x, y].
     * @param {number[][]} polygon - Corner points of the polygon.
     * @returns {boolean} True when the point is inside the polygon.
     */
    static pointInPolygon([px, py], polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let [xi, yi] = polygon[i];
            let [xj, yj] = polygon[j];
            if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside;
        }
        return inside;
    }

    /**
     * @param {number[]} origin - Point o.
     * @param {number[]} a - Point a.
     * @param {number[]} b - Point b.
     * @returns {number} Cross product of o→a and o→b; its sign tells on which side of o→a the point b lies.
     */
    static cross(origin, a, b) {
        return (a[0] - origin[0]) * (b[1] - origin[1]) - (a[1] - origin[1]) * (b[0] - origin[0]);
    }

    /**
     * @param {number[]} a - Start of the first segment.
     * @param {number[]} b - End of the first segment.
     * @param {number[]} c - Start of the second segment.
     * @param {number[]} d - End of the second segment.
     * @returns {boolean} True when the two segments cross each other.
     */
    static segmentsIntersect(a, b, c, d) {
        let sideC = Geometry.cross(a, b, c) > 0;
        let sideD = Geometry.cross(a, b, d) > 0;
        let sideA = Geometry.cross(c, d, a) > 0;
        let sideB = Geometry.cross(c, d, b) > 0;
        return sideC !== sideD && sideA !== sideB;
    }

    /**
     * @param {number[]} point - [x, y].
     * @param {number[]} rect - [x, y, width, height].
     * @returns {boolean} True when the point is inside the rectangle.
     */
    static pointInRect([px, py], [x, y, w, h]) {
        return px > x && px < x + w && py > y && py < y + h;
    }

    /**
     * @param {number[][]} polygon - Corner points of the polygon.
     * @param {number[][]} corners - Corner points of the rectangle in order.
     * @returns {boolean} True when any polygon edge crosses any rectangle edge.
     */
    static edgesCross(polygon, corners) {
        return polygon.some((point, i) => {
            let next = polygon[(i + 1) % polygon.length];
            return corners.some((corner, k) => Geometry.segmentsIntersect(point, next, corner, corners[(k + 1) % 4]));
        });
    }

    /**
     * Checks the three ways a polygon and a rectangle can overlap: a polygon corner inside the rectangle,
     * a rectangle corner inside the polygon, or crossing edges.
     * @param {number[][]} polygon - Corner points of the polygon.
     * @param {number[]} rect - [x, y, width, height].
     * @returns {boolean} True when polygon and rectangle overlap.
     */
    static polygonIntersectsRect(polygon, rect) {
        let [x, y, w, h] = rect;
        let corners = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
        return polygon.some(point => Geometry.pointInRect(point, rect))
            || corners.some(corner => Geometry.pointInPolygon(corner, polygon))
            || Geometry.edgesCross(polygon, corners);
    }
}
