var MainUI = function() {
	this.$table;
	this.$buttonStart;
	this.$buttonCalculate;

	this.dt;
	this.numTasks;
	this.numWorkers;

	this.$table = document.getElementById('table-tasks-assig'); // TABLE FOR INSERTING TASK ASSIGN DATA
	this.$buttonStart = document.getElementById('btn-start'); // BUTTON FOR INITATE TASK ASSIGN TABLE
	this.$buttonCalculate = document.getElementById('btn-calculate'); // BUTTON FOR CALCULATING TASK ASSIGN

	this.$listItens = document.getElementById('itens-list'); // LIST FOR INSERTING KNAP FRAC ITENS
	this.$buttonAdd = document.getElementById('btn-add'); // BUTTON FOR ADDING ITENS TO KNAP FRAC ITENS LIST
	this.$buttonCalculateKnap = document.getElementById('btn-calculate-knap'); // BUTTON FOR CALCULATE KNAP FRAC
	this.$listItensResult = document.getElementById('itens-list-result'); // LIST FOR DISPLAY RESULT KNAP FRAC

	this.$listItensBool = document.getElementById('itens-list-bool'); // LIST FOR INSERTING KNAP BOOL ITENS
	this.$buttonAddBool = document.getElementById('btn-add-bool'); // BUTTON FOR ADDING ITENS TO KNAP BOOL ITENS LIST
	this.$buttonCalculateKnapBool = document.getElementById('btn-calculate-knap-bool'); // BUTTON FOR CALCULATE KNAP BOOL
	this.$listItensResultBool = document.getElementById('itens-list-result-bool'); // LIST FOR DISPLAY RESULT KNAP BOOL
}

MainUI.prototype.init = function() {
	// INIT DATATABLE
	this.dt = $(this.$table).DataTable({
		bFilter: false,
		bInfo: false,
		bPaginate: false
	});

	this.$buttonStart.addEventListener('click', (e) => {
		e.preventDefault();

		this.dt.destroy();
		$(this.$table).children('thead, tbody').empty();

		this.numTasks = parseInt(document.getElementById('num-tasks').value);
		this.numWorkers = parseInt(document.getElementById('num-workers').value);

		this.createtasks(this.numTasks);
		this.createWorkers(this.numWorkers, this.numTasks);

		this.dt = $(this.$table).DataTable({
			bFilter: false,
			bInfo: false,
			bPaginate: false,
			bScrollCollapse: true,
			sScrollX: '100%'
		});
	});

	this.$buttonCalculate.addEventListener('click', (e) => {
		var $inputs = this.$table.querySelectorAll('.mdl-textfield__input');

		var matrix = new Array(this.numWorkers + 1).join('0').split('');

		[].forEach.call($inputs, (el, i) => {
			if (el.value != '') {
				var rowCol = el.id.match(/value|\d\-\d*/g)[1].split('-');

				if (matrix[rowCol[0]] == '0') matrix[rowCol[0]] = new Array(this.numTasks + 1).join('0').split('');

				matrix[rowCol[0]][rowCol[1]] = parseInt(el.value);

				$(el).closest('td').empty()[0].textContent = el.value;
			}
		});

		var ta = new TaskAssig(matrix);
		ta.BnB([], 0, 0);
		ta.showFinalResult();

		var solution = ta.getFinalSolution();

		solution.result.forEach((el, i) => {
			this.$table.tBodies[0].rows[i].cells[el+1].classList.add('taResultColor');
		});

		document.getElementById('taTotalCostResult').textContent = "Custo total para realizar a tarefa = " + solution.cost;
	});

	this.$buttonAdd.addEventListener('click', (e) => {
		e.preventDefault();

		var values = $(this.$buttonAdd).closest('form').serializeArray(),
				_values = {};

		for (var i = 0; i < values.length; i++) {
			_values[values[i].name] = values[i].value;
		}

		console.log(_values);

		this.createListItem(_values, this.$listItens, false);
	});

	this.$buttonCalculateKnap.addEventListener('click', (e) => {
		var names = this.$listItens.querySelectorAll('.itemName');
		var weights = this.$listItens.querySelectorAll('.itemWeight');
		var values = this.$listItens.querySelectorAll('.itemValue');

		var totalWeight = document.getElementById('knap-weight').value;

		var itens = [];

		for (var i = 0; i < names.length; i++) {
			var item = new Item(names[i].textContent, parseFloat(weights[i].textContent), parseFloat(values[i].textContent));

			itens.push(item);
		}

		var kf = new KnapFrac(parseInt(totalWeight));
		kf.knapFrac(itens);

		console.log(kf);

		$(this.$listItensResult).empty();
		for (var i = 0; i < kf.itens.length; i++) {
			var $li = document.createElement('li');

			$li.textContent = 'Levar ' + (kf.itens[i].inside == kf.itens[i].weight ? 'tudo' : kf.itens[i].inside) + ' de ' + kf.itens[i].name;

			this.$listItensResult.appendChild($li);
		}

		var $liWeight = document.createElement('li');
		$liWeight.textContent = 'Total de peso levado: ' + kf.solutionWeight;
		var $liValue = document.createElement('li');
		$liValue.textContent = 'Total de valor levado: ' + kf.solutionValue;

		this.$listItensResult.appendChild($liWeight);
		this.$listItensResult.appendChild($liValue);
	});

	//------------------------------
	this.$buttonAddBool.addEventListener('click', (e) => {
		e.preventDefault();

		var values = $(this.$buttonAddBool).closest('form').serializeArray(),
				_values = {};
console.log(values);
		for (var i = 0; i < values.length; i++) {
			_values[values[i].name] = values[i].value;
		}

		console.log(_values);

		this.createListItem(_values, this.$listItensBool, true);
	});

	this.$buttonCalculateKnapBool.addEventListener('click', (e) => {
		var names = this.$listItensBool.querySelectorAll('.itemNameBool');
		var weights = this.$listItensBool.querySelectorAll('.itemWeightBool');
		var values = this.$listItensBool.querySelectorAll('.itemValueBool');

		var totalWeight = document.getElementById('knap-weight-bool').value;

		var itens = [];

		for (var i = 0; i < names.length; i++) {
			var item = new Item(names[i].textContent, parseFloat(weights[i].textContent), parseFloat(values[i].textContent));

			itens.push(item);
		}

		var kb = new KnapBool(parseInt(totalWeight));
		kb.knapBool(itens);

		console.log(kb);

		$(this.$listItensResultBool).empty();
		for (var i = 0; i < kb.itens.length; i++) {
			var $li = document.createElement('li');

			$li.textContent = 'Levar ' + kb.itens[i].name;

			this.$listItensResultBool.appendChild($li);
		}

		var $liWeight = document.createElement('li');
		$liWeight.textContent = 'Total de peso levado: ' + kb.solutionWeight;
		var $liValue = document.createElement('li');
		$liValue.textContent = 'Total de valor levado: ' + kb.solutionValue;

		this.$listItensResultBool.appendChild($liWeight);
		this.$listItensResultBool.appendChild($liValue);
	});
	//------------------------------
}

