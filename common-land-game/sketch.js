let field;
let currentDay = 0;
let dayDuration = 5*1000; //Five seconds
let animalDiameter = 20;
let animalsX, animalsY;
let selectedAnimal;
let finished = false;

let animals = []; //ToDo: Should be moved to game_data
let lastRoundProduction = []; //ToDo: Should be moved to game_data
let game_data = {
	days: [],
	production: [],
	health: [],
	field_capacity: [],
};

function setup() {
	frameRate(30);
	let game = createCanvas(400, 400);
	game.parent('my_game');
	animalsX = 100;
	animalsY = 300;
	field = new Field(animalsX, 10, 4, 4, 50);
	for(let animal=0; animal < 4; animal++) {
		animals.push(new Animal(4,5,5, animalDiameter));
		animals[animal].move((animalsX+10)+((animalDiameter+10)*animal), animalsY);

		animals[animal].onPress = function () {
			this.select();
			selectedAnimal = this;
			console.log("UHU!?")
		}
		animals[animal].onRelease = function () {
			this.deselect();
			selectedAnimal = null;
			console.log("MOOOO!")
		}
	}
	viz_setup(['health','production','field_capacity']);
	updateGameData();
	viz_update(game_data);
}

function draw() {
	field.draw();
	for(let animal = 0; animal < animals.length; animal++) {
		animals[animal].update();
	}
	let dayFromTime = Math.floor(millis()/dayDuration);
	if(dayFromTime > currentDay) {
		console.log('Day: ' + ++currentDay);
		feedAnimals();
		field.regenerateField();
		updateGameData();
		viz_update(game_data);
		console.log('Field: ' + game_data.field_capacity[currentDay] +
					' - Health: ' + game_data.health[currentDay] +
					' - Production: ' + game_data.production[currentDay]);
	}
	if (finished) {
		noLoop()
	}
}

function feedAnimals() {
	let production = [];
	let areAnimalsDead = true;
	for (let animal of animals) {
		let animalProduction = 0;
		let consumedResource = 0;
		if(!animal.isDead()){
			consumedResource = field.withdrawResource(animal.getPositionX(),animal.getPositionY());
			animalProduction = animal.eat(consumedResource);
		}
		production.push(animalProduction);
		areAnimalsDead = areAnimalsDead && animal.isDead();
	}
	lastRoundProduction = production;
	if (areAnimalsDead) {
		finished = true;
		console.log('SORRY! Your animals are dead! :(')
		document.getElementById("message").style.display = "block"
	}
}

function mouseDragged() {
	if(selectedAnimal) {
		selectedAnimal.move(mouseX, mouseY);
	}
}

function updateGameData() {
	game_data.days.push(currentDay);
	game_data.field_capacity.push(field.getCurrentCapacity());
	let health = 0;
	for (let animal of animals) {
		health += animal.getHealth();
	}
	game_data.health.push(health);
	let production = 0;
	if(currentDay > 0)
		production = game_data.production[currentDay-1];
	for (let prod of lastRoundProduction) {
		production += prod;
	}
	game_data.production.push(production);
}