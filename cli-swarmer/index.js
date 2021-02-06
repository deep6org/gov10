
// worker.js
var zmq = require("zeromq"),
  sock = zmq.socket("pull");

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  	const parsedLine = line.split(',')
	feed.append({1: parsedLine[0], 2: parsedLine[1], 3: parsedLine[2]})
});

// process.stdin.on('data', function (data) {
//   console.log(JSON.parse(data);
// });



const Networker = require('@corestore/networker')
const Corestore = require('corestore')
const ram = require('random-access-memory')


async function main () {

	const store = new Corestore(ram, {valueEncoding: 'json'})
	await store.ready()

	await appen(store, {howdie: 'ho'})

	const networker = new Networker(store)

	// Start announcing or lookup up a discovery key on the DHT.
	await networker.configure(discoveryKey, { announce: true, lookup: true })

	// Stop announcing or looking up a discovery key.
	// networker.configure(discoveryKey, { announce: false, lookup: false })

	// Shut down the swarm (and unnanounce all keys)
	// await networker.close()
}

main()

function append (core, data) {
  return new Promise((resolve, reject) => {
    core.append(data, err => {
      if (err) return reject(err)
      return resolve()
    })
  })
}



// var hypercore = require('hypercore')
// var feed = hypercore(`./data-` + Date.now(), {valueEncoding: 'json'})

// feed.createReadStream({live: true}).on('data', (data) => {
// 	console.log(data)
// })

// sock.connect("tcp://127.0.0.1:5555");
// console.log("Worker connected to port 5555");

// sock.on("message", function(msg) {
//   console.log("work: %s", msg.toString());
// });


