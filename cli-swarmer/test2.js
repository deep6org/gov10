const hyperswarm = require('hyperswarm')

// const Networker = require('@corestore/networker')
// const Corestore = require('corestore')
// const ram = require('random-access-memory')
// const crypto = require('crypto')

const topicHex = crypto.createHash('sha256')
  .update('imdb2')
  .digest()



// async function main() {
// 	const store = new Corestore(ram)

// 	await store.ready()
// 	await store.ready()

// 	store.createReadStream({live: true}).on('data', (data) => {
// 		console.log(data)
// 	})

// 	const networker = new Networker(store)

// 	setInterval( function() { store.append({ho: Date.now()}) },1000)

// 	await networker.configure(topicHex, { announce: true, lookup: true })
// }
// main()


