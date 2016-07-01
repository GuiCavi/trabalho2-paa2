var Template = function() {

}

Template.prototype.input = function(id) {
	var $div = document.createElement('div');
	$div.classList.add('mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label');
	$div.style.width = '100px';

	var $input = document.createElement('input');
	$input.classList.add('mdl-textfield__input');
	$input.type = 'text';
	$input.id = id;
	$input.pattern = '-?[0-9]*(\.[0-9]+)?';

	var $label = document.createElement('label');
	$label.classList.add('mdl-textfield__label');
	$label.for = id;
	$label.textContent = id;

	var $span = document.createElement('span');
	$span.classList.add('mdl-textfield__error');
	$span.textContent = 'Erro';

	$div.appendChild($input);
	$div.appendChild($label);
	$div.appendChild($span);

	return $div;
}

var template = new Template();