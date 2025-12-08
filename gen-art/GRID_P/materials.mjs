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
        this.p5.push();
        this.p5.stroke(this.color);
        this.p5.strokeWeight(this.weight);

        if (this.orientation === 'horizontal') {
            // Horizontal line at fixed y position
            const y = this.gridIndex * this.cellSize;
            this.p5.line(this.start, y, this.end, y);
        } else {
            // Vertical line at fixed x position
            const x = this.gridIndex * this.cellSize;
            this.p5.line(x, this.start, x, this.end);
        }

        this.p5.pop();
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setWeight(weight) {
        this.weight = weight;
        return this;
    }
}

export { GridLine };
