define(function(fallback, JSON) {
	var me = {};

	me.init = function() {
		fallback.require('definitions', function() {
			var element = document.getElementsByClassName('container')[0];
			element.innerHTML += '<hr />';
			element.innerHTML += '<h1 class="text-center">Stats</h1>';
			element.innerHTML += '<pre id="stats">' + fallback.stats() + '</pre>';
		});
	};

	me.append = function(html) {
		var tr = document.createElement('tr');
		tr.innerHTML = html;
		document.getElementsByTagName('tbody')[0].appendChild(tr);
	};

	me.row = function(name, value, json) {
		me.append(me.wrapper(name, value, json));
	};

	me.wrapper = function(name, value, json) {
		if (json === true) {
			value = JSON.stringify(value);
		}

		return '<td class="text-right"><strong>' + name + '</strong></td><td>' + value + '</td>';
	};

	return me;
});
