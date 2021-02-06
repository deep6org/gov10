const hypercore = require('hypercore')
const replicate = require('@hyperswarm/replicator')
const feed = hypercore('./my-db-tes', {valueEncoding: 'json'})

feed.on('ready', function() {
    console.log("the key is" ,feed.key.toString("hex"))
    console.log("the discovery key is", feed.discoveryKey.toString("hex"))
});

const swarm = replicate(feed,{
    live:true
});

feed.createReadStream({live: true}).on('data', (data) => {
	console.log(data)
})

setInterval( function() { feed.append({ho: Date.now()}) },1000)