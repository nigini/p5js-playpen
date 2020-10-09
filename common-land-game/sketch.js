let field;
let days = 0;
let dayDuration = 5*1000; //Five seconds
let animals = [];
let animalDiameter = 20;
let animalsX, animalsY;
let selectedAnimal;

function setup() {
	frameRate(30);
	createCanvas(600, 400);
	animalsX = 100;
	animalsY = 300;
	field = new Field(animalsX, 10, 4, 4, 50);
	for(let animal=0; animal < 4; animal++) {
		animals.push(new Animal(4,5,5, animalDiameter));
		animals[animal].onPress = function () {
			console.log('CLICKED: ' + animal);
			this.select();
			selectedAnimal = this;
		}
		animals[animal].move((animalsX+10)+((animalDiameter+10)*animal), animalsY);
	}
}

function draw() {
	field.draw();
	for(let animal = 0; animal < animals.length; animal++) {
		animals[animal].update();
	}
	let currentDay = floor(millis()/dayDuration);
	if(currentDay > days) {
		console.log('Day: ' + ++days);
		console.log('SELECTED: ' + selectedAnimal);
		feedAnimals();
	}
}

function feedAnimals() {
	let production = [];
	let areAnimalsDead = true;
	for (animal of animals) {
		let animalProduction = 0;
		let consumedResource = 0;
		if(!animal.isDead()){
			consumedResource = field.withdrawResource(animal.getPositionX(),animal.getPositionY());
			animalProduction = animal.eat(consumedResource);
		}
		production.push(animalProduction);
		areAnimalsDead = areAnimalsDead && animal.isDead();
	}
	console.log('Production: ' + production);
	if (areAnimalsDead) {
		noLoop();
		console.log('SORRY! Your animals are dead! :(')
	}
}

function mouseDragged() {
	if(selectedAnimal) {
		selectedAnimal.move(mouseX, mouseY);
	}
}

function mouseReleased() {
	if(selectedAnimal) {
		selectedAnimal.deselect();
		selectedAnimal = null;
	}
}