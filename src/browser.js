// All of our browser detection functions reside here. Some browsers have special edge cases that we need to cater to,
// and that's the sole purpose of these functions.
me.browser = {};

// Detect whether or not the current browser is IE.
me.browser.isIE = function() {
	return global.document.documentMode ? true : false;
};

// Detect whether or not the current browser is IE11.
me.browser.isIE11 = function() {
	return Object.hasOwnProperty.call(global, 'ActiveXObject') && !global.ActiveXObject;
};
