'use strict';

class Mutex {
	constructor() {
		this.queue = [];
		this.locked = false;
	}

	lock() {
		return new Promise((resolve, reject) => {
			if (this.locked) {
				this.queue.push([resolve, reject]);
			} else {
				this.locked = true;
				resolve();
			}
		});
	}

	release() {
		if (this.queue.length > 0) {
			const [resolve, reject] = this.queue.shift();
			resolve();
		} else {
			this.locked = false;
		}
	}
}

const mutex = new Mutex();

/* Sample code ************************
// using promise syntax
const handleRequest = () => {
	mutex.lock().then(() => {
		// do something here
		mutex.release();
	})
};

// using async syntax
const handleRequest = async () => {
	await mutex.lock();
	// do something here
	mutex.release();
};
****************************************/

async function operation1() {
	console.log("Execute operation1");
	await mutex.lock();
	setTimeout(function() {
		console.log("lock1 Done")
		mutex.release();
		console.log("lock1 release");
	}, 3000);
}

async function operation2() {
	console.log("Execute operation2");
	await mutex.lock();
	setTimeout(function() {
		console.log("lock2 Done")
		mutex.release();
		console.log("lock2 release");
	}, 1000);
}

async function operation3() {
	console.log("Execute operation3");
	await mutex.lock();
	setTimeout(function() {
		console.log("lock3 Done")
		mutex.release();
		console.log("lock3 release");
	}, 300);
}

operation1();
operation2();
operation3();
