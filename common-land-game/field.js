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
		this.regenerate = this.createMatrix(sizeX, sizeY, -1.0);
		this.topX = positionX;
		this.topY = positionY;
		this.fieldCapacity = sizeX * sizeY * this.cellCapacity;
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

	withdrawResource(x,y) {
		let fieldPosition = this.getFieldPosition(x,y);
		console.log('Field position: ' + JSON.stringify(fieldPosition));
		if(fieldPosition) {
			let localResource = this.resources[fieldPosition[0]][fieldPosition[1]];
			if(localResource > 0) {
				this.resources[fieldPosition[0]][fieldPosition[1]]--;
				this.regenerate[fieldPosition[0]][fieldPosition[1]]--;
				this.fieldCapacity--;
				return 1;
			} else {
				return 0;
			}
		}
	}

	regenerateField() {
		console.log("REGENERATE: " + JSON.stringify(this.regenerate))
		for(let lines=0; lines < this.resources.length; lines++){
			for(let columns=0; columns < this.resources[0].length; columns++){
				//ONLY REGENERATE IF
				if (this.regenerate[lines][columns]>=1
					&& this.resources[lines][columns]<this.cellCapacity) {
					this.resources[lines][columns]++
					this.fieldCapacity++
					this.regenerate[lines][columns] = -1.0
				} else {
					let growStep = floor(this.cellCapacity/3)
					if (this.resources[lines][columns]>=2*growStep){
						this.regenerate[lines][columns]+=1
					} else if (this.resources[lines][columns]>=growStep){
						this.regenerate[lines][columns]+=0.5
					} else {
						this.regenerate[lines][columns]+=0.35
					}
				}
			}
		}
	}

	getFieldPosition(x,y) {
		let line = Math.floor((x-this.topX)/this.cellSize);
		let column = Math.floor((y-this.topY)/this.cellSize);

		if (line < this.resources.length & line >=0) {
			if (column < this.resources[0].length & column >=0) {
				return [line,column];
			}
		}
		return null;
	}

	getCurrentCapacity(){
		return this.fieldCapacity;
	}
}