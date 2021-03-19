'use strict';

var Mutex = require('async-mutex').Mutex;
const mutex = new Mutex();

function operation1() {
	console.log("Execute operation1");
	mutex
		.acquire()
		.then(function(release) {
			setTimeout(function() {
				console.log("lock1 Done")
				release();
				console.log("lock1 release");
			}, 3000);
		});
}

function operation2() {
	console.log("Execute operation2");
	mutex
		.acquire()
		.then(function(release) {
			setTimeout(function() {
				console.log("lock2 Done")
				release();
				console.log("lock2 release");
			}, 1000);
		});
}

function operation3() {
	console.log("Execute operation3");
	mutex
		.acquire()
		.then(function(release) {
			setTimeout(function() {
				console.log("lock3 Done")
				release();
				console.log("lock3 release");
			}, 300);
		});
}

operation1();
operation2();
operation3();
