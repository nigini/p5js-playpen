class MyColors {
    constructor(){
        // https://coolors.co/313715-d16014-939f5c-bbce8a-e2f9b8
        this.colorPalette = [
            color('#313715'),
            color('#D16014'),
            color('#939F5C'),
            color('#BBCE8A'),
            color('#E2F9B8')
        ];
    }

    randomColor() {
        return random(this.colorPalette)
    }
}


class Grid {
    static DEFAULT_DOT = {
        size: 30,
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
        push()
        noStroke()
        fill(grid_point.color)
        circle(canvas_point.x, canvas_point.y, grid_point.size)
        pop()
    }

    set_point_property(point_x, point_y, prop_name, prop_value) {
        let grid_point = this.grid[point_x][point_y]
        grid_point[prop_name] = prop_value
    }
}