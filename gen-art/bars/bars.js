function setup() {
    let art = createCanvas(1920, 1080)
    art.parent('my_art')
    //frameRate(10)

    //CONFIG
    COLORS = new MyColors()
    COLORS.setCyberpunk()
    background(COLORS.getBackground())
    BAR_DIM = new BarDimensions(BarDimensions.long_thin_hete)
    NUM_ELEMENTS = 10
}

function draw() {
    angleMode(DEGREES);
    for(let element=0; element<NUM_ELEMENTS; element++) {
        let dim = BAR_DIM.getDimension(height)
        let rot_angle = random(25, 95)
        let bar = new Bar(
            dim.length,
            dim.width,
            COLORS.randomColor(),
            false
        )
        bar.draw(element*(width/NUM_ELEMENTS), 0, rot_angle)
    }
    noLoop()
}
