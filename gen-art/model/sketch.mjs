// sketch.mjs - ES6 module version using p5.js instance mode
import chroma from '../lib/colors.mjs';

const sketch = (p5) => {
    let NUM_ELEMENTS;

    p5.setup = () => {
        let art = p5.createCanvas(1080, 1080);
        art.parent('my_art');
        p5.frameRate(10);

        // Use chroma for colors
        p5.background(chroma('#000000').hex());
        NUM_ELEMENTS = 10;
    }

    p5.draw = () => {
        // Your drawing code here
        // Example using chroma:
        p5.fill(chroma('#E0AA24').hex());
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
    }
}

export default sketch;
