var KnapBool = function(maxWeight) {
	this.maxWeight = maxWeight;
	this.solutionWeight = 0;
	this.solutionValue = 0;

	this.itens = [];
}

KnapBool.prototype.knapBool = function(itens) {
	console.log(itens);
	this.matrix = new Array(itens.length + 2).join('0').split('').map(parseFloat);

	for (var i = 0; i < this.matrix.length; i++) {
		this.matrix[i] = new Array(this.maxWeight+2).join('0').split('').map(parseFloat);
	}

	mainui.showTable(this.matrix);

	for (var i = 1; i < this.matrix.length; i++) {
		for (var j = 0; j <= this.maxWeight; j++) {
			if (j > 0) {
				var weight = itens[i-1].weight;
				this.matrix[i][j] = weight > j ?
															this.matrix[i-1][j] :
															Math.max(this.matrix[i-1][j], itens[i-1].value + this.matrix[i-1][j - weight]);
			}
		}
	}

	for (var i = this.matrix.length-1, j = this.maxWeight; i > 0 && j >= 0; i--) {
		var a = this.matrix[i][j],
				b = this.matrix[i-1][j];

		if ((i == 0 && a > 0) || (i > 0 && a != b)) {
			this.itens.push(itens[i-1]);
			itens[i-1].inside = 1;

			j -= itens[i-1].weight;

			this.solutionWeight += itens[i-1].weight;
		}
	}

	this.solutionValue = this.matrix[itens.length][this.maxWeight];

	mainui.showTable(this.matrix);
	console.log(this.solutionWeight, this.solutionValue);
}
