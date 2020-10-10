class Animal extends Clickable{

	palette = ['Green','Orange','Red','Grey','Black','White'];

	/**
	 * @topProduction non-negative integer defining health limit for production
	 * @goodHealthLimit limit of health value, as animals cannot grow healthier infinitely
	 * @healthStart how healthy the animal is borned
	 */
	constructor(topProduction, goodHealthLimit, healthStart, animalDiameter) {
		super(0,0);
		this.width = animalDiameter;
		this.height = animalDiameter;
		this.cornerRadius = animalDiameter/2;
		this.text = '';
		this.stroke = this.palette[0];
		this.color = this.palette[0];

		this.topProduction = topProduction;
		this.goodHealthLimit = goodHealthLimit;
		this.currentHealth = healthStart;
		this.healthHistory = [healthStart];
		this.productionHistory = [];
		this.selected = false;
	}

	/**
	 * Will update health and production based on animal's needs.
	 * @amount non-negative integer value.
	 * @return production after eating.
	 */
	eat(amount) {
		if(!this.isDead()) {
			if (amount > 0) {
				if(this.currentHealth < this.goodHealthLimit){
					this.currentHealth++;
				}
			} else {
				this.currentHealth--;
				this.healthHistory.push(this.currentHealth);
			}
			return this.updateProduction();			
		} else {
			return 0;
		}
	}

	/**
	 * If animal is healthier than topProduction, the animal produces two units.
	 * If animal is as healthy than topProduction, the animal produces one unit.
	 * Otherwise, no production.
	 */
	updateProduction() {
		if(!this.isDead()){
			let currentProduction = 0;
			if(this.currentHealth > this.topProduction){
				currentProduction = 2;
			} else if (this.currentHealth == this.topProduction) {
				currentProduction = 1;
			}
			this.productionHistory.push(currentProduction);
			return currentProduction;			
		} else {
			return 0;
		}
	}

	isDead(){
		return this.currentHealth==0;
	}

	getHealth() {
		return this.currentHealth;
	}

	update() {
		let newColor;
		if (this.currentHealth <= 2) {
			newColor = color(this.palette[2]);
		} else {
			if(this.currentHealth >= this.topProduction){
				newColor = color(this.palette[0]);
			} else {
				newColor = color(this.palette[1]);
			}
		}
		if (this.isDead()) {
			newColor = color(this.palette[3]);
		}

		if(this.selected) {
			this.stroke = color(this.palette[4]);
		} else {
			this.stroke = newColor;
		}
		this.color = newColor;
		this.draw();
	}

	move(posX, posY) {
		//console.log('ANIMAL MOVED: (' + posX + ',' + posY + ')');
		this.cleanFromScreen();
		this.x = posX;
		this.y = posY;
	}

	getPositionX() {
		return this.x;
	}

	getPositionY() {
		return this.y;
	}

	select(){
		this.selected = true;
	}

	deselect(){
		this.selected = false;
	}

	cleanFromScreen() {
		this.color = color(this.palette[5]);
		this.stroke = color(this.palette[5]);
		this.draw();
	}
}