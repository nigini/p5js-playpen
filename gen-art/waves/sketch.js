function setup() {
    let art = createCanvas(1920, 1080);
    art.parent('my_art');
    frameRate(10);

    waveShift = width / 100;
    defaultWaveDiamenter = width / 5;
    colorPalette = [
        color('#9874AA'),
        color('#774A8E'),
        color('#592A71'),
        color('#3E1255')
    ];
    wave_number = 100;
    wave_count = 0;

    waves = setupWaveByDiameter();
    //waves = setupWaveByColor(height/4, height/2, true);
}

function draw() {
    //draw_scattered();
    draw_flowers();
}

function draw_flowers() {
    let wave_elem = waves[wave_count++];
    push();
    wave_elem.draw((width/2), (height/2));
    pop();
    if (wave_count >= waves.length) {
        noloop();
    }
}

function positionRandom(randomLower=0, randomHigher=width){
    return {
        x: random(randomLower, randomHigher),
        y: random(randomLower, randomHigher)
    }
}

function positionStripes(wave_count, wave){
    return {
        x: (height/6)*(wave_count+1),
        y: (width/20)*(wave+1)
    }
}

function draw_scattered() {
    let wave_elem = waves[wave_count++];
    for (let wave = 0; wave < wave_number; wave++) {
        let pos = positionRandom();
        push();
        wave_elem.draw(pos.x, pos.y);
        pop();
    }
    if (wave_count > waves.length) {
        noloop();
    }
}

function draw_strips() {
    let wave_elem = waves[wave_count++];
    for (let wave = 0; wave < wave_number; wave++) {
        let pos = positionStripes(wave_count, wave);
        push();
        wave_elem.draw(pos.x, pos.y);
        pop();
    }
    if (wave_count > waves.length) {
        noloop();
    }
}

function setupWaveByDiameter() {
    let wave = [];
    for(let count = 0; count < wave_number; count++){
        let color = colorPalette[count%colorPalette.length];
        wave.push(new WaveElement(defaultWaveDiamenter-(count*5), waveShift, false, color));
    }
    return wave;
}

function setupWaveByColor(sizeLow=0, sizeHigh=0, rotate=false) {
    let wave = [];
    let rotateShift = 0;
    let stroke = '#000000'
    for(let color of colorPalette){
        let size = defaultWaveDiamenter;
        if(sizeLow > 0 && sizeHigh > sizeLow) {
            size = random(sizeLow, sizeHigh);
        }
        if(rotate) rotateShift = waveShift;
        wave.push(new WaveElement(size, rotateShift, color, stroke));
    }
    return wave;
}
