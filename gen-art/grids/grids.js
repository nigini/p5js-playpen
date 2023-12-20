function setup() {
    let art = createCanvas(1920, 1080)
    art.parent('my_art')
    frameRate(10)
    background('black')

    //CONFIG
    COLORS = new MyColors()
    BAR_DIM = new BarDimensions()
    NUM_ELEMENTS = 10
    MIN_ELEMENT_DIM = width/20
    MAX_ELEMENT_DIM = width

}

function draw() {
    for(let element=0; element<NUM_ELEMENTS; element++) {
        let dim = BAR_DIM.randomDimension(random([width, height]))
        print(dim)
        let bar = new Bar(
            dim.length,
            dim.width,
            COLORS.randomColor(),
            false
        )
        bar.draw(random(0,width), random(0,height))
    }
    noLoop()
}