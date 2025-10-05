// sketch.mjs - ES6 module version using p5.js instance mode with CurvedBars
import { MyColors, BarDimensions, Bar } from './materials.mjs';
import { CurvedBar } from './curvedBar.mjs';

const sketch = (p5) => {
    let COLORS;
    let BAR_DIM;
    let NUM_ELEMENTS;

    p5.setup = () => {
        let art = p5.createCanvas(1080, 1080);
        art.parent('my_art');

        // CONFIG
        COLORS = new MyColors(p5);
        COLORS.setCyberpunk();
        p5.background(COLORS.getBackground());
        BAR_DIM = new BarDimensions(BarDimensions.long_thin_hete(p5));
        NUM_ELEMENTS = 4;
    }

    p5.draw = () => {
        p5.angleMode(p5.DEGREES);

        for (let element = 0; element < NUM_ELEMENTS; element++) {
            let dim = BAR_DIM.getDimension(p5.height);
            let rot_angle = p5.random(25, 95);

            // Use CurvedBar instead of regular Bar
            let bar = new CurvedBar(
                p5,
                dim.length,
                dim.width,
                COLORS.randomColor(),
                false,
                0.3  // curviness parameter - adjust for more/less curve
            );

            bar.draw(element * (p5.width / NUM_ELEMENTS), 0, rot_angle);
        }

        p5.noLoop();
    }
}

export default sketch;
