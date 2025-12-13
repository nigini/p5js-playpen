// materials.mjs - Grid line material for GRID_P

class GridLine {
    constructor(p5, gridIndex, orientation, gridSize, canvasSize) {
        this.p5 = p5;
        this.gridIndex = gridIndex;        // which row or column (0 to gridSize)
        this.orientation = orientation;    // 'horizontal' or 'vertical'
        this.gridSize = gridSize;          // total number of grid divisions
        this.canvasSize = canvasSize;      // canvas width or height
        this.cellSize = canvasSize / gridSize;

        // Line properties
        this.color = '#000000';
        this.weight = 1;
        this.brushType = null;  // null = regular p5 line, or set to brush type like 'pen', 'rotring', etc.

        // Calculate line length and position
        this.calculateLineSegment();
    }

    calculateLineSegment() {
        // Random length as a percentage of canvas size (minimum 1 cell, maximum full canvas)
        const minCells = 1;
        const maxCells = this.gridSize;
        const lengthInCells = Math.random() * (maxCells - minCells) + minCells;
        this.length = lengthInCells * this.cellSize;

        // Random position along the line, ensuring it doesn't exceed canvas bounds
        const maxStart = this.canvasSize - this.length;
        this.start = Math.random() * maxStart;
        this.end = this.start + this.length;
    }

    draw() {
        // Calculate coordinates
        let x1, y1, x2, y2;

        if (this.orientation === 'horizontal') {
            const y = this.gridIndex * this.cellSize;
            x1 = this.start;
            y1 = y;
            x2 = this.end;
            y2 = y;
        } else {
            const x = this.gridIndex * this.cellSize;
            x1 = x;
            y1 = this.start;
            x2 = x;
            y2 = this.end;
        }

        // Draw with brush or regular p5
        if (this.brushType) {
            brush.set(this.brushType, this.color, this.weight);
            brush.line(x1, y1, x2, y2);
        } else {
            this.p5.push();
            this.p5.stroke(this.color);
            this.p5.strokeWeight(this.weight);
            this.p5.line(x1, y1, x2, y2);
            this.p5.pop();
        }
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setWeight(weight) {
        this.weight = weight;
        return this;
    }

    setBrush(brushType) {
        this.brushType = brushType;
        return this;
    }
}

// Helper function to find intersection of two ranges
function rangeIntersection(start1, end1, start2, end2) {
    const start = Math.max(start1, start2);
    const end = Math.min(end1, end2);

    if (start <= end) {
        return { start, end };
    }
    return null; // No overlap
}

// Find all closed rectangles formed by the grid lines
function findRectangles(lines) {
    const rectangles = [];

    // Separate horizontal and vertical lines
    const horizontals = lines.filter(l => l.orientation === 'horizontal');
    const verticals = lines.filter(l => l.orientation === 'vertical');

    // Try all pairs of horizontal lines
    for (let i = 0; i < horizontals.length; i++) {
        for (let j = i + 1; j < horizontals.length; j++) {
            const h1 = horizontals[i];
            const h2 = horizontals[j];

            // Find x-overlap of these two horizontal lines
            const xOverlap = rangeIntersection(h1.start, h1.end, h2.start, h2.end);

            if (xOverlap) {
                // Try all pairs of vertical lines
                for (let m = 0; m < verticals.length; m++) {
                    for (let n = m + 1; n < verticals.length; n++) {
                        const v1 = verticals[m];
                        const v2 = verticals[n];

                        // Find y-overlap of these two vertical lines
                        const yOverlap = rangeIntersection(v1.start, v1.end, v2.start, v2.end);

                        if (yOverlap) {
                            // Get actual positions
                            const y1 = h1.gridIndex * h1.cellSize;
                            const y2 = h2.gridIndex * h2.cellSize;
                            const x1 = v1.gridIndex * v1.cellSize;
                            const x2 = v2.gridIndex * v2.cellSize;

                            // Check if all 4 corners are enclosed
                            // Horizontals must cover both vertical x positions
                            // Verticals must cover both horizontal y positions
                            if (x1 >= xOverlap.start && x1 <= xOverlap.end &&
                                x2 >= xOverlap.start && x2 <= xOverlap.end &&
                                y1 >= yOverlap.start && y1 <= yOverlap.end &&
                                y2 >= yOverlap.start && y2 <= yOverlap.end) {

                                rectangles.push({
                                    x: x1,
                                    y: y1,
                                    width: x2 - x1,
                                    height: y2 - y1
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    return rectangles;
}

export { GridLine, findRectangles };
