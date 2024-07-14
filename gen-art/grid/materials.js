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


class Grid {
    static DEFAULT_DOT = {
        size: 10,
        color: "black"
    }

    constructor(grid_width, grid_height, canvas_width, canvas_height){
        this.MARGIN = 10;
        this.CANVAS = {
            width: canvas_width,
            height: canvas_height  
        } 
        this.grid = Array.apply(null, Array(grid_width)).map((x, i) => { 
            return Array.apply(null, Array(grid_height)).map((y, i) => {
                return JSON.parse(JSON.stringify(Grid.DEFAULT_DOT));
            })
        })
    }

    translate_to_canvas(grid_point_x, grid_point_y) {
        let width_step = this.CANVAS.width / (this.grid.length+1)
        let heigth_step = this.CANVAS.height / (this.grid[grid_point_x].length+1)
        let canvas_point = {
            x: (grid_point_x+1) * width_step,
            y: (grid_point_y+1) * heigth_step
        }
        return canvas_point
    }

    draw_point(point_x, point_y) {
        let grid_point = this.grid[point_x][point_y]
        let canvas_point = this.translate_to_canvas(point_x, point_y)
        console.log(`DRAWING circle at: [${canvas_point.x}, ${canvas_point.y}] `)
        push()
        fill(grid_point.color)
        circle(canvas_point.x, canvas_point.y, grid_point.size)
        pop()
    }
}