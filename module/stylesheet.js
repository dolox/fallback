/*global global, me*/

// Define our module.
var stylesheet = {
	scannerAttempts: 5,
	scannerEnabled: true,
	scannerInterval: 50
};

// Module initializer.
stylesheet.initialize = function() {
	// Import the module.
	me.internal('css', stylesheet);
};

// Check to see if a stylesheet rule exists on the page.
stylesheet.check = function(exports, callback) {
	if (!stylesheet.scannerEnabled) {
		return callback(true);
	}

	return new stylesheet.scanner({
		rule: exports
	}, callback);
};

// Spawn our DOM element.
stylesheet.element = function() {
	var element = global.document.createElement('link');
	element.rel = 'stylesheet';
	return element;
};

// Set our DOM elements source.
stylesheet.element.source = function(element, source) {
	element.href = source;
};

// Construct the new scanner object.
stylesheet.scanner = function(input, callback) {
	this.attempts = stylesheet.scannerAttempts;
	this.callback = me.callback(callback);
	this.rule = input.rule;
	this.start();
};

// Start the interval.
stylesheet.scanner.prototype.start = function() {
	var scanner = this;

	return this.interval = setInterval(function() {
		scanner.tick();
	}, stylesheet.scannerInterval);
};

// Stop the interval.
stylesheet.scanner.prototype.stop = function() {
	return clearInterval(this.interval);
};

// Code to execute on each interval.
stylesheet.scanner.prototype.tick = function() {
	var defined = stylesheet.isDefined(this.rule);
	this.attempts--;

	if (this.attempts <= 0 || defined) {
		this.stop();
		this.callback(defined);
	}
};

// Check to see if the resource exists.
stylesheet.isDefined = function(selector) {
	var exists = false;

	if (me.isDefined(global.document.styleSheets)) {
		me.each(global.document.styleSheets, function(sheet) {
			var found = false;

			if (sheet.rules) {
				found = stylesheet.isDefinedScan(sheet.rules, selector);

				if (found) {
					exists = true;
					return -1;
				}
			}

			if (sheet.cssRules) {
				found = stylesheet.isDefinedScan(sheet.cssRules, selector);

				if (found) {
					exists = true;
					return -1;
				}
			}
		});
	}

	return exists;
};

// Scan stylesheet rules for our selector.
stylesheet.isDefinedScan = function(ruleset, selector) {
	var found = false;

	me.each(ruleset, function(rule) {
		if (rule.selectorText === selector) {
			found = true;
			return -1;
		}
	});

	return found;
};

// Invoke the initialization.
stylesheet.initialize();