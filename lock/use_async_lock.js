'use strict';

var AsyncLock = require('async-lock');
var lock = new AsyncLock();

function operation1() {
	console.log("Execute operation1");
	lock.acquire("key", function(done) {
		console.log("lock1 enter")
		setTimeout(function() {
			console.log("lock1 Done")
			done();
		}, 3000)
	}, function(err, ret) {
		console.log("lock1 release")
	}, {});
}

function operation2() {
	console.log("Execute operation2");
	lock.acquire("key", function(done) {
		console.log("lock2 enter")
		setTimeout(function() {
			console.log("lock2 Done")
			done();
		}, 1000)
	}, function(err, ret) {
		console.log("lock2 release")
	}, {});
}

function operation3() {
	console.log("Execute operation3");
	lock.acquire("key", function(done) {
		console.log("lock3 enter")
		setTimeout(function() {
			console.log("lock3 Done")
			done();
		}, 1)
	}, function(err, ret) {
		console.log("lock3 release")
	}, {});
}

operation1();
operation2();
operation3();
