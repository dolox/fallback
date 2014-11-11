/* global me */

// Image loader which is responsible for loading any images for the library.
me.loader.img = {};

// The image loader is pretty straight forward as legacy browser support goes way back, we don't need to perform any
// extra checking or manipulation.
me.loader.img.boot = function(module, url, callbackSuccess, callbackFailed) {
	// Create a new `img` element.
	var element = window.document.createElement('img');

	// If we get an `onerror` callback, the image failed to load.
	element.onerror = function() {
		// Remove the element from the page.
		element.remove();

		// Process our failed callback.
		return callbackFailed(module, url, 'failed');
	};

	// If we get an `onload` callback, the image loaded successfully.
	element.onload = function() {
		// Remove the element from the page.
		element.remove();

		// In the case of images, the factory represents the URL.
		return callbackSuccess(module, url, 'success', url);
	};

	// Set the actual URL that we're going to request to load for our image.
	element.src = url;

	// Attempt to load the image on the page.
	return me.head.appendChild(element);
};
