let field;
let days = 1;
let animals = 4;


function setup() {
	frameRate(1);
	createCanvas(600, 400);
	field = new Field(10, 10, 4, 4, 50);
}

function draw() {
	field.draw();
	eat();
	//noLoop();
}

function eat() {
	let withdawn = field.withdrawResources(animals);
	if(withdawn > 0) {
		noLoop();
		console.log('SORRY! You have consumed all the resources! =(')
	} else {
		console.log('Day: ' + days++);
	}
}