MainUI.prototype.createWorkers = function(numWorkers, numTasks) {
	for (var i = 0; i < numWorkers; i++) {
		var $tr = document.createElement('tr');

		for (var j = 0; j <= numTasks; j++) {
			var $td = document.createElement('td');

			if (j == 0) $td.textContent = 'Pessoa ' + (i + 1);
			else {
				var $input = template.input('value' + i + '-' + (j - 1));
				componentHandler.upgradeElement($input);
				$td.appendChild($input);
			}

			$tr.appendChild($td);
		}

		this.$table.tBodies[0].appendChild($tr);
	}
}

MainUI.prototype.createtasks = function(numTasks) {
	var $tr = document.createElement('tr');
	for (var i = 0; i <= numTasks; i++) {
		var $th = document.createElement('th');

		if (i == 0) $th.textContent = '';
		else $th.textContent = 'Tarefa ' + i;

		$tr.appendChild($th);
	}

	this.$table.tHead.appendChild($tr);
}

MainUI.prototype.showTable = function(matrix) {
	var s = '';
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			s += matrix[i][j] + ' ';
		}
		s += "\n";
	}

	console.log(s);
}

MainUI.prototype.createListItem = function(_values, target, bool) {
	var $li = document.createElement('li');
	$li.classList.add('mdl-list__item', 'mdl-list__item--three-line');

	var $primaryContent = document.createElement('span');
	$primaryContent.classList.add('mdl-list__item-primary-content');
	$primaryContent.innerHTML =
		'<span class="itemName'+(bool ? 'Bool' : '' )+'">'+ _values['itemName'+(bool ? 'Bool' : '' )] +'</span>' +
		'<span class="mdl-list__item-text-body">' +
			'<span>Peso: </span><span class="itemWeight'+(bool ? 'Bool' : '' )+'">'+ _values['itemWeight'+(bool ? 'Bool' : '' )] + '</span><br />' +
			'<span>Valor: </span><span class="itemValue'+(bool ? 'Bool' : '' )+'">' + _values['itemValue'+(bool ? 'Bool' : '' )] + '</span><br />' +
		'</span>';

	var $secondaryAction = document.createElement('a');
	$secondaryAction.classList.add('mdl-list__item-secondary-action');
	$secondaryAction.href = '#';

	$secondaryAction.addEventListener('click', this.removeListItem);

	var $icon = document.createElement('i');
	$icon.classList.add('material-icons');
	$icon.textContent = 'delete';

	$secondaryAction.appendChild($icon);

	$li.appendChild($primaryContent);
	$li.appendChild($secondaryAction);

	target.appendChild($li);
}

MainUI.prototype.removeListItem = function(e) {
	$(this).closest('li').remove();
}

var mainui = new MainUI();