let field;
let days = 1;
let animals = [];
let animalDiameter = 20;
let animalsX, animalsY;

function setup() {
	frameRate(1);
	createCanvas(600, 400);
	animalsX = 100;
	animalsY = 300;
	field = new Field(animalsX, 10, 4, 4, 50);
	while (animals.length <=3) {
		animals.push(new Animal(4,5,5,animalDiameter));
	}
}

function draw() {
	field.draw();
	for(let animal = 0; animal < animals.length; animal++) {
		animals[animal].draw((animalsX+10)+((animalDiameter+10)*animal), animalsY);
	}
	feedAnimals();
	//noLoop();
}

function feedAnimals() {
	let withdrawn = field.withdrawResources(animals.length);
	if(withdrawn == 0) {
		console.log('DISASTER! You have consumed all the resources! =(');
	}
	let production = [];
	let areAnimalsDead = false;
	for (animal of animals) {
		if(withdrawn > 0){
			production.push(animal.eat(1));
			withdrawn--;
		} else {
			production.push(animal.eat(0));
		}
		areAnimalsDead = areAnimalsDead | animal.isDead();
	}
	console.log('Day: ' + days++);
	console.log('Production: ' + JSON.stringify(production));
	if (areAnimalsDead) {
		noLoop();
		console.log('POOR ANIMALS! :(')
	}
}