const IS_HOST = process.argv.length > 2 ? false : true

const ram = require('random-access-memory')
const replicate = require('@hyperswarm/replicator')
const hypercore = require('hypercore')
const readline = require('readline')

const key = !IS_HOST && Buffer.from(process.argv[2], 'hex')
const feed = key ? hypercore(ram, key, {valueEncoding: 'json'}) : hypercore('./data', {valueEncoding: 'json'}) // store data in memory
// const feed = key ? hypercore(ram, key, {valueEncoding: 'json'}) : hypercore('./data', {valueEncoding: 'json'}) // store to file

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

feed.on('ready', () => {
	console.log(`Using Room: ${feed.key.toString('hex')}`)
	replicate(feed, { live: true })

	rl.on('line', function (line) {
	  	const parsedLine = line.split(',')
		feed.append({1: parsedLine[0], 2: parsedLine[1], 3: parsedLine[2]})
	});

	feed.createReadStream({
		live: true
	}).on('data', (data) => {
		console.log(data)
	})

})

