// materials.mjs - ES6 module version of materials classes

class MyColors {
    constructor(p5) {
        this.p5 = p5;
        this.background = p5.color('#FFFFFF');
        this.colorPalette = [];
    }

    setCyberpunk() {
        this.background = this.p5.color('#000000');
        this.colorPalette.push(this.p5.color('#E0AA24'));
        this.colorPalette.push(this.p5.color('#E02466'));
        this.colorPalette.push(this.p5.color('#23E032'));
        this.colorPalette.push(this.p5.color('#2457E0'));
    }

    getBackground() {
        return this.background;
    }

    randomColor() {
        return this.p5.random(this.colorPalette);
    }
}


class BarDimensions {
    constructor(dim_method) {
        this.dimensions = dim_method;
    }

    getDimension(seed) {
        return this.dimensions(seed);
    }

    static long_thin_homo(seed) {
        return {
            length: seed,
            width: seed / 100
        };
    }

    static long_thin_hete(p5) {
        return (seed) => ({
            length: seed,
            width: p5.random(seed / 40, seed / 10)
        });
    }
}


class Bar {
    constructor(p5, length, width, fill = false, stroke = '#FFFFFF') {
        this.p5 = p5;
        this.length = length;
        this.width = width;
        this.fill = fill;
        this.stroke = stroke;
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
        this.p5.rect(0, 0, this.length, this.width);

        this.p5.pop();
    }
}

export { MyColors, BarDimensions, Bar };
