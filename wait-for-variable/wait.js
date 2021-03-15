'use strict';

/* Set "foo" variable after 3 seconds */
var foo = undefined;
setTimeout(function() {
	console.log("reached timeout");
	foo = 3;
}, 3000);

function ensureFooIsSet() {
	return new Promise(function(resolve, reject) {
		(function waitForFoo(){
			if (foo != undefined) {
				console.log("foo defined");
				return resolve();
			}
			setTimeout(waitForFoo, 30);
		})();
	});
}

ensureFooIsSet()
	.then(function(){
		console.log("wait complete");
		console.log(foo);
	});
console.log(foo);
