define(function(fallback) {
	var me = app = {};

	me.init = function() {
		fallback.require('definitions', function() {
			var element = document.getElementsByClassName('container')[0];
			element.innerHTML += '<hr />';
			element.innerHTML += '<h1 class="text-center">Stats</h1>';
			element.innerHTML += '<div id="stats">' + fallback.stats() + '</div>';
		});
	};

	me.append = function(html) {
		document.getElementsByTagName('tbody')[0].innerHTML += html;
	};

	me.row = function(name, value, json) {
		me.append(me.wrapper(name, value, json));
	};

	me.wrapper = function(name, value, json) {
		if (json == true) {
			value = JSON.stringify(value);
		}

		return '<tr><td class="text-right"><strong>' + name + '</strong></td><td>' + value + '</td></tr>';
	};

	return me;
});
