/*global global, me*/

// Define our module.
var javascript = {
	head: global.document.getElementsByTagName('head')[0]
};

// Module initializer.
javascript.initialize = function() {
	// Import the module.
	me.internal('js', javascript);
};

// Check to see if the resource exists.
javascript.check = function(exports, callback) {
	me.callback(callback)(javascript.isDefined(exports));
};

// Spawn our DOM element.
javascript.element = function() {
	var element = global.document.createElement('script');
	element.type = 'text/javascript';
	return element;
};

// Set our DOM elements source.
javascript.element.source = function(element, source) {
	element.src = source;
};

// Check to see if object exists.
javascript.isDefined = function(variable) {
	if (me.module(variable, false)) {
		return true;
	}

	return javascript.reference(variable) ? true : false;
};

// Obtain global object reference.
javascript.reference = function(variable) {
	try {
		var parts = variable.split('.');
		var part = global;

		for (var index in parts) {
			if (me.isDefined(part[parts[index]])) {
				part = part[parts[index]];
				continue;
			}

			return false;
		}

		return part;
	} catch (exception) {}

	return false;
};

// Invoke the module.
javascript.initialize();