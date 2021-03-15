'use strict';

class Foo {
	constructor() {
		this.bar = undefined;
		setTimeout(this.#_set_bar.bind(this), 3000);
	}

	print_bar() {
		console.log("bar=" + this.bar);
	}

/*****************************************************************************/
	#_set_bar() {
		console.log("reached timeout");
		this.bar = 3;
	}

	wait_for_bar() {
		return new Promise(this._wait_for_bar_promise.bind(this));
	}

	_wait_for_bar_promise(resolve, reject) {
		return this._wait_for_bar(resolve);
	}

	_wait_for_bar(resolve) {
		if (this.bar != undefined) {
			console.log("bar defined");
			return resolve();
		}
		setTimeout(this._wait_for_bar.bind(this, resolve), 30);
	}
}

const foo = new Foo();

console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(foo)));

foo.print_bar();
foo.wait_for_bar()
	.then(function(){
		console.log("wait complete");
		foo.print_bar();
	});
