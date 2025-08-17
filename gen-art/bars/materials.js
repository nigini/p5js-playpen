class MyColors {
    constructor(){
        this.background = color('#FFFFFF')
        this.colorPalette = [];
    }

    setCyberpunk(){
        this.background = color('#000000')
        this.colorPalette.push(color('#E0AA24'))
        this.colorPalette.push(color('#E02466'))
        this.colorPalette.push(color('#23E032'))
        this.colorPalette.push(color('#2457E0'))
    }

    getBackground(){
        return this.background;
    }

    randomColor() {
        return random(this.colorPalette)
    }
}


class BarDimensions {
    constructor(dim_method){
        this.dimensions = dim_method;
    }

    getDimension(seed){
        return this.dimensions(seed);
    }


    static long_thin_homo(seed) {
        return {
            length:seed,
            width:seed/100
        }
    }

    static long_thin_hete(seed) {
        return {
            length:seed,
            width:random(seed/40, seed/10)
        }
    }

}


class Bar {
    constructor(length, width, fill=false, stroke= '#FFFFFF') {
        this.length = length;
        this.width = width;
        this.fill = fill;
        this.stroke = stroke;
    }

    draw(x, y, rotate_angle=0) {
        push()
        //rectMode(CENTER);
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
        translate(x,y);
        rotate(rotate_angle)
        rect(0, 0, this.length, this.width);
        pop()
    }

}
