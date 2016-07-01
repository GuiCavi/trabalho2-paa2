var KnapFrac = function(maxWeight) {
	this.maxWeight = maxWeight;
	this.itens = [];

	this.solutionWeight = 0;
	this.solutionValue = 0;
}

KnapFrac.prototype.knapFrac = function(itens) {
	itens.sort(function(a, b) {
		var a1 = a.value / a.weight;
		var b1 = b.value / b.weight;

		return (a1 > b1 ? -1 : (a1 < b1 ? 1 : 0));
	});

	for (var i = 0; (this.maxWeight - this.solutionWeight) > 0 && i < itens.length; i++) {
		var item = itens[i];

		if (item.weight >= (this.maxWeight - this.solutionWeight)) {
			item.inside = (this.maxWeight - this.solutionWeight);
			this.solutionWeight = this.maxWeight;
			this.solutionValue += item.inside / item.weight * item.value;
			this.addItem(item);
			break;
		}
		else {
			item.inside = item.weight;
			this.solutionWeight += item.inside;
			this.solutionValue += item.value;
			this.addItem(item);
		}
	}
}

KnapFrac.prototype.addItem = function(item) {
	this.itens.push(item);
}