process.stdin.resume()

function exitHandler(options, exitCode) {
	console.log(options)
	if (options.cleanup) {
		console.log('Bye')
	}

	if (options.exit) {
		process.exit(exitCode)
	}
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { clean: true }))

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))
process.on('SIGTERM', exitHandler.bind(null, { exit: true }))
