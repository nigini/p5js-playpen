class Field {
	/**
	 * Creates a rectangular grass field with (sizeX * sizeY) cells,
	 * each one will feed cellCapacity animals at a time.  
	 */
	constructor(positionX, positionY, sizeX, sizeY, cellSize) {
		this.pallete = ['#FFFFFF','#88CC88', '#55AA55', '#2D882D', '#116611', '#004400'];
		this.cellSize = cellSize;
		this.cellCapacity = this.pallete.length-1;
		this.resources = this.createMatrix(sizeX, sizeY, this.cellCapacity);
		this.topX = positionX;
		this.topY = positionY;
	}

	createMatrix(numLines, numColumns, initValue) {
		let result = Array(numLines);
		let columns = Array(numColumns).fill(initValue);
		for(let pos=0; pos < result.length; pos++){
			result[pos] = columns.slice();
		}
		return result;
	}

	draw() {
		noStroke();
		let cellX, cellY;
		for(let lines=0; lines < this.resources.length; lines++){
			for(let columns=0; columns < this.resources[0].length; columns++){
				let localResource = this.resources[lines][columns];
				fill(color(this.pallete[localResource]));
				cellX = this.topX+(lines*this.cellSize);
				cellY = this.topY+(columns*this.cellSize);
				rect(cellX, cellY, this.cellSize, this.cellSize);
				//console.log('Line: ' + lines + ' - column: ' + columns + ' rect: ' + 
				//	JSON.stringify([cellX, cellY, cellX+this.cellSize, cellY+this.cellSize]));
			}
		}
		stroke('#000000');
		noFill();
		rect(this.topX, this.topY, (this.resources.length*this.cellSize), (this.resources[0].length*this.cellSize));
	}

	withdrawResources(amount) {
		console.log('Field status: ' + JSON.stringify(this.resources));
		let toWithdraw = amount;
		let localResource = 0;
		for(let lines=0; lines < this.resources.length && toWithdraw > 0; lines++){
			for(let columns=0; columns < this.resources[0].length && toWithdraw > 0; columns++){
				localResource = this.resources[lines][columns];
				if(localResource > 0) {
					if(localResource >= toWithdraw) {
						this.resources[lines][columns] -= toWithdraw;
						toWithdraw = 0;
					} else {
						toWithdraw -= localResource;
						this.resources[lines][columns] = 0;
					}
				}
			}
		}
		return amount-toWithdraw;
	}
}