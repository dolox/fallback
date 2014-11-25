// All of our browser detection functions reside here. Some browsers have special edge cases that we need to cater to,
// and that's the sole purpose of these functions.
var browser = {};

// Detect whether or not the current browser is IE.
browser.isIE = function() {
	return global.document.documentMode ? true : false;
};

// Detect whether or not the current browser is IE11.
browser.isIE11 = function() {
	return Object.hasOwnProperty.call(global, 'ActiveXObject') && !global.ActiveXObject;
};

// Reference the module within the library.
me.browser = browser;
