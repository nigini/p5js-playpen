class MyColors {
    constructor(){
        this.colorPalette = [
            color('#E0AA24'),
            color('#E02466'),
            color('#23E032'),
            color('#2457E0')
        ];
    }

    randomColor() {
        return random(this.colorPalette)
    }
}


class BarDimensions {
    constructor(){
        this.dimensions = [
            this.long_thin
        ]
    }

    randomDimension(seed){
        return random(this.dimensions)(seed)
    }

    long_thin(seed) {
        return {
            length:seed,
            width:seed/100
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

    draw(x, y) {
        push()
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
        translate(x,y);
        rect(0, 0, this.length, this.width);
        pop()
    }
}