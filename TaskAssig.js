var TaskAssig = function(matrix) {
	this.matrix = matrix;

	this.result = [];
	this.totalCost = Number.POSITIVE_INFINITY;
}

TaskAssig.prototype.setFinalSolution = function (arr, cost) {
	this.result = arr;
	this.totalCost = cost;
}

TaskAssig.prototype.hasConflict = function (j, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == j) return true;
	}

	return false;
}

TaskAssig.prototype.BnB = function (arr, i, cost) {
	if (i == this.matrix.length) {
		if (cost <= this.totalCost) {
			this.setFinalSolution(arr, cost);
		}
		return;
	}
	for (var j = 0; j < this.matrix[i].length; ++j) {
		if (!this.hasConflict(j, arr)) {
			if (cost+this.matrix[i][j] <= this.totalCost) {
				this.BnB(arr.concat(j), i+1, cost+this.matrix[i][j]);
			}
		}
	}
}

TaskAssig.prototype.showFinalResult = function() {
	console.log(this.result, this.totalCost);
}

TaskAssig.prototype.getFinalSolution = function() {
	return {
		result: this.result,
		cost: this.totalCost
	}
}