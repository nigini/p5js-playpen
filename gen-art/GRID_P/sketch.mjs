// sketch.mjs - ES6 module version using p5.js instance mode
import chroma from '../lib/colors.mjs';
import { Palette, PALETTES } from '../lib/colors.mjs';
import { GridLine, findRectangles } from './materials.mjs';

const sketch = (p5) => {
    // CONFIG
    const GRID_SIZE = 20;
    const LINE_PROBABILITY = 80; // percentage (0-100)

    let lines = [];
    let rectangles = [];
    let palette;

    p5.setup = () => {
        let art = p5.createCanvas(1080, 1080);
        art.parent('my_art');

        // Setup palette
        palette = new Palette();
        palette.setCustom(PALETTES.pastel.colors, PALETTES.pastel.background);

        // Background
        p5.background(palette.getBackgroundHex());

        // Create grid lines
        createGridLines();

        // Find closed rectangles
        rectangles = findRectangles(lines);
        console.log(`Found ${rectangles.length} closed rectangles`);

        // Draw rectangles first
        drawRectangles();

        // Draw grid lines on top
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

    const drawRectangles = () => {
        p5.noStroke();
        rectangles.forEach(rect => {
            // 25% chance to paint this rectangle
            if (Math.random() < 0.25) {
                p5.fill(palette.randomColor().hex());
                p5.rect(rect.x, rect.y, rect.width, rect.height);
            }
        });
    }

    const drawGrid = () => {
        lines.forEach(line => line.draw());
    }

    p5.draw = () => {
        // Empty - all drawing happens in setup
    }
}

export default sketch;
