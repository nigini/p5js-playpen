let back_c;
let palette;
let frame_rate;
const MAX_CIRCLE_SIZE = 200;

function setup() {
  back_c = color("#F7EDF0");
  palette = [
    color("#F4CBC6"), 
    color("#F4AFAB"),
    color("#F4EEA9"),
    color("#F4F482")
  ]
  createCanvas(600, 600);
  background(back_c);
  frame_rate = 2;
}

function draw(){
  if(mouseIsPressed) {
    stroke('black');
  } else {
    noStroke();
  }
  frameRate(frame_rate)
  fill(palette[ round(random(palette.length-1)) ]);
  rand_x = random(width);
  rand_y = random(height);
  rand_r = random(MAX_CIRCLE_SIZE);
  circle(rand_x, rand_y, rand_r);
}

function keyPressed() {
  if( keyCode === DOWN_ARROW) {
     frame_rate = (frame_rate <= 1) ? 1 : --frame_rate;
  }
  if( keyCode === UP_ARROW) {
     frame_rate = frame_rate >= 30 ? 30 : ++frame_rate;
  }
}

function keyTyped() {
  let level = Number(key);
  if(level <= 9 && level >= 1) {
    console.log('key', level)
    frame_rate = level*2  
  }
}
