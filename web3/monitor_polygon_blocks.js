const fs = require('fs')
const Web3 = require('web3')

const url = '<websocket_provider>'
const web3 = new Web3(url)

function exitHandler(options, exitCode) {
	if (options.clean) {
		let firstBlock = blockData[0].number
		let lastBlock = blockData[blockData.length - 1].number
		let logFile = '/var/log/polygon_blocks_' + firstBlock + '_' + lastBlock + '.json'
		fs.writeFileSync(logFile, JSON.stringify(blockData))
	}

	if (options.exit) {
		process.exit(exitCode)
	}
}

/* Register signal handler */
process.on('exit', exitHandler.bind(null, { clean: true }))
process.on('SIGINT', exitHandler.bind(null, { exit: true }))
process.on('SIGTERM', exitHandler.bind(null, { exit: true }))

/* Subscribe */
var subscription = web3.eth.subscribe('newBlockHeaders')
var blockData = []

// let subscription = web3.eth.subscribe('newBlockHeaders', (err,event) => {
//	if (!err) {
//		console.log('Subscribe OK')
//	}
// });

function connected_cb(nr) {
	console.log('nr: ' + nr)
}

function changed_cb(changed) {
	console.log('changed: ' + changed)
}

function data_cb(event) {
	blockData.push({
		number: event.number,
		difficulty: event.difficulty,
		timestamp: event.timestamp
	})

	let logStr = 'New block={ '
	logStr += 'number: ' + event.number + ', '
	logStr += 'difficulty: ' + event.difficulty + ', '
	logStr += 'timestamp: ' + event.timestamp + ' }'
	console.log(logStr)
}

subscription.on('connected', connected_cb)
subscription.on('changed', changed_cb)
subscription.on('data', data_cb)
subscription.on('error', err => { throw err })

