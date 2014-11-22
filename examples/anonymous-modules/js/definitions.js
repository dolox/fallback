define(function(app, constants, defineArray, defineBooleanFalse, defineBooleanTrue, defineFunction, defineName, defineNestedDependency, defineNull, defineObject, defineString) {
	// There modules come out of our `constants` file.
	require(function(AUTHOR, EMAIL, NAME, WEBSITE) {
		app.row('AUTHOR', AUTHOR);
		app.row('EMAIL', EMAIL);
		app.row('NAME', NAME);
		app.row('WEBSITE', WEBSITE);
	});

	app.row('defineArray', defineArray, true);
	app.row('defineBooleanFalse', defineBooleanFalse, true);
	app.row('defineBooleanTrue', defineBooleanTrue, true);
	app.row('defineFunction', defineFunction, true);
	app.row('defineName', defineName, true);
	app.row('defineNestedDependency', defineNestedDependency, true);
	app.row('defineNull', defineNull, true);
	app.row('defineObject', defineObject, true);
	app.row('defineString', defineString, true);
});
