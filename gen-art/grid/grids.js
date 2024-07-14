//CONFIG
const GRID_SIZE = 10;
let THE_GRID = null;


function setup() {
    let art = createCanvas(1080, 1080)
    art.parent('my_art')
    frameRate(10)
    background('lightgrey')
    THE_GRID = new Grid(GRID_SIZE, GRID_SIZE, art.width, art.height)
}

function draw() {
    for(let point_x=0; point_x<GRID_SIZE; point_x++) {
        for(let point_y=0; point_y<GRID_SIZE; point_y++) {
            THE_GRID.draw_point(point_x, point_y)
        }
    }
    noLoop()
}