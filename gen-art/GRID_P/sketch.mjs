// sketch.mjs - ES6 module version using p5.js instance mode
import chroma from '../lib/colors.mjs';
import { GridLine } from './materials.mjs';

const sketch = (p5) => {
    // CONFIG
    const GRID_SIZE = 20;
    const LINE_PROBABILITY = 80; // percentage (0-100)

    let lines = [];

    p5.setup = () => {
        let art = p5.createCanvas(1080, 1080);
        art.parent('my_art');

        // White background
        p5.background('#FFFFFF');

        // Create grid lines
        createGridLines();

        // Draw all lines
        drawGrid();

        // Don't loop
        p5.noLoop();
    }

    const createGridLines = () => {
        // Create horizontal lines
        for (let row = 0; row <= GRID_SIZE; row++) {
            if (Math.random() * 100 < LINE_PROBABILITY) {
                const line = new GridLine(p5, row, 'horizontal', GRID_SIZE, p5.width);
                lines.push(line);
            }
        }

        // Create vertical lines
        for (let col = 0; col <= GRID_SIZE; col++) {
            if (Math.random() * 100 < LINE_PROBABILITY) {
                const line = new GridLine(p5, col, 'vertical', GRID_SIZE, p5.height);
                lines.push(line);
            }
        }
    }

    const drawGrid = () => {
        lines.forEach(line => line.draw());
    }

    p5.draw = () => {
        // Empty - all drawing happens in setup
    }
}

export default sketch;
