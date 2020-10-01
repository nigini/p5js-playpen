class Animal {

	pallete = ['Green','Orange','Red','Black'];

	/**
	 * @topProduction non-negative integer defining health limit for production
	 * @goodHealthLimit limit of health value, as animals cannot grow healthier infinitely
	 * @healthStart how healthy the animal is borned
	 */
	constructor(topProduction, goodHealthLimit, healthStart, drawDiameter) {
		this.topProduction = topProduction;
		this.goodHealthLimit = goodHealthLimit;
		this.currentHealth = healthStart;
		this.healthHistory = [healthStart];
		this.productionHistory = [];
		this.drawDiameter = drawDiameter;
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

	draw(posX, posY) {
		noStroke();
		if (this.isDead()) {
			fill(color(this.pallete[3]));
		} else {
			if(this.currentHealth >= this.topProduction){
				fill(color(this.pallete[0]));
			} else {
				fill(color(this.pallete[1]));
			}
		}
		if (this.currentHealth <= 2) {
			fill(color(this.pallete[2]));
		}
		circle(posX, posY, this.drawDiameter);
	}
}