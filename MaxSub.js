var MaxSub = function() {
	this.result;
	this.maxSize = 0;
}

MaxSub.prototype.maxSub = function(first, second) {
	this.result = new Array(first.length + 2).join('0').split('').map(parseFloat);

	this.result.map((el, i) => {
		this.result[i] = new Array(second.length + 2).join('0').split('').map(parseFloat);
	});

	for (var i = 0; i < first.length; i++) {
		for (var j = 0; j < second.length; j++) {
			if (first.charAt(i) == second.charAt(j)) {
				this.result[i+1][j+1] = this.result[i][j] + 1;
			}
			else {
				this.result[i+1][j+1] = Math.max(this.result[i+1][j], this.result[i][j+1]);
			}
		}
	}

mainui.showTable(this.result);

	var s = '';
	for (var i = first.length, j = second.length; i != 0 && j != 0; ) {
		if (this.result[i][j] == this.result[i-1][j]) i--;
		else if (this.result[i][j] == this.result[i][j-1]) j--;
		else if (first.charAt(i-1) == second.charAt(j-1)) {
			s += first.charAt(i-1);
			i--;
			j--;
		}
	}

	this.maxSize = this.result[first.length][second.length];
	this.result = s.split('').reverse().join('');
	return {
		result: this.result,
		size: this.maxSize
	};
}