class WaveElement {
    constructor(elementSize, waveShift, fill=false, stroke= '#FFFFFF') {
        this.waveShift = waveShift;
        this.elementSize = elementSize;
        this.fill = fill;
        this.stroke = stroke;
    }

    draw(x, y) {
        rectMode(CENTER);
        if (!this.fill) {
            noFill();
        } else {
            fill(this.fill);
        }
        if (!this.stroke) {
            noStroke();
        } else {
            stroke(this.stroke);
        }
        let shift = random(-this.waveShift, this.waveShift);
        translate(x,y);
        rotate(shift);
        rect(0, 0, this.elementSize, this.elementSize);
    }
}