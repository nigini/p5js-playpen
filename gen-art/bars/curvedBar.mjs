// curvedBar.mjs - Bezier curved bar class for more organic shapes

class CurvedBar {
    constructor(p5, length, width, fill = false, stroke = '#FFFFFF', curviness = 0.3) {
        this.p5 = p5;
        this.length = length;
        this.width = width;
        this.fill = fill;
        this.stroke = stroke;
        this.curviness = curviness; // 0 = straight, 1 = very wavy
    }

    draw(x, y, rotate_angle = 0) {
        this.p5.push();

        if (!this.fill) {
            this.p5.noFill();
        } else {
            this.p5.fill(this.fill);
        }

        if (!this.stroke) {
            this.p5.noStroke();
        } else {
            this.p5.stroke(this.stroke);
        }

        this.p5.translate(x, y);
        this.p5.rotate(rotate_angle);

        // Create curved shape using bezier curves
        // Random control points for organic variation
        let topCp1Y = this.p5.random(-this.length * this.curviness, this.length * this.curviness);
        let topCp2Y = this.p5.random(-this.length * this.curviness, this.length * this.curviness);
        let bottomCp1Y = this.p5.random(-this.length * this.curviness, this.length * this.curviness);
        let bottomCp2Y = this.p5.random(-this.length * this.curviness, this.length * this.curviness);

        this.p5.beginShape();

        // Top edge (curved)
        this.p5.vertex(0, 0);
        this.p5.bezierVertex(
            this.length / 3, topCp1Y,
            2 * this.length / 3, topCp2Y,
            this.length, 0
        );

        // Right edge
        this.p5.vertex(this.length, this.width);

        // Bottom edge (curved back)
        this.p5.bezierVertex(
            2 * this.length / 3, this.width + bottomCp2Y,
            this.length / 3, this.width + bottomCp1Y,
            0, this.width
        );

        this.p5.endShape(this.p5.CLOSE);

        this.p5.pop();
    }
}

export { CurvedBar };
