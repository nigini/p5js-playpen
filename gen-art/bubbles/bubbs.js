let back_c;
let palette;
let frame_rate = 2;
const MAX_CIRCLE_SIZE = 200;
const MIN_FRAME_SPEED = 0;
const MAX_FRAME_SPEED = 20;


function setup() {
  back_c = color("#F7EDF0");
  palette = [
    color("#F4CBC6"), 
    color("#F4AFAB"),
    color("#F4EEA9"),
    color("#F4F482")
  ]
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('my_art');
  background(back_c);
  stroke('black');
  strokeWeight(0); //CONTROLLED BY TRLS_A
  frameRate(frame_rate); //CONTROLLED BY TRLS_H
  activate_trellis();
}


function draw(){
  fill(palette[ round(random(palette.length-1)) ]);
  rand_x = random(width);
  rand_y = random(height);
  rand_r = random(MAX_CIRCLE_SIZE);
  circle(rand_x, rand_y, rand_r);
}

function set_frame_rate(value) {
  if((frame_rate >= MIN_FRAME_SPEED) && (frame_rate <= MAX_FRAME_SPEED) ) {
    frame_rate = value;
    frameRate(frame_rate);
    return true;
  } else {
    return false;
  }
}


function keyPressed() {
  if( keyCode === DOWN_ARROW) {
    set_frame_rate(frame_rate-1);
  }
  if( keyCode === UP_ARROW) {
    set_frame_rate(frame_rate+1);
  }
}


function keyTyped() {
  trellis.process_char(key);
}


function activate_trellis() {
  // ROW A: CONTROL STROKE
  for(let col=0; col<8; col++){
    trellis.on_press('a', `${col+1}`, (key, k_evt) => {
      if(k_evt === 'DOWN') {
        strokeWeight(col);
      }
    });
  }


  // ROW H: CONTROL SPEED
  for(let col=0; col<8; col++){
    trellis.on_press('h', `${col+1}`, (key, k_evt) => {
      if(k_evt === 'DOWN') {
        set_frame_rate(col*2);
      }
    });
  }
}
